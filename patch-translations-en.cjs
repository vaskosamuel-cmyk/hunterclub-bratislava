const fs = require('fs');
let code = fs.readFileSync('src/i18n/translations.ts', 'utf8');
code = code.replace(/"step3Title": "The Shooting Itself",/g, '"step3Title": "3. The Shooting Itself",');
fs.writeFileSync('src/i18n/translations.ts', code);
