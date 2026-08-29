const fs = require('fs');
let code = fs.readFileSync('src/pages/Action.tsx', 'utf8');

const regex = /<div className="text-6xl font-display text-\[var\(--color-safety\)\] mb-10">\s*\{pkg\.price\}\s*<\/div>\s*<ul className="space-y-4 mb-10 flex-grow">\s*\{pkg\.weapons\?\.map\(\(weapon, wIdx\) => \(\s*<li key=\{wIdx\} className="flex items-start gap-4 text-base">\s*<Check className="w-6 h-6 text-\[var\(--color-safety\)\] shrink-0" \/>\s*<span className="text-white font-medium">\{weapon\}<\/span>\s*<\/li>\s*\)\)\}\s*<\/ul>\s*<button\s*onClick=\{[^}]+\}\s*className="w-full bg-\[#D32F2F\] text-white py-5 rounded-sm font-display text-2xl font-bold tracking-widest hover:bg-red-700 transition-colors uppercase italic mt-auto shadow-lg hover:scale-\[1\.02\] active:scale-\[0\.98\]"\s*>/g;

const replacement = `<div className="text-5xl md:text-6xl font-display text-[var(--color-safety)] mb-8">
                    {pkg.price}
                  </div>
                  
                  <div className="bg-black/20 rounded-xl p-5 md:p-6 mb-8 flex-grow border border-white/5">
                    <h4 className="text-[10px] md:text-xs font-bold text-[var(--color-safety)] uppercase tracking-widest mb-4">
                       {language === 'sk' ? "V balíku si vyskúšate:" : language === 'en' ? "In this package you will try:" : language === 'de' ? "In diesem Paket werden Sie ausprobieren:" : "В этом пакете вы попробуете:"}
                    </h4>
                    <ul className="space-y-3">
                      {pkg.weapons?.map((weapon, wIdx) => (
                        <li key={wIdx} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-[var(--color-safety)] shrink-0" />
                          <span className="text-gray-200 font-medium text-sm md:text-base">{weapon}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setIsReservationModalOpen(true)}
                    className="w-full bg-[#D32F2F] text-white py-4 md:py-5 rounded-sm font-display text-xl md:text-2xl font-bold tracking-widest hover:bg-red-700 transition-colors uppercase italic mt-auto shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  >`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/pages/Action.tsx', code);
