import test from 'node:test';
import assert from 'node:assert/strict';
import { tickerPreview, activeAnnouncements, announcementText } from '../src/services/announcements.mjs';
test('preview protects addresses, dates, decimals and never edits full text', () => {
 const text = 'Nájdete nás na nám. SNP č. 1. Ďalší text.';
 assert.equal(tickerPreview(text), 'Nájdete nás na nám. SNP č. 1.');
 assert.equal(text, 'Nájdete nás na nám. SNP č. 1. Ďalší text.');
 assert.equal(tickerPreview('Kurz je 19. 10. 2026 o 10.30 hod. Príďte.'), 'Kurz je 19. 10. 2026 o 10.30 hod. Príďte.');
 assert.equal(tickerPreview('Cena je 12.50 EUR. Ďalšia veta.'), 'Cena je 12.50 EUR.');
 assert.equal(tickerPreview('Prvá druhá tretia štvrtá piata šiesta siedma ôsma deviata desiata jedenásta'), 'Prvá druhá tretia štvrtá piata šiesta siedma ôsma deviata desiata…');
 assert.equal(tickerPreview('Vstup na 2. poschodí. Druhá veta.'), 'Vstup na 2. poschodí.');
});
test('filters empty, disabled and expired entries, using Bratislava end of day', () => {
 const items = [{body:'legacy',date:'01.10.2026'}, {body:'expired',expires:'2026-10-18'}, {body:'today',expires:'2026-10-19',date:'19.10.2026'}, {body:'off',active:false}, {body:'   '}];
 assert.deepEqual(activeAnnouncements(items, new Date('2026-10-19T21:59:00Z')).map(i=>i.body), ['today','legacy']);
 assert.deepEqual(activeAnnouncements(items, new Date('2026-10-19T22:01:00Z')).map(i=>i.body), ['legacy']);
 assert.deepEqual(activeAnnouncements(null), []);
});
test('translation fallback retains original announcement', () => {
 const item = {body:'Slovensky',body_en:'English'};
 assert.equal(announcementText(item,'en'),'English');
 assert.equal(announcementText(item,'de'),'Slovensky');
 assert.equal(announcementText(item,'sk'),'Slovensky');
});
