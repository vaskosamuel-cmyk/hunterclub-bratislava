import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Download, CreditCard, Link as LinkIcon, MapPin, Phone, Info } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

export default function SportClub() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const { t } = useLanguage();

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/images/packages/Prihláška HDI nová 2025.pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Prihlaska-HDI-nova-2025.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      window.open('/images/packages/Prihláška HDI nová 2025.pdf', '_blank');
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Shared Background Wrapper */}
      <div className="relative">
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img 
            style={{ y: backgroundY }}
            src="/hunterclub5.webp" 
            alt="Background" 
            className="w-full h-[130vh] object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-[#0D0D0D]/40"></div>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative min-h-[40vh] flex items-center pt-32 pb-8 md:pt-40 md:pb-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl"
              >
                <Breadcrumbs items={[{ name: t('klub.breadcrumb') }]} />
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-12 h-[2px] bg-[var(--color-safety)]"></span>
                  <span className="text-[var(--color-safety)] font-bold tracking-[0.3em] uppercase text-xs">
                    {t('klub.heroBadge')}
                  </span>
                </div>
                <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display tracking-tight mb-4 uppercase italic text-white">
                  {t('klub.heroTitle')} <span className="text-[var(--color-safety)]">{t('klub.heroTitleHighlight')}</span>
                </h1>
                <p className="text-lg md:text-[20px] leading-relaxed md:leading-[28px] text-white mb-4 font-medium max-w-2xl border-l-4 border-[var(--color-safety)] pl-4 md:pl-6">
                  {t('klub.heroDesc')}
                </p>
                <p className="text-sm text-gray-400 mb-8 md:mb-10 pl-4 md:pl-6">
                  {t('klub.vatInfo')}
                </p>
              </motion.div>
            </div>
          </section>

          <div className="pb-12">
            {/* Application & Info */}
            <section className="py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column: Application */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.2 }}
              className="group relative overflow-hidden rounded-2xl bg-[var(--color-tactical)] border border-white/10 flex flex-col"
            >
              <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-16 h-16 rounded-xl bg-[var(--color-safety)]/10 flex items-center justify-center border border-[var(--color-safety)]/20">
                    <Info className="w-8 h-8 text-[var(--color-safety)]" />
                  </div>
                  <div>
                    <span className="text-[var(--color-safety)] text-xs font-bold tracking-[0.2em] uppercase mb-1 block">{t('klub.regBadge')}</span>
                    <h2 className="text-3xl md:text-4xl font-display text-white uppercase italic">{t('klub.regTitle')}</h2>
                  </div>
                </div>
                
                <div className="space-y-10 flex-grow">
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-lg bg-[var(--color-safety)] text-[var(--color-tactical)] flex items-center justify-center font-display font-bold text-xl italic">1</div>
                    <h3 className="text-2xl font-display mb-3 text-white uppercase italic">{t('klub.step1Title')}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {t('klub.step1Desc')}
                    </p>
                    <a 
                      href="/images/packages/Prihláška HDI nová 2025.pdf" 
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 sm:gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm transition-all group/btn flex-wrap"
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-safety)] shrink-0" />
                      <span>{t('klub.step1Btn')}</span>
                      <span className="text-[var(--color-safety)] text-[10px] ml-auto sm:ml-2 opacity-50">{t('klub.step1BtnSub')}</span>
                    </a>
                  </div>

                  <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-lg bg-[var(--color-safety)] text-[var(--color-tactical)] flex items-center justify-center font-display font-bold text-xl italic">2</div>
                    <h3 className="text-2xl font-display mb-3 text-white uppercase italic">{t('klub.step2Title')}</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {t('klub.step2Desc')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Payment Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.2 }}
              className="group relative overflow-hidden rounded-2xl bg-[var(--color-forest)] border border-white/10 flex flex-col"
            >
              <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-1 block">{t('klub.finBadge')}</span>
                    <h2 className="text-3xl md:text-4xl font-display text-white uppercase italic">{t('klub.finTitle')}</h2>
                  </div>
                </div>
                
                <div className="space-y-8 flex-grow">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-black/20 p-6 rounded-xl border border-white/5">
                      <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">{t('klub.fee2025')}</h4>
                      <div className="text-3xl font-display text-[var(--color-safety)] italic">40€</div>
                      <p className="text-white/40 text-[10px] mt-2 uppercase">{t('klub.fee2025Sub')}</p>
                    </div>
                    <div className="bg-black/20 p-6 rounded-xl border border-[var(--color-safety)]/30 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-[var(--color-safety)] text-black text-xs font-black px-3 py-1 uppercase tracking-tighter">{t('klub.deadline')}</div>
                      <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2 mt-4">{t('klub.fee2026')}</h4>
                      <div className="text-3xl font-display text-white italic">40€</div>
                      <p className="text-white/40 text-[10px] mt-2 uppercase">{t('klub.fee2026Sub')}</p>
                    </div>
                  </div>

                  <div className="bg-black/40 p-8 rounded-xl border border-white/10 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <span className="block text-white/30 text-[10px] uppercase font-bold tracking-widest mb-1">{t('klub.bank')}</span>
                        <span className="text-white font-mono text-sm">TATRA BANKA a.s.</span>
                      </div>
                      <div>
                        <span className="block text-white/30 text-[10px] uppercase font-bold tracking-widest mb-1">{t('klub.iban')}</span>
                        <span className="text-[var(--color-safety)] font-mono font-bold text-base sm:text-lg break-all">SK32 1100 0000 0029 4509 9475</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="block text-white/30 text-[10px] uppercase font-bold tracking-widest mb-1">{t('klub.accOwner')}</span>
                          <span className="text-white font-mono text-xs uppercase">HUNTERS DEFENSE INSTITUTE</span>
                        </div>
                        <div>
                          <span className="block text-white/30 text-[10px] uppercase font-bold tracking-widest mb-1">{t('klub.accName')}</span>
                          <span className="text-white font-mono text-xs uppercase">HUNTERS DEFENSE</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-[var(--color-safety)]/10 border border-[var(--color-safety)]/20 rounded-xl flex items-start gap-4">
                      <Info className="w-5 h-5 text-[var(--color-safety)] shrink-0 mt-0.5" />
                      <p className="text-xs text-white/80 leading-relaxed italic">
                        {t('klub.infoText1')} <span className="text-white font-bold not-italic">{t('klub.infoTextHighlight')}</span>{t('klub.infoText2')}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="https://payme.sk/?V=1&IBAN=SK3211000000002945099475&AM=40.00&CC=EUR&DT=&PI=&MSG=&CN=HUNTERS+DEFENSE+INSTITUTE" target="_blank" rel="noopener noreferrer" className="bg-[var(--color-safety)] text-[var(--color-tactical)] py-4 sm:py-5 px-2 rounded-xl font-display text-lg sm:text-xl font-bold tracking-wider sm:tracking-widest text-center hover:bg-white transition-all flex items-center justify-center gap-2 sm:gap-3 uppercase italic shadow-lg">
                      <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> {t('klub.payLink')}
                    </a>
                    <a href="https://payme.sk/?V=1&IBAN=SK3211000000002945099475&AM=40.00&CC=EUR&DT=&PI=&MSG=&CN=HUNTERS+DEFENSE+INSTITUTE" target="_blank" rel="noopener noreferrer" className="bg-[#00D1FF] text-black py-4 sm:py-5 px-2 rounded-xl font-display text-lg sm:text-xl font-bold tracking-wider sm:tracking-widest text-center hover:bg-white transition-all flex items-center justify-center gap-2 sm:gap-3 uppercase italic shadow-lg">
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> PayMe
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Details */}
      <section className="py-16 md:py-24 bg-[var(--color-tactical)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-display uppercase italic text-white">{t('klub.contactTitle')} <span className="text-[var(--color-safety)]">{t('klub.contactTitleHighlight')}</span></h2>
            <div className="w-24 h-1 bg-[var(--color-safety)] mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.2 }}
              className="bg-[var(--color-slate)] p-10 rounded-2xl border border-white/5 text-center hover:border-[var(--color-safety)]/30 transition-colors group"
            >
              <div className="w-16 h-16 rounded-xl bg-[var(--color-safety)]/10 flex items-center justify-center border border-[var(--color-safety)]/20 mx-auto mb-6 group-hover:bg-[var(--color-safety)] transition-colors duration-300">
                <MapPin className="w-8 h-8 text-[var(--color-safety)] group-hover:text-[var(--color-tactical)]" />
              </div>
              <h3 className="text-xl font-display text-white mb-4 uppercase italic tracking-widest">{t('klub.contactPoint')}</h3>
              <p className="text-gray-300 font-medium">Kamenné námestie 1A (OD PRIOR)<br/>811 08 Bratislava</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="bg-[var(--color-slate)] p-10 rounded-2xl border border-white/5 text-center hover:border-[var(--color-safety)]/30 transition-colors group"
            >
              <div className="w-16 h-16 rounded-xl bg-[var(--color-safety)]/10 flex items-center justify-center border border-[var(--color-safety)]/20 mx-auto mb-6 group-hover:bg-[var(--color-safety)] transition-colors duration-300">
                <Phone className="w-8 h-8 text-[var(--color-safety)] group-hover:text-[var(--color-tactical)]" />
              </div>
              <h3 className="text-xl font-display text-white mb-4 uppercase italic tracking-widest">{t('klub.phoneContact')}</h3>
              <div className="text-gray-300 space-y-4 font-medium">
                <div>
                  <p className="text-white font-bold">Ing. Miroslav Chrenko</p>
                  <p className="text-[10px] uppercase text-[var(--color-safety)] tracking-widest mb-1">{t('klub.president')}</p>
                  <a href="tel:0904650035" className="text-lg hover:text-[var(--color-safety)] transition-colors">0904 650 035</a>
                </div>
                <div className="w-12 h-px bg-white/10 mx-auto"></div>
                <div>
                  <p className="text-white font-bold">Juraj Hodul</p>
                  <p className="text-[10px] uppercase text-[var(--color-safety)] tracking-widest mb-1">{t('klub.vicePresident')}</p>
                  <a href="tel:0902630643" className="text-lg hover:text-[var(--color-safety)] transition-colors">0902 630 643</a>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="bg-[var(--color-slate)] p-10 rounded-2xl border border-white/5 text-center hover:border-[var(--color-safety)]/30 transition-colors group"
            >
              <div className="w-16 h-16 rounded-xl bg-[var(--color-safety)]/10 flex items-center justify-center border border-[var(--color-safety)]/20 mx-auto mb-6 group-hover:bg-[var(--color-safety)] transition-colors duration-300">
                <Info className="w-8 h-8 text-[var(--color-safety)] group-hover:text-[var(--color-tactical)]" />
              </div>
              <h3 className="text-xl font-display text-white mb-4 uppercase italic tracking-widest">{t('klub.billingInfo')}</h3>
              <div className="text-gray-300 space-y-3 font-medium">
                <div>
                  <span className="text-[10px] uppercase text-white/30 block tracking-widest">{t('klub.ico')}</span>
                  <span className="text-white font-mono">50046021</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-white/30 block tracking-widest">{t('klub.rcn')}</span>
                  <span className="text-white font-mono">VVS/1-900/90-47238</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
          </div>
        </div>
      </div>
    </div>
  );
}
