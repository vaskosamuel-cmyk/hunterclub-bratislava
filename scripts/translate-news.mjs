import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

// Run only during publication/build, never for each visitor. No browser API keys.
export async function translateNews() {
  const contentPath = path.resolve('public/content/aktuality.json');
  const seedPath = path.resolve('scripts/news-translation-cache.json');
  const cachePath = path.resolve('node_modules/.cache/hunterclub-news/translations.json');
  const read = file => { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return {}; } };
  const cache = { ...read(seedPath), ...read(cachePath) };
  const items = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  let failures = 0;
  for (const item of items) {
    if (!item.body?.trim()) continue;
    for (const language of ['en', 'de', 'ru']) {
      // Legacy translations are seeded by source-text hash. Editing Slovak text
      // invalidates them instead of silently reusing a stale hidden CMS value.
      delete item[`body_${language}`];
      const key = createHash('sha256').update(`sk|${language}|${item.body}`).digest('hex');
      // Opt-in only: enable after the owner authorizes this translation provider.
      if (!cache[key] && process.env.NEWS_TRANSLATION_PROVIDER === 'mymemory') {
        try {
          const chunks = [];
          let chunk = '';
          for (const word of item.body.split(/\s+/)) {
            if (Buffer.byteLength(word) > 450) throw new Error('Announcement contains an oversized word');
            const next = chunk ? `${chunk} ${word}` : word;
            if (Buffer.byteLength(next) > 450) { chunks.push(chunk); chunk = word; } else chunk = next;
          }
          if (chunk) chunks.push(chunk);
          const translated = [];
          for (const q of chunks) {
            const url = new URL('https://api.mymemory.translated.net/get');
            url.searchParams.set('q', q); url.searchParams.set('langpair', `sk|${language}`);
            const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
            const result = await response.json();
            if (!response.ok || Number(result.responseStatus) !== 200 || result.quotaFinished || !result.responseData?.translatedText) throw new Error('Translation unavailable or quota reached');
            const text = result.responseData.translatedText;
            if (/MYMEMORY WARNING|QUERY LENGTH LIMIT|PLEASE SELECT TWO DISTINCT/i.test(text)) throw new Error('Translation unavailable');
            translated.push(text);
          }
          cache[key] = translated.join(' ').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, '&');
        } catch { failures++; }
      }
      if (cache[key]) item[`body_${language}`] = cache[key];
    }
  }
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
  fs.writeFileSync(contentPath, JSON.stringify(items, null, 2));
  if (failures) console.warn(`News: ${failures} translations unavailable; original Slovak text will be shown for those languages.`);
  console.log('News translations prepared.');
}
