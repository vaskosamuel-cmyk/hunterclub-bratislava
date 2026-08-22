const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');

content = content.replace('data-theme="dark"', 'data-theme="light"');

fs.writeFileSync('src/components/Layout.tsx', content);
