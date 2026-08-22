import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronRight, ChevronLeft, Phone, Mail, Info, MapPin, Target, Zap, Shield, Star, X, Calendar, User, Headphones, ShieldCheck, UserCheck } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Link from '../components/Link';
import ShowcaseCard from '../components/ShowcaseCard';
import { ALL_PACKAGES, PACKAGE_CATEGORIES } from '../constants/packages';
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
    
    // Width of item + gap (16px)
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

      {/* Left Arrow */}
      {currentIndex > 0 && (
        <button 
          onClick={() => scrollTo(currentIndex - 1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-[var(--color-safety)] p-1 md:hidden drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
        >
          <ChevronLeft className="w-12 h-12 animate-arrow-left" strokeWidth={3} />
        </button>
      )}

      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-3 md:gap-8 md:pb-0 md:mx-0 md:px-0 md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-stretch"
      >
        {children}
      </div>

      {/* Right Arrow */}
      {currentIndex < itemCount - 1 && (
        <button 
          onClick={() => scrollTo(currentIndex + 1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 text-[var(--color-safety)] p-1 md:hidden drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
        >
          <ChevronRight className="w-12 h-12 animate-arrow-right" strokeWidth={3} />
        </button>
      )}

      {/* Pagination Dots */}
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

export default function Baliky() {
  const location = useLocation();
  const { t } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Všetky');

  const filteredPackages = useMemo(() => {
    if (activeCategory === 'Všetky') {
      return [...ALL_PACKAGES].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/\D/g, ''), 10) || 0;
        const priceB = parseInt(b.price.replace(/\D/g, ''), 10) || 0;
        return priceA - priceB;
      });
    }
    return ALL_PACKAGES.filter(pkg => pkg.category === activeCategory);
  }, [activeCategory]);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const PackageCard = ({ pkg }: { pkg: any; key?: string }) => {
    return (
      <ShowcaseCard 
        pkg={pkg}
        subtitle={t('showcaseCard.subtitle')}
        image={getPackageImage(pkg.name)}
        highlights={[]}
        details={pkg.details}
        onInfoClick={(p) => setSelectedPackage(p)}
        onBuyClick={() => setIsReservationModalOpen(true)}
      />
    );
  };

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const getPackageImage = (name: string) => {
    if (name === 'FIRST TIME') return '/hunterclubglock.webp';
    if (name === 'ACTION HERO') return '/hunterclubzbrane.webp';
    return '/hunterclubstreleckybalicek.webp';
  };

  return (
    <div className="flex flex-col">
      {/* Shared Background Wrapper */}
      <div className="relative">
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img 
            style={{ y: backgroundY }}
            src="/hunterclubshooting.webp" 
            alt="Background" 
            className="w-full h-[130vh] object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/50 to-[#0D0D0D]/10"></div>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative min-h-[40vh] flex items-center pt-32 pb-8 md:pt-40 md:pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Breadcrumbs items={[{ name: t('nav.baliky') }]} />
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-[var(--color-safety)]"></span>
              <span className="text-[var(--color-safety)] font-bold tracking-[0.3em] uppercase text-xs">
                {t('baliky.heroBadge')}
              </span>
            </div>
            <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display mb-6 uppercase italic text-white">
              {t('baliky.heroTitle')} <span className="text-[var(--color-safety)]">{t('baliky.heroTitleHighlight')}</span>
            </h1>
            <p className="text-[20px] leading-[28px] text-white mb-4 font-medium max-w-2xl border-l-4 border-[var(--color-safety)] pl-6">
              {t('baliky.heroDesc')}
            </p>
            <p className="text-sm text-gray-400 mb-10 pl-6">
              {t('baliky.vatInfo')}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md w-[240px] h-[60px] rounded-sm border border-white/10 shadow-2xl justify-center">
                <ShieldCheck className="w-6 h-6 text-[var(--color-safety)]" />
                <div className="text-[20px] leading-[28px] font-display text-white font-bold tracking-widest uppercase italic">
                  {t('baliky.safeExperience')}
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md w-[240px] h-[60px] rounded-sm border border-white/10 shadow-2xl justify-center">
                <UserCheck className="w-6 h-6 text-[var(--color-safety)]" />
                <div className="text-[20px] leading-[28px] font-display text-white font-bold tracking-widest uppercase italic">
                  {t('baliky.instructorIncluded')}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

          
          {/* Categories Filter & Packages Grid */}
          <section className="py-12 md:py-16 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mb-12">
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                  {PACKAGE_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-display text-sm md:text-base tracking-widest transition-all uppercase italic flex items-center gap-2 ${
                        activeCategory === category 
                          ? 'bg-[var(--color-safety)] text-black shadow-lg' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {category === 'Všetky' && <Star className="w-4 h-4 md:w-5 md:h-5" />}
                      {category === 'Bestsellery & Zážitky' && <Target className="w-4 h-4 md:w-5 md:h-5" />}
                      {category === 'Vojenské & Legendy' && <Shield className="w-4 h-4 md:w-5 md:h-5" />}
                      {category === 'GLOCK Zóna' && <Zap className="w-4 h-4 md:w-5 md:h-5" />}
                      {category === 'Streľba na výber' && <Star className="w-4 h-4 md:w-5 md:h-5" />}
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.key} pkg={pkg} />
                ))}
              </div>
            </div>
          </section>
      </div>
      </div>

      {/* Info Bar */}
      <section className="py-12 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[var(--color-safety)]/30 shadow-[0_0_30px_rgba(251,188,5,0.1)] relative group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_40px_rgba(251,188,5,0.2)] hover:border-[var(--color-safety)]/60 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-safety)]/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[var(--color-safety)]/10 flex items-center justify-center shrink-0 border border-[var(--color-safety)]/20">
                <Info className="w-8 h-8 text-[var(--color-safety)]" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-display text-2xl md:text-3xl font-bold tracking-wider uppercase italic leading-tight text-white">
                  {t('baliky.infoText')}
                </span>
                <span className="text-[var(--color-safety)] font-bold tracking-wider uppercase text-sm">
                  {t('baliky.infoSubtext')}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsReservationModalOpen(true)}
              className="relative z-10 bg-[var(--color-safety)] text-black w-[240px] h-[60px] rounded-sm font-display text-[20px] leading-[28px] font-bold tracking-widest hover:bg-yellow-400 transition-all uppercase italic shadow-2xl flex items-center justify-center gap-3 shrink-0"
            >
              {t('baliky.checkAvailability')} <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Gift Voucher Section */}
      <section className="py-24 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/10 shadow-lg relative group hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl hover:border-[var(--color-safety)]/50 flex flex-col md:flex-row">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-safety)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Image Side */}
            <div className="md:w-2/5 relative min-h-[300px] md:min-h-full shrink-0">
              <img 
                src="/hunterclubzbrane.webp" 
                alt="Gift Voucher" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1A1A1A] to-transparent"></div>
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 relative z-10 flex flex-col justify-center flex-grow">
              <div className="inline-block bg-[var(--color-safety)] text-black text-[10px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider shadow-lg self-start mb-6">
                {t('baliky.giftVoucherBadge')}
              </div>
              <h2 className="text-4xl md:text-5xl font-display mb-4 uppercase italic leading-tight text-white">
                {t('baliky.giftVoucherTitle')} <span className="text-[var(--color-safety)]">{t('baliky.giftVoucherTitleHighlight')}</span>
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                {t('baliky.giftVoucherDesc')}
              </p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-4 text-gray-300">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                    <Mail className="w-5 h-5 text-[var(--color-safety)]" />
                  </div>
                  <div>
                    <div className="font-bold uppercase text-xs text-gray-400 tracking-wider">{t('baliky.electronic')}</div>
                    <div className="text-white text-sm">{t('baliky.electronicDesc')}</div>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-gray-300">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                    <MapPin className="w-5 h-5 text-[var(--color-safety)]" />
                  </div>
                  <div>
                    <div className="font-bold uppercase text-xs text-gray-400 tracking-wider">{t('baliky.post')}</div>
                    <div className="text-white text-sm">{t('baliky.postDesc')}</div>
                  </div>
                </li>
              </ul>

              <div className="pt-6 border-t border-white/10 mt-auto">
                <Link
                  to="/darcekovy-poukaz"
                  className="inline-flex items-center justify-center gap-3 bg-[var(--color-safety)] text-black px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-yellow-400 transition-all text-sm w-full md:w-auto"
                >
                  {t('baliky.buyAsGift')} <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ReservationModal isOpen={isReservationModalOpen} onClose={() => setIsReservationModalOpen(false)} />
      
      <Modal 
        isOpen={!!selectedPackage} 
        onClose={() => setSelectedPackage(null)} 
        title={selectedPackage ? t(`packages.${selectedPackage.key}.name`) : ''}
        className="bg-[#1A1A1A] !rounded-2xl !border-[var(--color-safety)]/30 !shadow-[0_0_40px_rgba(251,188,5,0.15)]"
      >
        {selectedPackage && (
          <div className="space-y-8 relative z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-safety)]/5 to-transparent pointer-events-none -m-8 p-8 h-[200px] opacity-50"></div>
            
            <div className="relative z-10">
              <div className="text-4xl font-display text-white mb-2">{selectedPackage.price}</div>
            </div>

            <div className="bg-black/40 p-6 rounded-xl border border-white/5 relative z-10">
              <h5 className="text-[var(--color-safety)] font-display uppercase italic mb-4 tracking-wider">{t('baliky.modalContent')}</h5>
              <ul className="space-y-3">
                {(t(`packages.${selectedPackage.key}.details`) as unknown as string[]).map((detail: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <Target className="w-5 h-5 text-[var(--color-safety)] shrink-0 mt-0.5" />
                    <span className="font-medium">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-black/40 p-6 rounded-xl border border-white/5 relative z-10">
              <h5 className="text-[var(--color-safety)] font-display uppercase italic mb-4 tracking-wider">{t('baliky.modalExtra')}</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-300 text-sm font-bold">
                  <Shield className="w-4 h-4 text-[var(--color-safety)]" /> {t('baliky.modalExtraItems.entry')}
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm font-bold">
                  <Star className="w-4 h-4 text-[var(--color-safety)]" /> {t('baliky.modalExtraItems.instructor')}
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm font-bold">
                  <Target className="w-4 h-4 text-[var(--color-safety)]" /> {t('baliky.modalExtraItems.targets')}
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm font-bold">
                  <Shield className="w-4 h-4 text-[var(--color-safety)]" /> {t('baliky.modalExtraItems.protection')}
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
              {t('baliky.bookPhone')} <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
