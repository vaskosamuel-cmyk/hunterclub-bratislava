import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchVideos, VideoItem } from '../services/videoService';

interface Props {
  variant?: 'hero-desktop' | 'section-mobile' | 'auto';
  className?: string;
}

export default function OwnerVideoPlayer({ variant = 'auto', className = '' }: Props) {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    const refresh = () => fetchVideos().then(items => {
      if (active) { setVideos(items); setIndex(i => Math.min(i, Math.max(0, items.length - 1))); }
    }).catch(() => { /* Keep the player empty until the service is available. */ });
    void refresh();
    window.addEventListener('focus', refresh);
    window.addEventListener('hunterclub_videos_updated', refresh);
    return () => { active = false; window.removeEventListener('focus', refresh); window.removeEventListener('hunterclub_videos_updated', refresh); };
  }, []);
  const current = videos[index];
  useEffect(() => setFailed(false), [current?.id]);
  const visibility = variant === 'hero-desktop' ? 'hidden lg:block' : variant === 'section-mobile' ? 'lg:hidden mx-auto mt-8 mb-8' : 'mx-auto';
  return (
    <div className={`${visibility} w-full max-w-[360px] xl:max-w-[380px] ${className}`}>
      <div className="aspect-[9/16] w-full overflow-hidden rounded-xl border border-white/10 bg-black/90 shadow-2xl" aria-label={current?.title || 'Video'}>
        {current && <video key={current.id} src={current.videoUrl} poster={current.posterUrl} controls playsInline preload="metadata" aria-label={current.title} onError={() => setFailed(true)} className="h-full w-full object-contain" />}
      </div>
      {failed && <p role="alert" className="mt-3 text-center text-sm text-white/70">Video sa nepodarilo prehrať.</p>}
      {current && <div className="mt-4 flex items-center justify-between gap-4 text-white">
        {videos.length > 1 && <button type="button" onClick={() => setIndex(i => (i - 1 + videos.length) % videos.length)} aria-label="Predchádzajúce video" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"><ChevronLeft size={20} /></button>}
        <p className="min-w-0 flex-1 break-words text-center text-sm">{current.title}</p>
        {videos.length > 1 && <button type="button" onClick={() => setIndex(i => (i + 1) % videos.length)} aria-label="Ďalšie video" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"><ChevronRight size={20} /></button>}
      </div>}
    </div>
  );
}
