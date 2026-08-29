const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

// 1. Add activeMegaTab state
const stateInsertionPoint = "const [mobileDropdownOpen, setMobileDropdownOpen] = useState<Record<string, boolean>>({});";
if (code.includes(stateInsertionPoint) && !code.includes("activeMegaTab")) {
    code = code.replace(
        stateInsertionPoint,
        `${stateInsertionPoint}\n  const [activeMegaTab, setActiveMegaTab] = useState<string>('vsetky');`
    );
}

// 2. Replace Navigation Array
const navStart = code.indexOf('const navigation = [');
const navEnd = code.indexOf('];', navStart) + 2;

const newNav = `const navigation = [
    { 
      name: 'STRELNICA',
      href: '/strelnica',
      type: 'dropdown',
      dropdown: [
        { name: 'O STRELNICI', href: '/strelnica#o-nas' },
        { name: 'NAŠE ZÁZEMIE', href: '/strelnica#zazemie' },
        { name: 'ZBRANE A VYBAVENIE', href: '/cennik' },
        { name: 'AKO SA K NÁM DOSTANETE', href: '/kontakt' }
      ],
      dropdownBottom: { text: 'Bratislava', icon: MapPin, href: '/kontakt' }
    },
    { 
      name: 'KURZY',
      href: '/kurzy',
      type: 'mega-medium',
      dropdown: [
        { name: 'Príprava na Zbrojný Preukaz', href: '/zbrojny-preukaz' },
        { name: 'Teoretická príprava', href: '/teoreticka-priprava' },
        { name: 'Psychotesty', href: '/psychotesty' },
        { name: 'Základný kurz streľby', href: '/zakladny-kurz' },
        { name: 'Taktický výcvik', href: '/takticky-vycvik' },
        { name: 'Individuálny tréning', href: '/kontakt' }
      ],
      megaMenu: {
        title: 'Vzdelávanie, bezpečnosť a strelecké zručnosti',
        cols: [
          {
            title: 'ZBROJNÝ PREUKAZ',
            items: [
              { name: 'Príprava na ZP', icon: Shield, href: '/zbrojny-preukaz' },
              { name: 'Teoretická príprava', icon: BookOpen, href: '/teoreticka-priprava' },
              { name: 'Psychotesty', icon: Brain, href: '/psychotesty' }
            ]
          },
          {
            title: 'STRELECKÉ TRÉNINGY',
            items: [
              { name: 'Základný kurz streľby', icon: Target, href: '/zakladny-kurz' },
              { name: 'Taktický výcvik', icon: Crosshair, href: '/takticky-vycvik' },
              { name: 'Individuálny tréning', icon: User, href: '/kontakt' }
            ]
          }
        ],
        bottomBar: 'Profesionálni inštruktori · Bezpečnosť · Prax',
        allLink: { name: 'VŠETKY KURZY', href: '/kurzy' },
        promo: {
          title: 'Príprava na ZP',
          subtitle: 'KOMPLETNÝ BALÍČEK',
          icon: ShieldCheck,
          accentColor: '#FBBF24',
          bg: 'bg-zinc-950',
          hoverBg: 'hover:bg-zinc-900',
          textColor: 'text-white',
          linkText: 'Zobraziť kurz',
          href: '/zbrojny-preukaz'
        }
      }
    },
    { 
      name: 'STRELECKÉ BALÍČKY',
      href: '/strelecke-balicky',
      type: 'mega-dynamic',
      dropdown: [
        { name: 'Všetky balíčky', href: '/strelecke-balicky' },
        { name: 'Balíček Štandard', href: '/strelecke-balicky' },
        { name: 'Balíček Akcia', href: '/strelecke-balicky' },
        { name: 'Balíček VIP', href: '/strelecke-balicky' },
        { name: 'Balíček Rande', href: '/strelecke-balicky' }
      ],
      megaMenu: {
        sidebarLinks: [
          { id: 'vsetky', name: 'Všetky balíčky', icon: LayoutGrid, href: '/strelecke-balicky' },
          { id: 'jednotlivci', name: 'Pre jednotlivcov', icon: User, href: '/strelecke-balicky#jednotlivci' },
          { id: 'pary', name: 'Pre páry', icon: Users, href: '/strelecke-balicky#pary' },
          { id: 'skupiny', name: 'Pre skupiny', icon: Users, href: '/strelecke-balicky#skupiny' }
        ],
        content: {
          'vsetky': {
            title: 'NAJOBĽÚBENEJŠIE BALÍČKY',
            subtitle: 'Zážitková streľba pre jednotlivcov, páry aj skupiny.',
            items: [
              { name: 'BALÍČEK ŠTANDARD', desc: 'Základný zážitok', icon: Target, href: '/strelecke-balicky' },
              { name: 'BALÍČEK AKCIA', desc: 'Viac zbraní, viac streľby', icon: Crosshair, href: '/strelecke-balicky' },
              { name: 'BALÍČEK VIP', desc: 'Prémiový zážitok', icon: Award, href: '/strelecke-balicky' },
              { name: 'BALÍČEK RANDE', desc: 'Zážitok pre dvoch', icon: Users, href: '/strelecke-balicky' }
            ],
            allLink: { name: 'Všetky balíčky', href: '/strelecke-balicky' }
          },
          'jednotlivci': {
            title: 'PRE JEDNOTLIVCOV',
            subtitle: 'Zážitková streľba pre jedného.',
            items: [
              { name: 'BALÍČEK ŠTANDARD', desc: 'Základný zážitok', icon: Target, href: '/strelecke-balicky' },
              { name: 'BALÍČEK AKCIA', desc: 'Viac zbraní', icon: Crosshair, href: '/strelecke-balicky' },
              { name: 'BALÍČEK VIP', desc: 'Prémiový individuálny zážitok', icon: Award, href: '/strelecke-balicky' }
            ],
            allLink: { name: 'Zobraziť všetky balíčky pre jednotlivcov', href: '/strelecke-balicky#jednotlivci' }
          },
          'pary': {
            title: 'PRE PÁRY',
            subtitle: 'Zážitok, ktorý si užijete spolu.',
            items: [
              { name: 'BALÍČEK RANDE', desc: 'Netradičný zážitok vo dvojici', icon: Users, href: '/strelecke-balicky' },
              { name: 'BALÍČEK DUO', desc: 'Spoločná strelecká výzva', icon: Crosshair, href: '/strelecke-balicky' }
            ],
            allLink: { name: 'Zobraziť balíčky pre páry', href: '/strelecke-balicky#pary' }
          },
          'skupiny': {
            title: 'PRE SKUPINY',
            subtitle: 'Streľba pre partie a väčšie skupiny.',
            items: [
              { name: 'SKUPINOVÝ BALÍČEK', desc: 'Strelecký zážitok pre partiu', icon: Users, href: '/strelecke-balicky' },
              { name: 'TEAMBUILDING', desc: 'Firemná akcia na strelnici', icon: Briefcase, href: '/strelecke-balicky' }
            ],
            allLink: { name: 'Prezerať skupinové balíčky', href: '/strelecke-balicky#skupiny' }
          }
        },
        banners: [
          {
            title: 'Darčekové Poukazy',
            icon: Gift,
            accentColor: '#FBBF24',
            bg: 'bg-[#0f0f0f]',
            textColor: 'text-black',
            hoverBg: 'hover:bg-yellow-400',
            linkText: 'Kúpiť poukaz',
            href: '/darcekovy-poukaz'
          },
          {
            title: 'Teambuilding',
            subtitle: 'Pre firmy a skupiny',
            icon: Users,
            accentColor: '#22c55e',
            bg: 'bg-[#1a1f1a]',
            textColor: 'text-white',
            hoverBg: 'hover:bg-green-800',
            linkText: 'Zistiť viac',
            href: '/strelecke-balicky'
          }
        ]
      }
    },
    { 
      name: 'CENNÍK', 
      href: '/cennik',
      type: 'link'
    },
    { 
      name: 'ŠPORTOVÝ KLUB', 
      href: '/sportovy-klub-hdi',
      type: 'dropdown',
      dropdown: [
        { name: 'O KLUBE', href: '/sportovy-klub-hdi' },
        { name: 'ČLENSTVO', href: '/sportovy-klub-hdi#clenstvo' },
        { name: 'TRÉNINGY', href: '/sportovy-klub-hdi#treningy' },
        { name: 'KALENDÁR', href: '/sportovy-klub-hdi#kalendar' },
        { name: 'PRETEKÁRI', href: '/sportovy-klub-hdi#pretekari' }
      ]
    },
    { 
      name: 'DARČEKOVÉ POUKAZY', 
      href: '/darcekovy-poukaz',
      type: 'link',
      icon: Gift,
      accent: true
    },
    { 
      name: 'KONTAKT', 
      href: '/kontakt',
      type: 'link'
    }
  ];`;

