const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

code = code.replace(
  "if (data && data.length > 0) {\n          setAktualityData(data[0]);\n        }",
  `if (data && data.length > 0) {
          // Find the newest announcement that actually has text or a title
          const validItem = data.find((item: any) => (item.body && item.body.trim() !== '') || (item.title && item.title.trim() !== ''));
          if (validItem) {
            setAktualityData(validItem);
          } else {
            setAktualityData(null);
          }
        } else {
          setAktualityData(null);
        }`
);

fs.writeFileSync('src/components/Layout.tsx', code);
console.log('done');
