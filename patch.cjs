const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

// 1. Remove Darcekove Poukazy from menu
const menuRegex = /\s*{\s*name:\s*'DARČEKOVÉ POUKAZY'[\s\S]*?},/;
code = code.replace(menuRegex, '');

// 2. Fix announcement bar
const announcementStart = code.indexOf('{/* Announcement Bar */}');
const announcementEnd = code.indexOf('        {/* Mobile menu */}');

if (announcementStart !== -1 && announcementEnd !== -1) {
  const newAnnouncement = `{/* Announcement Bar */}
        <div className="bg-[var(--color-safety)] text-[var(--color-tactical)] py-2.5 md:py-3 lg:py-4 border-t border-black/10 relative overflow-hidden shrink-0 shadow-lg">
          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center justify-center gap-1 text-center">
              <div className="flex items-center gap-2 bg-black/5 px-3 py-0.5 rounded-full mb-0.5">
                <div className="w-1.5 h-1.5 bg-[var(--color-tactical)] rounded-full animate-ping"></div>
                <p className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em]">
                  {t('announcement')}
                </p>
                <div className="w-1.5 h-1.5 bg-[var(--color-tactical)] rounded-full animate-ping"></div>
              </div>
              <p className="text-xs md:text-base font-bold tracking-wide max-w-3xl leading-snug">
                {currentAktualityMessage || t('announcementText') || 'Priestor pre vaše dôležité oznamy (pridajte cez administráciu)'}
              </p>
            </div>
          </div>
        </div>

`;
  
  code = code.substring(0, announcementStart) + newAnnouncement + code.substring(announcementEnd);
  fs.writeFileSync('src/components/Layout.tsx', code);
  console.log("Successfully patched Layout.tsx");
} else {
  console.log("Could not find announcement block in Layout.tsx");
}
