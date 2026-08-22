const fs = require('fs');
let content = fs.readFileSync('src/index.css', 'utf8');

content = content.replace(
  'h1, h2, h3, h4, h5, h6 {',
  `html[lang="ru"] {
  --display-weight: 500;
  --display-scale: 0.85;
}
html:not([lang="ru"]) {
  --display-weight: 700;
  --display-scale: 1;
}

h1, h2, h3, h4, h5, h6 {`
);

content = content.replace(
  'font-weight: 700; /* Bebas Neue Bold */',
  'font-weight: var(--display-weight); /* Bebas Neue / Oswald */'
);

content = content.replace(
  'h1 { font-size: clamp(1.875rem, 1.99vw + 1.41rem, 3rem); }',
  'h1 { font-size: calc(clamp(1.875rem, 1.99vw + 1.41rem, 3rem) * var(--display-scale)); }'
);
content = content.replace(
  'h2 { font-size: clamp(1.5rem, 1.33vw + 1.19rem, 2.25rem); }',
  'h2 { font-size: calc(clamp(1.5rem, 1.33vw + 1.19rem, 2.25rem) * var(--display-scale)); }'
);
content = content.replace(
  'h3 { font-size: clamp(1.125rem, 1.1vw + 0.87rem, 1.75rem); }',
  'h3 { font-size: calc(clamp(1.125rem, 1.1vw + 0.87rem, 1.75rem) * var(--display-scale)); }'
);
content = content.replace(
  'h4 { font-size: clamp(1rem, 0.66vw + 0.85rem, 1.375rem); }',
  'h4 { font-size: calc(clamp(1rem, 0.66vw + 0.85rem, 1.375rem) * var(--display-scale)); }'
);


fs.writeFileSync('src/index.css', content);
