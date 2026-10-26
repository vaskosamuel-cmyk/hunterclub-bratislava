import test from 'node:test';
import assert from 'node:assert/strict';
import { languagePath, LANGUAGES } from '../src/utils/languagePath.ts';
for (const from of LANGUAGES) for (const to of LANGUAGES) {
  test(`${from} → ${to} keeps subpages, queries and anchors`, () => {
    for (const page of ['kontakt','strelecke-balicky','cennik','kurzy','takticky-vycvik','sportovy-klub-hdi','action','upload']) {
      assert.equal(languagePath(`/${from}/${page}`, to, '?tab=2', '#details'), `/${to}/${page}?tab=2#details`);
    }
    assert.equal(languagePath(`/${from}`, to), `/${to}`);
  });
}
test('unprefixed URLs receive exactly one language segment', () => {
  assert.equal(languagePath('/kontakt', 'ru', '?a=1', '#map'), '/ru/kontakt?a=1#map');
  assert.equal(languagePath('/', 'en'), '/en');
});
