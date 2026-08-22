import { motion, AnimatePresence } from 'motion/react';
import { X, Phone } from 'lucide-react';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ isOpen, onClose, title, children, className = "bg-[var(--color-tactical)]" }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-md max-h-[90vh] flex flex-col border border-white/10 rounded-sm shadow-2xl overflow-hidden ${className}`}
          >
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-black/40">
              <h3 className="text-xl sm:text-2xl font-display uppercase italic text-white pr-4">{title}</h3>
              <button
                onClick={onClose}
                className="p-1 sm:p-2 text-gray-300 hover:text-white transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <div className="p-5 sm:p-8 max-h-[80vh] overflow-y-auto bg-black/20">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function OrderModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={t('modal.orderTitle')}
      className="bg-[#1A1A1A] !rounded-2xl !border-[var(--color-safety)]/30 !shadow-[0_0_40px_rgba(251,188,5,0.15)]"
    >
      <div className="text-center relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-safety)]/5 to-transparent pointer-events-none -m-5 sm:-m-8 p-5 sm:p-8 h-[150px] sm:h-[200px] opacity-50"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[var(--color-safety)]/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-[var(--color-safety)]/20">
            <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--color-safety)]" />
          </div>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed font-medium">
            {t('modal.orderDesc1')}<span className="text-[var(--color-safety)] font-black">{t('modal.orderDesc2')}</span>{t('modal.orderDesc3')}
          </p>
          <div className="space-y-3 sm:space-y-4">
            <a
              href="tel:+421911650032"
              className="flex items-center justify-center gap-2 sm:gap-3 w-full bg-[var(--color-safety)] text-black py-3 sm:py-5 rounded-xl font-display text-xl sm:text-2xl font-bold tracking-widest hover:bg-yellow-400 transition-all shadow-xl uppercase italic"
            >
              <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
              +421 911 650 032
            </a>
            <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest font-bold">
              {t('modal.weAreHere')}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function ReservationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={t('modal.resTitle')}
      className="bg-[#1A1A1A] !rounded-2xl !border-[var(--color-safety)]/30 !shadow-[0_0_40px_rgba(251,188,5,0.15)]"
    >
      <div className="text-center relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-safety)]/5 to-transparent pointer-events-none -m-5 sm:-m-8 p-5 sm:p-8 h-[150px] sm:h-[200px] opacity-50"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[var(--color-safety)]/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-[var(--color-safety)]/20">
            <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--color-safety)]" />
          </div>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed font-medium">
            {t('modal.resDesc1')}
            <br />
            {t('modal.resDesc2')}
          </p>
          <div className="space-y-3 sm:space-y-4">
            <a
              href="tel:+421911650032"
              className="flex items-center justify-center gap-2 sm:gap-3 w-full bg-[var(--color-safety)] text-black py-3 sm:py-5 rounded-xl font-display text-xl sm:text-2xl font-bold tracking-widest hover:bg-yellow-400 transition-all shadow-xl uppercase italic"
            >
              <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
              +421 911 650 032
            </a>
            <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest font-bold">
              {t('modal.weAreHere')}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
