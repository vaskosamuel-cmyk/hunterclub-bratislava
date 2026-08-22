import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronRight, Target, Shield, Users, Clock, MapPin, ArrowRight, Zap, Star, Mail, ChevronDown, Calendar, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Link from '../components/Link';
import WarningModal from '../components/WarningModal';
import ConsentBar from '../components/ConsentBar';
import { ReservationModal } from '../components/Modal';
import Modal from '../components/Modal';
import ShowcaseCard from '../components/ShowcaseCard';
import ParallaxSection from '../components/ParallaxSection';
import { ALL_PACKAGES } from '../constants/packages';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
  const [showInitialWarning, setShowInitialWarning] = useState(false);
  const [showCookiePopup, setShowCookiePopup] = useState(false);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const pathfinderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasSeenWarning = localStorage.getItem('hasSeenWarning');
    if (!hasSeenWarning) {
      setShowInitialWarning(true);
    } else {
      setShowCookiePopup(true);
    }
  }, []);

  const handleCloseWarning = () => {
    localStorage.setItem('hasSeenWarning', 'true');
    setShowInitialWarning(false);
    setShowCookiePopup(true);
  };

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPathfinder = () => {
    pathfinderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const benefits = [
    { icon: <Target className="w-6 h-6" />, label: t('home.benefits.weapons'), desc: t('home.benefits.weaponsDesc') },
    { icon: <Shield className="w-6 h-6" />, label: t('home.benefits.distance'), desc: t('home.benefits.distanceDesc') },
    { icon: <Users className="w-6 h-6" />, label: t('home.benefits.instructors'), desc: t('home.benefits.instructorsDesc') },
    { icon: <Clock className="w-6 h-6" />, label: t('home.benefits.open'), desc: t('home.benefits.openDesc') },
  ];

  const renderPackageName = (name: string) => {
    const parts = name.split(/(„LEGENDARY(?: EXTRA)?“)/);
    return parts.map((part, i) => 
      part.startsWith('„LEGENDARY') ? <span key={i} className="text-[var(--color-forest)]">{part}</span> : part
    );
  };

  const PackageCard = ({ pkg }: { pkg: any; key?: string }) => {
    const isPopular = ['FIRST TIME', 'HUNTER GLOCK Multikaliber', 'Balíček HUNTER „LEGENDARY“', 'ACTION HERO'].includes(pkg.name);

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
              {isPopular ? t('home.packageCard.popularBadge') : t('home.packageCard.standardBadge')}
            </p>
          </div>
          {isPopular && (
            <div className="bg-[var(--color-safety)] text-black text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-lg shrink-0 mt-1">
              TOP
            </div>
          )}
        </div>
        
        <div className="p-6 flex-grow flex flex-col relative z-10">
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            {pkg.desc}
          </p>
          
          <ul className="space-y-3 mb-8 flex-grow">
            {pkg.rounds && (
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <Zap className="w-4 h-4 text-[var(--color-safety)] shrink-0 mt-0.5" />
                <span>{pkg.rounds}</span>
              </li>
            )}
            {pkg.guns && (
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <Target className="w-4 h-4 text-[var(--color-safety)] shrink-0 mt-0.5" />
                <span>{pkg.guns}</span>
              </li>
            )}
            {pkg.details && pkg.details.map((detail: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                <svg className="w-4 h-4 text-[var(--color-safety)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span className="leading-snug">{detail}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-white/10">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-display font-bold text-white leading-none">{pkg.price}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{t('home.packageCard.perPerson')}</div>
              </div>
              <button 
                onClick={() => setIsReservationModalOpen(true)} 
                className="bg-[var(--color-safety)] text-black hover:bg-yellow-400 px-6 py-2 rounded-sm font-bold uppercase tracking-wider transition-all text-sm"
              >
                {t('home.packageCard.buyBtn')}
              </button>
            </div>
            <button 
              onClick={() => setSelectedPackage(pkg)} 
              className="w-full bg-transparent text-white border border-white/20 py-2 rounded-sm font-sans font-bold tracking-wider hover:bg-white/5 transition-all uppercase text-xs flex items-center justify-center gap-2"
            >
              {t('home.packageCard.moreInfoBtn')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const popularPackages = [
    ALL_PACKAGES.find(p => p.name === 'FIRST TIME') || ALL_PACKAGES[1],
    ALL_PACKAGES.find(p => p.name === 'Balíček HUNTER „LEGENDARY“') || ALL_PACKAGES[4],
    ALL_PACKAGES.find(p => p.name === 'ACTION HERO') || ALL_PACKAGES[2],
  ];

  const faqs = t('home.faq.items', { returnObjects: true }) as { q: string, a: string }[];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <div className="flex flex-col bg-black">
      <div className="relative">
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img 
            style={{ y: backgroundY }}
            src="/hunterclub3.webp" 
            alt="Background" 
            className="w-full h-[120vh] object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/50 to-[#0D0D0D]/10"></div>
        </div>
        
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative min-h-[100svh] flex items-center pt-32 pb-12 md:pt-40 md:pb-24">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-4xl"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-12 h-[2px] bg-[var(--color-safety)]"></span>
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-safety)] font-bold tracking-[0.3em] uppercase text-xs">
                  {t('home.heroBadge')}
                </span>
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display tracking-tight mb-4 uppercase italic text-white">
              {t('home.heroTitle')}<br />
              <span className="text-[var(--color-safety)]">{t('home.heroSubtitle')}</span>
            </h1>
            
            <div className="flex flex-col gap-4 mb-10 border-l-2 border-[var(--color-safety)]/30 pl-6">
              {[
                { text: t('home.heroBullets.safe'), icon: <Shield className="w-5 h-5" /> },
                { text: t('home.heroBullets.instructors'), icon: <Users className="w-5 h-5" /> },
                { text: t('home.heroBullets.arsenal'), icon: <Target className="w-5 h-5" /> }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="flex items-center gap-4"
                >
                  <div className="text-[var(--color-safety)] drop-shadow-[0_0_8px_rgba(251,188,5,0.4)]">
                    {item.icon}
                  </div>
                  <span className="text-[20px] leading-[28px] text-gray-200 font-display uppercase italic tracking-widest">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center mb-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex">
                <button
                  onClick={scrollToPathfinder}
                  className="w-[240px] h-[60px] justify-center bg-[var(--color-emergency)] text-white rounded-sm font-display text-[20px] leading-[28px] font-bold tracking-wider hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(255,68,68,0.3)] flex items-center gap-2"
                >
                  {t('home.bookNow')}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-2 mb-10"
            >
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-gray-300 text-sm font-medium uppercase tracking-widest">
                {t('home.rating')}
              </span>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Pathfinder (Bento) */}
      <section className="pt-8 md:pt-24 pb-24 relative">
        {/* Enhanced Benefits Overlap */}
        <div className="relative md:absolute md:top-0 left-1/2 -translate-x-1/2 md:-translate-y-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-20 mb-8 md:mb-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-6 md:p-8 bg-[var(--color-forest)]/20 backdrop-blur-md border border-white/20 rounded-sm relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-forest)]/10 to-transparent pointer-events-none"></div>
            
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="group cursor-default relative z-10"
              >
                <div className="flex items-start gap-2 md:gap-3 mb-1">
                  <div className="text-[var(--color-safety)] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <span className="font-display text-sm md:text-lg font-bold tracking-wider text-white group-hover:text-[var(--color-safety)] transition-colors break-words min-w-0 leading-tight">
                    {benefit.label}
                  </span>
                </div>
                <p className="text-[10px] text-white/90 font-medium uppercase tracking-widest ml-9 leading-tight">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div ref={pathfinderRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-32 md:scroll-mt-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative min-h-[450px] rounded-sm overflow-hidden group border-2 border-[var(--color-safety)]/50 hover:border-[var(--color-safety)] shadow-[0_0_15px_rgba(251,188,5,0.15)] transition-colors flex flex-col"
            >
              <img
                src="https://i.postimg.cc/76YN9sGZ/Gemini-Generated-Image-twsjc7twsjc7twsj.webp"
                alt="Beginner"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-95"></div>
              <div className="relative z-10 p-6 md:p-10 flex flex-col h-full justify-end flex-grow text-left">
                <div className="mb-4 mt-auto">
                  <span className="inline-block bg-[var(--color-safety)] text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter mb-2">{t('home.pathfinder.beginnerBadge')}</span>
                  <h3 className="text-3xl md:text-4xl font-display uppercase italic text-white">{t('home.pathfinder.beginnerTitle')}</h3>
                </div>
                <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
                  {t('home.pathfinder.beginnerDesc')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => navigate('/som-tu-prvykrat')}
                    className="bg-[var(--color-safety)] text-[var(--color-tactical)] w-[240px] h-[60px] rounded-sm font-display font-bold tracking-wider hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 text-[20px] leading-[28px]"
                  >
                    {t('home.pathfinder.beginnerBtn')} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative min-h-[450px] rounded-sm overflow-hidden group cursor-pointer border-2 border-red-600/50 hover:border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.15)] transition-colors flex flex-col"
            >
              <img
                src="https://i.postimg.cc/02fDWdvm/Gemini-Generated-Image-pkfvqspkfvqspkfv.webp"
                alt="Pro Shooter"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-95"></div>
              <div className="relative z-10 p-6 md:p-10 flex flex-col h-full justify-end flex-grow text-left">
                <div className="mb-4 mt-auto">
                  <span className="inline-block bg-[var(--color-emergency)] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter mb-2">{t('home.pathfinder.proBadge')}</span>
                  <h3 className="text-3xl md:text-4xl font-display uppercase italic text-white">{t('home.pathfinder.proTitle')}</h3>
                </div>
                <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
                  {t('home.pathfinder.proDesc')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => navigate('/som-profesional')} 
                    className="bg-[var(--color-emergency)] text-white w-[240px] h-[60px] rounded-sm font-display font-bold tracking-wider hover:bg-red-700 transition-all flex items-center justify-center gap-2 text-[20px] leading-[28px]"
                  >
                    {t('home.pathfinder.proBtn')} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      </div>
      </div>

      <ParallaxSection 
        bgImage="/hunterclubstrelnica1.webp"
        overlayClass="bg-gradient-to-b from-[#0D0D0D] via-[#0D0D0D]/40 to-[#0D0D0D]"
      >
      {/* How it works (Ako to prebieha) */}
      <section ref={howItWorksRef} className="py-24 relative bg-black scroll-mt-32 md:scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display mb-4 italic uppercase text-white">{t('home.process.title')} <span className="text-[var(--color-safety)]">{t('home.process.titleHighlight')}</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">{t('home.process.desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop - REMOVED */}
            
            {[
              { 
                step: "01", 
                title: t('home.process.step1Title'), 
                desc: t('home.process.step1Desc'),
                icon: <Calendar className="w-6 h-6 text-black" />
              },
              { 
                step: "02", 
                title: t('home.process.step2Title'), 
                desc: t('home.process.step2Desc'),
                icon: <Shield className="w-6 h-6 text-black" />
              },
              { 
                step: "03", 
                title: t('home.process.step3Title'), 
                desc: t('home.process.step3Desc'),
                icon: <Target className="w-6 h-6 text-black" />
              },
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 group pt-4">
                {/* Glow effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-[var(--color-safety)] rounded-full group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-10 blur-2xl"></div>
                
                <div className="bg-[var(--color-forest)] p-8 rounded-xl border border-white/5 shadow-lg h-full flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 hover:border-[var(--color-safety)]/30 relative overflow-hidden group-hover:shadow-[0_10px_40px_rgba(251,188,5,0.05)]">
                  
                  {/* Oversized background number */}
                  <div className="absolute -right-4 -bottom-4 text-7xl font-display font-bold text-white/[0.02] select-none pointer-events-none group-hover:text-[var(--color-safety)]/[0.05] transition-colors duration-500">
                    {item.step}
                  </div>

                  <div className="w-16 h-16 bg-[var(--color-safety)] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(251,188,5,0.3)] group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-display mb-3 text-white uppercase italic tracking-wide relative z-10">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed relative z-10">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => navigate('/strelecke-balicky')}
              className="bg-[var(--color-safety)] text-black w-[240px] h-[60px] rounded-sm font-display text-[20px] leading-[28px] font-bold tracking-widest hover:bg-yellow-400 transition-all flex items-center justify-center gap-3 shadow-2xl uppercase italic"
            >
              {t('home.process.btn')}
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Vyber balikov (Bento Grid) */}
      <section className="py-24 relative bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display mb-4 italic uppercase text-white">{t('home.packages.title')} <span className="text-[var(--color-safety)]">{t('home.packages.titleHighlight')}</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">{t('home.packages.desc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              ALL_PACKAGES.find(p => p.key === 'pistol_puska_22lr'),
              ALL_PACKAGES.find(p => p.key === 'cz_package'),
              ALL_PACKAGES.find(p => p.key === 'legendary')
            ].map((pkg, idx) => {
              if (!pkg) return null;
              
              const highlights = [
                ...(pkg.key === 'pistol_puska_22lr' ? [
                  { icon: <Zap />, label: t('home.packages.highlights.shots'), value: t('home.packages.highlights.pkg1Shots') },
                  { icon: <Target />, label: t('home.packages.highlights.guns'), value: t('home.packages.highlights.pkg1Guns') },
                  { icon: <Users />, label: t('home.packages.highlights.instructor'), value: t('home.packages.highlights.instructorValue') }
                ] : []),
                ...(pkg.key === 'cz_package' ? [
                  { icon: <Zap />, label: t('home.packages.highlights.shots'), value: t('home.packages.highlights.pkg2Shots') },
                  { icon: <Target />, label: t('home.packages.highlights.guns'), value: t('home.packages.highlights.pkg2Guns') },
                  { icon: <Users />, label: t('home.packages.highlights.instructor'), value: t('home.packages.highlights.instructorValue') }
                ] : []),
                ...(pkg.key === 'legendary' ? [
                  { icon: <Zap />, label: t('home.packages.highlights.shots'), value: t('home.packages.highlights.pkg3Shots') },
                  { icon: <Target />, label: t('home.packages.highlights.guns'), value: t('home.packages.highlights.pkg3Guns') },
                  { icon: <Users />, label: t('home.packages.highlights.instructor'), value: t('home.packages.highlights.instructorValue') }
                ] : [])
              ];

              return (
                <ShowcaseCard 
                  key={idx}
                  pkg={pkg}
                  subtitle={
                    pkg.key === 'pistol_puska_22lr' ? t('home.packages.subtitle1') :
                    pkg.key === 'cz_package' ? t('home.packages.subtitle2') :
                    pkg.key === 'legendary' ? t('home.packages.subtitle3') : ''
                  }
                  image="/hunterclubstreleckybalicek.webp"
                  highlights={highlights as any}
                  onInfoClick={(p) => setSelectedPackage(p)}
                  onBuyClick={() => setIsReservationModalOpen(true)}
                />
              );
            })}
          </div>
          
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => navigate('/strelecke-balicky')}
              className="bg-[var(--color-safety)] text-black w-[240px] h-[60px] rounded-sm font-display font-bold tracking-wider hover:bg-yellow-400 transition-all uppercase text-[20px] leading-[28px] italic flex items-center justify-center gap-2 group"
            >
              {t('home.packages.btn')} <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      </ParallaxSection>

      <ParallaxSection 
        bgImage="/hunterclubglock.webp"
        overlayClass="bg-gradient-to-b from-[#0D0D0D] via-[#0D0D0D]/80 to-[#0D0D0D]"
      >
      {/* FAQ Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display mb-4 italic uppercase text-white">{t('home.faq.title')} <span className="text-[var(--color-safety)]">{t('home.faq.titleHighlight')}</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">{t('home.faq.desc')}</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-[#1A1A1A] rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openFaq === index ? 'border-[var(--color-safety)] shadow-[0_0_20px_rgba(251,188,5,0.1)]' : 'border-white/10 hover:border-white/30'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-display text-xl tracking-wider uppercase text-white">{faq.q}</span>
                  <ChevronDown 
                    className={`w-6 h-6 text-[var(--color-safety)] transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-300 leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Hours */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-display mb-8 italic uppercase">{t('home.map.title')} <span className="text-[var(--color-safety)]">{t('home.map.titleHighlight')}</span></h2>
              <div className="space-y-8 mb-10">
                <div className="flex items-start gap-6">
                  <div className="bg-[var(--color-slate)] p-3 rounded-sm">
                    <MapPin className="w-6 h-6 text-[var(--color-safety)]" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 tracking-widest uppercase text-sm">{t('home.map.addressTitle')}</h4>
                    <p className="text-gray-300 whitespace-pre-line">{t('home.map.address')}</p>
                  </div>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Kamenn%C3%A9+n%C3%A1mestie+1A,+811+08+Bratislava"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-[var(--color-safety)] text-[var(--color-tactical)] px-10 py-4 rounded-sm font-display text-xl font-bold tracking-widest hover:bg-yellow-400 transition-all items-center gap-3"
              >
                {t('home.map.navBtn')} <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="h-[450px] bg-zinc-900 rounded-sm overflow-hidden border border-white/10 shadow-2xl relative">
              <iframe 
                src="https://maps.google.com/maps?q=V%C3%9AB%20bankomat%2C%20Kamenn%C3%A9%20n%C3%A1mestie%2C%20Bratislava&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                className="w-full h-full grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      </ParallaxSection>

      <ReservationModal isOpen={isReservationModalOpen} onClose={() => setIsReservationModalOpen(false)} />
      
      <WarningModal
        isOpen={showInitialWarning}
        onConfirm={handleCloseWarning}
        onCancel={handleCloseWarning}
      />
      
      <ConsentBar show={showCookiePopup} />

      <Modal 
        isOpen={!!selectedPackage} 
        onClose={() => setSelectedPackage(null)} 
        title={selectedPackage?.name || ''}
        className="bg-[var(--color-forest)]"
      >
        {selectedPackage && (
          <div className="space-y-8">
            <div>
              <div className="text-4xl font-display text-white mb-2">{selectedPackage.price}</div>
              <p className="text-white italic">{selectedPackage.desc}</p>
            </div>

            <div className="bg-black/20 p-6 rounded-sm border border-white/5">
              <h5 className="text-[var(--color-safety)] font-display uppercase italic mb-4 tracking-wider">{t('home.modal.content')}</h5>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-white">
                  <Zap className="w-5 h-5 text-[var(--color-safety)] shrink-0 mt-0.5" />
                  <span className="font-medium">{selectedPackage.rounds}</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <Target className="w-5 h-5 text-[var(--color-safety)] shrink-0 mt-0.5" />
                  <span className="font-medium">{selectedPackage.guns}</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/20 p-6 rounded-sm border border-black/5">
              <h5 className="text-[var(--color-safety)] font-display uppercase italic mb-4 tracking-wider">{t('home.modal.includes')}</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-white text-sm font-bold">
                  <Shield className="w-4 h-4 text-[var(--color-safety)]" /> {t('home.modal.inc1')}
                </div>
                <div className="flex items-center gap-2 text-white text-sm font-bold">
                  <Star className="w-4 h-4 text-[var(--color-safety)]" /> {t('home.modal.inc2')}
                </div>
                <div className="flex items-center gap-2 text-white text-sm font-bold">
                  <Target className="w-4 h-4 text-[var(--color-safety)]" /> {t('home.modal.inc3')}
                </div>
                <div className="flex items-center gap-2 text-white text-sm font-bold">
                  <Shield className="w-4 h-4 text-[var(--color-safety)]" /> {t('home.modal.inc4')}
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
              {t('home.modal.reserveBtn')} <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
