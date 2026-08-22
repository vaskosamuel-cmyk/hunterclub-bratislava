const fs = require('fs');
let code = fs.readFileSync('src/pages/Baliky.tsx', 'utf8');

// Ensure imports
if (!code.includes('PACKAGE_CATEGORIES')) {
  code = code.replace(/import { ALL_PACKAGES } from '\.\.\/constants\/packages';/, "import { ALL_PACKAGES, PACKAGE_CATEGORIES } from '../constants/packages';");
}
if (!code.includes('useMemo')) {
  code = code.replace(/import React, { useState, useRef, useEffect } from 'react';/, "import React, { useState, useRef, useEffect, useMemo } from 'react';");
}

// Add state and filtered logic
if (!code.includes('activeCategory')) {
  code = code.replace(/const \[selectedPackage, setSelectedPackage\] = useState<any \| null>\(null\);/, 
`const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Všetky');

  const filteredPackages = useMemo(() => {
    if (activeCategory === 'Všetky') {
      return ALL_PACKAGES;
    }
    return ALL_PACKAGES.filter(pkg => pkg.category === activeCategory);
  }, [activeCategory]);`);
}

// Inject the filter UI just before the Packages Grid
// Let's find "Packages Grid" 
const filterUI = `
          {/* Categories Filter */}
          <section className="py-8 bg-black relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
                <div className="flex gap-2 md:gap-4 bg-black/20 p-1.5 rounded-2xl border border-white/5 mx-auto w-max min-w-max">
                  {PACKAGE_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={\`px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-display text-sm md:text-base tracking-widest transition-all uppercase italic whitespace-nowrap snap-center flex items-center gap-2 \${
                        activeCategory === category 
                          ? 'bg-[var(--color-safety)] text-black shadow-[0_0_15px_rgba(251,188,5,0.3)]' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }\`}
                    >
                      {category === 'Všetky' && <Star className="w-4 h-4 md:w-5 md:h-5" />}
                      {category === 'Bestsellery & Zážitky' && <Target className="w-4 h-4 md:w-5 md:h-5" />}
                      {category === 'Vojenské & Legendy' && <Shield className="w-4 h-4 md:w-5 md:h-5" />}
                      {category === 'GLOCK Zóna' && <Zap className="w-4 h-4 md:w-5 md:h-5" />}
                      {category === 'Streľba na výber' && <Star className="w-4 h-4 md:w-5 md:h-5" />}
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
`;

if (!code.includes('Categories Filter')) {
  code = code.replace(/\{\/\* Packages Grid \*\/\}/, filterUI + "\n          {/* Packages Grid */}");
}

// Update the map call
code = code.replace(/ALL_PACKAGES\.map\(\(pkg\)/g, 'filteredPackages.map((pkg)');

fs.writeFileSync('src/pages/Baliky.tsx', code);
