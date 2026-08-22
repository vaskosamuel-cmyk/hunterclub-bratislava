const fs = require('fs');
let code = fs.readFileSync('src/components/Modal.tsx', 'utf8');

const regexOrder = /className="flex items-center justify-center gap-2 sm:gap-3 w-full bg-\[var\(--color-safety\)\] text-black py-4 sm:py-6 rounded-xl font-display text-xl sm:text-3xl font-bold tracking-widest hover:bg-yellow-400 transition-all shadow-xl uppercase italic"/g;

const replacementOrder = `className="flex items-center justify-center gap-2 sm:gap-3 w-full bg-[var(--color-safety)] text-black py-3 sm:py-5 rounded-xl font-display text-xl sm:text-2xl font-bold tracking-widest hover:bg-yellow-400 transition-all shadow-xl uppercase italic"`;

code = code.replace(regexOrder, replacementOrder);
fs.writeFileSync('src/components/Modal.tsx', code);
