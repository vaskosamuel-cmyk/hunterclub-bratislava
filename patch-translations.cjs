const fs = require('fs');
let code = fs.readFileSync('src/i18n/translations.ts', 'utf8');

// Slovak
code = code.replace(/"step1Title": "Rezervácia",/g, '"step1Title": "1. Rezervácia",');
code = code.replace(/"step2Title": "Inštruktáž",/g, '"step2Title": "2. Inštruktáž",');
code = code.replace(/"step3Title": "Zážitok",/g, '"step3Title": "3. Zážitok",');

// German
code = code.replace(/"step1Title": "Reservierung",/g, '"step1Title": "1. Reservierung",');
code = code.replace(/"step2Title": "Briefing",/g, '"step2Title": "2. Briefing",'); // check if it is briefing
code = code.replace(/"step3Title": "Erlebnis",/g, '"step3Title": "3. Erlebnis",');

// English
code = code.replace(/"step1Title": "Reservation",/g, '"step1Title": "1. Reservation",');
code = code.replace(/"step2Title": "Instruction",/g, '"step2Title": "2. Instruction",');
code = code.replace(/"step3Title": "Experience",/g, '"step3Title": "3. Experience",');

// Russian
code = code.replace(/"step1Title": "Бронирование",/g, '"step1Title": "1. Бронирование",');
code = code.replace(/"step2Title": "Инструктаж",/g, '"step2Title": "2. Инструктаж",');
code = code.replace(/"step3Title": "Опыт",/g, '"step3Title": "3. Опыт",');

fs.writeFileSync('src/i18n/translations.ts', code);
