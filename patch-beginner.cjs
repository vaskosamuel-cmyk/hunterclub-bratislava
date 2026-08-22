const fs = require('fs');
let code = fs.readFileSync('src/pages/BeginnerExperience.tsx', 'utf8');

code = code.replace(
  /<div className="flex items-center gap-4 bg-\[var\(--color-forest\)\]\/90 backdrop-blur-md p-4 md:p-5 rounded-sm border border-white\/10 w-full lg:w-80 justify-start md:justify-end text-left md:text-right flex-row-reverse md:flex-row">\s*<div>\s*<div className="font-bold text-base md:text-lg uppercase tracking-wider font-sans text-white">\{t\('beginner\.feat1Title'\)\}<\/div>\s*<div className="text-xs md:text-sm text-white\/80 font-sans">\{t\('beginner\.feat1Desc'\)\}<\/div>\s*<\/div>\s*<Shield className="w-6 h-6 md:w-8 md:h-8 text-\[var\(--color-safety\)\] shrink-0" \/>\s*<\/div>/g,
  `<div className="flex items-center gap-4 bg-[var(--color-forest)]/90 backdrop-blur-md p-4 md:p-5 rounded-sm border border-white/10 w-full lg:w-80 justify-start md:justify-start text-left flex-row">
                    <Shield className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-safety)] shrink-0" />
                    <div>
                      <div className="font-bold text-base md:text-lg uppercase tracking-wider font-sans text-white">{t('beginner.feat1Title')}</div>
                      <div className="text-xs md:text-sm text-white/80 font-sans">{t('beginner.feat1Desc')}</div>
                    </div>
                  </div>`
);

code = code.replace(
  /<div className="flex items-center gap-4 bg-\[var\(--color-forest\)\]\/90 backdrop-blur-md p-4 md:p-5 rounded-sm border border-white\/10 w-full lg:w-80 justify-start md:justify-end text-left md:text-right flex-row-reverse md:flex-row">\s*<div>\s*<div className="font-bold text-base md:text-lg uppercase tracking-wider font-sans text-white">\{t\('beginner\.feat2Title'\)\}<\/div>\s*<div className="text-xs md:text-sm text-white\/80 font-sans">\{t\('beginner\.feat2Desc'\)\}<\/div>\s*<\/div>\s*<UserCheck className="w-6 h-6 md:w-8 md:h-8 text-\[var\(--color-safety\)\] shrink-0" \/>\s*<\/div>/g,
  `<div className="flex items-center gap-4 bg-[var(--color-forest)]/90 backdrop-blur-md p-4 md:p-5 rounded-sm border border-white/10 w-full lg:w-80 justify-start md:justify-start text-left flex-row">
                    <UserCheck className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-safety)] shrink-0" />
                    <div>
                      <div className="font-bold text-base md:text-lg uppercase tracking-wider font-sans text-white">{t('beginner.feat2Title')}</div>
                      <div className="text-xs md:text-sm text-white/80 font-sans">{t('beginner.feat2Desc')}</div>
                    </div>
                  </div>`
);

fs.writeFileSync('src/pages/BeginnerExperience.tsx', code);
