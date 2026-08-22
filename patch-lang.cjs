const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

const getFlagSvg = (lang) => {
  if (lang === 'sk') return 'sk';
  if (lang === 'de') return 'de';
  if (lang === 'en') return 'gb';
  if (lang === 'ru') return 'ru';
  return 'sk';
};

code = code.replace(
  /<span className="text-lg leading-none">\s*\{language === 'sk' \? '🇸🇰' : language === 'de' \? '🇩🇪' : language === 'ru' \? '🇷🇺' : '🇬🇧'\}\s*<\/span>/g,
  `<img src={\`https://flagcdn.com/\${language === 'en' ? 'gb' : language}.svg\`} width="20" alt={language} className="rounded-sm" />`
);

code = code.replace(
  /<span className="text-lg">🇸🇰<\/span>/g,
  `<img src="https://flagcdn.com/sk.svg" width="20" alt="sk" className="rounded-sm" />`
);
code = code.replace(
  /<span className="text-lg">🇩🇪<\/span>/g,
  `<img src="https://flagcdn.com/de.svg" width="20" alt="de" className="rounded-sm" />`
);
code = code.replace(
  /<span className="text-lg">🇬🇧<\/span>/g,
  `<img src="https://flagcdn.com/gb.svg" width="20" alt="en" className="rounded-sm" />`
);
code = code.replace(
  /<span className="text-lg">🇷🇺<\/span>/g,
  `<img src="https://flagcdn.com/ru.svg" width="20" alt="ru" className="rounded-sm" />`
);

fs.writeFileSync('src/components/Layout.tsx', code);
