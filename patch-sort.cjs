const fs = require('fs');
let code = fs.readFileSync('src/pages/Baliky.tsx', 'utf8');

const regex = /const filteredPackages = useMemo\(\(\) => \{[\s\S]*?\}, \[activeCategory\]\);/;

const replacement = `const filteredPackages = useMemo(() => {
    if (activeCategory === 'Všetky') {
      return [...ALL_PACKAGES].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/\\D/g, ''), 10) || 0;
        const priceB = parseInt(b.price.replace(/\\D/g, ''), 10) || 0;
        return priceA - priceB;
      });
    }
    return ALL_PACKAGES.filter(pkg => pkg.category === activeCategory);
  }, [activeCategory]);`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/pages/Baliky.tsx', code);
  console.log("Success");
} else {
  console.log("Target not found!");
}
