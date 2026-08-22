import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Trophy, Zap, ChevronRight, Search, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Link from '../components/Link';
import { ReservationModal } from '../components/Modal';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

export default function ProExperience() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <>
      <div className="flex flex-col">
      {/* Hero / Quick Actions */}
      <section className="pt-32 md:pt-40 pb-24 bg-[var(--color-tactical)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <Breadcrumbs items={[{ name: t('pro.breadcrumb') }]} />
              <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display tracking-tight mb-4 uppercase italic text-white">
                {t('pro.heroTitle')} <span className="text-[var(--color-safety)]">{t('pro.heroTitleHighlight')}</span>
              </h1>
              <p className="text-[20px] leading-[28px] text-gray-300 font-medium mb-8 md:mb-10">{t('pro.heroDesc')}</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsReservationModalOpen(true)}
                className="w-full sm:w-auto justify-center bg-[var(--color-safety)] text-[var(--color-tactical)] px-6 py-3 md:px-8 md:py-4 h-[54px] md:h-[60px] rounded-sm font-display text-xl font-bold tracking-wider hover:bg-yellow-400 transition-all flex items-center gap-2 uppercase italic shadow-[0_0_20px_rgba(251,188,5,0.3)]"
              >
                <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                {t('pro.heroBtn')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--color-slate)] p-8 rounded-sm border border-white/5">
              <Trophy className="w-10 h-10 text-[var(--color-safety)] mb-6" />
              <h3 className="text-2xl font-display mb-2">{t('pro.card1Title')}</h3>
              <p className="text-gray-300 text-sm mb-6">{t('pro.card1Desc')}</p>
              <Link to="/sportovy-klub-hdi" className="text-[var(--color-safety)] font-bold flex items-center gap-2 text-sm">
                {t('pro.card1Link')} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-[var(--color-slate)] p-8 rounded-sm border border-white/5">
              <Zap className="w-10 h-10 text-[var(--color-safety)] mb-6" />
              <h3 className="text-2xl font-display mb-2">{t('pro.card2Title')}</h3>
              <p className="text-gray-300 text-sm mb-6">{t('pro.card2Desc')}</p>
              <Link to="/kurzy" className="text-[var(--color-safety)] font-bold flex items-center gap-2 text-sm">
                {t('pro.card2Link')} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-[var(--color-slate)] p-8 rounded-sm border border-white/5">
              <FileText className="w-10 h-10 text-[var(--color-safety)] mb-6" />
              <h3 className="text-2xl font-display mb-2">{t('pro.card3Title')}</h3>
              <p className="text-gray-300 text-sm mb-6">{t('pro.card3Desc')}</p>
              <Link to="/cennik" className="text-[var(--color-safety)] font-bold flex items-center gap-2 text-sm">
                {t('pro.card3Link')} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ammo Pricing */}
      <section className="py-24 bg-[var(--color-slate)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div>
              <h2 className="text-4xl font-display mb-2">{t('pro.ammoTitle')}</h2>
              <p className="text-sm text-gray-400">{t('pro.vatInfo')}</p>
            </div>
            <div className="bg-black/20 px-4 py-2 rounded-sm border border-white/10 flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input type="text" placeholder={t('pro.searchPlaceholder')} className="bg-transparent border-none focus:ring-0 text-sm w-48" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { cal: '9mm Luger', qty: `1000 ${t('pro.pcs')}`, price: '280€', unit: `0.28€/${t('pro.pcs')}` },
              { cal: '.223 Remington', qty: `500 ${t('pro.pcs')}`, price: '245€', unit: `0.49€/${t('pro.pcs')}` },
              { cal: '7.62x39', qty: `500 ${t('pro.pcs')}`, price: '195€', unit: `0.39€/${t('pro.pcs')}` },
              { cal: '.45 ACP', qty: `500 ${t('pro.pcs')}`, price: '310€', unit: `0.62€/${t('pro.pcs')}` },
            ].map((item, idx) => (
              <div key={idx} className="bg-[var(--color-tactical)] p-6 rounded-sm flex justify-between items-center border border-white/5 hover:border-white/20 transition-colors">
                <div>
                  <div className="font-bold text-lg">{item.cal}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest">{item.qty}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-display text-[var(--color-safety)]">{item.price}</div>
                  <div className="text-[10px] text-gray-400">{item.unit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isReservationModalOpen && (
          <ReservationModal 
            isOpen={isReservationModalOpen} 
            onClose={() => setIsReservationModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
