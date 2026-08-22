import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

export default function Kontakt() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const { t } = useLanguage();

  const addressText = t('kontakt.addressText') || '';
  const addressLines = addressText.split('\n');
  const mainAddress = addressLines[0] || '';
  const [street, city] = mainAddress.split(', ');
  const secondaryLines = addressLines.slice(1);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Shared Background Wrapper */}
      <div className="relative">
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img 
            style={{ y: backgroundY }}
            src="/hunterclub5.webp" 
            alt="Background" 
            className="w-full h-[130vh] object-cover opacity-40"
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
                <Breadcrumbs items={[{ name: t('nav.kontakt') }]} />
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-12 h-[2px] bg-[var(--color-safety)]"></span>
                  <span className="text-[var(--color-safety)] font-bold tracking-[0.3em] uppercase text-xs">
                    {t('kontakt.heroBadge')}
                  </span>
                </div>
                <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display tracking-tight mb-4 uppercase italic text-white">
                  {t('kontakt.heroTitle')} <span className="text-[var(--color-safety)]">{t('kontakt.heroTitleHighlight')}</span>
                </h1>
                <p className="text-[20px] leading-[28px] text-white mb-8 md:mb-10 font-medium max-w-2xl border-l-4 border-[var(--color-safety)] pl-4 md:pl-6">
                  {t('kontakt.heroDesc')}
                </p>
              </motion.div>
            </div>
          </section>

          <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-start">
              <div className="bg-[var(--color-forest)]/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 flex flex-col justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] order-2 lg:order-1 lg:sticky lg:top-32">
          <h2 className="text-3xl md:text-4xl font-display mb-8 uppercase italic text-white">{t('kontakt.reservationsTitle')}</h2>
          <div className="space-y-8">
            <p className="text-lg md:text-xl text-white leading-relaxed">
              {t('kontakt.reservationsText')}
            </p>
            
            <div className="grid grid-cols-1 gap-4 md:gap-6 pt-4 md:pt-8">
              <a 
                href="tel:+421911650032" 
                className="bg-[var(--color-safety)] text-[var(--color-tactical)] py-4 md:py-6 rounded-sm font-display text-2xl md:text-3xl font-bold tracking-wider hover:bg-yellow-500 transition-all flex items-center justify-center gap-3 md:gap-4 shadow-lg"
              >
                <Phone className="w-6 h-6 md:w-8 md:h-8" />
                +421 911 650 032
              </a>
              
              <a 
                href="mailto:info@hunterclub.sk" 
                className="bg-white/5 border border-white/10 text-white py-4 md:py-6 rounded-sm font-display text-xl md:text-2xl font-bold tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-3 md:gap-4"
              >
                <Mail className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-safety)]" />
                info@hunterclub.sk
              </a>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-[var(--color-safety)] font-bold tracking-widest uppercase text-xs md:text-sm mb-2">
                {t('kontakt.importantNoticeTitle')}
              </p>
              <p className="text-white text-xs md:text-sm italic">
                {t('kontakt.importantNoticeText')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-12 order-1 lg:order-2">
          <div className="bg-[var(--color-forest)]/90 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h2 className="text-3xl md:text-4xl font-display mb-8 uppercase italic text-white">{t('kontakt.whereToFindUs')}</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[var(--color-safety)] shrink-0 mt-1" />
                <div className="w-full">
                  <h4 className="font-bold mb-1 text-white text-xs md:text-sm uppercase tracking-wider">{t('kontakt.addressTitle')}</h4>
                  <p className="text-lg md:text-xl font-bold text-white tracking-wide leading-tight">
                    {street.replace(' (OD PRIOR)', '')}
                    {street.includes('(OD PRIOR)') && <span className="block md:inline"> (OD PRIOR)</span>}
                  </p>
                  {city && <p className="text-base md:text-lg text-gray-300 font-bold tracking-wide mt-1">{city}</p>}
                  
                  {secondaryLines.length > 0 && (
                    <div className="mt-4 p-3 md:p-4 bg-white/5 border-l-2 border-[var(--color-safety)] rounded-r-lg space-y-1">
                      {secondaryLines.map((line, index) => (
                        <p key={index} className="text-[11px] md:text-xs text-gray-300 font-medium tracking-wide flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-safety)] shrink-0"></span>
                          {line}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 rounded-xl overflow-hidden border border-white/10 relative shadow-lg">
                    <img 
                      src="/hunter-club-strelnica-bratislava-mapa.jpg" 
                      alt="Mapa Kamenné námestie 1A" 
                      className="w-full h-auto object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                <div>
                  <h4 className="font-bold mb-1 text-white">{t('kontakt.phoneTitle')}</h4>
                  <p className="text-gray-300">+421 911 650 032</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                <div>
                  <h4 className="font-bold mb-1 text-white">{t('kontakt.emailTitle')}</h4>
                  <p className="text-gray-300">info@hunterclub.sk</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-[250px] md:h-[300px] bg-zinc-900 rounded-sm overflow-hidden border border-white/10 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <iframe 
              src="https://maps.google.com/maps?q=V%C3%9AB%20bankomat%2C%20Kamenn%C3%A9%20n%C3%A1mestie%2C%20Bratislava&t=&z=17&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
        </div>
      </div>
      </div>
    </div>
  );
}
