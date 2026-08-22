import { motion } from 'motion/react';
import { Shield, Target, Zap, Users, ChevronRight, MapPin, Clock, Phone, Mail, Info } from 'lucide-react';
import Link from '../components/Link';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

export default function Strelnica() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Shared Background Wrapper */}
      <div className="relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://i.postimg.cc/KzY6d5kq/Gemini-Generated-Image-oampdgoampdgoamp-(1)-(1).webp" 
            alt="Background" 
            className="w-full h-full object-cover opacity-40 fixed top-0 left-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/50 to-transparent"></div>
        </div>

        <div className="relative z-10">
          {/* Hero */}
          <section className="relative min-h-[50vh] flex items-center pt-32 pb-8 md:pt-40 md:pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Breadcrumbs items={[{ name: t('nav.strelnica') }]} />
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-[var(--color-safety)]"></span>
              <span className="text-[var(--color-safety)] font-bold tracking-[0.3em] uppercase text-xs">
                {t('strelnica.heroBadge')}
              </span>
            </div>
            <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display tracking-tight mb-4 uppercase italic text-white">
              {t('strelnica.heroTitle')} <span className="text-[var(--color-safety)]">{t('strelnica.heroTitleHighlight')}</span>
            </h1>
            <p className="text-[20px] leading-[28px] text-white mb-8 md:mb-10 font-medium max-w-2xl border-l-4 border-[var(--color-safety)] pl-4 md:pl-6">
              {t('strelnica.heroDesc')}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-8 py-4 rounded-sm border border-white/10 shadow-2xl">
                <Target className="w-8 h-8 text-[var(--color-safety)]" />
                <div>
                  <div className="text-2xl font-display text-white leading-none">{t('strelnica.stats.lanes')}</div>
                  <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">{t('strelnica.stats.lanesDesc')}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-8 py-4 rounded-sm border border-white/10 shadow-2xl">
                <Shield className="w-8 h-8 text-[var(--color-safety)]" />
                <div>
                  <div className="text-2xl font-display text-white leading-none">{t('strelnica.stats.safety')}</div>
                  <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">{t('strelnica.stats.safetyDesc')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Facilities */}
      <section className="pt-8 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-display mb-4 uppercase italic text-white">
              {t('strelnica.facilitiesTitle')} <span className="text-[var(--color-safety)]">{t('strelnica.facilitiesTitleHighlight')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: t('strelnica.facilities.f25m.title'),
                desc: t('strelnica.facilities.f25m.desc'),
                features: t('strelnica.facilities.f25m.features') as unknown as string[]
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: t('strelnica.facilities.f45m.title'),
                desc: t('strelnica.facilities.f45m.desc'),
                features: t('strelnica.facilities.f45m.features') as unknown as string[]
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: t('strelnica.facilities.relax.title'),
                desc: t('strelnica.facilities.relax.desc'),
                features: t('strelnica.facilities.relax.features') as unknown as string[]
              }
            ].map((facility, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/10 shadow-lg flex flex-col h-full relative group hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl hover:border-[var(--color-safety)]/50"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-safety)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="p-6 pb-0 relative z-10 flex justify-between items-start gap-4">
                  <h3 className="text-2xl font-display font-bold text-white uppercase leading-tight mb-4 group-hover:text-[var(--color-safety)] transition-colors">
                    {facility.title}
                  </h3>
                  <div className="bg-[var(--color-safety)]/10 p-2 rounded-lg text-[var(--color-safety)]">
                    {facility.icon}
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col relative z-10">
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    {facility.desc}
                  </p>
                  
                  <div className="space-y-3 mt-auto">
                    {facility.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-[var(--color-safety)] rounded-full shadow-[0_0_8px_rgba(251,188,5,0.6)]"></div>
                        <span className="text-gray-300 font-bold uppercase text-[10px] tracking-[0.2em]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section (O nás) */}
      <section className="py-24 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-display mb-6 uppercase italic">{t('strelnica.aboutTitle')}</h2>
              <div className="space-y-4 text-gray-300 text-base leading-relaxed font-medium">
                <p>
                  {t('strelnica.aboutP1')}
                </p>
                <p>
                  {t('strelnica.aboutP2')}
                </p>
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div>
                    <div className="text-3xl font-display text-[var(--color-safety)] mb-1">25M</div>
                    <div className="text-xs uppercase font-bold tracking-widest text-gray-300">{t('strelnica.aboutStats.length')}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display text-[var(--color-safety)] mb-1">100+</div>
                    <div className="text-xs uppercase font-bold tracking-widest text-gray-300">{t('strelnica.aboutStats.weapons')}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 border border-[var(--color-safety)] opacity-20 rounded-sm"></div>
              <img 
                src="https://i.postimg.cc/Fs56xGKx/Hunterclub-20-768x513-1.webp" 
                alt="Strelnica Hunter Club" 
                className="rounded-sm shadow-2xl relative z-10 h-[400px] w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[var(--color-safety)] py-6 relative overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-black/10 skew-x-[-20deg] translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <Target className="w-10 h-10 text-black shrink-0" />
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wider uppercase italic leading-none text-black mb-1">
                {t('strelnica.ctaTitle')}
              </h2>
              <p className="text-black/80 font-bold uppercase text-[10px] tracking-widest">
                {t('strelnica.ctaDesc')}
              </p>
            </div>
          </div>
          <Link
            to="/kontakt"
            className="bg-black text-[var(--color-safety)] px-10 py-4 rounded-sm font-display text-xl font-bold tracking-widest hover:bg-zinc-900 transition-all uppercase italic shadow-2xl flex items-center gap-3 shrink-0 border border-[var(--color-safety)]/30"
          >
            {t('strelnica.ctaButton')} <ChevronRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
        </div>
      </div>
    </div>
  );
}
