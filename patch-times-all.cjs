const fs = require('fs');
let code = fs.readFileSync('src/i18n/translations.ts', 'utf8');

// Replace all 9:00 - 21:00 and similar variations
code = code.replace(/09:00 - 21:00/g, '10:00 - 19:00');
code = code.replace(/9:00 - 21:00/g, '10:00 - 19:00');
code = code.replace(/09:00 ДО 21:00/g, '10:00 ДО 19:00');
code = code.replace(/9:00 AM - 9:00 PM/g, '10:00 AM - 7:00 PM');

fs.writeFileSync('src/i18n/translations.ts', code);

let layoutCode = fs.readFileSync('src/components/Layout.tsx', 'utf8');
layoutCode = layoutCode.replace(/08:00 - 21:00/g, '10:00 - 19:00');
layoutCode = layoutCode.replace(/08:00 - 20:00/g, '10:00 - 19:00');
fs.writeFileSync('src/components/Layout.tsx', layoutCode);
