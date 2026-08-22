const fs = require('fs');
let content = fs.readFileSync('src/index.css', 'utf8');

content = content.replace(
  '--font-display: "Bebas Neue", ui-sans-serif, system-ui, sans-serif;',
  '--font-display: "Bebas Neue", "Oswald", ui-sans-serif, system-ui, sans-serif;'
);

fs.writeFileSync('src/index.css', content);
