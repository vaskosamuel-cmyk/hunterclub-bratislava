import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, ChevronRight } from 'lucide-react';
import Link from './Link';

export default function GiftVoucherPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('hasSeenGiftPopup');
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 15000); // 15 seconds

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenGiftPopup', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closePopup}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#1A1A1A] w-[clamp(280px,95vw,576px)] rounded-2xl border border-[var(--color-safety)]/50 shadow-[0_0_40px_rgba(251,188,5,0.2)] overflow-hidden relative group max-h-[90vh] overflow-y-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-safety)]/5 to-transparent opacity-100 pointer-events-none"></div>
            
            <button 
              onClick={closePopup}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-300 hover:text-white transition-colors z-20 bg-black/40 p-1.5 sm:p-2 rounded-full backdrop-blur-md border border-white/10"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="relative z-10 flex flex-col md:flex-row">
              {/* Left Side - Visual */}
              <div className="w-full md:w-2/5 relative overflow-hidden flex items-center justify-center min-h-[120px] sm:min-h-[200px] md:min-h-full">
                <div className="absolute inset-0">
                  <img 
                    src="/hunterclubzbrane.webp" 
                    alt="Gift Voucher" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1A1A1A] to-transparent"></div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="w-full md:w-3/5 p-5 sm:p-8 flex flex-col justify-center">
                <div className="mb-3 sm:mb-4">
                  <span className="inline-block bg-[var(--color-safety)] text-black text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-lg mb-2 sm:mb-3">
                    Exkluzívny Darček
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display uppercase italic leading-tight text-white">
                    Darujte <span className="text-[var(--color-safety)]">Adrenalín</span>
                  </h2>
                </div>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-8">
                  Hľadáte originálny darček? Naše strelecké balíky sú ideálnou voľbou pre narodeniny, výročia alebo teambuildingy.
                </p>

                <div className="space-y-2 sm:space-y-3 mt-auto pt-3 sm:pt-4 border-t border-white/10">
                  <Link 
                    to="/darcekovy-poukaz"
                    onClick={closePopup}
                    className="w-full bg-[var(--color-safety)] text-black py-2 sm:py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-yellow-400 transition-all text-xs sm:text-sm flex items-center justify-center gap-2"
                  >
                    KÚPIŤ POUKAZ 
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                  <button 
                    onClick={closePopup}
                    className="w-full bg-transparent text-white border border-white/20 py-1.5 sm:py-2 rounded-sm font-sans font-bold tracking-wider hover:bg-white/5 transition-all uppercase text-[10px] sm:text-xs flex items-center justify-center"
                  >
                    Možno neskôr
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
