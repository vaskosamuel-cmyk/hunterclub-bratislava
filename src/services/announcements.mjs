export const CATEGORIES = ['OZNAM', 'AKTUALITY', 'POZOR!', 'KURZY', 'OTVÁRACIE HODINY', 'NOVINKA'];
export function dateValue(value) {
  const match = String(value || '').match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  return match ? Date.UTC(+match[3], +match[2] - 1, +match[1]) : Date.parse(value) || 0;
}
export function activeAnnouncements(items, now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Bratislava', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const part = name => parts.find(p => p.type === name)?.value;
  const today = `${part('year')}-${part('month')}-${part('day')}`;
  return (Array.isArray(items) ? items : []).filter(item => {
    if (!item || item.active === false || item.visible === false || typeof item.body !== 'string' || !item.body.trim()) return false;
    const expires = item.expires || item.expiration_date;
    if (!expires) return true;
    const local = String(expires).match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
    const day = local ? `${local[3]}-${local[2].padStart(2, '0')}-${local[1].padStart(2, '0')}` : String(expires);
    if (/^\d{4}-\d{2}-\d{2}$/.test(day)) return day >= today;
    return Number.isFinite(Date.parse(day)) && Date.parse(day) >= now.getTime();
  }).sort((a, b) => (Number(b.priority) || 0) - (Number(a.priority) || 0) || dateValue(b.date) - dateValue(a.date));
}
export function tickerPreview(body) {
  const text = String(body || '').replace(/\s+/g, ' ').trim();
  // Protect addresses, titles, initials, dates, decimal numbers and common abbreviations.
  const dot = '\uE000';
  const protectedText = text
    .replace(/(?<![\p{L}\p{N}])(?:nám|napr|resp|atď|tzv|tel|hod|č|ul|str|Ing|Mgr|Dr|Mr|Mrs|Ms|Prof|St|z\.\s?B|bzw|ca|Nr|ул|г|т\.\s?д)\./giu, value => value.replaceAll('.', dot))
    .replace(/(\d)\.(?=\s*\d)/g, `$1${dot}`)
    .replace(/(\d)\.(?=\s+\p{Ll})/gu, `$1${dot}`)
    .replace(/\b(\p{Lu})\.(?=\s+\p{Lu}\.)/gu, `$1${dot}`);
  const first = (protectedText.match(/^.*?[.!?]+(?=\s|$)/u)?.[0] || protectedText).replaceAll(dot, '.');
  const words = first.split(/\s+/).filter(Boolean);
  return words.length > 10 ? `${words.slice(0, 10).join(' ').replace(/[,;:.!?]+$/, '')}…` : first;
}
export function announcementText(item, language) {
  return language === 'sk' ? item.body : item[`body_${language}`] || item.body;
}
