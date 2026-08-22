import { motion, useScroll, useTransform } from 'motion/react';
import Link from '../components/Link';
import { ChevronRight, Target, Shield, BookOpen, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

export default function Kurzy() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const { t } = useLanguage();

  const steps = [
    { number: '01', title: t('kurzy.zbrojak.steps.s1.title'), description: t('kurzy.zbrojak.steps.s1.desc') },
    { number: '02', title: t('kurzy.zbrojak.steps.s2.title'), description: t('kurzy.zbrojak.steps.s2.desc') },
    { number: '03', title: t('kurzy.zbrojak.steps.s3.title'), description: t('kurzy.zbrojak.steps.s3.desc') },
    { number: '04', title: t('kurzy.zbrojak.steps.s4.title'), description: t('kurzy.zbrojak.steps.s4.desc') },
  ];

  const tacticalFeatures = t('kurzy.takticky.features') as unknown as string[];

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
          <section className="relative min-h-[50vh] flex items-center pt-32 pb-12 md:pt-40 md:pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
              >
                <Breadcrumbs items={[{ name: t('nav.kurzy') }]} />
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-12 h-[2px] bg-[var(--color-safety)]"></span>
                  <span className="text-[var(--color-safety)] font-bold tracking-[0.3em] uppercase text-xs">
                    {t('kurzy.heroBadge')}
                  </span>
                </div>
                <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display tracking-tight mb-4 uppercase italic text-white">
                  {t('kurzy.heroTitle')} <span className="text-[var(--color-safety)]">{t('kurzy.heroTitleHighlight')}</span>
                </h1>
                <p className="text-[20px] leading-[28px] text-white mb-8 md:mb-10 font-medium max-w-2xl border-l-4 border-[var(--color-safety)] pl-4 md:pl-6">
                  {t('kurzy.heroDesc')}
                </p>
              </motion.div>
            </div>
          </section>

          <div className="pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Zbrojný Preukaz Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-slate)] to-[#2A2A2A] border border-white/10 flex flex-col"
          >
            <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-xl bg-[var(--color-safety)]/10 flex items-center justify-center border border-[var(--color-safety)]/20">
                  <BookOpen className="w-8 h-8 text-[var(--color-safety)]" />
                </div>
                <div>
                  <span className="text-[var(--color-safety)] text-xs font-bold tracking-[0.2em] uppercase mb-1 block">{t('kurzy.zbrojak.badge')}</span>
                  <h2 className="text-4xl font-display text-white uppercase italic">{t('kurzy.zbrojak.title')}</h2>
                </div>
              </div>

              <p className="text-gray-300 mb-12 text-lg leading-relaxed">
                {t('kurzy.zbrojak.desc')}
              </p>
              
              <div className="space-y-6 mb-12 flex-grow">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-start gap-5 group/step">
                    <div className="relative">
                      <div className="text-2xl font-display text-[var(--color-safety)] w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover/step:bg-[var(--color-safety)] group-hover/step:text-[var(--color-tactical)] transition-colors duration-300">
                        {step.number}
                      </div>
                      {index !== steps.length - 1 && (
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-6 bg-white/10"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white uppercase italic tracking-wide mb-1">{step.title}</h4>
                      <p className="text-gray-300 text-sm leading-snug">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/zbrojny-preukaz"
                className="inline-flex items-center justify-center gap-3 bg-[var(--color-safety)] text-[var(--color-tactical)] px-10 py-5 rounded-xl font-display text-2xl font-bold tracking-widest hover:bg-white transition-all uppercase italic shadow-[0_20px_40px_rgba(255,215,0,0.15)] group/btn"
              >
                {t('kurzy.zbrojak.btn')} 
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
          
          {/* Taktický Výcvik Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-forest)] to-[#1A2E1A] border border-white/10 flex flex-col"
          >
            <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-1 block">{t('kurzy.takticky.badge')}</span>
                  <h2 className="text-4xl font-display text-white uppercase italic">{t('kurzy.takticky.title')}</h2>
                </div>
              </div>

              <p className="text-white/90 mb-12 text-lg leading-relaxed">
                {t('kurzy.takticky.desc')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 flex-grow">
                {tacticalFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-safety)] shrink-0" />
                    <span className="text-white font-bold uppercase text-xs tracking-wider leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-6 rounded-xl bg-black/20 border border-white/5 mb-8">
                  <Users className="w-10 h-10 text-[var(--color-safety)] opacity-50" />
                  <div>
                    <h5 className="text-white font-bold uppercase text-sm">{t('kurzy.takticky.individualTitle')}</h5>
                    <p className="text-white/60 text-xs">{t('kurzy.takticky.individualDesc')}</p>
                  </div>
                </div>

                <Link 
                  to="/takticky-vycvik"
                  className="block w-full text-center bg-white text-[var(--color-forest)] py-5 rounded-xl font-display text-2xl font-bold tracking-widest hover:bg-[var(--color-safety)] hover:text-[var(--color-tactical)] transition-all uppercase italic shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                >
                  {t('kurzy.takticky.btn')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Psychotesty */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative overflow-hidden rounded-2xl bg-[var(--color-slate)] border border-white/10 flex flex-col p-8 hover:border-[var(--color-safety)]/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 mb-6">
              <Shield className="w-6 h-6 text-[var(--color-safety)]" />
            </div>
            <h3 className="text-2xl font-display text-white uppercase italic mb-4">{t('kurzy.cards.psycho.title')}</h3>
            <p className="text-gray-300 mb-8 flex-grow">
              {t('kurzy.cards.psycho.desc')}
            </p>
            <Link to="/psychotesty" className="text-[var(--color-safety)] font-bold uppercase tracking-widest hover:underline inline-flex items-center gap-2 text-sm">
              {t('kurzy.cards.psycho.btn')} <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Základný kurz streľby */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="group relative overflow-hidden rounded-2xl bg-[var(--color-slate)] border border-white/10 flex flex-col p-8 hover:border-[var(--color-safety)]/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 mb-6">
              <Target className="w-6 h-6 text-[var(--color-safety)]" />
            </div>
            <h3 className="text-2xl font-display text-white uppercase italic mb-4">{t('kurzy.cards.zaklad.title')}</h3>
            <p className="text-gray-300 mb-8 flex-grow">
              {t('kurzy.cards.zaklad.desc')}
            </p>
            <Link to="/zakladny-kurz" className="text-[var(--color-safety)] font-bold uppercase tracking-widest hover:underline inline-flex items-center gap-2 text-sm">
              {t('kurzy.cards.zaklad.btn')} <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Teoretická príprava */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group relative overflow-hidden rounded-2xl bg-[var(--color-slate)] border border-white/10 flex flex-col p-8 hover:border-[var(--color-safety)]/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 mb-6">
              <BookOpen className="w-6 h-6 text-[var(--color-safety)]" />
            </div>
            <h3 className="text-2xl font-display text-white uppercase italic mb-4">{t('kurzy.cards.teoria.title')}</h3>
            <p className="text-gray-300 mb-8 flex-grow">
              {t('kurzy.cards.teoria.desc')}
            </p>
            <Link to="/teoreticka-priprava" className="text-[var(--color-safety)] font-bold uppercase tracking-widest hover:underline inline-flex items-center gap-2 text-sm">
              {t('kurzy.cards.teoria.btn')} <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom CTA or Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 p-12 rounded-3xl bg-gradient-to-r from-[var(--color-slate)] to-[var(--color-tactical)] border border-white/5 text-center"
        >
          <Shield className="w-12 h-12 text-[var(--color-safety)] mx-auto mb-6 opacity-50" />
          <h3 className="text-3xl font-display text-white mb-4 uppercase italic">{t('kurzy.bottom.title')}</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            {t('kurzy.bottom.desc')}
          </p>
          <Link to="/kontakt" className="text-[var(--color-safety)] font-bold uppercase tracking-widest hover:underline inline-flex items-center gap-2">
            {t('kurzy.bottom.btn')} <ChevronRight className="w-4 h-4" />
          </Link>
          </motion.div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
