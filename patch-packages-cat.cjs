const fs = require('fs');
let code = fs.readFileSync('src/constants/packages.ts', 'utf8');

const getCategory = (key) => {
  if (['exclusive', 'legendary_extra', 'legendary', 'long_guns'].includes(key)) return 'Bestsellery & Zážitky';
  if (['kalashnikov', 'military', 'west_block', 'chicago', 'slovakia_package', 'cz_package'].includes(key)) return 'Vojenské & Legendy';
  if (['glock_multikaliber', 'glock_9x19'].includes(key)) return 'GLOCK Zóna';
  if (['short_guns', 'pistol_karabina_9mm', 'pistol_multicaliber', 'pistol_puska_22lr', 'ar15_ak47', 'revolver_multicaliber'].includes(key)) return 'Streľba na výber';
  return 'Iné';
};

// We will recreate ALL_PACKAGES with a category field
const dataStr = code.match(/export const ALL_PACKAGES = \[([\s\S]*?)\];/)[1];
const regex = /{ key: '([^']+)', name: '([^']+)', price: '([^']+)', details: \[(.*?)\] }/g;

let newDataStr = "export const ALL_PACKAGES = [\n";
let match;
const packages = [];
while ((match = regex.exec(dataStr)) !== null) {
  const key = match[1];
  const name = match[2];
  const price = match[3];
  const details = match[4];
  const category = getCategory(key);
  packages.push({ key, name, price, details, category });
}

// Order packages by category to match the user's list
const categoryOrder = ['Bestsellery & Zážitky', 'Vojenské & Legendy', 'GLOCK Zóna', 'Streľba na výber'];
packages.sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));

packages.forEach(p => {
  newDataStr += `  { key: '${p.key}', category: '${p.category}', name: '${p.name}', price: '${p.price}', details: [${p.details}] },\n`;
});
newDataStr += "];\n";

// Remove old exports of subsets, just export ALL_PACKAGES and CATEGORIES
newDataStr += `
export const PACKAGE_CATEGORIES = [
  'Všetky',
  'Bestsellery & Zážitky',
  'Vojenské & Legendy',
  'GLOCK Zóna',
  'Streľba na výber'
];
`;

fs.writeFileSync('src/constants/packages.ts', newDataStr);
