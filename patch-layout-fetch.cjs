const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

code = code.replace(
  "fetch('/content/aktuality.json')",
  "fetch(`/content/aktuality.json?t=${new Date().getTime()}`)"
);

code = code.replace(
  "const currentAktualityMessage = aktualityData ? aktualityData.body : null;",
  "const currentAktualityMessage = aktualityData ? (aktualityData.body || aktualityData.title) : null;"
);

fs.writeFileSync('src/components/Layout.tsx', code);
console.log('done');
