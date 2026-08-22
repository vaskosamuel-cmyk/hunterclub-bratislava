const fs = require('fs');
let code = fs.readFileSync('vite.config.ts', 'utf8');

// We will add the base property inside the returned config object.
if (!code.includes('base:')) {
  code = code.replace(
    /return \{/,
    "return {\n    base: process.env.NODE_ENV === 'production' ? '/hunterclub-bratislava/' : '/',"
  );
  fs.writeFileSync('vite.config.ts', code);
  console.log("Success");
} else {
  console.log("Base already exists");
}
