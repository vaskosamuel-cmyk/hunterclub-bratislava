const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

// Step 1: Make max-w-7xl relative
code = code.replace(
  '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">',
  '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">'
);

// Step 2: Remove relative from the group
code = code.replace(
  /className="relative group h-full flex items-center"/g,
  'className="group h-full flex items-center"'
);

// Step 3: Change the absolute positioning of the mega menu
// Currently: "absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
// New: "absolute top-full left-0 w-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex justify-center"
code = code.replace(
  /"absolute top-full left-1\/2 -translate-x-1\/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"/g,
  '"absolute top-full left-0 w-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] flex justify-center"'
);

// Step 4: Ensure the inner mega menu width fits nicely
// Currently: className="w-[1100px] bg-[#0A0A0A]/95 ...
// Update to standard full width or max width
code = code.replace(
  /className="w-\[1100px\] bg-\[#0A0A0A\]\/95/g,
  'className="w-full max-w-[1100px] bg-[#0A0A0A]/95'
);


fs.writeFileSync('src/components/Layout.tsx', code);
console.log("Done");
