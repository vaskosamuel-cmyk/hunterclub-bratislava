import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import worker from '../src/index.ts';

function setup(pin = '83619472') {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('../schema.sql', import.meta.url), 'utf8'));
  const db = {
    prepare(sql) {
      let args = [];
      return {
        bind(...values) { args = values; return this; },
        async first() { return sqlite.prepare(sql).get(...args) || null; },
        async all() { return { results: sqlite.prepare(sql).all(...args) }; },
        async run() { return sqlite.prepare(sql).run(...args); },
      };
    },
    async batch(statements) { sqlite.exec('BEGIN'); try { const result = await Promise.all(statements.map(s => s.run())); sqlite.exec('COMMIT'); return result; } catch (error) { sqlite.exec('ROLLBACK'); throw error; } },
  };
  const objects = new Map(), uploads = new Map();
  const metadata = (key, value) => ({ customMetadata: value.customMetadata, size: value.bytes.length, httpEtag: '"test-etag"', writeHttpMetadata(headers) { headers.set('Content-Type', value.type); } });
  const r2 = {
    async head(key) { return objects.has(key) ? metadata(key, objects.get(key)) : null; },
    async get(key, options) {
      const value = objects.get(key); if (!value) return null;
      const bytes = options?.range ? value.bytes.slice(options.range.offset, options.range.offset + options.range.length) : value.bytes;
      return { ...metadata(key, value), body: bytes };
    },
    async createMultipartUpload(key, options) {
      const id = crypto.randomUUID(); uploads.set(id, { key, type: options.httpMetadata.contentType, customMetadata: options.customMetadata, parts: new Map() });
      return { uploadId: id, async abort() { uploads.delete(id); } };
    },
    resumeMultipartUpload(key, id) {
      return {
        async uploadPart(partNumber, bytes) { const entry = uploads.get(id); assert.ok(entry); entry.parts.set(partNumber, new Uint8Array(bytes)); return { partNumber, etag: `etag-${partNumber}` }; },
        async complete(parts) {
          const entry = uploads.get(id); assert.ok(entry);
          const bytes = Buffer.concat(parts.map(part => { assert.equal(part.etag, `etag-${part.partNumber}`); return Buffer.from(entry.parts.get(part.partNumber)); }));
          objects.set(key, { bytes, type: entry.type, customMetadata: entry.customMetadata }); uploads.delete(id); return metadata(key, objects.get(key));
        },
        async abort() { uploads.delete(id); },
      };
    },
    async delete(key) { objects.delete(key); },
  };
  const env = { DB: db, VIDEOS_BUCKET: r2, OWNER_PIN: pin, CORS_ORIGIN: 'https://hunterclub.sk' };
  const call = (path, method = 'GET', body, pinValue, extra = {}) => worker.fetch(new Request(`https://video.example${path}`, {
    method, headers: { Origin: 'https://hunterclub.sk', ...(pinValue ? { 'X-Admin-PIN': pinValue } : {}), ...extra },
    ...(body !== undefined ? { body: body instanceof Uint8Array ? body : JSON.stringify(body) } : {}),
  }), env);
  return { call, objects, uploads, sqlite };
}

