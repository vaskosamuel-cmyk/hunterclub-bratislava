import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, X, Megaphone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { activeAnnouncements, announcementText, tickerPreview, CATEGORIES } from '../services/announcements.mjs';

const words = {
  sk: { more: 'Viac info', all: 'Všetky aktuality', close: 'Zavrieť', title: 'Aktuality a oznamy', prev: 'Predchádzajúci oznam', next: 'Ďalší oznam', categories: CATEGORIES },
  en: { more: 'More info', all: 'All news', close: 'Close', title: 'News and announcements', prev: 'Previous announcement', next: 'Next announcement', categories: ['NOTICE', 'NEWS', 'ATTENTION!', 'COURSES', 'OPENING HOURS', 'NEW'] },
  de: { more: 'Mehr Infos', all: 'Alle Neuigkeiten', close: 'Schließen', title: 'Neuigkeiten und Hinweise', prev: 'Vorheriger Hinweis', next: 'Nächster Hinweis', categories: ['HINWEIS', 'AKTUELLES', 'ACHTUNG!', 'KURSE', 'ÖFFNUNGSZEITEN', 'NEU'] },
  ru: { more: 'Подробнее', all: 'Все новости', close: 'Закрыть', title: 'Новости и объявления', prev: 'Предыдущее объявление', next: 'Следующее объявление', categories: ['ОБЪЯВЛЕНИЕ', 'НОВОСТИ', 'ВНИМАНИЕ!', 'КУРСЫ', 'ЧАСЫ РАБОТЫ', 'НОВИНКА'] },
};
export default function NewsTicker() {
  const { language } = useLanguage();
  const ui = words[language] || words.sk;
  const [items, setItems] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [panel, setPanel] = useState<'all' | 'detail' | null>(null);
  const [detail, setDetail] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [clock, setClock] = useState(Date.now());
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let alive = true;
    const refresh = () => fetch('/content/aktuality.json', { cache: 'no-store' }).then(r => { if (!r.ok) throw new Error(); return r.json(); }).then(data => { if (alive) setItems(Array.isArray(data) ? data : []); }).catch(() => {});
    void refresh();
    const timer = window.setInterval(() => { setClock(Date.now()); void refresh(); }, 60000);
    const visibility = () => setHidden(document.hidden);
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const motion = () => setReduced(media.matches);
    motion(); visibility();
    media.addEventListener('change', motion); document.addEventListener('visibilitychange', visibility); window.addEventListener('focus', refresh);
    return () => { alive = false; clearInterval(timer); media.removeEventListener('change', motion); document.removeEventListener('visibilitychange', visibility); window.removeEventListener('focus', refresh); };
  }, []);
  const active = activeAnnouncements(items, new Date(clock));
  const currentIndex = index % (active.length || 1);
  const selected = active[currentIndex];
  const selectedDetail = active[detail % (active.length || 1)];
  useEffect(() => {
    if (active.length < 2 || hovered || focused || panel || reduced || hidden) return;
    const timer = window.setInterval(() => setIndex(value => (value + 1) % active.length), 5000);
    return () => clearInterval(timer);
  }, [active.length, hovered, focused, panel, reduced, hidden, language]);
  if (!selected) return null;
  const category = item => ui.categories[Math.max(0, CATEGORIES.indexOf(item.category))];
  const body = item => announcementText(item, language);
  const close = () => { setPanel(null); trigger.current?.focus(); };
  return <div className="hc-news" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocused(false); }}
    onKeyDown={event => { if (event.key === 'Escape' && panel) close(); }}>
    <style>{`
      .hc-news{background:var(--color-safety);color:#111;border-top:1px solid #0002}
      .hc-news-row{max-width:1280px;margin:auto;display:flex;align-items:center;gap:12px;padding:7px 32px;min-height:48px}
      .hc-news-message{display:flex;min-width:0;flex:1;align-items:center;gap:12px}
      .hc-news-badge{background:#151608;color:var(--color-safety);border-radius:4px;padding:4px 8px;font-size:10px;font-weight:800;white-space:nowrap;letter-spacing:.05em}
      .hc-news-preview{font-size:13px;font-weight:600;overflow:hidden;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical}
      .hc-news-actions{display:flex;align-items:center;gap:14px;flex-shrink:0;font-size:11px;font-weight:700}
      .hc-news button:focus-visible{outline:2px solid currentColor;outline-offset:3px}
      .hc-news-panel{background:#141614;color:white;box-shadow:0 22px 30px #0005;max-height:60svh;overflow:auto;border-bottom:1px solid #ffffff25}
      .hc-news-panel-inner{max-width:1000px;margin:auto;padding:24px 32px 28px}
      .hc-news-fade{animation:hc-news-in .25s ease-out}@keyframes hc-news-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
      @media(max-width:767px){.hc-news-row{padding:7px 16px;gap:8px;flex-wrap:wrap}.hc-news-message{gap:8px}.hc-news-preview{font-size:11px;-webkit-line-clamp:2}.hc-news-actions{gap:10px;font-size:10px}.hc-news-all{display:none}.hc-news-controls{width:100%;justify-content:flex-end;min-height:14px}.hc-news-panel-inner{padding:20px 16px}.hc-news-icon{display:none}}
      @media(prefers-reduced-motion:reduce){.hc-news-fade{animation:none}}
    `}</style>
    <div className="hc-news-row">
      <Megaphone size={16} className="hc-news-icon shrink-0" aria-hidden="true" />
      <div className="hc-news-message hc-news-fade" key={`${currentIndex}-${language}`}>
        <span className="hc-news-badge">{category(selected)}</span><span className="hc-news-preview">{tickerPreview(body(selected))}</span>
      </div>
      <div className="hc-news-actions">
        <button type="button" ref={trigger} onClick={() => { setDetail(currentIndex); setPanel(panel === 'detail' && detail === currentIndex ? null : 'detail'); }} aria-expanded={panel === 'detail'} aria-controls="news-panel" className="inline-flex items-center gap-1 py-1">{ui.more}<ArrowUpRight size={14} /></button>
        <button type="button" onClick={() => setPanel(panel === 'all' ? null : 'all')} aria-expanded={panel === 'all'} aria-controls="news-panel" className="hc-news-all border-l border-black/20 pl-3 py-1">{ui.all}</button>
      </div>
      {<div className="hc-news-actions hc-news-controls">
        {active.length > 1 && <>
        <button type="button" aria-label={ui.prev} onClick={() => setIndex((currentIndex - 1 + active.length) % active.length)} className="p-1"><ChevronLeft size={14} /></button>
        <span className="tabular-nums text-[10px]" aria-label={`${currentIndex + 1} / ${active.length}`}>{currentIndex + 1} / {active.length}</span>
        <button type="button" aria-label={ui.next} onClick={() => setIndex((currentIndex + 1) % active.length)} className="p-1"><ChevronRight size={14} /></button>
        </>}
        <button type="button" onClick={() => setPanel(panel === 'all' ? null : 'all')} className="md:hidden ml-2 underline underline-offset-2">{ui.all}</button>
      </div>}
    </div>
    {panel && <section id="news-panel" aria-label={ui.title} className="hc-news-panel"><div className="hc-news-panel-inner">
      <div className="mb-4 flex items-center justify-between gap-4"><h2 className="font-display text-xl tracking-wide">{panel === 'all' ? ui.title : category(selectedDetail)}</h2><button type="button" onClick={close} className="flex items-center gap-2 text-xs text-white/70">{ui.close}<X size={18} /></button></div>
      {panel === 'all' ? active.map((item, i) => <button type="button" key={`${item.date}-${i}`} onClick={() => { setDetail(i); setPanel('detail'); }} className="flex w-full items-center justify-between gap-5 border-t border-white/10 py-4 text-left hover:text-[var(--color-safety)]">
        <span><span className="mb-1 block text-[10px] font-bold tracking-widest text-[var(--color-safety)]">{category(item)}</span><span className="text-sm">{tickerPreview(body(item))}</span></span><ArrowUpRight size={18} className="shrink-0" />
      </button>) : <><p className="whitespace-pre-wrap text-sm leading-relaxed text-white/85" lang={language !== 'sk' && !selectedDetail[`body_${language}`] ? 'sk' : language}>{body(selectedDetail)}</p><button type="button" onClick={() => setPanel('all')} className="mt-5 text-xs text-[var(--color-safety)] underline underline-offset-4">{ui.all}</button></>}
    </div></section>}
  </div>;
}
