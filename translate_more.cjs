const fs = require('fs');

const content = fs.readFileSync('src/i18n/translations.ts', 'utf8');

const startEn = content.indexOf('  en: {');
const endEn = content.indexOf('  ru: {');
const enContent = content.slice(startEn, endEn);

const startRu = content.indexOf('  ru: {');
const endRu = content.lastIndexOf('};');
const ruContent = content.slice(startRu, endRu);

fs.writeFileSync('en.txt', enContent);
fs.writeFileSync('ru.txt', ruContent);
