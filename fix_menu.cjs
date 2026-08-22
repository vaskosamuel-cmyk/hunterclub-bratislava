const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');

content = content.replace(
  '<div className="flex-shrink flex items-center min-w-0 mr-4">',
  '<div className="flex-1 min-w-0 flex items-center mr-2 sm:mr-4">'
);

content = content.replace(
  '<div className="flex-1 flex items-center justify-end shrink-0">',
  '<div className="flex-none flex items-center justify-end">'
);

content = content.replace(
  '<Link \n                to="/" \n                className={clsx(\n                  "flex items-center gap-2 sm:gap-3 group transition-all duration-300 min-w-0",',
  '<Link \n                to="/" \n                className={clsx(\n                  "flex items-center gap-2 sm:gap-3 group transition-all duration-300 max-w-full",'
);

fs.writeFileSync('src/components/Layout.tsx', content);
