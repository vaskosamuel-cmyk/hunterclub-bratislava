import { motion, useScroll, useTransform } from 'motion/react';
import { Target, Users, Shield, CheckCircle2, ChevronRight, Mail, Coffee } from 'lucide-react';
import Link from '../components/Link';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

export default function Teambuilding() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative">
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img 
            style={{ y: backgroundY }}
            src="/hunterclubshooting.webp" 
            alt="Teambuilding Background" 
            className="w-full h-[130vh] object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-[#0D0D0D]/40"></div>
        </div>

        <div className="relative z-10">
          <section className="relative pt-32 md:pt-40 pb-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
              >
                <Breadcrumbs items={[{ name: t('teambuilding.breadcrumb') }]} />
                <div className="inline-block bg-[var(--color-tactical)] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-6">
                  {t('teambuilding.badge')}
                </div>
                <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display mb-6 uppercase italic text-white">
                  {t('teambuilding.title1')} <span className="text-[var(--color-safety)]">{t('teambuilding.title2')}</span>
                </h1>
                <p className="text-[20px] leading-[28px] text-white/80 mb-8 font-medium">
                  {t('teambuilding.desc')}
                </p>
                
                <a
                  href="mailto:info@hunterclub.sk"
                  className="inline-flex bg-[var(--color-safety)] text-[var(--color-tactical)] px-8 py-4 rounded-sm font-display text-xl font-bold tracking-widest hover:bg-yellow-400 transition-all items-center justify-center gap-2 uppercase italic shadow-[0_0_20px_rgba(251,188,5,0.3)]"
                >
                  <Mail className="w-5 h-5" />
                  {t('teambuilding.contactBtn')}
                </a>
              </motion.div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[var(--color-forest)]/90 backdrop-blur-md p-8 rounded-sm border border-white/5 shadow-lg group hover:bg-[var(--color-forest)] transition-all">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--color-safety)]/20 transition-all">
                    <Target className="w-6 h-6 text-[var(--color-safety)]" />
                  </div>
                  <h3 className="text-2xl font-display mb-4 uppercase italic text-white">{t('teambuilding.feat1Title')}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {t('teambuilding.feat1Desc')}
                  </p>
                </div>

                <div className="bg-[var(--color-forest)]/90 backdrop-blur-md p-8 rounded-sm border border-white/5 shadow-lg group hover:bg-[var(--color-forest)] transition-all">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--color-safety)]/20 transition-all">
                    <Shield className="w-6 h-6 text-[var(--color-safety)]" />
                  </div>
                  <h3 className="text-2xl font-display mb-4 uppercase italic text-white">{t('teambuilding.feat2Title')}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {t('teambuilding.feat2Desc')}
                  </p>
                </div>

                <div className="bg-[var(--color-forest)]/90 backdrop-blur-md p-8 rounded-sm border border-white/5 shadow-lg group hover:bg-[var(--color-forest)] transition-all">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--color-safety)]/20 transition-all">
                    <Coffee className="w-6 h-6 text-[var(--color-safety)]" />
                  </div>
                  <h3 className="text-2xl font-display mb-4 uppercase italic text-white">{t('teambuilding.feat3Title')}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {t('teambuilding.feat3Desc')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-[var(--color-tactical)]/90 backdrop-blur-md p-8 md:p-12 rounded-sm border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 skew-x-[20deg] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                  
                  <h2 className="text-4xl font-display mb-10 uppercase italic text-white relative z-10">{t('teambuilding.processTitle')}</h2>
                  
                  <div className="space-y-8 relative z-10">
                    <div className="flex items-start gap-6 group">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10 font-display font-bold text-xl text-[var(--color-safety)] group-hover:bg-[var(--color-safety)] group-hover:text-[var(--color-tactical)] transition-colors">
                        1
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{t('teambuilding.step1Title')}</h3>
                        <p className="text-gray-400">{t('teambuilding.step1Desc')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-6 group">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10 font-display font-bold text-xl text-[var(--color-safety)] group-hover:bg-[var(--color-safety)] group-hover:text-[var(--color-tactical)] transition-colors">
                        2
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{t('teambuilding.step2Title')}</h3>
                        <p className="text-gray-400">{t('teambuilding.step2Desc')}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 group">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10 font-display font-bold text-xl text-[var(--color-safety)] group-hover:bg-[var(--color-safety)] group-hover:text-[var(--color-tactical)] transition-colors">
                        3
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{t('teambuilding.step3Title')}</h3>
                        <p className="text-gray-400">{t('teambuilding.step3Desc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center bg-[var(--color-forest)]/90 backdrop-blur-md p-8 md:p-12 rounded-sm border border-[var(--color-safety)]/30 relative overflow-hidden">
                   <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[var(--color-safety)]/10 blur-3xl rounded-full"></div>
                   
                   <h2 className="text-4xl font-display mb-6 uppercase italic text-white relative z-10">{t('teambuilding.contactTitle')}</h2>
                   <p className="text-[18px] text-gray-300 mb-10 leading-relaxed relative z-10">
                    {t('teambuilding.contactDesc')}
                   </p>
                   
                   <a
                      href="mailto:info@hunterclub.sk"
                      className="w-full bg-white/10 backdrop-blur-md border border-[var(--color-safety)]/50 text-white py-4 rounded-sm font-display text-xl font-bold tracking-widest hover:bg-[var(--color-safety)] hover:text-[var(--color-tactical)] transition-all flex items-center justify-center gap-2 uppercase italic shadow-lg relative z-10 group"
                    >
                      <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      {t('teambuilding.contactBtn')}
                    </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
