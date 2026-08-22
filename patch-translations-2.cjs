const fs = require('fs');
let code = fs.readFileSync('src/i18n/translations.ts', 'utf8');

code = code.replace(/"step2Title": "Einweisung",/g, '"step2Title": "2. Einweisung",');

fs.writeFileSync('src/i18n/translations.ts', code);
