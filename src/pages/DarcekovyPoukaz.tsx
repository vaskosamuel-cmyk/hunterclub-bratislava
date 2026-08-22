import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Gift, Target, Shield, Zap, ChevronRight, CheckCircle2, Phone, Mail } from 'lucide-react';
import { OrderModal } from '../components/Modal';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

export default function DarcekovyPoukaz() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const benefits = [
    {
      icon: <Zap className="w-8 h-8 text-[var(--color-safety)]" />,
      title: t('poukaz.benefits.b1Title'),
      desc: t('poukaz.benefits.b1Desc')
    },
    {
      icon: <Shield className="w-8 h-8 text-[var(--color-safety)]" />,
      title: t('poukaz.benefits.b2Title'),
      desc: t('poukaz.benefits.b2Desc')
    },
    {
      icon: <Target className="w-8 h-8 text-[var(--color-safety)]" />,
      title: t('poukaz.benefits.b3Title'),
      desc: t('poukaz.benefits.b3Desc')
    }
  ];

  const steps = [
    {
      title: t('poukaz.steps.s1Title'),
      desc: t('poukaz.steps.s1Desc')
    },
    {
      title: t('poukaz.steps.s2Title'),
      desc: t('poukaz.steps.s2Desc')
    },
    {
      title: t('poukaz.steps.s3Title'),
      desc: t('poukaz.steps.s3Desc')
    },
    {
      title: t('poukaz.steps.s4Title'),
      desc: t('poukaz.steps.s4Desc')
    }
  ];

  return (
    <>
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="flex flex-col min-h-screen">
        {/* Shared Background Wrapper */}
        <div className="relative">
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.img 
              style={{ y: backgroundY }}
              src="/hunterclubzbrane.webp" 
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
                  <Breadcrumbs items={[{ name: t('poukaz.breadcrumb') }]} />
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-[2px] bg-[var(--color-safety)]"></span>
                    <span className="text-[var(--color-safety)] font-bold tracking-[0.3em] uppercase text-xs flex items-center gap-2">
                      <Gift className="w-4 h-4" />
                      {t('poukaz.heroBadge')}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display tracking-tight mb-4 uppercase italic text-white">
                    {t('poukaz.heroTitle1')} <span className="text-[var(--color-safety)]">{t('poukaz.heroTitle2')}</span>
                  </h1>
                  <p className="text-[20px] leading-[28px] text-white mb-4 font-medium max-w-2xl border-l-4 border-[var(--color-safety)] pl-4 md:pl-6">
                    {t('poukaz.heroDesc')}
                  </p>
                  <p className="text-sm text-gray-400 mb-8 md:mb-10 pl-4 md:pl-6">
                    {t('poukaz.vatInfo')}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="mailto:info@hunterclub.sk"
                      className="w-full sm:w-auto justify-center bg-[var(--color-safety)] text-black px-6 py-3 md:px-8 md:py-4 h-[54px] md:h-[60px] rounded-sm font-display text-xl font-bold tracking-widest hover:bg-yellow-400 transition-all shadow-[0_0_30px_rgba(251,188,5,0.3)] uppercase italic flex items-center gap-2"
                    >
                      {t('poukaz.heroBtn')} <ChevronRight className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                    </a>
                  </div>
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
                    <div className="text-center mb-16">
                      <h2 className="text-4xl md:text-5xl font-display mb-4 italic uppercase text-white">
                        {t('poukaz.whyTitle1')} <span className="text-[var(--color-safety)]">{t('poukaz.whyTitle2')}</span>
                      </h2>
                      <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        {t('poukaz.whyDesc')}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                      {benefits.map((benefit, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-[#1A1A1A]/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-[var(--color-safety)]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
                        >
                          <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            {benefit.icon}
                          </div>
                          <h3 className="text-2xl font-display uppercase italic text-white mb-4">{benefit.title}</h3>
                          <p className="text-gray-300 leading-relaxed">{benefit.desc}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                      <div className="w-full lg:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-display mb-6 italic uppercase text-white">
                          {t('poukaz.stepsTitle1')} <span className="text-[var(--color-safety)]">{t('poukaz.stepsTitle2')}</span>
                        </h2>
                        <p className="text-gray-300 mb-12 text-lg leading-relaxed">
                          {t('poukaz.stepsDesc')}
                        </p>

                        <div className="space-y-8">
                          {steps.map((step, index) => (
                            <div key={index} className="flex gap-6">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-[var(--color-safety)]/10 border border-[var(--color-safety)]/30 flex items-center justify-center text-[var(--color-safety)] font-display text-xl font-bold">
                                  {index + 1}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                                <p className="text-gray-300">{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="w-full lg:w-1/2">
                        <div className="bg-[#1A1A1A]/80 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-[var(--color-safety)]/20 shadow-[0_0_50px_rgba(251,188,5,0.05)] text-center">
                          <div className="w-20 h-20 bg-[var(--color-safety)]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[var(--color-safety)]/20">
                            <Mail className="w-10 h-10 text-[var(--color-safety)]" />
                          </div>
                          <h3 className="text-3xl font-display uppercase italic text-white mb-4">{t('poukaz.orderTitle')}</h3>
                          <p className="text-gray-300 mb-8 text-lg">
                            {t('poukaz.orderDesc')}
                          </p>
                          <a 
                            href="mailto:info@hunterclub.sk"
                            className="w-full bg-[var(--color-safety)] text-black py-5 rounded-sm font-display text-2xl font-bold tracking-widest hover:bg-yellow-400 transition-all shadow-xl uppercase italic flex items-center justify-center gap-3"
                          >
                            {t('poukaz.orderBtn')} <ChevronRight className="w-6 h-6" />
                          </a>
                          <p className="text-gray-400 text-sm uppercase tracking-widest font-bold mt-6">
                            {t('poukaz.orderOr')}
                          </p>
                        </div>
                      </div>
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
