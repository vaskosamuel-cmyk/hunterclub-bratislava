import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, MapPin, Mail, Shield, ChevronRight, User, Users, Target, CheckCircle2 } from 'lucide-react';
import Link from '../components/Link';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

export default function ZakladnyKurz() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const { t } = useLanguage();

  const outline = t('zaklad.outline') as unknown as string[];
  const requirements = t('zaklad.bring') as unknown as string[];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Shared Background Wrapper */}
      <div className="relative">
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img 
            style={{ y: backgroundY }}
            src="/hunterclubinstruktor.webp" 
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
                <Breadcrumbs items={[{ name: t('nav.kurzy'), href: '/kurzy' }, { name: t('zaklad.title1') }]} />
                <div className="inline-block bg-[var(--color-tactical)] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-6">
                  {t('zaklad.badge')}
                </div>
                <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display mb-6 uppercase italic text-white">
                  {t('zaklad.title1')} <span className="text-[var(--color-safety)]">{t('zaklad.title2')}</span>
                </h1>
                <p className="text-[20px] leading-[28px] text-white/80 mb-4 font-medium">
                  {t('zaklad.desc')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-sm border border-white/10">
                    <User className="w-5 h-5 text-[var(--color-safety)]" />
                    <span className="font-bold text-white uppercase text-sm">{t('zaklad.instructor')}</span>
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
                    <h2 className="text-3xl font-display mb-6 uppercase italic text-white">{t('zaklad.outlineTitle')}</h2>
                    <ul className="space-y-4">
                      {outline.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-white">
                          <CheckCircle2 className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-[var(--color-forest)]/90 backdrop-blur-md p-8 rounded-sm border border-white/5">
                    <h2 className="text-3xl font-display mb-6 uppercase italic text-white">{t('zaklad.bringTitle')}</h2>
                    <ul className="space-y-4">
                      {requirements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-white">
                          <div className="w-1.5 h-1.5 bg-[var(--color-safety)] rounded-full mt-2"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-gray-300 text-sm italic">
                        {t('zaklad.bringNote')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 lg:sticky lg:top-32 h-fit">
                  <div className="bg-[var(--color-tactical)]/90 backdrop-blur-md p-8 rounded-sm border border-white/10">
                    <h3 className="text-2xl font-display mb-6 uppercase italic text-white">{t('zaklad.detailsTitle')}</h3>
                    <div className="space-y-6 mb-8">
                      <div className="flex items-start gap-4">
                        <Calendar className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                        <div>
                          <div className="font-bold uppercase text-xs text-gray-400 mb-1">{t('zaklad.dateLabel')}</div>
                          <div className="text-white font-bold whitespace-pre-line">{t('zaklad.dateValue')}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                        <div>
                          <div className="font-bold uppercase text-xs text-gray-400 mb-1">{t('zaklad.placeLabel')}</div>
                          <div className="text-white font-bold">{t('zaklad.placeValue')}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Users className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                        <div>
                          <div className="font-bold uppercase text-xs text-gray-400 mb-1">{t('zaklad.capacityLabel')}</div>
                          <div className="text-white font-bold">{t('zaklad.capacityValue')}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 mb-8">
                      <div className="text-sm uppercase font-bold text-gray-400 mb-2">{t('zaklad.priceLabel')}</div>
                      <div className="text-5xl font-display text-[var(--color-safety)]">{t('zaklad.priceValue')}</div>
                      <div className="text-xs text-gray-400 mt-2">{t('zaklad.priceNote')}</div>
                    </div>

                    <p className="text-gray-300 mb-4 text-sm">
                      {t('zaklad.applyDesc')}
                    </p>
                    <a
                      href="mailto:info@hunterclub.sk"
                      className="w-full bg-[var(--color-safety)] text-[var(--color-tactical)] py-4 rounded-sm font-display text-xl font-bold tracking-widest hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 uppercase italic shadow-[0_0_20px_rgba(251,188,5,0.3)]"
                    >
                      <Mail className="w-5 h-5" />
                      {t('zaklad.applyBtn')}
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
