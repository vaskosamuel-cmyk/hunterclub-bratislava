const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

// Fix parent relative
code = code.replace(
  /className="group h-full flex items-center"/g,
  'className="group h-full flex items-center relative"'
);

// Fix dropdown wrapper
code = code.replace(
  /<div className="absolute top-full left-0 w-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-\[100\] flex justify-center">/g,
  '<div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]">'
);

// Fix tablet mobile menu
code = code.replace(
  /className="md:hidden flex items-center gap-4 ml-auto"/g,
  'className="xl:hidden flex items-center gap-4 ml-auto"'
);
code = code.replace(
  /<div className="md:hidden bg-\[var\(--color-forest\)]\/95/g,
  '<div className="xl:hidden bg-[var(--color-forest)]/95'
);

fs.writeFileSync('src/components/Layout.tsx', code);
console.log('done');
