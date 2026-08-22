const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');

const targetSpan = `<span className={clsx(
                  "font-display tracking-wider font-bold transition-all duration-300 leading-tight",
                  isScrolled || isMenuOpen || isHovered ? "text-sm sm:text-base md:text-lg text-white" : "text-base sm:text-lg md:text-xl text-white",
                  "whitespace-normal max-w-[120px] sm:max-w-[180px] lg:max-w-none"
                )}>`;

const replacementSpan = `<span className={clsx(
                  "font-display tracking-wider font-bold transition-all duration-300 leading-[1.1]",
                  isScrolled || isMenuOpen || isHovered ? "text-[12px] sm:text-sm md:text-lg text-white" : "text-[13px] sm:text-base md:text-xl text-white",
                  "whitespace-normal max-w-[110px] sm:max-w-[160px] lg:max-w-none"
                )}>`;

if (content.includes(targetSpan)) {
  content = content.replace(targetSpan, replacementSpan);
  fs.writeFileSync('src/components/Layout.tsx', content);
  console.log('Fixed span');
} else {
  console.log('Span not found');
}
