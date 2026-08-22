import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, MapPin, Mail, Shield, ChevronRight, BookOpen, CheckCircle2, Clock, CreditCard, PenTool } from 'lucide-react';
import Link from '../components/Link';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

export default function TeoretickaPriprava() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const { t } = useLanguage();

  const [dynamicDates, setDynamicDates] = useState<string[]>([]);

  useEffect(() => {
    fetch('/content/teoria.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const parsed = data.map((item: any) => item.date_text).filter(Boolean);
          setDynamicDates(parsed);
        }
      })
      .catch((err) => console.error('Error loading dynamic theory dates:', err));
  }, []);

  const fallbackDates = t('teoria.dates') as unknown as string[];
  const datesToDisplay = dynamicDates.length > 0 ? dynamicDates : fallbackDates;
  const included = t('teoria.includedItems') as unknown as string[];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Shared Background Wrapper */}
      <div className="relative">
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img 
            style={{ y: backgroundY }}
            src="/zbrojnypreukazhunterclub.webp" 
            alt="Background" 
            className="w-full h-[130vh] object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-[#0D0D0D]/40"></div>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative pt-32 md:pt-40 pb-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
              >
                <Breadcrumbs items={[{ name: t('nav.kurzy'), href: '/kurzy' }, { name: t('teoria.title1') + ' ' + t('teoria.title2') }]} />
                <div className="inline-block bg-[var(--color-tactical)] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-6">
                  {t('teoria.badge')}
                </div>
                <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display mb-6 uppercase italic text-white">
                  {t('teoria.title1')} <span className="text-[var(--color-safety)]">{t('teoria.title2')}</span>
                </h1>
                <p className="text-[20px] leading-[28px] text-white/80 mb-4 font-medium">
                  {t('teoria.desc')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-sm border border-white/10">
                    <Clock className="w-5 h-5 text-[var(--color-safety)]" />
                    <span className="font-bold text-white uppercase text-sm">{t('teoria.duration')}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                  <div className="bg-[var(--color-forest)]/90 backdrop-blur-md p-8 rounded-sm border border-white/5">
                    <h2 className="text-3xl font-display mb-6 uppercase italic text-white">{t('teoria.contentTitle')}</h2>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {t('teoria.contentDesc')}
                    </p>
                  </div>

                  <div className="bg-[var(--color-forest)]/90 backdrop-blur-md p-8 rounded-sm border border-white/5">
                    <h2 className="text-3xl font-display mb-6 uppercase italic text-white">{t('teoria.includedTitle')}</h2>
                    <ul className="space-y-4 mb-8">
                      {included.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-white">
                          <CheckCircle2 className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-gray-300 text-sm italic">
                        {t('teoria.includedNote')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-[var(--color-forest)]/90 backdrop-blur-md p-8 rounded-sm border border-white/5">
                    <h2 className="text-3xl font-display mb-6 uppercase italic text-white">{t('teoria.bringTitle')}</h2>
                    <div className="flex items-start gap-4 text-white">
                      <PenTool className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                      <span>{t('teoria.bringItem')}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 lg:sticky lg:top-32 h-fit">
                  <div className="bg-[var(--color-tactical)]/90 backdrop-blur-md p-8 rounded-sm border border-white/10">
                    <h3 className="text-2xl font-display mb-6 uppercase italic text-white">{t('teoria.detailsTitle')}</h3>
                    
                    <div className="space-y-6 mb-8">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                        <div>
                          <div className="font-bold uppercase text-xs text-gray-400 mb-1">{t('teoria.placeLabel')}</div>
                          <div className="text-white font-bold">{t('teoria.placeValue')}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 mb-8">
                      <div className="text-sm uppercase font-bold text-gray-400 mb-2">{t('teoria.priceLabel')}</div>
                      <div className="text-5xl font-display text-[var(--color-safety)]">{t('teoria.priceValue')}<span className="text-2xl text-gray-400">{t('teoria.priceUnit')}</span></div>
                      <div className="text-xs text-gray-400 mt-2">{t('teoria.priceNote')}</div>
                    </div>

                    <h4 className="font-bold uppercase text-xs text-gray-400 mb-4">{t('teoria.datesLabel')}</h4>
                    <div className="space-y-3 mb-8">
                      {datesToDisplay.map((date, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                          <Calendar className="w-4 h-4 text-[var(--color-safety)] shrink-0" />
                          <span className="text-white font-bold text-sm">{date}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-gray-300 mb-4 text-sm">
                      {t('teoria.applyDesc')}
                    </p>
                    <a
                      href="mailto:info@hunterclub.sk"
                      className="w-full bg-[var(--color-safety)] text-[var(--color-tactical)] py-4 rounded-sm font-display text-xl font-bold tracking-widest hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 uppercase italic shadow-[0_0_20px_rgba(251,188,5,0.3)]"
                    >
                      <Mail className="w-5 h-5" />
                      info@hunterclub.sk
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
