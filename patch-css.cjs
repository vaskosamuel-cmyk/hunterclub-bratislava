const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

if (!code.includes('#root {')) {
  code += `\n#root {
  opacity: 0;
  transition: opacity 0.4s ease-out;
}

#root.fonts-loaded {
  opacity: 1;
}
`;
  fs.writeFileSync('src/index.css', code);
}
