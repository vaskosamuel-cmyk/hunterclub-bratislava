import React, { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { publishVideo, MAX_VIDEO_SIZE } from '../services/videoService';

export default function Upload() {
  const input = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [pin, setPin] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (!busy) return;
    const prevent = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', prevent);
    return () => window.removeEventListener('beforeunload', prevent);
  }, [busy]);
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!file || busy) return;
    setBusy(true); setError(''); setSuccess(false); setProgress(0);
    try {
      await publishVideo(file, title.trim(), pin, setProgress);
      setFile(null); setTitle(''); setPin(''); setSuccess(true);
      if (input.current) input.current.value = '';
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Nahrávanie zlyhalo. Skúste znova.');
    } finally { setBusy(false); }
  }
  const field = 'w-full rounded-lg border border-white/20 bg-transparent px-4 py-3.5 text-base text-white outline-none focus:border-[var(--color-safety)] disabled:opacity-50';
  return <main className="grid min-h-[100svh] place-items-center bg-[#101110] px-6 py-12 text-white">
    <form onSubmit={submit} aria-busy={busy} className="w-full max-w-sm space-y-5">
      <a href="/" className="mb-8 block text-center font-display text-xl tracking-widest">HUNTER CLUB</a>
      <input ref={input} aria-label="Vybrať video" type="file" accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.m4v,.webm" className="sr-only" tabIndex={-1} disabled={busy} onChange={event => {
        const selected = event.target.files?.[0];
        setError(''); setSuccess(false);
        if (!selected) return;
        if (!/\.(mp4|mov|m4v|webm)$/i.test(selected.name) || !selected.size || selected.size > MAX_VIDEO_SIZE) {
          setError('Vyberte video MP4, MOV alebo WebM do 2 GB.'); event.target.value = ''; setFile(null); return;
        }
        setFile(selected);
      }} />
      <button type="button" disabled={busy} onClick={() => input.current?.click()} className="flex min-h-28 w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-white/30 px-5 py-6 text-sm hover:border-white/70 disabled:opacity-50">
        <Plus size={24} aria-hidden="true" /><span className="max-w-full break-all">{file ? file.name : 'Pridať video'}</span>
      </button>
      <div className="space-y-2"><label htmlFor="title" className="text-sm text-white/70">Názov videa</label><input id="title" className={field} value={title} onChange={e => setTitle(e.target.value)} maxLength={120} required disabled={busy} /></div>
      <div className="space-y-2"><label htmlFor="pin" className="text-sm text-white/70">PIN</label><input id="pin" className={field} type="password" inputMode="numeric" autoComplete="off" value={pin} onChange={e => setPin(e.target.value)} maxLength={64} required disabled={busy} /></div>
      <button type="submit" disabled={busy || !file || !title.trim() || !pin.trim()} className="min-h-12 w-full rounded-lg bg-[var(--color-safety)] px-4 py-3.5 text-base font-semibold text-black disabled:opacity-40">{busy ? `Nahrávam ${progress} %` : 'Nahrať video'}</button>
      {busy && <progress aria-label="Priebeh nahrávania" value={progress} max={100} className="w-full accent-[var(--color-safety)]" />}
      {error && <p role="alert" className="text-center text-sm text-red-300">{error}</p>}
      {success && <p role="status" className="text-center text-sm text-green-300">Video je zverejnené.</p>}
    </form>
  </main>;
}
