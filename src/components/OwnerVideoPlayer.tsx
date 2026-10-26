import React, { useEffect, useRef, useState } from 'react';
import { VIDEO_POSTERS } from '../constants/videoPosters';
import { Play } from 'lucide-react';
import { fetchVideos, selectHeroVideos, VideoItem } from '../services/videoService';

interface Preview { url?: string; ratio: number; duration?: number }
const previews = new Map<string, Promise<Preview>>();
// Capture a real frame for existing uploads too; no new upload or backend migration is needed.
function getPreview(item: VideoItem): Promise<Preview> {
  const fixed = VIDEO_POSTERS[item.id];
  if (fixed) return Promise.resolve(fixed);
  if (item.posterUrl && item.width && item.height) return Promise.resolve({ url: item.posterUrl, ratio: item.width / item.height, duration: item.duration });
  try {
    const cached = sessionStorage.getItem(`hc-preview:${item.videoUrl}`);
    if (cached) return Promise.resolve(JSON.parse(cached));
  } catch { /* Preview caching is optional. */ }
  if (!previews.has(item.videoUrl)) previews.set(item.videoUrl, new Promise(resolve => {
    const media = document.createElement('video');
    media.crossOrigin = 'anonymous'; media.muted = true; media.playsInline = true; media.preload = 'auto';
    let ratio = item.width && item.height ? item.width / item.height : 9 / 16, duration = item.duration, settled = false;
    const finish = (url?: string) => {
      if (settled) return; settled = true; clearTimeout(timeout);
      media.onloadedmetadata = media.onloadeddata = media.onseeked = media.onerror = null;
      media.removeAttribute('src'); media.load();
      const preview = { url: item.posterUrl || url, ratio, duration };
      if (preview.url) try { sessionStorage.setItem(`hc-preview:${item.videoUrl}`, JSON.stringify(preview)); } catch { /* Storage can be full. */ }
      resolve(preview);
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
      duration = Number.isFinite(media.duration) ? media.duration : undefined;
      media.currentTime = Math.min(1, Number.isFinite(media.duration) ? media.duration / 3 : 0.1);
    };
    media.onseeked = capture;
    media.onloadeddata = () => { if (media.currentTime === 0) capture(); };
    media.onerror = () => finish(); media.src = item.videoUrl; media.load();
  }));
  return previews.get(item.videoUrl)!;
}
export function usePreview(item?: VideoItem) {
  const [result, setResult] = useState<Preview>(() => item && VIDEO_POSTERS[item.id] || { url: item?.posterUrl, ratio: item?.width && item.height ? item.width / item.height : 9 / 16 });
  useEffect(() => {
    let active = true; setResult(item && VIDEO_POSTERS[item.id] || { url: item?.posterUrl, ratio: item?.width && item.height ? item.width / item.height : 9 / 16 });
    if (item) void getPreview(item).then(value => { if (active) setResult(value); });
    return () => { active = false; };
  }, [item?.videoUrl, item?.posterUrl]);
  return result;
}
function durationLabel(value?: number) {
  return value && Number.isFinite(value) ? `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}` : '';
}
function VideoChoice({ item, selected, onClick }: { item: VideoItem; selected: boolean; onClick: () => void }) {
  const preview = usePreview(item);
  return <button type="button" onClick={onClick} aria-label={item.title} aria-pressed={selected}
    className={`hc-video-choice group ${selected ? 'is-selected' : ''}`}>
    <span className="hc-choice-media">
    {preview.url ? <img src={preview.url} alt="" /> : <span aria-hidden="true" />}
    <span className="hc-choice-shade" />
    <span className="hc-choice-play"><Play size={17} fill="currentColor" /></span>
    <span className="hc-choice-duration">{durationLabel(preview.duration || item.duration)}</span>
    </span>
    <span className="hc-choice-title">{item.title}</span>
  </button>;
}
export default function OwnerVideoPlayer({ className = '' }: { className?: string }) {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(true);
  const player = useRef<HTMLVideoElement>(null);
  const newestId = useRef<string>();
  useEffect(() => {
    let active = true;
    const refresh = () => fetchVideos().then(items => {
      if (!active) return;
      const latest = selectHeroVideos(items).videos;
      // A newly published video becomes the main video on refresh/focus too.
      if (newestId.current !== latest[0]?.id) {
        newestId.current = latest[0]?.id;
        setSelectedId(latest[0]?.id);
      }
      setVideos(latest);
    }).catch(() => {});
    void refresh(); window.addEventListener('focus', refresh); window.addEventListener('hunterclub_videos_updated', refresh);
    return () => { active = false; window.removeEventListener('focus', refresh); window.removeEventListener('hunterclub_videos_updated', refresh); };
  }, []);
  const { current, choices } = selectHeroVideos(videos, selectedId);
  const preview = usePreview(current);
  useEffect(() => { setFailed(false); setPaused(true); }, [current?.id]);
  return <div className={`hc-video-layout w-full ${className}`}>
    <style>{`
      .hc-video-layout{--hc-player-width:min(100%,101.4vw,364px);display:grid;grid-template-columns:minmax(0,1fr);gap:12px;max-width:720px;margin:auto}
      .hc-video-stage{position:relative;width:var(--hc-player-width);aspect-ratio:9/16;margin:auto;background:#0b0b0b;overflow:hidden;border-radius:18px;border:1px solid #ffffff55;box-shadow:0 16px 48px #0006}
      .hc-video-stage>video{position:relative;width:100%;height:100%;object-fit:contain;z-index:1}
      .hc-video-blur{position:absolute;inset:-24px;background-size:cover;background-position:center;filter:blur(24px);opacity:.24;pointer-events:none}
      .hc-video-caption{width:var(--hc-player-width);margin:10px auto 0;color:white;font-size:14px;font-weight:600;line-height:1.4;overflow-wrap:anywhere}
      .hc-video-start{position:absolute;z-index:3;top:50%;left:50%;transform:translate(-50%,-50%);width:64px;height:64px;border-radius:50%;border:1px solid #ffffffb3;background:#10111066;display:grid;place-items:center;color:white;box-shadow:0 4px 30px #0005}
      .hc-video-start:hover{background:#10111099}.hc-video-start:focus-visible,.hc-video-choice:focus-visible{outline:3px solid var(--color-safety);outline-offset:4px}
      .hc-video-choices{display:flex;gap:10px;overflow-x:auto;padding:3px 3px 8px;scroll-snap-type:x proximity;max-width:100%;justify-content:flex-start}
      .hc-video-choice{position:relative;display:block;width:124px;overflow:hidden;border-radius:10px;border:1px solid #ffffff40;background:#131513;text-align:left;scroll-snap-align:start;transition:border-color .2s,box-shadow .2s}
      .hc-video-choice.is-selected{border:2px solid var(--color-safety);box-shadow:0 0 0 1px #fbc40522}.hc-video-choice:hover{border-color:var(--color-safety)}
      .hc-choice-media{position:relative;display:block;aspect-ratio:16/9;overflow:hidden}.hc-choice-media>img,.hc-choice-media>video{width:100%;height:100%;object-fit:cover}
      .hc-choice-shade{position:absolute;inset:0;background:linear-gradient(transparent 45%,#0007)}
      .hc-choice-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);color:white;filter:drop-shadow(0 2px 5px #000)}
      .is-selected .hc-choice-play{color:var(--color-safety)}
      .hc-choice-title{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;padding:9px 10px;font-size:12px;line-height:1.35;font-weight:600;color:white;overflow-wrap:anywhere}
      .hc-choice-duration{position:absolute;bottom:8px;right:7px;font-size:10px;color:#fff9;font-variant-numeric:tabular-nums}
      @media(max-width:767px) and (max-height:850px){.hc-video-layout{--hc-player-width:min(100%,101.4vw,364px,calc(55.9svh * 9 / 16))}}
      @media(min-width:768px){.hc-video-layout{--hc-player-width:min(360px,calc(64svh * 9 / 16))}.hc-video-choice{width:160px}}
      @media(min-width:1024px){.hc-video-layout:has(.hc-video-choices){grid-template-columns:minmax(0,1fr) clamp(128px,13vw,220px);gap:18px;align-items:start}.hc-video-layout{--hc-player-width:min(100%,380px,calc(70svh * 9 / 16))}.hc-video-choices{flex-direction:column;gap:14px;max-height:70svh;overflow-y:auto;overflow-x:hidden;padding:3px 3px 6px}.hc-video-choice{width:100%}}
      @media(prefers-reduced-motion:reduce){.hc-video-choice{transition:none}}
    `}</style>
    <div className="min-w-0">
      <div className="hc-video-stage" aria-label={current?.title || 'Video'}>
        {preview.url && preview.ratio >= 1 && <div className="hc-video-blur" style={{ backgroundImage: `url("${preview.url}")` }} />}
        {current && <video ref={player} key={current.id} src={current.videoUrl} poster={preview.url || current.posterUrl} controls playsInline preload="none"
          onPlay={() => setPaused(false)} onPause={() => setPaused(true)} onEnded={() => setPaused(true)}
          onError={() => setFailed(true)} aria-label={current.title} />}
        {current && paused && !failed && <button type="button" className="hc-video-start" aria-label={`Prehrať: ${current.title}`} onClick={() => { void player.current?.play().catch(() => setFailed(true)); }}><Play size={28} fill="currentColor" className="ml-1" /></button>}
      </div>
      {current && <p className="hc-video-caption">{current.title}</p>}
      {failed && <p role="alert" className="mt-2 text-center text-xs text-red-300">Video sa nepodarilo prehrať.</p>}
    </div>
    {choices.length > 0 && <div className="hc-video-choices" role="group" aria-label="Výber videa">
      {choices.map(item => <div key={item.id} className="shrink-0"><VideoChoice item={item} selected={false} onClick={() => setSelectedId(item.id)} /></div>)}
    </div>}
  </div>;
}
