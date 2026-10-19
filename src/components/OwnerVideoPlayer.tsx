import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { fetchVideos, VideoItem } from '../services/videoService';

interface Preview { url?: string; ratio: number }
const previews = new Map<string, Promise<Preview>>();
// Capture a real frame for existing uploads too; no new upload or backend migration is needed.
function getPreview(item: VideoItem): Promise<Preview> {
  if (!previews.has(item.videoUrl)) previews.set(item.videoUrl, new Promise(resolve => {
    const media = document.createElement('video');
    media.crossOrigin = 'anonymous'; media.muted = true; media.playsInline = true; media.preload = 'auto';
    let ratio = 9 / 16, settled = false;
    const finish = (url?: string) => {
      if (settled) return; settled = true; clearTimeout(timeout);
      media.onloadedmetadata = media.onloadeddata = media.onseeked = media.onerror = null;
      media.removeAttribute('src'); media.load(); resolve({ url: item.posterUrl || url, ratio });
    };
    const capture = () => {
      if (!media.videoWidth || media.readyState < 2) return;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = Math.min(640, media.videoWidth); canvas.height = Math.round(canvas.width / ratio);
        canvas.getContext('2d')!.drawImage(media, 0, 0, canvas.width, canvas.height);
        finish(canvas.toDataURL('image/jpeg', 0.8));
      } catch { finish(); }
    };
    const timeout = window.setTimeout(() => finish(), 15000);
    media.onloadedmetadata = () => {
      ratio = media.videoWidth / media.videoHeight || ratio;
      media.currentTime = Math.min(1, Number.isFinite(media.duration) ? media.duration / 3 : 0.1);
    };
    media.onseeked = capture;
    media.onloadeddata = () => { if (media.currentTime === 0) capture(); };
    media.onerror = () => finish(); media.src = item.videoUrl; media.load();
  }));
  return previews.get(item.videoUrl)!;
}
function usePreview(item?: VideoItem) {
  const [result, setResult] = useState<Preview>({ ratio: 9 / 16 });
  useEffect(() => {
    let active = true; setResult({ url: item?.posterUrl, ratio: 9 / 16 });
    if (item) void getPreview(item).then(value => { if (active) setResult(value); });
    return () => { active = false; };
  }, [item?.videoUrl, item?.posterUrl]);
  return result;
}
function VideoChoice({ item, selected, onClick }: { item: VideoItem; selected: boolean; onClick: () => void }) {
  const preview = usePreview(item);
  return <button type="button" onClick={onClick} aria-label={item.title} aria-pressed={selected}
    className={`hc-video-choice group shrink-0 overflow-hidden rounded-lg border text-left transition-colors ${selected ? 'border-[var(--color-safety)] bg-white/10' : 'border-white/15 hover:border-white/50'}`}>
    <div className="relative aspect-video overflow-hidden bg-white/5">
      {preview.url ? <img src={preview.url} alt="" className="h-full w-full object-cover" /> : <video src={`${item.videoUrl}#t=0.1`} muted playsInline preload="metadata" aria-hidden="true" className="h-full w-full object-cover" />}
      <span className="absolute inset-0 flex items-center justify-center bg-black/10"><Play size={18} fill="currentColor" className="text-white drop-shadow-lg" /></span>
    </div>
    <span className="block truncate px-2 py-1.5 text-[11px] leading-tight text-white">{item.title}</span>
  </button>;
}
export default function OwnerVideoPlayer({ className = '' }: { className?: string }) {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [failed, setFailed] = useState(false);
  const [ratio, setRatio] = useState(9 / 16);
  useEffect(() => {
    let active = true;
    const refresh = () => fetchVideos().then(items => { if (active) setVideos(items); }).catch(() => {});
    void refresh(); window.addEventListener('focus', refresh); window.addEventListener('hunterclub_videos_updated', refresh);
    return () => { active = false; window.removeEventListener('focus', refresh); window.removeEventListener('hunterclub_videos_updated', refresh); };
  }, []);
  const current = videos.find(item => item.id === selectedId) || videos[0];
  const preview = usePreview(current);
  useEffect(() => { setFailed(false); setRatio(preview.ratio); }, [current?.id, preview.ratio]);
  return <div className={`hc-video-layout w-full ${className}`}>
    <style>{`
      .hc-video-layout{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;max-width:720px;margin:auto}
      .hc-video-stage{width:min(100%,calc(30svh * var(--video-ratio)));aspect-ratio:var(--video-ratio);margin:auto;background:#080808;overflow:hidden;border-radius:12px;border:1px solid #ffffff24}
      .hc-video-choices{display:flex;gap:8px;overflow-x:auto;padding:2px 2px 6px;scroll-snap-type:x proximity;max-width:100%}
      .hc-video-choice{width:88px;scroll-snap-align:start}
      @media(min-width:1024px){.hc-video-layout:has(.hc-video-choices){grid-template-columns:minmax(0,1fr) 104px;align-items:center}.hc-video-stage{width:min(100%,calc(62svh * var(--video-ratio)))}.hc-video-choices{flex-direction:column;max-height:62svh;overflow-y:auto;overflow-x:hidden;padding:2px 5px 2px 2px}.hc-video-choice{width:96px}}
    `}</style>
    <div className="min-w-0">
      <div className="hc-video-stage" style={{ '--video-ratio': ratio } as React.CSSProperties} aria-label={current?.title || 'Video'}>
        {current && <video key={current.id} src={current.videoUrl} poster={preview.url || current.posterUrl} controls playsInline preload="auto"
          onLoadedMetadata={event => { const v = event.currentTarget; if (v.videoWidth && v.videoHeight) setRatio(v.videoWidth / v.videoHeight); }}
          onError={() => setFailed(true)} aria-label={current.title} className="h-full w-full object-contain" />}
      </div>
      {current && <p className="mt-2 text-center text-xs leading-tight text-white/80">{current.title}</p>}
      {failed && <p role="alert" className="mt-2 text-center text-xs text-red-300">Video sa nepodarilo prehrať.</p>}
    </div>
    {videos.length > 1 && <div className="hc-video-choices" role="group" aria-label="Výber videa">
      {videos.map(item => <div key={item.id} className="shrink-0"><VideoChoice item={item} selected={item.id === current?.id} onClick={() => setSelectedId(item.id)} /></div>)}
    </div>}
  </div>;
}
