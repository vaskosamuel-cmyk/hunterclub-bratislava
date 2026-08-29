const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

// 1. Patch imports
if (!code.includes('Shield, Target, BookOpen, Brain, Crosshair, Gift, ArrowRight')) {
  code = code.replace(
    /import \{ Menu, X, MapPin, Phone, Mail, ChevronRight, MessageSquare, ChevronDown, Globe \} from 'lucide-react';/,
    "import { Menu, X, MapPin, Phone, Mail, ChevronRight, MessageSquare, ChevronDown, Globe, Shield, Target, BookOpen, Brain, Crosshair, Gift, ArrowRight } from 'lucide-react';"
  );
}

// 2. Patch navigation array
const navTarget = `    { 
      name: t('nav.kurzy'), 
      href: '/kurzy',
      dropdown: [
        { name: t('nav.zbrojak'), href: '/zbrojny-preukaz' },
        { name: t('nav.zakladnyKurz'), href: '/zakladny-kurz' },
        { name: t('nav.teoretickaPriprava'), href: '/teoreticka-priprava' },
        { name: t('nav.psychotesty'), href: '/psychotesty' },
        { name: t('nav.taktickyVycvik'), href: '/takticky-vycvik' },
      ]
    },`;

const navReplacement = `    { 
      name: t('nav.kurzy'), 
      href: '/kurzy',
      isMegaMenu: true,
      dropdown: [
        { name: t('nav.zbrojak'), href: '/zbrojny-preukaz', icon: Shield, desc: 'Kompletná príprava na skúšku' },
        { name: t('nav.zakladnyKurz'), href: '/zakladny-kurz', icon: Target, desc: 'Od začiatočníka po strelca' },
        { name: t('nav.taktickyVycvik'), href: '/takticky-vycvik', icon: Crosshair, desc: 'Pokročilá obranná streľba' },
        { name: t('nav.psychotesty'), href: '/psychotesty', icon: Brain, desc: 'Zákonné posúdenie psychológa' },
        { name: t('nav.teoretickaPriprava'), href: '/teoreticka-priprava', icon: BookOpen, desc: 'Teória a legislatíva pre ZP' },
      ]
    },`;

code = code.replace(navTarget, navReplacement);

// 3. Patch the render logic
const renderTarget = `                    {item.dropdown && !closedDropdowns[item.name] && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="bg-[var(--color-forest)]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 flex flex-col w-64 relative overflow-hidden">
                          <div className="relative z-10 flex flex-col gap-1">
                            {item.dropdown.map((dropItem) => (
                              <Link 
                                key={dropItem.name} 
                                to={dropItem.href}
                                onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))}
                                className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group/item"
                              >
                                <span className="text-sm font-bold text-white/90 group-hover/item:text-[var(--color-safety)] transition-colors">
                                  {dropItem.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}`;

const renderReplacement = `                    {item.dropdown && !closedDropdowns[item.name] && (
                      <div className={clsx(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50",
                        (item as any).isMegaMenu ? "" : ""
                      )}>
                        {(item as any).isMegaMenu ? (
                          <div className="w-[720px] bg-zinc-900/95 backdrop-blur-md border border-zinc-800/80 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden flex relative">
                            {/* Accent Top Line */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-safety)]/60 to-transparent"></div>
                            
                            {/* Zone A: Links (65%) */}
                            <div className="w-[65%] p-6">
                              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                {item.dropdown.map((dropItem: any) => {
                                  const Icon = dropItem.icon;
                                  return (
                                    <Link 
                                      key={dropItem.name} 
                                      to={dropItem.href}
                                      onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))}
                                      className="flex items-start gap-4 p-3 rounded-xl hover:bg-zinc-800/50 transition-colors duration-200 group/item"
                                    >
                                      <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-center shrink-0 group-hover/item:border-[var(--color-safety)]/40 group-hover/item:bg-[var(--color-safety)]/10 transition-colors shadow-sm">
                                        <Icon className="w-5 h-5 text-gray-400 group-hover/item:text-[var(--color-safety)] transition-colors" />
                                      </div>
                                      <div className="flex flex-col pt-0.5">
                                        <span className="text-sm font-bold text-white group-hover/item:text-[var(--color-safety)] transition-colors line-clamp-1">
                                          {dropItem.name}
                                        </span>
                                        <span className="text-[11px] text-gray-400 leading-tight mt-1 line-clamp-2">
                                          {dropItem.desc}
                                        </span>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                            
                            {/* Zone B: Featured Banner (35%) */}
                            <div className="w-[35%] bg-gradient-to-b from-zinc-800/50 to-zinc-900 p-6 border-l border-zinc-800 flex flex-col justify-center relative overflow-hidden group/banner">
                              {/* Background Pattern/Glow */}
                              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-safety)]/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover/banner:opacity-100 opacity-50"></div>
                              
                              <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-zinc-950 border border-zinc-800/80 text-[var(--color-safety)] flex items-center justify-center mb-4 shadow-inner">
                                  <Gift className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-bold tracking-widest text-[var(--color-safety)] uppercase mb-1">Najobľúbenejší darček</span>
                                <h4 className="text-lg font-display tracking-wide text-white uppercase italic mb-2">Poukazy</h4>
                                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                                  Darujte nezabudnuteľný zážitok na najväčšej krytej strelnici.
                                </p>
                                <Link 
                                  to="/darcekovy-poukaz"
                                  onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))}
                                  className="w-full py-2.5 rounded-lg bg-[var(--color-safety)] text-black text-sm font-bold tracking-wider uppercase transition-all hover:bg-yellow-400 flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(251,188,5,0.4)]"
                                >
                                  Kúpiť poukaz
                                  <ArrowRight className="w-4 h-4" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-[var(--color-forest)]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 flex flex-col w-64 relative overflow-hidden">
                            <div className="relative z-10 flex flex-col gap-1">
                              {item.dropdown.map((dropItem) => (
                                <Link 
                                  key={dropItem.name} 
                                  to={dropItem.href}
                                  onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))}
                                  className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group/item"
                                >
                                  <span className="text-sm font-bold text-white/90 group-hover/item:text-[var(--color-safety)] transition-colors">
                                    {dropItem.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}`;

if (code.includes(renderTarget)) {
  code = code.replace(renderTarget, renderReplacement);
  fs.writeFileSync('src/components/Layout.tsx', code);
  console.log("Success");
} else {
  console.log("Render target not found!");
}
