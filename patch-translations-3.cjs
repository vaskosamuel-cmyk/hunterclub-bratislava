const fs = require('fs');
let code = fs.readFileSync('src/i18n/translations.ts', 'utf8');

code = code.replace(/"step2Title": "Briefing",/g, '"step2Title": "2. Briefing",');
code = code.replace(/"step3Title": "Впечатления",/g, '"step3Title": "3. Впечатления",');

fs.writeFileSync('src/i18n/translations.ts', code);
