const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('text-gray-500')) {
        content = content.replace(/text-gray-500/g, 'text-gray-400');
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

replaceInDir(path.join(__dirname, 'src'));
console.log('Done replacing text-gray-500 with text-gray-400');
