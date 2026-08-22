const fs = require('fs');
let code = fs.readFileSync('src/i18n/translations.ts', 'utf8');

code = code.replace(/10:00 - 19:00"/g, '09:00 - 21:00"');
code = code.replace(/10:00 - 19:00",/g, '09:00 - 21:00",');
code = code.replace(/10:00 ДО 19:00"/g, '09:00 ДО 21:00"');
code = code.replace(/10:00 AM - 7:00 PM"/g, '9:00 AM - 9:00 PM"');

fs.writeFileSync('src/i18n/translations.ts', code);

let layoutCode = fs.readFileSync('src/components/Layout.tsx', 'utf8');
layoutCode = layoutCode.replace(/10:00 - 19:00/g, '09:00 - 21:00');
fs.writeFileSync('src/components/Layout.tsx', layoutCode);
