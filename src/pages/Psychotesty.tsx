import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, MapPin, Mail, Shield, ChevronRight } from 'lucide-react';
import Link from '../components/Link';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

export default function Psychotesty() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const { t } = useLanguage();

  const [dynamicDates, setDynamicDates] = useState<string[]>([]);

  useEffect(() => {
    fetch('/content/psychotesty.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const parsed = data.map((item: any) => item.date_text).filter(Boolean);
          setDynamicDates(parsed);
        }
      })
      .catch((err) => console.error('Error loading dynamic psychotesty dates:', err));
  }, []);

  const fallbackDates = t('psycho.dates') as unknown as string[];
  const datesToDisplay = dynamicDates.length > 0 ? dynamicDates : fallbackDates;

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
                <Breadcrumbs items={[{ name: t('nav.kurzy'), href: '/kurzy' }, { name: t('psycho.title1') + ' ' + t('psycho.title2') }]} />
                <div className="inline-block bg-[var(--color-tactical)] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-6">
                  {t('psycho.badge')}
                </div>
                <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display mb-6 uppercase italic text-white">
                  {t('psycho.title1')} <span className="text-[var(--color-safety)]">{t('psycho.title2')}</span>
                </h1>
                <p className="text-[20px] leading-[28px] text-white/80 mb-4 font-medium">
                  {t('psycho.desc')}
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                  <div className="bg-[var(--color-forest)]/90 backdrop-blur-md p-8 rounded-sm border border-white/5">
                    <h2 className="text-3xl font-display mb-6 uppercase italic text-white">{t('psycho.infoTitle')}</h2>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {t('psycho.infoDesc')}
                    </p>
                    <div className="flex items-start gap-4 mb-6">
                      <Shield className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                      <div>
                        <div className="font-bold uppercase text-xs text-gray-400 mb-1">{t('psycho.bringLabel')}</div>
                        <div className="text-white font-bold">{t('psycho.bringValue')}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                      <div>
                        <div className="font-bold uppercase text-xs text-gray-400 mb-1">{t('psycho.placeLabel')}</div>
                        <div className="text-white font-bold">{t('psycho.placeValue')}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[var(--color-forest)]/90 backdrop-blur-md p-8 rounded-sm border border-white/5">
                    <h2 className="text-3xl font-display mb-6 uppercase italic text-white">{t('psycho.datesTitle')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {datesToDisplay.map((date, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                          <Calendar className="w-5 h-5 text-[var(--color-safety)] shrink-0" />
                          <span className="text-white font-bold text-lg">{date}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm mt-6 italic">
                      {t('psycho.datesNote')}
                    </p>
                  </div>
                </div>

                <div className="space-y-8 lg:sticky lg:top-32 h-fit">
                  <div className="bg-[var(--color-tactical)]/90 backdrop-blur-md p-8 rounded-sm border border-white/10">
                    <h3 className="text-2xl font-display mb-6 uppercase italic text-white">{t('psycho.applyTitle')}</h3>
                    <p className="text-gray-300 mb-8">
                      {t('psycho.applyDesc')}
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