test('new backend has no videos and missing secrets fail closed', async () => {
  const { call } = setup(''); assert.deepEqual(await (await call('/api/videos')).json(), []);
  assert.equal((await call('/api/uploads', 'POST', {}, '1234')).status, 503);
});
test('every upload endpoint rejects unauthenticated writes; wrong origins rejected', async () => {
  const { call } = setup();
  for (const [path, method] of [['/api/uploads','POST'], ['/api/uploads/a/parts/1','PUT'], ['/api/uploads/a/complete','POST'], ['/api/uploads/a','DELETE']]) assert.equal((await call(path, method, {}, 'bad')).status, 401);
  assert.equal((await call('/api/videos', 'GET', undefined, undefined, { Origin: 'https://evil.example' })).status, 403);
});
test('incorrect PIN is rate limited persistently', async () => {
  const { call } = setup();
  for (let i = 0; i < 10; i++) assert.equal((await call('/api/uploads','POST',{},'bad')).status, 401);
  assert.equal((await call('/api/uploads','POST',{},'bad')).status, 429);
});
test('multipart upload publishes only on completion and supports retry, range seeking and HEAD', async () => {
  const { call, objects } = setup(); const pin = '83619472';
  const size = 8 * 1024 * 1024 + 20;
  const start = await call('/api/uploads','POST',{ title: 'Skutočné video',filename:'phone.mp4',size },pin);
  assert.equal(start.status, 201); const session = await start.json();
  assert.deepEqual(await (await call('/api/videos')).json(), []);
  const first = new Uint8Array(session.chunkSize).fill(7), last = new Uint8Array(20).fill(8);
  const p1 = await (await call(`/api/uploads/${session.id}/parts/1`,'PUT',first,pin)).json();
  const p2 = await (await call(`/api/uploads/${session.id}/parts/2`,'PUT',last,pin)).json();
  const completePath = `/api/uploads/${session.id}/complete`;
  assert.equal((await call(completePath,'POST',{parts:[p1]},pin)).status, 400);
  const completed = await call(completePath,'POST',{parts:[p1,p2]},pin); assert.equal(completed.status,201);
  const record = await completed.json(); assert.equal(record.title,'Skutočné video');
  assert.equal((await call(completePath,'POST',{parts:[p1,p2]},pin)).status,200);
  assert.equal((await (await call('/api/videos')).json()).length,1);
  const path = new URL(record.videoUrl).pathname;
  const stream = await call(path,'GET',undefined,undefined,{Range:'bytes=8388608-'});
  assert.equal(stream.status,206); assert.equal(stream.headers.get('Content-Range'),`bytes 8388608-${size-1}/${size}`);
  assert.equal(new Uint8Array(await stream.arrayBuffer())[0],8);
  const suffix = await call(path,'GET',undefined,undefined,{Range:'bytes=-10'}); assert.equal(suffix.status,206); assert.equal((await suffix.arrayBuffer()).byteLength,10);
  assert.equal((await call(path,'GET',undefined,undefined,{Range:`bytes=${size}-`})).status,416);
  const head = await call(path,'HEAD'); assert.equal(head.status,200); assert.equal(head.headers.get('Content-Length'),String(size)); assert.equal(await head.text(),'');
  // A stale cleanup request cannot remove an already-published video.
  assert.equal((await call(`/api/uploads/${session.id}`,'DELETE',undefined,pin)).status,200); assert.equal(objects.size,1);
});
test('incomplete parts and invalid types rejected; abort leaves no published metadata', async () => {
  const { call, uploads } = setup(); const pin = '83619472';
  assert.equal((await call('/api/uploads','POST',{title:'X',filename:'x.exe',size:10},pin)).status,400);
  const session = await (await call('/api/uploads','POST',{title:'X',filename:'x.mov',size:10},pin)).json();
  assert.equal((await call(`/api/uploads/${session.id}/parts/1`,'PUT',new Uint8Array(9),pin)).status,400);
  assert.equal((await call(`/api/uploads/${session.id}`,'DELETE',undefined,pin)).status,200); assert.equal(uploads.size,0);
  assert.deepEqual(await (await call('/api/videos')).json(),[]);
});


test('upload metadata persists in R2 and orientation is derived rather than trusted', async () => {
 const { call } = setup(); const pin = '83619472';
 const session = await (await call('/api/uploads','POST',{title:'Landscape',filename:'wide.mp4',size:4,width:1920,height:1080,duration:12.5,orientation:'portrait'},pin)).json();
 const part = await (await call(`/api/uploads/${session.id}/parts/1`,'PUT',new Uint8Array(4),pin)).json();
 assert.equal((await call(`/api/uploads/${session.id}/complete`,'POST',{parts:[part]},pin)).status,201);
 const [video] = await (await call('/api/videos')).json();
 assert.equal(video.width,1920); assert.equal(video.height,1080); assert.equal(video.orientation,'landscape'); assert.equal(video.duration,12.5);
});
