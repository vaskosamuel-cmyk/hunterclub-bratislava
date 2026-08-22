const fs = require('fs');
let code = fs.readFileSync('src/pages/Action.tsx', 'utf8');

code = code.replace(/price: "69€",/, 'price: "79€",');
code = code.replace(/price: "35€",/, 'price: "45€",');
code = code.replace(/price: "65€",/, 'price: "75€",');

fs.writeFileSync('src/pages/Action.tsx', code);
