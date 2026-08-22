const fs = require('fs');
let code = fs.readFileSync('src/pages/Baliky.tsx', 'utf8');

code = code.replace(/hide-scrollbar/g, '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]');

fs.writeFileSync('src/pages/Baliky.tsx', code);
