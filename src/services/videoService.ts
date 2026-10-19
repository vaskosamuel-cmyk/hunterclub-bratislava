export interface VideoItem {
  id: string;
  title: string;
  videoUrl: string;
  posterUrl?: string;
  createdAt?: string;
  width?: number;
  height?: number;
  duration?: number;
  orientation?: 'portrait' | 'landscape' | 'square';
}
export const MAX_VIDEO_SIZE = 2 * 1024 * 1024 * 1024;
export function selectHeroVideos(items: VideoItem[], selectedId?: string) {
  const videos = [...items].sort((a, b) => (Date.parse(b.createdAt || '') || 0) - (Date.parse(a.createdAt || '') || 0)).slice(0, 5);
  const current = videos.find(item => item.id === selectedId) || videos[0];
  return { videos, current, choices: videos.filter(item => item.id !== current?.id) };
}
async function readVideoMetadata(file: File): Promise<Partial<VideoItem>> {
  return new Promise(resolve => {
    const url = URL.createObjectURL(file);
    const media = document.createElement('video');
    const finish = (data: Partial<VideoItem> = {}) => {
      clearTimeout(timer); media.onloadedmetadata = media.onerror = null;
      media.removeAttribute('src'); media.load(); URL.revokeObjectURL(url); resolve(data);
    };
    const timer = window.setTimeout(() => finish(), 15000);
    media.preload = 'metadata';
    media.onloadedmetadata = () => {
      const width = media.videoWidth, height = media.videoHeight;
      finish(width && height ? { width, height, duration: Number.isFinite(media.duration) ? media.duration : undefined, orientation: width === height ? 'square' : width > height ? 'landscape' : 'portrait' } : {});
    };
    media.onerror = () => finish(); media.src = url;
  });
}
const API_BASE = ((import.meta as any).env?.VITE_API_BASE_URL || 'https://hunterclub-video-backend.vasko-samuel.workers.dev').replace(/\/$/, '');

function base() {
  if (!API_BASE) throw new Error('Nahrávanie ešte nie je pripojené. Skúste to neskôr.');
  return API_BASE;
}
async function checked(response: Response) {
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.error || 'Služba je nedostupná. Skúste znova.');
  if (!data) throw new Error('Neplatná odpoveď servera.');
  return data;
}
export async function fetchVideos(): Promise<VideoItem[]> {
  // Discard demo videos and obsolete PINs saved by the old implementation.
  try { localStorage.removeItem('hunterclub_owner_videos'); sessionStorage.removeItem('hunterclub_owner_auth_pin'); } catch { /* Storage may be disabled. */ }
  if (!API_BASE) return [];
  const data = await checked(await fetch(`${base()}/api/videos`, { cache: 'no-store' }));
  if (!Array.isArray(data)) throw new Error('Neplatný zoznam videí.');
  return data;
}
async function retry<T>(operation: () => Promise<T>): Promise<T> {
  try { return await operation(); } catch { return operation(); }
}
function uploadPart(url: string, chunk: Blob, pin: string, onProgress: (bytes: number) => void): Promise<{ partNumber: number; etag: string }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.timeout = 300000;
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader('X-Admin-PIN', pin);
    xhr.upload.onprogress = event => { if (event.lengthComputable) onProgress(event.loaded); };
    xhr.onload = () => {
      let data: any;
      try { data = JSON.parse(xhr.responseText); } catch { reject(new Error('Nahrávanie zlyhalo. Skúste znova.')); return; }
      if (xhr.status >= 200 && xhr.status < 300 && data.etag) resolve(data);
      else reject(new Error(data.error || 'Nahrávanie zlyhalo. Skúste znova.'));
    };
    xhr.onerror = xhr.ontimeout = () => reject(new Error('Spojenie sa prerušilo. Skúste znova.'));
    xhr.send(chunk);
  });
}
export async function publishVideo(file: File, title: string, pin: string, onProgress: (percent: number) => void): Promise<VideoItem> {
  if (!title || title.length > 120 || !file.size || file.size > MAX_VIDEO_SIZE) throw new Error('Skontrolujte názov a veľkosť videa.');
  const headers = { 'Content-Type': 'application/json', 'X-Admin-PIN': pin };
  const metadata = await readVideoMetadata(file);
  const session = await checked(await fetch(`${base()}/api/uploads`, {
    method: 'POST', headers, body: JSON.stringify({ title, filename: file.name, contentType: file.type, size: file.size, ...metadata }),
  }));
  const endpoint = `${base()}/api/uploads/${session.id}`;
  const parts: { partNumber: number; etag: string }[] = [];
  try {
    for (let start = 0; start < file.size; start += session.chunkSize) {
      const chunk = file.slice(start, Math.min(start + session.chunkSize, file.size));
      const partNumber = parts.length + 1;
      const part = await retry(() => uploadPart(`${endpoint}/parts/${partNumber}`, chunk, pin, bytes => onProgress(Math.min(99, Math.floor((start + bytes) / file.size * 100)))));
      parts.push(part);
    }
    // Completion also publishes metadata; retry safely if the response is lost.
    const video = await retry(async () => checked(await fetch(`${endpoint}/complete`, { method: 'POST', headers, body: JSON.stringify({ parts }) })));
    onProgress(100);
    window.dispatchEvent(new Event('hunterclub_videos_updated'));
    return video;
  } catch (error) {
    await fetch(endpoint, { method: 'DELETE', headers }).catch(() => undefined);
    throw error;
  }
}
