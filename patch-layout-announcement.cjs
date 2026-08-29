const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

const targetStr = `{/* Announcement Bar */}
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
                {currentAktualityMessage || t('announcementText')}
              </p>
            </div>
          </div>
        </div>`;

const replaceStr = `{/* Announcement Bar */}
        {(currentAktualityMessage || t('announcementText')) && (
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
                  {currentAktualityMessage || t('announcementText')}
                </p>
              </div>
            </div>
          </div>
        )}`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/Layout.tsx', code);
  console.log("Announcement bar successfully wrapped with condition.");
} else {
  console.log("Could not find target string in Layout.tsx. Ensure the formatting exactly matches.");
}
