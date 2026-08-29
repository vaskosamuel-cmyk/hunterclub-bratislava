const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

// 1. Ensure all icons are imported
const icons = ['Shield', 'Target', 'BookOpen', 'Brain', 'Crosshair', 'Gift', 'ArrowRight', 'CheckCircle', 'Users', 'User', 'Calendar', 'Award'];
for (const icon of icons) {
  if (!code.includes(icon + ',')) {
    code = code.replace(/import \{ Menu, /, `import { Menu, ${icon}, `);
  }
}

// 2. Replace the navigation array
const navTarget = /const navigation = \[\s*\{[\s\S]*?\];/;
const navReplacement = `const navigation = [
    { 
      name: t('nav.strelnica') || 'Strelnica', 
      href: '/strelnica',
      dropdown: [
        { name: 'O strelnici', href: '/strelnica#o-nas' },
        { name: 'Ako to funguje', href: '/som-tu-prvykrat' },
        { name: 'Bezpečnosť', href: '/strelnica#bezpecnost' },
        { name: 'Zbrane / vybavenie', href: '/cennik' },
        { name: 'Ako sa k nám dostať', href: '/kontakt' },
      ]
    },
    { 
      name: t('nav.kurzy') || 'Kurzy', 
      href: '/kurzy',
      isMegaMenu: true,
      dropdown: [
        { name: 'Zbrojný preukaz', href: '/zbrojny-preukaz' },
        { name: 'Teoretická príprava', href: '/teoreticka-priprava' },
        { name: 'Psychotesty', href: '/psychotesty' },
        { name: 'Základný kurz streľby', href: '/zakladny-kurz' },
        { name: 'Taktický výcvik', href: '/takticky-vycvik' },
        { name: 'Individuálne tréningy', href: '/kontakt' },
      ]
    },
    { 
      name: t('nav.baliky') || 'Strelecké balíčky', 
      href: '/strelecke-balicky',
      dropdown: [
        { name: 'Zážitkové balíčky', href: '/strelecke-balicky' },
        { name: 'Pre jednotlivcov', href: '/strelecke-balicky' },
        { name: 'Pre páry', href: '/strelecke-balicky' },
        { name: 'Pre skupiny', href: '/strelecke-balicky' },
      ]
    },
    { 
      name: t('nav.cennik') || 'Cenník', 
      href: '/cennik',
      dropdown: [
        { name: 'Streľba', href: '/cennik' },
        { name: 'Kurzy', href: '/cennik' },
        { name: 'Balíčky', href: '/cennik' },
        { name: 'Prenájom / doplnkové služby', href: '/cennik' },
      ]
    },
    { 
      name: t('nav.sportClub') || 'Športový klub', 
      href: '/sportovy-klub-hdi',
      dropdown: [
        { name: 'Členstvo', href: '/sportovy-klub-hdi' },
        { name: 'Tréningy', href: '/sportovy-klub-hdi' },
        { name: 'Kalendár', href: '/sportovy-klub-hdi' },
        { name: 'Pretekári', href: '/sportovy-klub-hdi' },
      ]
    },
  ];`;

if (navTarget.test(code)) {
  code = code.replace(navTarget, navReplacement);
} else {
  console.log("Could not find navigation array");
}

// 3. Replace the mega menu render block
const megaMenuRegex = /\{\(item as any\)\.isMegaMenu \? \([\s\S]*?\) : \(/;
const newMegaMenu = `{(item as any).isMegaMenu ? (
                          <div className="w-[850px] bg-zinc-900/95 backdrop-blur-md border border-zinc-800/80 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative">
                            {/* Accent Top Line */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-safety)]/60 to-transparent"></div>
                            
                            <div className="flex">
                              {/* Zone A: Links (60%) */}
                              <div className="w-[60%] p-8 flex flex-col gap-6">
                                
                                <div>
                                  <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Vzdelávanie</h4>
                                  <div className="grid gap-2">
                                    <Link to="/zbrojny-preukaz" onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))} className="flex items-center gap-3 p-2 hover:bg-zinc-800/50 rounded-lg group transition-colors">
                                      <Shield className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-safety)] transition-colors" />
                                      <span className="font-bold text-sm text-gray-200 group-hover:text-white transition-colors">Zbrojný preukaz</span>
                                    </Link>
                                    <Link to="/teoreticka-priprava" onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))} className="flex items-center gap-3 p-2 hover:bg-zinc-800/50 rounded-lg group transition-colors">
                                      <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-safety)] transition-colors" />
                                      <span className="font-bold text-sm text-gray-200 group-hover:text-white transition-colors">Teoretická príprava</span>
                                    </Link>
                                    <Link to="/psychotesty" onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))} className="flex items-center gap-3 p-2 hover:bg-zinc-800/50 rounded-lg group transition-colors">
                                      <Brain className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-safety)] transition-colors" />
                                      <span className="font-bold text-sm text-gray-200 group-hover:text-white transition-colors">Psychotesty</span>
                                    </Link>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Streľba & Tréning</h4>
                                  <div className="grid gap-2">
                                    <Link to="/zakladny-kurz" onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))} className="flex items-center gap-3 p-2 hover:bg-zinc-800/50 rounded-lg group transition-colors">
                                      <Target className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-safety)] transition-colors" />
                                      <span className="font-bold text-sm text-gray-200 group-hover:text-white transition-colors">Základný kurz streľby</span>
                                    </Link>
                                    <Link to="/takticky-vycvik" onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))} className="flex items-center gap-3 p-2 hover:bg-zinc-800/50 rounded-lg group transition-colors">
                                      <Crosshair className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-safety)] transition-colors" />
                                      <span className="font-bold text-sm text-gray-200 group-hover:text-white transition-colors">Taktický výcvik</span>
                                    </Link>
                                    <Link to="/kontakt" onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))} className="flex items-center gap-3 p-2 hover:bg-zinc-800/50 rounded-lg group transition-colors">
                                      <User className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-safety)] transition-colors" />
                                      <span className="font-bold text-sm text-gray-200 group-hover:text-white transition-colors">Individuálne tréningy</span>
                                    </Link>
                                  </div>
                                </div>
                                
                              </div>
                              
                              {/* Zone B: Featured Banner (40%) */}
                              <div className="w-[40%] bg-zinc-950 p-6 border-l border-zinc-800/80 flex flex-col justify-center gap-4 relative overflow-hidden">
                                {/* Background Pattern/Glow */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-safety)]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                
                                {/* Promo 1: Poukazy */}
                                <Link 
                                  to="/darcekovy-poukaz"
                                  onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))}
                                  className="bg-zinc-900 border border-zinc-800 hover:border-[var(--color-safety)]/50 p-5 rounded-xl group transition-all relative overflow-hidden flex flex-col items-start text-left z-10"
                                >
                                  <span className="text-[10px] font-bold tracking-widest text-[var(--color-safety)] uppercase mb-1">Najobľúbenejší darček</span>
                                  <h4 className="text-lg font-display tracking-wide text-white uppercase italic mb-3">Darčekové poukazy</h4>
                                  <span className="w-max bg-[var(--color-safety)] text-black text-xs font-bold tracking-wider uppercase transition-all px-3 py-1.5 rounded-md group-hover:bg-yellow-400 shadow-[0_0_10px_rgba(251,188,5,0.2)]">
                                    Kúpiť poukaz →
                                  </span>
                                </Link>

                                {/* Promo 2: Teambuilding */}
                                <Link 
                                  to="/strelecke-balicky"
                                  onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))}
                                  className="bg-zinc-900 border border-zinc-800 hover:border-white/20 p-5 rounded-xl group transition-all relative overflow-hidden flex flex-col items-start text-left mt-2 z-10"
                                >
                                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">Pre firmy a skupiny</span>
                                  <h4 className="text-lg font-display tracking-wide text-white uppercase italic mb-3">Teambuilding</h4>
                                  <span className="w-max border border-white/20 text-white text-xs font-bold tracking-wider uppercase transition-all px-3 py-1.5 rounded-md group-hover:bg-white/10">
                                    Zistiť viac →
                                  </span>
                                </Link>
                              </div>
                            </div>

                            {/* Bottom Bar: Value Props */}
                            <div className="bg-zinc-950/80 border-t border-zinc-800 p-4 px-8 flex justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-wider">
                              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[var(--color-safety)]" /> Profesionálni inštruktori</span>
                              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[var(--color-safety)]" /> Moderné zázemie</span>
                              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[var(--color-safety)]" /> Bezpečnosť</span>
                            </div>
                          </div>
                        ) : (`;

if (megaMenuRegex.test(code)) {
  code = code.replace(megaMenuRegex, newMegaMenu);
} else {
  console.log("Could not find mega menu block");
}

// 4. Update the CTA buttons right before Language Switcher
const ctaTargetRegex = /\{\/\* Language Switcher \*\/\}/;
const newCTA = `{/* Prominent CTAs */}
                <Link to="/darcekovy-poukaz" className="hidden lg:flex bg-[var(--color-safety)] text-[var(--color-tactical)] px-4 py-2 rounded-lg font-bold tracking-wider uppercase items-center gap-2 hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(251,188,5,0.2)] text-xs mr-2 border border-transparent">
                  <Gift className="w-4 h-4" />
                  Darčekové poukazy
                </Link>
                <Link to="/kontakt" className="hidden lg:flex border border-white/20 text-white hover:bg-white/10 px-4 py-2 rounded-lg font-bold tracking-wider uppercase transition-colors text-xs mr-4">
                  Kontakt
                </Link>

                {/* Language Switcher */}`;
if (ctaTargetRegex.test(code)) {
  code = code.replace(ctaTargetRegex, newCTA);
} else {
  console.log("Could not find Language Switcher to insert CTAs");
}

// Remove the old Kontakt button at the end of desktop header
code = code.replace(/<Link\s*to="\/kontakt"[^>]*?className="[^"]*?hidden lg:block[^"]*?"[^>]*?>[\s\S]*?<\/Link>/, '');

fs.writeFileSync('src/components/Layout.tsx', code);
console.log("Done layout patch");
