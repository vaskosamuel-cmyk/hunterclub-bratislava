const fs = require('fs');
let code = fs.readFileSync('src/i18n/translations.ts', 'utf8');

// Slovak - beginner
code = code.replace(/"step1Title": "Kontrola dokladov",/g, '"step1Title": "1. Kontrola dokladov",');
code = code.replace(/"step2Title": "Inštruktáž",/g, '"step2Title": "2. Inštruktáž",');
code = code.replace(/"step3Title": "Samotná streľba",/g, '"step3Title": "3. Samotná streľba",');

// German - beginner
code = code.replace(/"step1Title": "Dokumentenkontrolle",/g, '"step1Title": "1. Dokumentenkontrolle",');
code = code.replace(/"step2Title": "Einweisung",/g, '"step2Title": "2. Einweisung",'); // already did this but maybe not beginner
code = code.replace(/"step3Title": "Das Schießen",/g, '"step3Title": "3. Das Schießen",');

// English - beginner
code = code.replace(/"step1Title": "Document Check",/g, '"step1Title": "1. Document Check",');
code = code.replace(/"step2Title": "Briefing",/g, '"step2Title": "2. Briefing",');
code = code.replace(/"step3Title": "Shooting",/g, '"step3Title": "3. Shooting",'); // check if it's "Shooting"

// Russian - beginner
code = code.replace(/"step1Title": "Проверка документов",/g, '"step1Title": "1. Проверка документов",');
code = code.replace(/"step2Title": "Инструктаж",/g, '"step2Title": "2. Инструктаж",');
code = code.replace(/"step3Title": "Сама стрельба",/g, '"step3Title": "3. Сама стрельба",'); 

fs.writeFileSync('src/i18n/translations.ts', code);
