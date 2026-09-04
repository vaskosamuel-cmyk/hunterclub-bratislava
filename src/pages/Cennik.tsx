import { useState, useMemo } from 'react';
import { Filter, Target, Shield, Star } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

export default function Cennik() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Tabs are dynamic based on language
  const tabs = useMemo(() => [
    { id: 'drah' as const, label: t('pricing.tabs.drah'), icon: Target },
    { id: 'zbrani' as const, label: t('pricing.tabs.zbrani'), icon: Shield },
  ], [t]);

  const [activeTab, setActiveTab] = useState<'drah' | 'zbrani'>('drah');

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const pricingData = useMemo(() => ({
    drah: t('pricing.items.drah', { returnObjects: true }),
    zbrani: t('pricing.items.zbrani', { returnObjects: true }),
  }), [t]);

  const filteredItems = useMemo(() => {
    const data = pricingData[activeTab];
    return Array.isArray(data) ? data : [];
  }, [pricingData, activeTab]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Shared Background Wrapper */}
        <div className="relative">
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.img 
              style={{ y: backgroundY }}
              src="/hunterclubstreleckybalicek.webp" 
              alt="Background" 
              className="w-full h-[130vh] object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/50 to-[#0D0D0D]/10"></div>
          </div>

          <div className="relative z-10">
            {/* Hero Section */}
            <section className="relative min-h-[50vh] flex items-center pt-32 pb-12 md:pt-40 md:pb-24 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-3xl"
                >
                  <Breadcrumbs items={[{ name: t('nav.cennik') }]} />
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-[2px] bg-[var(--color-safety)]"></span>
                    <span className="text-[var(--color-safety)] font-bold tracking-[0.3em] uppercase text-xs">
                      {t('pricing.heroBadge')}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display tracking-tight mb-4 uppercase italic text-white">
                    {t('pricing.heroTitle')} <span className="text-[var(--color-safety)]">{t('pricing.heroTitleHighlight')}</span>
                  </h1>
                  <p className="text-[20px] leading-[28px] text-white mb-8 md:mb-10 font-medium max-w-2xl border-l-4 border-[var(--color-safety)] pl-4 md:pl-6">
                    {t('pricing.heroDesc')}
                  </p>
                </motion.div>
              </div>
            </section>

            <div className="pb-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--color-forest)]/90 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative p-6 md:p-10">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 skew-x-[20deg] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-safety)]/5 skew-x-[-20deg] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-8 mb-12">
                <div className="flex flex-wrap gap-2 md:gap-4 bg-black/20 p-1.5 rounded-2xl border border-white/5">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 rounded-xl font-display text-base md:text-lg tracking-widest transition-all uppercase italic flex items-center gap-2 ${
                          activeTab === tab.id 
                            ? 'bg-[var(--color-safety)] text-black shadow-lg' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => navigate('/strelecke-balicky')}
                    className="px-6 py-3 rounded-xl font-display text-base md:text-lg tracking-widest transition-all uppercase italic flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/5"
                  >
                    <Star className="w-5 h-5" />
                    {t('pricing.tabs.packages')}
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item: any, idx: number) => (
                    <div key={idx} className="bg-[#1A1A1A]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-lg relative group hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl hover:border-[var(--color-safety)]/50 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-safety)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10 flex items-start md:items-center gap-6 flex-grow">
                        <div>
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                            <h3 className="text-xl font-display font-bold text-white uppercase leading-tight">
                              {item.item}
                            </h3>
                            {item.subtitle && (
                              <span className="text-[var(--color-safety)] text-xs font-bold uppercase tracking-wider bg-[var(--color-safety)]/10 px-2 py-1 rounded-sm w-fit">
                                {item.subtitle}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative z-10 flex flex-col items-start md:items-end shrink-0 md:pl-6 md:border-l border-white/10 mt-4 md:mt-0 w-full md:w-auto">
                        <div className="text-3xl font-display font-bold text-[var(--color-safety)] leading-none">{item.price}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{item.unit}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-16 text-center bg-black/20 rounded-2xl border border-white/5">
                    <div className="flex flex-col items-center gap-4">
                      <p className="text-gray-400 italic text-lg">{t('pricing.noItems')}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-safety)]/10 flex items-center justify-center shrink-0">
                    <Filter className="w-6 h-6 text-[var(--color-safety)]" />
                  </div>
                  <p className="text-gray-300 text-sm max-w-md">
                    {t('pricing.vatInfo')}
                  </p>
                </div>
                <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-display font-bold tracking-widest uppercase italic transition-all border border-white/10 whitespace-nowrap">
                  {t('pricing.downloadBtn')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    </>
  );
}
