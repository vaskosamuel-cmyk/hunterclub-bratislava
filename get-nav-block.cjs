const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

const navStart = code.indexOf('const navigation = [');
const navEnd = code.indexOf('];', navStart) + 2;
console.log(code.substring(navStart, navEnd));
