const fs = require('fs');
let code = fs.readFileSync('src/pages/Baliky.tsx', 'utf8');

const target = `          {/* Categories Filter */}
          <section className="py-8 bg-black relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory">
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

          {/* Packages Grid */}
          <section className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">`;

const replacement = `          {/* Categories Filter & Packages Grid */}
          <section className="py-12 md:py-16 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mb-12">
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                  {PACKAGE_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={\`px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-display text-sm md:text-base tracking-widest transition-all uppercase italic flex items-center gap-2 \${
                        activeCategory === category 
                          ? 'bg-[var(--color-safety)] text-black shadow-lg' 
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/pages/Baliky.tsx', code);
  console.log("Success");
} else {
  console.log("Target not found!");
}
