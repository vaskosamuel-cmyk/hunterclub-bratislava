const fs = require('fs');
let code = fs.readFileSync('scripts/merge-content.js', 'utf8');

code = code.replace(
  "// 1. Merge Aktuality (sort by filename descending since format is YYYY-MM-DD)\nmergeFolder('aktuality', 'aktuality.json', (a, b) => {\n  return b._filename.localeCompare(a._filename);\n});",
  `// 1. Merge Aktuality (Robust Date Sort)
mergeFolder('aktuality', 'aktuality.json', (a, b) => {
  const getFileDate = (filename) => {
    const match = filename.match(/^(\\d{4}-\\d{2}-\\d{2})/);
    if (match) return new Date(match[1]).getTime();
    return 0; // Old files without a date in the prefix go to the very bottom
  };
  
  const dateDiff = getFileDate(b._filename) - getFileDate(a._filename);
  if (dateDiff !== 0) {
    return dateDiff;
  }
  
  // If dates are identical (or both have no date), sort alphabetically by filename
  return b._filename.localeCompare(a._filename);
});`
);

fs.writeFileSync('scripts/merge-content.js', code);
console.log('done');
