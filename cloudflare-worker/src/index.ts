export interface Env {
  DB: D1Database;
  VIDEOS_BUCKET: R2Bucket;
  OWNER_PIN?: string;
  CORS_ORIGIN?: string;
}
interface VideoRow { id: string; title: string; video_url: string; created_at: string }
interface UploadRow { id: string; title: string; object_key: string; upload_id: string; size: number; content_type: string }
const CHUNK_SIZE = 8 * 1024 * 1024;
const MAX_SIZE = 2 * 1024 * 1024 * 1024;
const video = (row: VideoRow) => ({ id: row.id, title: row.title, videoUrl: row.video_url, createdAt: row.created_at });
function metadata(data: Record<string, any> = {}) {
  const width = Number(data.width), height = Number(data.height), duration = Number(data.duration);
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width > 16384 || height > 16384) return {};
  return { width, height, orientation: width === height ? 'square' : width > height ? 'landscape' : 'portrait', ...(duration > 0 && duration < 86400 ? { duration } : {}) };
}
class HttpError extends Error { constructor(public status: number, message: string) { super(message); } }
async function authenticate(request: Request, env: Env) {
  if (!env.OWNER_PIN || env.OWNER_PIN.length < 4) throw new HttpError(503, 'Nahrávanie ešte nie je pripojené.');
  const ip = request.headers.get('CF-Connecting-IP') || 'local';
  const window = Math.floor(Date.now() / 600000);
  const attempt = await env.DB.prepare('SELECT attempts FROM auth_attempts WHERE ip = ? AND window = ?').bind(ip, window).first<{ attempts: number }>();
  if (attempt && attempt.attempts >= 10) throw new HttpError(429, 'Príliš veľa pokusov. Skúste to o 10 minút.');
  const candidate = request.headers.get('X-Admin-PIN') || '';
  const digest = async (value: string) => new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
  const [actual, expected] = await Promise.all([digest(candidate), digest(env.OWNER_PIN)]);
  let difference = 0;
  for (let i = 0; i < expected.length; i++) difference |= actual[i] ^ expected[i];
  if (difference !== 0) {
    await env.DB.prepare('INSERT INTO auth_attempts (ip, window, attempts) VALUES (?, ?, 1) ON CONFLICT(ip) DO UPDATE SET attempts = CASE WHEN window = excluded.window THEN attempts + 1 ELSE 1 END, window = excluded.window').bind(ip, window).run();
    throw new HttpError(401, 'Nesprávny PIN.');
  }
}
async function jsonBody(request: Request): Promise<any> {
  if (Number(request.headers.get('Content-Length')) > 65536) throw new HttpError(413, 'Požiadavka je príliš veľká.');
  try { return await request.json(); } catch { throw new HttpError(400, 'Neplatné údaje.'); }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    const allowed = (env.CORS_ORIGIN || '').split(',').map(value => value.trim()).filter(Boolean);
    const headers = new Headers({ 'Vary': 'Origin', 'X-Content-Type-Options': 'nosniff' });
    const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: new Headers([...headers, ['Content-Type', 'application/json'], ['Cache-Control', 'no-store']]) });
    if (origin && !allowed.includes(origin)) return json({ error: 'Nepovolený pôvod požiadavky.' }, 403);
    if (origin) headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Admin-PIN, Range');
    headers.set('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges, ETag');
    headers.set('Access-Control-Max-Age', '86400');
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    try {
      if (url.pathname === '/api/health' && request.method === 'GET') {
        await env.DB.prepare('SELECT id FROM videos LIMIT 1').all();
        await env.VIDEOS_BUCKET.head('health-check');
        return json({ status: 'ok', uploadsConfigured: !!env.OWNER_PIN && env.OWNER_PIN.length >= 4 });
      }
      if (url.pathname === '/api/videos' && request.method === 'GET') {
        const rows = await env.DB.prepare('SELECT id, title, video_url, created_at FROM videos ORDER BY created_at DESC, id DESC').all<VideoRow>();
        return json(await Promise.all((rows.results || []).map(async row => {
          // Metadata lives with the R2 object, so no D1 schema migration is needed.
          const key = new URL(row.video_url).pathname.split('/api/stream/')[1];
          const object = key ? await env.VIDEOS_BUCKET.head(key) : null;
          return { ...video(row), ...metadata(object?.customMetadata) };
        })));
      }
      if (url.pathname.startsWith('/api/stream/') && ['GET', 'HEAD'].includes(request.method)) {
        const key = decodeURIComponent(url.pathname.slice('/api/stream/'.length));
        if (!/^videos\/[a-f0-9-]+\.(mp4|mov|webm)$/.test(key)) throw new HttpError(404, 'Video nenájdené.');
        const object = await env.VIDEOS_BUCKET.head(key);
        if (!object) throw new HttpError(404, 'Video nenájdené.');
        object.writeHttpMetadata(headers);
        headers.set('ETag', object.httpEtag);
        headers.set('Accept-Ranges', 'bytes');
        headers.set('Cache-Control', 'public, max-age=86400, immutable');
        let range: { offset: number; length: number } | undefined;
        const raw = request.headers.get('Range');
        // HEAD ignores Range. If-Range mismatch requests the entire representation.
        if (raw && request.method === 'GET' && (!request.headers.get('If-Range') || request.headers.get('If-Range') === object.httpEtag)) {
          const match = /^bytes=(\d*)-(\d*)$/.exec(raw);
          if (!match || (!match[1] && !match[2])) { headers.set('Content-Range', `bytes */${object.size}`); return new Response(null, { status: 416, headers }); }
          let start: number, end: number;
          if (!match[1]) { const suffix = Number(match[2]); start = Math.max(0, object.size - suffix); end = object.size - 1; }
          else { start = Number(match[1]); end = match[2] ? Math.min(Number(match[2]), object.size - 1) : object.size - 1; }
          if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= object.size || end < start) { headers.set('Content-Range', `bytes */${object.size}`); return new Response(null, { status: 416, headers }); }
          range = { offset: start, length: end - start + 1 };
          headers.set('Content-Range', `bytes ${start}-${end}/${object.size}`);
        }
        headers.set('Content-Length', String(range ? range.length : object.size));
        if (request.method === 'HEAD') return new Response(null, { headers });
        const body = await env.VIDEOS_BUCKET.get(key, range ? { range } : undefined);
        if (!body) throw new HttpError(404, 'Video nenájdené.');
        return new Response(body.body, { status: range ? 206 : 200, headers });
      }
      if (!url.pathname.startsWith('/api/uploads')) throw new HttpError(404, 'Nenájdené.');
      // Authentication is required for every write, including individual chunks and aborts.
      await authenticate(request, env);
      if (url.pathname === '/api/uploads' && request.method === 'POST') {
        const data = await jsonBody(request);
        const title = typeof data.title === 'string' ? data.title.trim() : '';
        const extension = typeof data.filename === 'string' ? data.filename.split('.').pop()?.toLowerCase() : '';
        if (!title || title.length > 120 || !Number.isSafeInteger(data.size) || data.size < 1 || data.size > MAX_SIZE || !['mp4', 'm4v', 'mov', 'webm'].includes(extension || '')) throw new HttpError(400, 'Vyberte video MP4, MOV alebo WebM do 2 GB a zadajte názov.');
        const type = extension === 'webm' ? 'video/webm' : extension === 'mov' ? 'video/quicktime' : 'video/mp4';
        const id = crypto.randomUUID();
        const key = `videos/${id}.${extension === 'm4v' ? 'mp4' : extension}`;
        const customMetadata = Object.fromEntries(Object.entries(metadata(data)).map(([name, value]) => [name, String(value)]));
        const upload = await env.VIDEOS_BUCKET.createMultipartUpload(key, { httpMetadata: { contentType: type }, customMetadata });
        try {
          await env.DB.prepare('INSERT INTO uploads (id, title, object_key, upload_id, size, content_type) VALUES (?, ?, ?, ?, ?, ?)').bind(id, title, key, upload.uploadId, data.size, type).run();
        } catch (error) { await upload.abort(); throw error; }
        return json({ id, chunkSize: CHUNK_SIZE }, 201);
      }
      const match = /^\/api\/uploads\/([a-f0-9-]+)(?:\/(complete|parts\/(\d+)))?$/.exec(url.pathname);
      if (!match) throw new HttpError(404, 'Nenájdené.');
      const id = match[1];
      if (match[2] === 'complete' && request.method === 'POST') {
        const existing = await env.DB.prepare('SELECT id, title, video_url, created_at FROM videos WHERE id = ?').bind(id).first<VideoRow>();
        if (existing) return json(video(existing));
      }
      const row = await env.DB.prepare('SELECT * FROM uploads WHERE id = ?').bind(id).first<UploadRow>();
      if (!row) { if (request.method === 'DELETE') return json({ success: true }); throw new HttpError(404, 'Nahrávanie sa nenašlo. Skúste znova.'); }
      const upload = env.VIDEOS_BUCKET.resumeMultipartUpload(row.object_key, row.upload_id);
      if (match[3] && request.method === 'PUT') {
        const number = Number(match[3]);
        const expected = Math.min(CHUNK_SIZE, row.size - (number - 1) * CHUNK_SIZE);
        if (!Number.isSafeInteger(number) || number < 1 || number > Math.ceil(row.size / CHUNK_SIZE)) throw new HttpError(400, 'Neplatná časť videa.');
        // Bounded buffering also works when the browser omits Content-Length.
        if (Number(request.headers.get('Content-Length')) > CHUNK_SIZE) throw new HttpError(413, 'Časť je príliš veľká.');
        const reader = request.body?.getReader();
        if (!reader) throw new HttpError(400, 'Chýba video.');
        const chunks: Uint8Array[] = [];
        let size = 0;
        while (true) {
          const next = await reader.read(); if (next.done) break;
          size += next.value.byteLength;
          if (size > expected) { await reader.cancel(); throw new HttpError(413, 'Neplatná veľkosť časti.'); }
          chunks.push(next.value);
        }
        if (size !== expected) throw new HttpError(400, 'Neúplná časť videa.');
        const bytes = new Uint8Array(size); let offset = 0;
        for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
        const part = await upload.uploadPart(number, bytes);
        return json(part);
      }
      if (match[2] === 'complete' && request.method === 'POST') {
        const { parts } = await jsonBody(request);
        if (!Array.isArray(parts) || parts.length !== Math.ceil(row.size / CHUNK_SIZE) || parts.some((part, i) => part.partNumber !== i + 1 || typeof part.etag !== 'string' || part.etag.length > 200)) throw new HttpError(400, 'Video nie je kompletné.');
        // A prior completion may have saved R2 but failed before publishing in D1.
        const object = await env.VIDEOS_BUCKET.head(row.object_key) || await upload.complete(parts);
        if (object.size !== row.size) throw new HttpError(400, 'Video nie je kompletné.');
        const videoUrl = `${url.origin}/api/stream/${row.object_key}`;
        await env.DB.batch([
          env.DB.prepare('INSERT OR IGNORE INTO videos (id, title, video_url) VALUES (?, ?, ?)').bind(id, row.title, videoUrl),
          env.DB.prepare('DELETE FROM uploads WHERE id = ?').bind(id),
        ]);
        const saved = await env.DB.prepare('SELECT id, title, video_url, created_at FROM videos WHERE id = ?').bind(id).first<VideoRow>();
        return json(video(saved!), 201);
      }
      if (!match[2] && request.method === 'DELETE') {
        await upload.abort().catch(() => undefined);
        await env.VIDEOS_BUCKET.delete(row.object_key);
        await env.DB.prepare('DELETE FROM uploads WHERE id = ?').bind(id).run();
        return json({ success: true });
      }
      throw new HttpError(405, 'Nepovolená metóda.');
    } catch (error) {
      if (error instanceof HttpError) return json({ error: error.message }, error.status);
      console.error('Video service error', error);
      return json({ error: 'Služba je nedostupná. Skúste znova.' }, 500);
    }
  },
} satisfies ExportedHandler<Env>;
