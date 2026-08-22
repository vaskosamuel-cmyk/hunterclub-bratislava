import { motion, useScroll, useTransform } from 'motion/react';
import { Clock, MapPin, Users, Shield, Target, Zap, ChevronRight, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';
import Link from '../components/Link';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

export default function TaktickyVycvik() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const { t } = useLanguage();

  const objectives = t('taktickyPage.objectives') as unknown as string[];
  const outline = t('taktickyPage.outline') as unknown as { title: string, items: string[] }[];

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
          {/* Hero */}
          <section className="relative pt-32 md:pt-40 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Breadcrumbs items={[{ name: t('nav.kurzy'), href: '/kurzy' }, { name: t('taktickyPage.title1') }]} />
            <div className="inline-block bg-[var(--color-tactical)] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-6">
              {t('taktickyPage.badge')}
            </div>
            <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display mb-6 uppercase italic text-white">
              {t('taktickyPage.title1')} <span className="text-[var(--color-safety)]">{t('taktickyPage.title2')}</span>
            </h1>
            <p className="text-[20px] leading-[28px] text-white/80 mb-4 font-medium">
              {t('taktickyPage.desc')}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-sm border border-white/10">
                <Clock className="w-5 h-5 text-[var(--color-safety)]" />
                <span className="font-bold text-white uppercase">{t('taktickyPage.duration')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-sm border border-white/10">
                <Users className="w-5 h-5 text-[var(--color-safety)]" />
                <span className="font-bold text-white uppercase">{t('taktickyPage.type')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

          {/* Overview Grid */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                  <div>
                    <h2 className="text-4xl font-display mb-8 uppercase italic text-white">{t('taktickyPage.objTitle')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {objectives.map((obj, idx) => (
                        <div key={idx} className="flex gap-4 items-start bg-[var(--color-forest)]/90 backdrop-blur-md p-6 rounded-sm border border-white/5">
                          <CheckCircle2 className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                          <p className="text-white font-medium">{obj}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-4xl font-display mb-8 uppercase italic text-white">{t('taktickyPage.outlineTitle')}</h2>
                    <div className="space-y-6">
                      {outline.map((section, idx) => (
                        <div key={idx} className="bg-[var(--color-forest)]/90 backdrop-blur-md p-8 rounded-sm border border-white/5">
                      <h3 className="text-2xl font-display text-[var(--color-safety)] mb-4 uppercase italic">{section.title}</h3>
                      <ul className="space-y-3">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-white">
                            <div className="w-1.5 h-1.5 bg-[var(--color-safety)] rounded-full"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

                <div className="space-y-8 lg:sticky lg:top-32 h-fit">
                  <div className="bg-[var(--color-tactical)]/90 backdrop-blur-md p-8 rounded-sm border border-white/10">
                    <h3 className="text-2xl font-display mb-6 uppercase italic text-white">{t('taktickyPage.detailsTitle')}</h3>
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                    <div>
                      <div className="font-bold uppercase text-xs text-gray-400 mb-1">{t('taktickyPage.placeLabel')}</div>
                      <div className="text-white font-bold">{t('taktickyPage.placeValue')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                    <div>
                      <div className="font-bold uppercase text-xs text-gray-400 mb-1">{t('taktickyPage.equipmentLabel')}</div>
                      <div className="text-white font-bold">{t('taktickyPage.equipmentValue')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Zap className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                    <div>
                      <div className="font-bold uppercase text-xs text-gray-400 mb-1">{t('taktickyPage.bringLabel')}</div>
                      <div className="text-white font-bold">{t('taktickyPage.bringValue')}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mb-8">
                  <div className="text-sm uppercase font-bold text-gray-400 mb-2">{t('taktickyPage.priceLabel')}</div>
                  <div className="text-5xl font-display text-[var(--color-safety)]">{t('taktickyPage.priceValue')}</div>
                  <div className="text-xs text-gray-400 mt-2">{t('taktickyPage.priceNote')}</div>
                </div>

                <Link
                  to="/kontakt"
                  className="w-full bg-[var(--color-safety)] text-[var(--color-tactical)] py-4 rounded-sm font-display text-xl font-bold tracking-widest hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 uppercase italic"
                >
                  {t('taktickyPage.bookBtn')} <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

                  <div className="bg-[var(--color-slate)]/90 backdrop-blur-md p-8 rounded-sm border border-white/5">
                    <h4 className="text-xl font-display mb-4 uppercase italic text-white">{t('taktickyPage.moreInfoTitle')}</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[var(--color-safety)]" />
                        <span className="text-sm font-bold text-white">info@hunterclub.sk</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-[var(--color-safety)]" />
                        <span className="text-sm font-bold text-white">+421 902 630 643</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Safety Section */}
          <section className="py-12 relative z-10 mb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#1A1A1A]/90 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-safety)] opacity-5 blur-[80px] -mr-32 -mt-32 group-hover:opacity-10 transition-opacity"></div>
                <div className="bg-[var(--color-forest)] p-5 rounded-full shadow-[0_0_30px_rgba(251,188,5,0.15)] shrink-0">
                  <Award className="w-10 h-10 text-[var(--color-safety)]" />
                </div>
                <div>
                  <h2 className="text-3xl font-display uppercase italic text-white mb-2">{t('taktickyPage.safetyTitle')}</h2>
                  <p className="text-gray-300 max-w-3xl font-medium leading-relaxed">
                    {t('taktickyPage.safetyDesc')}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
