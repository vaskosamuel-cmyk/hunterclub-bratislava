const fs = require('fs');

const en = fs.readFileSync('src/i18n/translations.ts', 'utf8');

const executeEn = new Function('module', 'exports', 'return {' + en.slice(en.indexOf('nav:'), en.lastIndexOf('}  },')) + '}');

const fakeModule = { exports: {} };
const enObj = executeEn(fakeModule, fakeModule.exports);
fs.writeFileSync('en_cennik.json', JSON.stringify({ cennik: enObj.cennik, pricing: enObj.pricing }, null, 2));
