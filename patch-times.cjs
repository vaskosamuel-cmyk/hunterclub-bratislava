const fs = require('fs');
let code = fs.readFileSync('src/i18n/translations.ts', 'utf8');

// Slovak
code = code.replace(/Strelecké balíčky je možné absolvovať v Po – Pia v čase od 9:00 – 20:00, víkendy podľa dohody\./g, 'Strelecké balíčky je možné absolvovať v Po – Pia v čase od 10:00 do 19:00, víkendy podľa dohody.');
code = code.replace(/Strelecké balíky je možné absolvovať v čase od 10:00 do 16:00 a cez víkendy podľa dohody\./g, 'Strelecké balíky je možné absolvovať v čase od 10:00 do 19:00 a cez víkendy podľa dohody.');

// German
code = code.replace(/Schießpakete können von Mo - Fr zwischen 9:00 und 20:00 Uhr durchgeführt werden, Wochenenden nach Vereinbarung\./g, 'Schießpakete können von Mo - Fr zwischen 10:00 und 19:00 Uhr durchgeführt werden, Wochenenden nach Vereinbarung.');
code = code.replace(/Schießpakete können von 10:00 bis 16:00 Uhr und an Wochenenden nach Vereinbarung absolviert werden\./g, 'Schießpakete können von 10:00 bis 19:00 Uhr und an Wochenenden nach Vereinbarung absolviert werden.');

// English
code = code.replace(/Shooting packages are available Mon - Fri from 9:00 AM to 8:00 PM, weekends by appointment\./g, 'Shooting packages are available Mon - Fri from 10:00 AM to 7:00 PM, weekends by appointment.');
code = code.replace(/Shooting packages can be completed between 10:00 and 16:00 and on weekends by appointment\./g, 'Shooting packages can be completed between 10:00 and 19:00 and on weekends by appointment.');
code = code.replace(/Shooting packages can be completed from 10:00 to 16:00 and on weekends by appointment\./g, 'Shooting packages can be completed from 10:00 to 19:00 and on weekends by appointment.');

// Russian
code = code.replace(/Стрелковые пакеты доступны Пн - Пт с 9:00 до 20:00, в выходные дни по предварительной записи\./g, 'Стрелковые пакеты доступны Пн - Пт с 10:00 до 19:00, в выходные дни по предварительной записи.');
code = code.replace(/Стрелковые пакеты можно пройти с 10:00 до 16:00 и в выходные дни по предварительной записи\./g, 'Стрелковые пакеты можно пройти с 10:00 до 19:00 и в выходные дни по предварительной записи.');
code = code.replace(/Стрелковые пакеты доступны с 10:00 до 16:00 и в выходные дни по предварительной записи\./g, 'Стрелковые пакеты доступны с 10:00 до 19:00 и в выходные дни по предварительной записи.');

fs.writeFileSync('src/i18n/translations.ts', code);
