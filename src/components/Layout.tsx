import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail, ChevronRight, MessageSquare, ChevronDown, Globe } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import Link from './Link';
import { useLanguage } from '../contexts/LanguageContext';


function TrustBox() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadWidget = () => {
      if (typeof window !== 'undefined' && (window as any).Trustpilot && ref.current) {
        try {
          (window as any).Trustpilot.loadFromElement(ref.current, true);
        } catch (e) {
          console.error("Trustpilot load error", e);
        }
      }
    };

    loadWidget();
    
    let attempts = 0;
    const interval = setInterval(() => {
      if ((window as any).Trustpilot) {
        loadWidget();
        clearInterval(interval);
      }
      attempts++;
      if (attempts > 10) clearInterval(interval);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="trustpilot-widget" 
      ref={ref} 
      data-locale="en-US" 
      data-template-id="56278e9abfbbba0bdcd568bc" 
      data-businessunit-id="6749bb127a770a6694f98344" 
      data-style-height="52px" 
      data-style-width="100%" 
      data-token="68693b31-0c27-414a-b3bd-969ac1d46fcb"
    >
      <a href="https://www.trustpilot.com/review/hunterclub.sk" target="_blank" rel="noopener">Trustpilot</a>
    </div>
  );
}

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCounselorOpen, setIsCounselorOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [aktualityData, setAktualityData] = useState<any>(null);
  const [translatedAktuality, setTranslatedAktuality] = useState<Record<string, string>>({});
  const [closedDropdowns, setClosedDropdowns] = useState<Record<string, boolean>>({});
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    fetch('/content/aktuality.json')
      .then(res => res.json())
      .then(async data => {
        if (data && data.length > 0) {
          const item = data[0];
          setAktualityData(item);
          
          const translations: Record<string, string> = {};
          
          if (item.body) {
            // Translate to English
            try {
              const resEn = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=sk&tl=en&dt=t&q=${encodeURIComponent(item.body)}`);
              const dataEn = await resEn.json();
              translations.en = dataEn[0].map((x: any) => x[0]).join('');
            } catch (e) {
              console.error("Auto-translate EN failed", e);
            }
            
            // Translate to German
            try {
              const resDe = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=sk&tl=de&dt=t&q=${encodeURIComponent(item.body)}`);
              const dataDe = await resDe.json();
              translations.de = dataDe[0].map((x: any) => x[0]).join('');
            } catch (e) {
              console.error("Auto-translate DE failed", e);
            }
          }
          
          setTranslatedAktuality(translations);
        }
      })
      .catch(err => console.error("Error loading aktuality:", err));
  }, []);

  const currentAktualityMessage = aktualityData 
    ? (language === 'en' && translatedAktuality.en) ? translatedAktuality.en
    : (language === 'de' && translatedAktuality.de) ? translatedAktuality.de
    : aktualityData.body
    : null;

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as any);
    setIsLangOpen(false);
    
    const parts = location.pathname.split('/');
    if (['sk', 'en', 'de'].includes(parts[1])) {
      parts[1] = lang;
      navigate(parts.join('/') + location.search, { replace: true });
    } else {
      navigate(`/${lang}${location.pathname}${location.search}`, { replace: true });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: t('nav.strelnica'), href: '/strelnica' },
    { name: t('nav.baliky'), href: '/strelecke-balicky' },
    { name: t('nav.cennik'), href: '/cennik' },
    { 
      name: t('nav.kurzy'), 
      href: '/kurzy',
      dropdown: [
        { name: t('nav.zbrojak'), href: '/zbrojny-preukaz' },
        { name: t('nav.zakladnyKurz'), href: '/zakladny-kurz' },
        { name: t('nav.teoretickaPriprava'), href: '/teoreticka-priprava' },
        { name: t('nav.psychotesty'), href: '/psychotesty' },
        { name: t('nav.taktickyVycvik'), href: '/takticky-vycvik' },
      ]
    },
    { name: t('nav.sportClub'), href: '/sportovy-klub-hdi' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-tactical)] text-white font-sans">
      <header 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={clsx(
        "fixed w-full top-0 z-50 transition-all duration-300",
        isScrolled || isMenuOpen || isHovered
          ? "bg-[var(--color-forest)]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-transparent"
      )}>
        {/* ... (header content remains same) ... */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={clsx(
            "flex items-center transition-all duration-300",
            isScrolled || isMenuOpen || isHovered ? "h-20" : "h-20 md:h-24"
          )}>
            <div className="flex-1 min-w-0 flex items-center mr-2 sm:mr-4">
              <Link 
                to="/" 
                className={clsx(
                  "flex items-center gap-2 sm:gap-3 group transition-all duration-300 max-w-full",
                  isScrolled || isMenuOpen || isHovered 
                    ? "hover:scale-[1.02]" 
                    : ""
                )}
              >
                <div className="bg-white rounded-full p-1 shadow-md shrink-0">
                  <img 
                    src="/images/logohunterclubstrelnica.png" 
                    alt="Hunter Club Logo" 
                    className={clsx(
                      "w-auto transition-all duration-300 rounded-full",
                      isScrolled || isMenuOpen || isHovered ? "h-10" : "h-10 md:h-12"
                    )}
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <span className={clsx(
                  "font-display tracking-wider font-bold transition-all duration-300 leading-tight",
                  isScrolled || isMenuOpen || isHovered ? "text-sm sm:text-base md:text-xl text-white" : "text-base sm:text-lg md:text-2xl text-white",
                  "whitespace-normal max-w-[130px] sm:max-w-[200px] lg:max-w-none"
                )}>
                  {t('brandName')}
                </span>
              </Link>
            </div>
            
            <div className="flex-none flex items-center justify-end">
              <nav className="hidden md:flex space-x-8 h-full items-center mr-8">
                {navigation.map((item) => (
                  <div 
                    key={item.name} 
                    className="relative group h-full flex items-center"
                    onMouseEnter={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: false }))}
                    onMouseLeave={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: false }))}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))}
                      className={clsx(
                        'text-sm font-bold uppercase tracking-wider transition-colors py-2 flex items-center gap-1',
                        location.pathname === item.href ? 'text-white border-b-2 border-white' : 'text-white hover:text-[var(--color-safety)]'
                      )}
                    >
                      {item.name}
                      {item.dropdown && <ChevronDown className="w-4 h-4" />}
                    </Link>
                    
                    {item.dropdown && !closedDropdowns[item.name] && (
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
                    )}
                  </div>
                ))}
              </nav>

              <div className="hidden md:flex items-center gap-4">
                {/* Language Switcher */}
                <div className="relative" onMouseEnter={() => setIsLangOpen(true)} onMouseLeave={() => setIsLangOpen(false)}>
                  <button className="flex items-center gap-2 text-white hover:text-[var(--color-safety)] transition-colors py-2">
                    <img src={`https://flagcdn.com/${language === 'en' ? 'gb' : language}.svg`} width="20" alt={language} className="rounded-sm" />
                    <span className="font-bold uppercase">{language}</span>
                    <ChevronDown className={clsx("w-4 h-4 transition-transform duration-300", isLangOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {isLangOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 pt-2 z-50"
                      >
                        <div className="bg-[var(--color-forest)]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 flex flex-col min-w-[120px]">
                          <button onClick={() => handleLanguageChange('sk')} className={clsx("flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-left", language === 'sk' && "text-[var(--color-safety)]")}>
                            <img src="https://flagcdn.com/sk.svg" width="20" alt="sk" className="rounded-sm" /> <span className="font-bold">SK</span>
                          </button>
                          <button onClick={() => handleLanguageChange('de')} className={clsx("flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-left", language === 'de' && "text-[var(--color-safety)]")}>
                            <img src="https://flagcdn.com/de.svg" width="20" alt="de" className="rounded-sm" /> <span className="font-bold">DE</span>
                          </button>
                          <button onClick={() => handleLanguageChange('en')} className={clsx("flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-left", language === 'en' && "text-[var(--color-safety)]")}>
                            <img src="https://flagcdn.com/gb.svg" width="20" alt="en" className="rounded-sm" /> <span className="font-bold">EN</span>
                          </button>
                          <button onClick={() => handleLanguageChange('ru')} className={clsx("flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-left", language === 'ru' && "text-[var(--color-safety)]")}>
                            <img src="https://flagcdn.com/ru.svg" width="20" alt="ru" className="rounded-sm" /> <span className="font-bold">RU</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/kontakt"
                  className="relative group overflow-hidden bg-[var(--color-safety)]/20 backdrop-blur-md border border-[var(--color-safety)]/30 text-white px-8 py-3 rounded-xl font-display text-lg font-bold tracking-widest hover:bg-[var(--color-safety)] hover:text-[var(--color-tactical)] hover:shadow-[0_0_30px_rgba(251,188,5,0.4)] transition-all duration-300 flex items-center gap-2"
                >
                  <span className="relative z-10">{t('nav.kontakt').toUpperCase()}</span>
                  <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-4 ml-auto">
              <div className="relative">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 text-white hover:text-[var(--color-safety)] transition-colors py-2"
                >
                  <span className="text-xl leading-none">
                    {language === 'sk' ? '🇸🇰' : language === 'de' ? '🇩🇪' : language === 'ru' ? '🇷🇺' : '🇬🇧'}
                  </span>
                  <ChevronDown className={clsx("w-4 h-4 transition-transform duration-300", isLangOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 pt-2 z-50"
                    >
                      <div className="bg-[var(--color-forest)]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 flex flex-col min-w-[120px]">
                        <button onClick={() => handleLanguageChange('sk')} className={clsx("flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-left", language === 'sk' && "text-[var(--color-safety)]")}>
                          <img src="https://flagcdn.com/sk.svg" width="20" alt="sk" className="rounded-sm" /> <span className="font-bold">SK</span>
                        </button>
                        <button onClick={() => handleLanguageChange('de')} className={clsx("flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-left", language === 'de' && "text-[var(--color-safety)]")}>
                          <img src="https://flagcdn.com/de.svg" width="20" alt="de" className="rounded-sm" /> <span className="font-bold">DE</span>
                        </button>
                        <button onClick={() => handleLanguageChange('en')} className={clsx("flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-left", language === 'en' && "text-[var(--color-safety)]")}>
                          <img src="https://flagcdn.com/gb.svg" width="20" alt="en" className="rounded-sm" /> <span className="font-bold">EN</span>
                        </button>
                        <button onClick={() => handleLanguageChange('ru')} className={clsx("flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-left", language === 'ru' && "text-[var(--color-safety)]")}>
                          <img src="https://flagcdn.com/ru.svg" width="20" alt="ru" className="rounded-sm" /> <span className="font-bold">RU</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[var(--color-safety)] hover:text-yellow-400 p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Announcement Bar */}
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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[var(--color-forest)]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 skew-x-[20deg] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-safety)]/5 skew-x-[-20deg] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
            
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 relative z-10">
              {navigation.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center">
                    <Link
                      to={item.href}
                      className={clsx(
                        'flex-grow px-3 py-2 rounded-md text-lg font-medium uppercase tracking-wider flex items-center justify-between',
                        location.pathname === item.href
                          ? 'bg-black/20 text-white'
                          : 'text-white hover:bg-black/10 hover:text-white'
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setMobileDropdownOpen(prev => ({ ...prev, [item.name]: !prev[item.name] }));
                        }}
                        className="p-2 text-white hover:bg-black/10 rounded-md ml-2"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${mobileDropdownOpen[item.name] ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {item.dropdown && mobileDropdownOpen[item.name] && (
                    <div className="pl-6 space-y-1 mt-1 mb-2">
                      {item.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          to={dropItem.href}
                          className="block px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider text-gray-300 hover:bg-black/10 hover:text-white"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/kontakt"
                className="block w-full text-center mt-6 bg-[var(--color-safety)]/20 backdrop-blur-md border border-[var(--color-safety)]/30 text-white px-6 py-4 rounded-xl font-display text-xl font-bold tracking-widest hover:bg-[var(--color-safety)] hover:text-[var(--color-tactical)] transition-all shadow-lg flex items-center justify-center gap-2 uppercase italic"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.kontakt')}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-10 md:pt-12">
        <Outlet />
      </main>

      {/* Shooting Counselor Widget */}
      <div className="fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {isCounselorOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-20 right-0 w-80 bg-[var(--color-slate)] border border-white/10 rounded-sm shadow-2xl overflow-hidden"
            >
              <div className="bg-[var(--color-emergency)] p-4 flex justify-between items-center">
                <h4 className="font-display tracking-wider">{t('counselor.title')}</h4>
                <button onClick={() => setIsCounselorOpen(false)} className="text-white/50 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-6 text-sm">{t('counselor.greeting')}</p>
                <div className="space-y-3">
                  <Link
                    to="/som-tu-prvykrat"
                    onClick={() => setIsCounselorOpen(false)}
                    className="block w-full text-center bg-[var(--color-forest)] text-white py-3 rounded-sm font-display tracking-wider hover:bg-[#5A6124] transition-colors"
                  >
                    {t('counselor.beginner')}
                  </Link>
                  <Link
                    to="/som-profesional"
                    onClick={() => setIsCounselorOpen(false)}
                    className="block w-full text-center bg-white/10 text-white py-3 rounded-sm font-display tracking-wider hover:bg-white/20 transition-colors"
                  >
                    {t('counselor.pro')}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsCounselorOpen(!isCounselorOpen)}
          className="bg-[var(--color-emergency)] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>

      <footer className="bg-[#050505] border-t border-white/10 pt-16 relative z-10 overflow-hidden">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-safety)] to-transparent opacity-50"></div>
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link to="/" className="flex items-center gap-3 mb-6 group inline-flex">
                <div className="bg-white rounded-full p-1 shadow-md">
                  <img src="/images/logohunterclubstrelnica.png" alt="Hunter Club Logo" className="h-10 w-auto rounded-full" referrerPolicy="no-referrer" />
                </div>
                <span className="text-2xl font-display tracking-wider font-bold text-white group-hover:text-[var(--color-safety)] transition-colors">
                  HUNTER CLUB
                </span>
              </Link>
              <p className="text-gray-400 font-medium max-w-sm mb-8 leading-relaxed">
                {t('footer.about')}
              </p>
              <div className="flex space-x-5">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[var(--color-safety)] hover:text-white hover:border-[var(--color-safety)] transition-all duration-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[var(--color-safety)] hover:text-white hover:border-[var(--color-safety)] transition-all duration-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Navigation Column */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-display tracking-widest mb-6 text-white uppercase italic flex items-center gap-2">
                <span className="w-4 h-1 bg-[var(--color-safety)] block"></span>
                {t('footer.navigation')}
              </h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-gray-400 hover:text-[var(--color-safety)] transition-colors flex items-center gap-2 group">
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-[var(--color-safety)]" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours Column */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-display tracking-widest mb-6 text-white uppercase italic flex items-center gap-2">
                <span className="w-4 h-1 bg-[var(--color-safety)] block"></span>
                {t('footer.hours')}
              </h3>
              <ul className="space-y-2 text-sm text-gray-400 mb-6">
                <li className="flex justify-between border-b border-white/5 pb-2 font-medium"><span>{t('footer.monFri')}</span> <span className="text-white">09:00 - 21:00</span></li>
                <li className="flex justify-between border-b border-white/5 pb-2 font-medium"><span>{t('footer.satSun')}</span> <span className="text-white">09:00 - 21:00</span></li>
              </ul>
              <div className="bg-[var(--color-safety)]/10 border-l-2 border-[var(--color-safety)] p-3 rounded-r-sm">
                <p className="text-[11px] font-bold text-[var(--color-safety)] uppercase tracking-wider leading-relaxed">
                  {t('footer.warning')}
                </p>
              </div>
            </div>

            {/* Contact Column */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-display tracking-widest mb-6 text-white uppercase italic flex items-center gap-2">
                <span className="w-4 h-1 bg-[var(--color-safety)] block"></span>
                {t('footer.contact')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400 group">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-safety)]/20 transition-colors">
                    <MapPin className="w-4 h-4 text-[var(--color-safety)]" />
                  </div>
                  <div className="text-sm flex flex-col pt-1">
                    <span className="font-bold text-white mb-1">HUNTER CLUB, s.r.o.</span>
                    <span className="text-white font-medium">Kamenné námestie 1A (OD PRIOR)</span>
                    <span className="text-white">811 08 Bratislava</span>
                    <span className="text-xs text-gray-400 mt-2">{t('footer.entrance')}</span>
                    <span className="text-xs text-gray-400">{t('footer.floor')}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-gray-400 group">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-safety)]/20 transition-colors">
                    <Phone className="w-4 h-4 text-[var(--color-safety)]" />
                  </div>
                  <div className="text-sm flex flex-col pt-1">
                    <a href="tel:0911650032" className="text-white hover:text-[var(--color-safety)] transition-colors mb-1">0911 650 032</a>
                    <span className="text-xs">Miroslav Chrenko [DE]: 0904 650 035</span>
                    <span className="text-xs">Juraj Hodul [EN]: 0902 630 643</span>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-gray-400 group">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-safety)]/20 transition-colors">
                    <Mail className="w-4 h-4 text-[var(--color-safety)]" />
                  </div>
                  <a href="mailto:info@hunterclub.sk" className="text-sm hover:text-[var(--color-safety)] transition-colors pt-1">info@hunterclub.sk</a>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-white/5 text-[11px] text-gray-500 flex flex-col gap-1.5 uppercase tracking-wider">
                <span className="flex justify-between"><span>{t('footer.ico')}:</span> <span className="text-gray-400">47822368</span></span>
                <span className="flex justify-between"><span>{t('footer.dic')}:</span> <span className="text-gray-400">SK2024113817</span></span>
                <span className="flex justify-between"><span>{t('footer.license')}:</span> <span className="text-gray-400">LA000114</span></span>
              </div>
            </div>
          </div>
        </div>
        

        {/* TrustBox widget - Review Collector */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
          <div className="w-full flex justify-center">
            <TrustBox />
          </div>
        </div>
        {/* End TrustBox widget */}

        {/* Bottom Bar */}
        <div className="bg-black/50 py-6 border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              &copy; {new Date().getFullYear()} Hunter Club Bratislava. {t('footer.rights')}
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-wider text-gray-500">
              <Link to="/ochrana-osobnych-udajov" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
              <Link to="/obchodne-podmienky" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
              <Link to="/action" className="text-[var(--color-safety)] hover:text-white transition-colors flex items-center gap-1">
                {t('nav.action')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