code = code.substring(0, navStart) + newNav + code.substring(navEnd);

// 3. Replace Render block
const renderStart = code.indexOf('{navigation.map((item: any)');
const renderEnd = code.indexOf('</nav>', renderStart);

const newRender = `{navigation.map((item: any) => {
                  const TopIcon = item.icon || item.topIcon;
                  const megaMenu = item.megaMenu;
                  const isAccent = item.accent;
                  
                  return (
                  <div 
                    key={item.name} 
                    className="group h-full flex items-center"
                    onMouseEnter={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: false }))}
                    onMouseLeave={() => {
                        setClosedDropdowns(prev => ({ ...prev, [item.name]: false }));
                        if (item.type === 'mega-dynamic') setActiveMegaTab('vsetky');
                    }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))}
                      className={clsx(
                        'relative h-full transition-colors py-2 flex items-center gap-2 px-2.5 rounded-lg',
                        location.pathname === item.href ? 'text-[var(--color-safety)] bg-black/20' : 'text-gray-300 hover:text-white hover:bg-white/5',
                        isAccent && 'text-[var(--color-safety)] hover:text-yellow-400'
                      )}
                    >
                      {TopIcon && <TopIcon className={clsx("w-4 h-4", isAccent ? "" : "opacity-80 group-hover:opacity-100 transition-opacity")} />}
                      <span className={clsx("flex items-center gap-1 text-[13px] uppercase tracking-wider", isAccent ? "font-extrabold" : "font-bold text-white")}>
                        {item.name}
                        {(item.type !== 'link') && <ChevronDown className={clsx("w-3 h-3 transition-colors", isAccent ? "text-[var(--color-safety)]" : "text-gray-400 group-hover:text-[var(--color-safety)]")} />}
                      </span>
                      {/* Active Indicator Line */}
                      {location.pathname === item.href && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[var(--color-safety)] rounded-t-sm"></div>
                      )}
                    </Link>
                    
                    {/* Dropdowns */}
                    {item.type !== 'link' && !closedDropdowns[item.name] && (
                      <div className="absolute top-full left-0 w-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] flex justify-center">
                        
                        {/* SMALL DROPDOWN */}
                        {item.type === 'dropdown' && item.dropdown && (
                          <div className="w-64 bg-[#0A0A0A]/95 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-safety)]/60 to-transparent"></div>
                            <div className="p-2 flex flex-col">
                              {item.dropdown.map((dropItem: any, idx: number) => (
                                <Link
                                  key={idx}
                                  to={dropItem.href}
                                  onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))}
                                  className="px-4 py-3 text-sm font-bold text-gray-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors flex items-center gap-2 uppercase tracking-wide group/link"
                                >
                                  {dropItem.name} <ArrowRight className="w-3 h-3 ml-auto text-[var(--color-safety)] opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                                </Link>
                              ))}
                            </div>
                            {item.dropdownBottom && (
                              <div className="p-4 border-t border-zinc-800/80 bg-zinc-950 hover:bg-zinc-900 transition-colors">
                                <Link to={item.dropdownBottom.href} onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase w-full">
                                  {item.dropdownBottom.icon && <item.dropdownBottom.icon className="w-4 h-4 text-[var(--color-safety)]" />}
                                  {item.dropdownBottom.text}
                                </Link>
                              </div>
                            )}
                          </div>
                        )}

                        {/* MEGA MEDIUM (KURZY) */}
                        {item.type === 'mega-medium' && item.megaMenu && (
                          <div className="w-[900px] bg-[#0A0A0A]/95 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex relative">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-safety)]/60 to-transparent"></div>
                            
                            <div className="flex-1 flex flex-col">
                              <div className="p-8 border-b border-zinc-800/80 bg-zinc-900/50">
                                 <h3 className="text-xl font-bold text-white uppercase tracking-wider">{item.name}</h3>
                                 <p className="text-sm text-gray-400 mt-1">{item.megaMenu.title}</p>
                              </div>

                              <div className="flex bg-zinc-950/80 p-8 gap-8">
                                {item.megaMenu.cols.map((col: any, idx: number) => (
                                  <div key={idx} className="flex-1 flex flex-col gap-4">
                                    <h4 className="text-xs font-bold text-[var(--color-safety)] uppercase tracking-widest mb-2">{col.title}</h4>
                                    <div className="flex flex-col gap-2">
                                      {col.items.map((link: any, lidx: number) => (
                                        <Link key={lidx} to={link.href} onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))} className="flex items-center gap-3 p-3 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-[var(--color-safety)]/30 rounded-xl transition-all group/link">
                                          <div className="w-8 h-8 rounded-md bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover/link:border-[var(--color-safety)]/40 transition-colors">
                                            {link.icon && <link.icon className="w-4 h-4 text-[var(--color-safety)]" />}
                                          </div>
                                          <span className="text-sm font-bold text-gray-200 group-hover/link:text-white transition-colors">{link.name}</span>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="p-6 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between mt-auto">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{item.megaMenu.bottomBar}</span>
                                <Link to={item.megaMenu.allLink.href} onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))} className="text-xs font-bold text-[var(--color-safety)] hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1 group/all">
                                  {item.megaMenu.allLink.name} <ArrowRight className="w-4 h-4 group-hover/all:translate-x-1 transition-transform" />
                                </Link>
                              </div>
                            </div>

                            {/* Right Promo Sidebar */}
                            {item.megaMenu.promo && (
                               <div className="w-[280px] bg-zinc-950 p-6 border-l border-zinc-800/80 flex flex-col justify-center relative">
                                  <Link 
                                    to={item.megaMenu.promo.href}
                                    onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))}
                                    className={clsx(item.megaMenu.promo.bg, "border border-zinc-800 rounded-xl p-6 group/banner transition-all relative overflow-hidden flex flex-col")}
                                    style={{ borderColor: 'rgba(251, 188, 5, 0.3)' }}
                                  >
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--color-safety)]/10 rounded-full blur-2xl pointer-events-none"></div>
                                    
                                    <div className="flex items-center gap-2 mb-4 relative z-10">
                                      {item.megaMenu.promo.icon && <item.megaMenu.promo.icon className="w-5 h-5 text-[var(--color-safety)]" />}
                                      <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-safety)]">{item.megaMenu.promo.subtitle}</span>
                                    </div>
                                    
                                    <h4 className="text-2xl font-display font-bold tracking-wide text-white uppercase mb-6 relative z-10">
                                      {item.megaMenu.promo.title.split(' ').map((word: string, i: number, arr: any[]) => (
                                        <span key={i}>{word}{i < arr.length - 1 && <br/>}</span>
                                      ))}
                                    </h4>

                                    <span 
                                      className={clsx(
                                        "w-full text-xs font-bold tracking-wider uppercase transition-all px-4 py-3 rounded-lg text-center flex justify-center items-center gap-2 relative z-10",
                                        item.megaMenu.promo.textColor, item.megaMenu.promo.hoverBg
                                      )}
                                      style={{ backgroundColor: item.megaMenu.promo.accentColor, color: '#000' }}
                                    >
                                      {item.megaMenu.promo.linkText} <ArrowRight className="w-4 h-4" />
                                    </span>
                                  </Link>
                               </div>
                            )}
                          </div>
                        )}

                        {/* MEGA DYNAMIC (STRELECKÉ BALÍČKY) */}
                        {item.type === 'mega-dynamic' && item.megaMenu && (
                          <div className="w-[1100px] bg-[#0A0A0A]/95 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex relative">
                             <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-safety)]/60 to-transparent"></div>
                             
                             {/* Sidebar (Fixed 200px) */}
                             <div className="w-[200px] p-6 border-r border-zinc-800/80 bg-zinc-950/50 flex flex-col gap-2 shrink-0">
                               <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-2">Vyberte si</h4>
                               {item.megaMenu.sidebarLinks.map((link: any) => {
                                 const Icon = link.icon;
                                 const isActive = activeMegaTab === link.id;
                                 return (
                                   <div 
                                     key={link.id} 
                                     onMouseEnter={() => setActiveMegaTab(link.id)}
                                     onClick={() => {}} 
                                     className={clsx(
                                       "flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all cursor-pointer",
                                       isActive ? "bg-[var(--color-safety)] text-black shadow-[0_0_15px_rgba(251,188,5,0.15)]" : "text-gray-300 hover:text-white hover:bg-zinc-900"
                                     )}
                                   >
                                     {Icon && <Icon className={clsx("w-4 h-4", !isActive && "text-gray-500")} />} 
                                     <span className="text-sm">{link.name}</span>
                                   </div>
                                 );
                               })}
                             </div>
                             
                             {/* Dynamic Content (Flexible Middle ~600px) */}
                             <div className="flex-1 p-8 bg-zinc-950/80 flex flex-col relative overflow-hidden">
                               <AnimatePresence mode="wait">
                                 {item.megaMenu.content[activeMegaTab] && (
                                   <motion.div
                                     key={activeMegaTab}
                                     initial={{ opacity: 0, x: -10 }}
                                     animate={{ opacity: 1, x: 0 }}
                                     exit={{ opacity: 0, x: 10 }}
                                     transition={{ duration: 0.15 }}
                                     className="flex flex-col h-full"
                                   >
                                     <div className="mb-6">
                                       <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-1">{item.megaMenu.content[activeMegaTab].title}</h3>
                                       <p className="text-xs text-gray-400">{item.megaMenu.content[activeMegaTab].subtitle}</p>
                                       <div className="w-12 h-0.5 bg-[var(--color-safety)] mt-4"></div>
                                     </div>
                                     
                                     <div className="grid grid-cols-2 gap-4">
                                        {item.megaMenu.content[activeMegaTab].items.map((gridItem: any, idx: number) => {
                                          const GridIcon = gridItem.icon;
                                          return (
                                            <Link key={idx} to={gridItem.href} onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))} className="bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-[var(--color-safety)]/30 rounded-xl p-4 transition-all group/item flex flex-col gap-2 relative overflow-hidden">
                                              <div className="w-10 h-10 rounded-lg border border-zinc-800 flex items-center justify-center bg-zinc-950 mb-1 group-hover/item:border-[var(--color-safety)]/40 transition-colors">
                                                {GridIcon && <GridIcon className="w-5 h-5 text-[var(--color-safety)]" />}
                                              </div>
                                              <h4 className="text-sm font-bold text-white">{gridItem.name}</h4>
                                              <p className="text-[10px] text-gray-400 line-clamp-2">{gridItem.desc}</p>
                                              <ChevronRight className="w-4 h-4 text-gray-500 absolute bottom-4 right-4 group-hover/item:text-[var(--color-safety)] group-hover/item:translate-x-1 transition-all" />
                                            </Link>
                                          );
                                        })}
                                     </div>

                                     <div className="mt-auto pt-8">
                                       <Link to={item.megaMenu.content[activeMegaTab].allLink.href} onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))} className="text-[var(--color-safety)] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1 group/all">
                                         {item.megaMenu.content[activeMegaTab].allLink.name} <ArrowRight className="w-4 h-4 group-hover/all:translate-x-1 transition-transform" />
                                       </Link>
                                     </div>
                                   </motion.div>
                                 )}
                               </AnimatePresence>
                             </div>

                             {/* Banners (Fixed Right 300px) */}
                             <div className="w-[300px] bg-zinc-950 p-6 border-l border-zinc-800/80 flex flex-col gap-4 relative shrink-0">
                               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--color-safety)]/5 rounded-full blur-3xl"></div>
                               
                               {item.megaMenu.banners && item.megaMenu.banners.map((banner: any, idx: number) => (
                                 <Link 
                                   key={idx}
                                   to={banner.href}
                                   onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))}
                                   className={clsx(banner.bg, "border border-zinc-800 rounded-xl p-5 flex-1 group/banner transition-all relative overflow-hidden flex flex-col justify-between")}
                                   style={{ borderColor: idx === 0 ? 'rgba(251, 188, 5, 0.3)' : 'rgba(34, 197, 94, 0.3)' }}
                                 >
                                   <div>
                                     {banner.subtitle && (
                                       <div className="flex items-center gap-2 mb-3">
                                         {banner.icon && <banner.icon className={clsx("w-4 h-4", banner.accentColor)} style={{ color: banner.accentColor }} />}
                                         <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: banner.accentColor }}>{banner.subtitle}</span>
                                       </div>
                                     )}
                                     {!banner.subtitle && banner.icon && (
                                       <div className="flex items-center gap-2 mb-3">
                                         <banner.icon className="w-4 h-4" style={{ color: banner.accentColor }} />
                                       </div>
                                     )}
                                     <h4 className="text-xl font-display font-bold tracking-wide text-white uppercase mb-2">
                                       {banner.title.split(' ').map((word: string, i: number, arr: any[]) => (
                                         <span key={i}>{word}{i < arr.length - 1 && <br/>}</span>
                                       ))}
                                     </h4>
                                   </div>
                                   <span 
                                     className={clsx(
                                       "w-full text-xs font-bold tracking-wider uppercase transition-all px-4 py-3 rounded-lg text-center flex justify-center items-center gap-2",
                                       banner.textColor, banner.hoverBg
                                     )}
                                     style={{ backgroundColor: banner.accentColor }}
                                   >
                                     {banner.linkText} <ArrowRight className="w-4 h-4" />
                                   </span>
                                 </Link>
                               ))}
                             </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  );
                })}`;

code = code.substring(0, renderStart) + newRender + code.substring(renderEnd);
fs.writeFileSync('src/components/Layout.tsx', code);
console.log("Nav fully updated to intent-based model.");
