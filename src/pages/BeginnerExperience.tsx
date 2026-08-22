import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ShieldCheck, UserCheck, Target, ChevronRight, ChevronLeft, Star, Award, ArrowRight, Zap, Users, Shield, Info, MapPin, X } from 'lucide-react';
import Link from '../components/Link';
import Modal, { ReservationModal } from '../components/Modal';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

const MobileCarousel = ({ children, itemCount }: { children: React.ReactNode, itemCount: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const firstChild = scrollRef.current.children[0] as HTMLElement;
    if (!firstChild) return;
    
    const itemWidth = firstChild.offsetWidth + 16;
    const newIndex = Math.round(scrollLeft / itemWidth);
    
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < itemCount) {
      setCurrentIndex(newIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const firstChild = scrollRef.current.children[0] as HTMLElement;
    if (!firstChild) return;
    
    const itemWidth = firstChild.offsetWidth + 16;
    scrollRef.current.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full">
      <style>{`
        @keyframes arrow-shake-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-6px); opacity: 0.3; }
        }
        @keyframes arrow-shake-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(6px); opacity: 0.3; }
        }
        .animate-arrow-left {
          animation: arrow-shake-left 2s ease-in-out infinite;
        }
        .animate-arrow-right {
          animation: arrow-shake-right 2s ease-in-out infinite;
        }
      `}</style>

      {currentIndex > 0 && (
        <button 
          onClick={() => scrollTo(currentIndex - 1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-[var(--color-safety)] p-1 md:hidden drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
        >
          <ChevronLeft className="w-12 h-12 animate-arrow-left" strokeWidth={3} />
        </button>
      )}

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-3 md:gap-8 md:pb-0 md:mx-0 md:px-0 md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-stretch"
      >
        {children}
      </div>

      {currentIndex < itemCount - 1 && (
        <button 
          onClick={() => scrollTo(currentIndex + 1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 text-[var(--color-safety)] p-1 md:hidden drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
        >
          <ChevronRight className="w-12 h-12 animate-arrow-right" strokeWidth={3} />
        </button>
      )}

      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {Array.from({ length: itemCount }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-[var(--color-safety)] w-6 shadow-[0_0_8px_rgba(251,188,5,0.6)]' : 'bg-white/20 w-2 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function BeginnerExperience() {
  const [activeTab, setActiveTab] = useState<'zazitkove' | 'nove' | 'dalsie'>('zazitkove');
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const steps = [
    { icon: <UserCheck className="w-8 h-8 text-[var(--color-safety)]" />, title: t('beginner.step1Title'), desc: t('beginner.step1Desc') },
    { icon: <ShieldCheck className="w-8 h-8 text-[var(--color-safety)]" />, title: t('beginner.step2Title'), desc: t('beginner.step2Desc') },
    { icon: <Target className="w-8 h-8 text-[var(--color-safety)]" />, title: t('beginner.step3Title'), desc: t('beginner.step3Desc') },
  ];

  const tabs = [
    { id: 'zazitkove', label: 'Zážitkové balíky', icon: <Star className="w-5 h-5" /> },
    { id: 'nove', label: 'Nové strelecké balíčky', icon: <Zap className="w-5 h-5" /> },
    { id: 'dalsie', label: 'Ďalšie strelecké balíky', icon: <Target className="w-5 h-5" /> },
  ];

  const renderPackageName = (name: string) => {
    const parts = name.split(/(„LEGENDARY(?: EXTRA)?“)/);
    return parts.map((part, i) => 
      part.startsWith('„LEGENDARY') ? <span key={i} className="text-[var(--color-safety)]">{part}</span> : part
    );
  };

  const PackageCard = ({ pkg }: { pkg: any; key?: string }) => {
    const isPopular = ['FIRST TIME', 'HUNTER GLOCK Multikaliber', 'Balíček HUNTER „LEGENDARY“', 'ACTION HERO'].includes(pkg.name);

    // Helper to parse details into weapon objects
    const parseDetails = (details: string[] | any) => {
      if (!Array.isArray(details)) return [];
      return details
        .map(detail => {
          // Match "10 výstrelov Glock 19" or "10 shots Glock 19" or "10 rán Glock 19"
          const match = detail.match(/(\d+)\s+(?:výstrelov|shots|rán|výstrely)\s+(.*)/i);
          if (match) {
            const name = match[2];
            return {
              count: match[1],
              name: name,
              image: name.toLowerCase().includes('ak47') || name.toLowerCase().includes('puška') || name.toLowerCase().includes('ar15') || name.toLowerCase().includes('kalashnikov')
                ? 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=300'
                : name.toLowerCase().includes('revolver')
                ? 'https://images.unsplash.com/photo-1593115057323-221990006710?auto=format&fit=crop&q=80&w=300'
                : 'https://images.unsplash.com/photo-1584282479929-c454736a9035?auto=format&fit=crop&q=80&w=300'
            };
          }
          return null;
        })
        .filter(Boolean) as { count: string; name: string; image: string }[];
    };

    const weaponDetails = parseDetails(pkg.details);
    const displayedWeapons = weaponDetails.slice(0, 4);
    const remainingCount = weaponDetails.length - 4;

    return (
      <div 
        className={`bg-[#1A1A1A] rounded-2xl overflow-hidden border shadow-lg flex flex-col h-full relative group hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl ${
          isPopular 
            ? 'border-[var(--color-safety)] shadow-[0_0_30px_rgba(251,188,5,0.15)]' 
            : 'border-white/10 hover:border-[var(--color-safety)]/50'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-safety)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="p-6 pb-0 relative z-10 flex justify-between items-start gap-4">
          <div>
            <h3 className="text-2xl font-display font-bold text-white uppercase leading-tight mb-1">
              {renderPackageName(pkg.name)}
            </h3>
            <p className="text-[var(--color-safety)] text-sm font-bold uppercase tracking-wider mb-4">
              {isPopular ? t('beginner.popularBadge') : t('beginner.standardBadge')}
            </p>
          </div>
          {isPopular && (
            <div className="bg-[var(--color-safety)] text-black text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-lg shrink-0 mt-1">
              TOP
            </div>
          )}
        </div>
        
        <div className="p-6 flex-grow flex flex-col relative z-10">
          <div className="space-y-6 flex-grow">
            {weaponDetails.length > 0 ? (
              <>
                {displayedWeapons.map((weapon, idx) => (
                  <div key={idx} className="flex items-center gap-4 group/item border-b border-white/10 pb-4 last:border-0">
                    <div className="flex-grow">
                      <div className="text-[11px] font-bold uppercase tracking-tight text-gray-300 mb-2">{weapon.name}</div>
                      <div className="relative h-14 w-full overflow-hidden">
                        <img 
                          src={weapon.image} 
                          alt={weapon.name}
                          className="w-full h-full object-contain mix-blend-multiply grayscale group-hover/item:grayscale-0 transition-all duration-500 scale-110 group-hover/item:scale-125 opacity-70 group-hover/item:opacity-100"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full border border-white/10 shrink-0">
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/3039/3039364.png" 
                        alt="ammo" 
                        className="w-4 h-4 opacity-40 group-hover/item:opacity-100 transition-opacity invert"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-xs font-bold text-white">{weapon.count}x</div>
                    </div>
                  </div>
                ))}
                {remainingCount > 0 && (
                  <button 
                    onClick={() => setSelectedPackage(pkg)}
                    className="w-full text-center text-[10px] font-bold uppercase tracking-widest text-[var(--color-safety)] hover:text-white transition-colors pt-2"
                  >
                    {t('beginner.moreWeapons').replace('{count}', remainingCount.toString())}
                  </button>
                )}
              </>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-300 italic text-sm">{pkg.desc}</p>
                <div className="mt-6 flex justify-center gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-2 border border-white/10">
                      <Zap className="w-6 h-6 text-[var(--color-safety)]" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{t('beginner.rounds')}</span>
                    <span className="text-sm font-bold text-white">{pkg.rounds}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-2 border border-white/10">
                      <Target className="w-6 h-6 text-[var(--color-safety)]" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{t('beginner.guns')}</span>
                    <span className="text-sm font-bold text-white">{pkg.guns}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="flex flex-col gap-1 mb-8">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-300">
                <span>{t('beginner.groupSize')}</span>
                <span>{t('beginner.pricePerPerson')}</span>
              </div>
              <div className="flex justify-between items-center bg-[var(--color-safety)] text-black px-4 py-3 rounded-sm shadow-lg">
                <span className="font-bold italic">{t('beginner.group10Plus')}</span>
                <span className="text-2xl font-display font-bold italic">{pkg.price}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-2 text-gray-300 text-xs font-bold">
                <span>{t('beginner.group6to9')}</span>
                <span>{parseInt(pkg.price.replace('€', '')) + 5}€</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setIsReservationModalOpen(true)}
                className="bg-[var(--color-safety)] text-black hover:bg-yellow-400 py-3 rounded-sm font-bold uppercase tracking-wider transition-all text-xs flex items-center justify-center"
              >
                {t('beginner.buyBtn')}
              </button>
              <button 
                onClick={() => setSelectedPackage(pkg)}
                className="bg-transparent text-white border border-white/20 py-3 rounded-sm font-sans font-bold tracking-wider hover:bg-white/5 transition-all uppercase text-xs flex items-center justify-center gap-2"
              >
                {t('beginner.moreInfoBtn')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Shared Background Wrapper */}
      <div className="relative">
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img 
            style={{ y: backgroundY }}
            src="/hunterclubglock.webp" 
            alt="Background" 
            className="w-full h-[130vh] object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-[#0D0D0D]/40"></div>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative min-h-[50vh] flex items-center pt-32 pb-6 md:pt-40 md:pb-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                
                {/* Left Content */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-3xl"
                >
                  <Breadcrumbs items={[{ name: t('beginner.breadcrumb') }]} />
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-[2px] bg-[var(--color-safety)]"></span>
                    <span className="text-[var(--color-safety)] font-bold tracking-[0.3em] uppercase text-xs">
                      {t('beginner.heroBadge')}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display leading-[1.1] tracking-tight mb-4 uppercase italic text-white">
                    {t('beginner.heroTitle')} <span className="text-[var(--color-safety)]">{t('beginner.heroTitleHighlight')}</span>
                  </h1>
                  <p className="text-[20px] leading-[28px] text-white mb-4 font-medium max-w-2xl border-l-4 border-[var(--color-safety)] pl-4 md:pl-6">
                    {t('beginner.heroDesc')}
                  </p>
                  <p className="text-sm text-gray-400 mb-8 md:mb-10 pl-4 md:pl-6">
                    {t('beginner.vatInfo')}
                  </p>
                  <div className="flex flex-wrap gap-6 items-center">
                    <button 
                      onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                      className="w-full sm:w-auto justify-center bg-[var(--color-safety)] text-[var(--color-tactical)] px-6 py-3 md:px-8 md:py-4 h-[54px] md:h-[60px] rounded-sm font-display text-xl font-bold tracking-widest hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(251,188,5,0.3)] flex items-center gap-2 uppercase italic"
                    >
                      {t('beginner.heroBtn')}
                      <ChevronRight className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                    </button>
                  </div>
                </motion.div>

                {/* Right Feature Stack */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-4 md:gap-6 lg:items-end w-full lg:w-auto"
                >
                  <div className="flex items-center gap-4 bg-[var(--color-forest)]/90 backdrop-blur-md p-4 md:p-5 rounded-sm border border-white/10 w-full lg:w-80 justify-start md:justify-start text-left flex-row">
                    <Shield className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-safety)] shrink-0" />
                    <div>
                      <div className="font-bold text-base md:text-lg uppercase tracking-wider font-sans text-white">{t('beginner.feat1Title')}</div>
                      <div className="text-xs md:text-sm text-white/80 font-sans">{t('beginner.feat1Desc')}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-[var(--color-forest)]/90 backdrop-blur-md p-4 md:p-5 rounded-sm border border-white/10 w-full lg:w-80 justify-start md:justify-start text-left flex-row">
                    <UserCheck className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-safety)] shrink-0" />
                    <div>
                      <div className="font-bold text-base md:text-lg uppercase tracking-wider font-sans text-white">{t('beginner.feat2Title')}</div>
                      <div className="text-xs md:text-sm text-white/80 font-sans">{t('beginner.feat2Desc')}</div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

      {/* The Process */}
      <section id="how-it-works" className="py-12 relative z-10 scroll-mt-32 md:scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1A1A]/90 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 md:p-12">
            <h2 className="text-5xl font-display mb-16 text-center italic uppercase text-white">
              {t('beginner.processTitle')} <span className="text-[var(--color-safety)]">{t('beginner.processTitleHighlight')}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              {steps.map((step, idx) => (
                <div key={idx} className="text-center flex flex-col items-center group bg-[var(--color-forest)] p-8 rounded-2xl border border-white/5 hover:border-[var(--color-safety)]/30 transition-all duration-300">
                  <div className="w-24 h-24 bg-[var(--color-safety)] rounded-full flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    {React.cloneElement(step.icon as React.ReactElement, { className: 'w-10 h-10 text-black' })}
                  </div>
                  <h3 className="text-2xl font-display mb-4 uppercase italic tracking-wider text-white">{step.title}</h3>
                  <p className="text-white/80 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link 
                to="/strelecke-balicky"
                className="bg-[var(--color-safety)] text-[var(--color-tactical)] px-12 py-5 rounded-sm font-display text-2xl font-bold tracking-widest hover:bg-yellow-400 transition-all flex items-center gap-3 shadow-2xl uppercase italic"
              >
                {t('beginner.processBtn')}
                <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
      </div>

      {/* License Upsell Banner */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1A1A]/90 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-forest)] opacity-5 blur-[80px] -mr-32 -mt-32 group-hover:opacity-10 transition-opacity"></div>
            <div className="flex items-center gap-8 relative z-10">
              <div className="bg-[var(--color-forest)] p-5 rounded-full shadow-[0_0_30px_rgba(251,188,5,0.15)]">
                <Award className="w-10 h-10 text-[var(--color-safety)]" />
              </div>
              <div>
                <h3 className="text-3xl font-display uppercase italic text-white mb-2">{t('beginner.upsellTitle')}</h3>
                <p className="text-gray-300 max-w-md font-medium">{t('beginner.upsellDesc')}</p>
              </div>
            </div>
            <Link 
              to="/zbrojny-preukaz"
              className="relative z-10 bg-[var(--color-safety)] text-black px-10 py-4 rounded-sm font-display text-xl font-bold tracking-widest hover:bg-yellow-400 transition-all flex items-center gap-3 uppercase italic"
            >
              {t('beginner.upsellBtn')} <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-display mb-16 text-center italic uppercase text-white">
            {t('beginner.testiTitle')} <span className="text-[var(--color-safety)]">{t('beginner.testiTitleHighlight')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: t('beginner.testi1Name'), text: t('beginner.testi1Text') },
              { name: t('beginner.testi2Name'), text: t('beginner.testi2Text') }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-[#1A1A1A]/90 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl hover:border-[var(--color-safety)]/50">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-safety)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[var(--color-safety)] text-[var(--color-safety)]" />)}
                  </div>
                  <p className="text-white italic mb-6 text-lg leading-relaxed">"{testimonial.text}"</p>
                  <div className="font-bold text-[var(--color-safety)] uppercase tracking-widest text-sm">{testimonial.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modals */}
      <ReservationModal isOpen={isReservationModalOpen} onClose={() => setIsReservationModalOpen(false)} />
      
      <Modal 
        isOpen={!!selectedPackage} 
        onClose={() => setSelectedPackage(null)} 
        title={selectedPackage ? selectedPackage.name : ''}
        className="bg-[var(--color-forest)]"
      >
        {selectedPackage && (
          <div className="space-y-8">
            <div>
              <div className="text-4xl font-display text-white mb-2">{selectedPackage.price}</div>
              <p className="text-white italic">{selectedPackage.desc}</p>
            </div>

            <div className="bg-black/20 p-6 rounded-sm border border-white/5">
              <h5 className="text-[var(--color-safety)] font-display uppercase italic mb-4 tracking-wider">{t('beginner.modalContent')}</h5>
              <ul className="space-y-3">
                {(() => {
                  const details = selectedPackage.details;
                  
                  if (Array.isArray(details)) {
                    return details.map((detail: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-white">
                        <Target className="w-5 h-5 text-[var(--color-safety)] shrink-0 mt-0.5" />
                        <span className="font-medium">{detail}</span>
                      </li>
                    ));
                  }
                  
                  return (
                    <>
                      <li className="flex items-start gap-3 text-white">
                        <Zap className="w-5 h-5 text-[var(--color-safety)] shrink-0 mt-0.5" />
                        <span className="font-medium">{selectedPackage.rounds}</span>
                      </li>
                      <li className="flex items-start gap-3 text-white">
                        <Target className="w-5 h-5 text-[var(--color-safety)] shrink-0 mt-0.5" />
                        <span className="font-medium">{selectedPackage.guns}</span>
                      </li>
                    </>
                  );
                })()}
              </ul>
            </div>

            <div className="bg-black/20 p-6 rounded-sm border border-black/5">
              <h5 className="text-[var(--color-safety)] font-display uppercase italic mb-4 tracking-wider">{t('beginner.modalIncludes')}</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-white text-sm font-bold">
                  <Shield className="w-4 h-4 text-[var(--color-safety)]" /> {t('beginner.modalInc1')}
                </div>
                <div className="flex items-center gap-2 text-white text-sm font-bold">
                  <Star className="w-4 h-4 text-[var(--color-safety)]" /> {t('beginner.modalInc2')}
                </div>
                <div className="flex items-center gap-2 text-white text-sm font-bold">
                  <Target className="w-4 h-4 text-[var(--color-safety)]" /> {t('beginner.modalInc3')}
                </div>
                <div className="flex items-center gap-2 text-white text-sm font-bold">
                  <Shield className="w-4 h-4 text-[var(--color-safety)]" /> {t('beginner.modalInc4')}
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setSelectedPackage(null);
                setIsReservationModalOpen(true);
              }}
              className="w-full bg-[var(--color-safety)] text-[var(--color-tactical)] py-6 rounded-sm font-display text-2xl font-bold tracking-widest hover:bg-yellow-400 transition-all shadow-xl uppercase italic flex items-center justify-center gap-3"
            >
              {t('beginner.modalReserveBtn')} <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
