import { VIDEO_POSTERS } from '../constants/videoPosters';
const film = { id: 'club-film', title: 'Hunter Club Bratislava', videoUrl: '/videos/hunterclub.mp4' };
export default function ClubFilm() {
  const preview = VIDEO_POSTERS[film.id];
  return <section aria-label="Hunter Club Bratislava – video" className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
    <div className="mx-auto overflow-hidden rounded-2xl border border-white/20 bg-[#0b0b0b] shadow-2xl" style={{ maxWidth: preview.ratio < 1 ? '440px' : '100%' }}>
      <video src={film.videoUrl} poster={preview.url} controls playsInline preload="none" aria-label={film.title} className="block max-h-[75svh] w-full object-contain" style={{ aspectRatio: preview.ratio }} />
    </div>
  </section>;
}
