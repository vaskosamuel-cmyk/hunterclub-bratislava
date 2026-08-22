import { motion } from 'motion/react';
import { Shield, BookOpen, HeartPulse, GraduationCap, CheckCircle, ArrowRight, Phone, Mail, MapPin, Target } from 'lucide-react';
import Link from '../components/Link';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

export default function ZbrojnyPreukaz() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <BookOpen className="w-8 h-8 text-[var(--color-safety)]" />,
      title: t('zbrojak.steps.step1.title'),
      description: t('zbrojak.steps.step1.desc')
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-[var(--color-safety)]" />,
      title: t('zbrojak.steps.step2.title'),
      description: t('zbrojak.steps.step2.desc')
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-[var(--color-safety)]" />,
      title: t('zbrojak.steps.step3.title'),
      description: t('zbrojak.steps.step3.desc')
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-[var(--color-safety)]" />,
      title: t('zbrojak.steps.step4.title'),
      description: t('zbrojak.steps.step4.desc')
    }
  ];

  return (
    <div className="bg-[var(--color-tactical)] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-12 bg-[var(--color-tactical)] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0D0D0D_100%)] opacity-60"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-center mb-6">
            <Breadcrumbs items={[{ name: t('nav.kurzy'), href: '/kurzy' }, { name: t('nav.zbrojak') }]} />
          </div>
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="w-12 h-[2px] bg-[var(--color-safety)]"></div>
              <span className="text-[var(--color-safety)] font-bold tracking-[0.4em] uppercase text-xs">
                {t('zbrojak.hero.badge')}
              </span>
              <div className="w-12 h-[2px] bg-[var(--color-safety)]"></div>
            </motion.div>
            <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display tracking-tight mb-4 uppercase italic text-white">
              {t('zbrojak.hero.title1')} <span className="text-[var(--color-safety)]">{t('zbrojak.hero.title2')}</span>
            </h1>
            <p className="text-[20px] leading-[28px] text-white max-w-3xl mx-auto font-medium border-l-4 border-[var(--color-safety)]/30 pl-4 md:pl-0 md:border-l-0 mb-4 md:mb-6">
              {t('zbrojak.hero.desc')}
            </p>
          </div>
        </div>
      </section>


      {/* Steps Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display mb-16 text-center">{t('zbrojak.steps.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
                className="bg-[var(--color-forest)] p-8 rounded-sm border border-white/10 hover:border-[var(--color-safety)] hover:bg-[var(--color-safety)]/10 transition-all group"
              >
                <div className="mb-6 transform group-hover:-translate-y-2 transition-transform">{step.icon}</div>
                <h3 className="text-xl font-display mb-4 tracking-wider text-white uppercase italic">{step.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed font-medium">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-pages Section */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display mb-4 italic uppercase text-white">{t('zbrojak.subpages.title1')} <span className="text-[var(--color-safety)]">{t('zbrojak.subpages.title2')}</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">{t('zbrojak.subpages.desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Teoreticka Priprava */}
            <Link to="/teoreticka-priprava" className="group block bg-[var(--color-forest)] p-8 rounded-xl border border-white/10 hover:border-[var(--color-safety)] hover:bg-[var(--color-safety)]/5 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-safety)]/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <BookOpen className="w-12 h-12 text-[var(--color-safety)] mb-6 relative z-10" />
              <h3 className="text-2xl font-display mb-4 text-white uppercase italic relative z-10">{t('zbrojak.subpages.card1.title')}</h3>
              <p className="text-gray-400 mb-8 relative z-10">{t('zbrojak.subpages.card1.desc')}</p>
              <div className="flex items-center text-[var(--color-safety)] font-bold uppercase tracking-wider text-sm relative z-10">
                {t('zbrojak.subpages.moreInfo')} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
            
            {/* Card 2: Psychotesty */}
            <Link to="/psychotesty" className="group block bg-[var(--color-forest)] p-8 rounded-xl border border-white/10 hover:border-[var(--color-safety)] hover:bg-[var(--color-safety)]/5 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-safety)]/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <HeartPulse className="w-12 h-12 text-[var(--color-safety)] mb-6 relative z-10" />
              <h3 className="text-2xl font-display mb-4 text-white uppercase italic relative z-10">{t('zbrojak.subpages.card2.title')}</h3>
              <p className="text-gray-400 mb-8 relative z-10">{t('zbrojak.subpages.card2.desc')}</p>
              <div className="flex items-center text-[var(--color-safety)] font-bold uppercase tracking-wider text-sm relative z-10">
                {t('zbrojak.subpages.moreInfo')} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            {/* Card 3: Zakladny kurz */}
            <Link to="/zakladny-kurz" className="group block bg-[var(--color-forest)] p-8 rounded-xl border border-white/10 hover:border-[var(--color-safety)] hover:bg-[var(--color-safety)]/5 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-safety)]/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <Target className="w-12 h-12 text-[var(--color-safety)] mb-6 relative z-10" />
              <h3 className="text-2xl font-display mb-4 text-white uppercase italic relative z-10">{t('zbrojak.subpages.card3.title')}</h3>
              <p className="text-gray-400 mb-8 relative z-10">{t('zbrojak.subpages.card3.desc')}</p>
              <div className="flex items-center text-[var(--color-safety)] font-bold uppercase tracking-wider text-sm relative z-10">
                {t('zbrojak.subpages.moreInfo')} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl font-display mb-6 text-white italic uppercase">{t('zbrojak.cta.title')}</h2>
          <p className="text-xl mb-10 text-gray-300 font-bold">{t('zbrojak.cta.desc')}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/kontakt"
              className="bg-[var(--color-safety)] text-[var(--color-tactical)] px-10 py-4 rounded-sm font-display text-2xl font-bold tracking-wider hover:bg-yellow-400 transition-all shadow-xl flex items-center gap-3 italic uppercase"
            >
              {t('zbrojak.cta.btn')} <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Info Content */}
      <section className="py-24 bg-black/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <h3 className="text-3xl font-display mb-6 text-[var(--color-safety)] italic uppercase">{t('zbrojak.info.title1')}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t('zbrojak.info.desc1')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-display mb-6 text-[var(--color-safety)] italic uppercase">{t('zbrojak.info.title2')}</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {t('zbrojak.info.desc2_1')}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {t('zbrojak.info.desc2_2')}
              </p>
            </div>
            <div className="bg-[var(--color-slate)] p-8 rounded-sm border border-white/5">
              <div className="text-white font-black text-6xl tracking-tighter italic mb-4">GLOCK</div>
              <div className="text-[var(--color-safety)] text-xs font-bold tracking-[0.3em] border-t border-white/20 pt-2">EXPERIENCE PARTNER</div>
            </div>
          </div>

          <div className="bg-[var(--color-slate)] p-10 rounded-sm border-l-4 border-[var(--color-safety)]">
            <h3 className="text-2xl font-display mb-4 italic uppercase">{t('zbrojak.info.title3')}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t('zbrojak.info.desc3')}
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-display mb-6 text-[var(--color-safety)] italic uppercase">{t('zbrojak.info.title4')}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t('zbrojak.info.desc4')} <span className="text-white font-bold">{t('zbrojak.info.hdi')}</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
