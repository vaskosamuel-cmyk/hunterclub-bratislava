import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ConsentBarProps {
  show?: boolean;
}

export default function ConsentBar({ show = true }: ConsentBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!show) return;
    const hasAgreed = localStorage.getItem('userAgreedToCookies');
    if (!hasAgreed) {
      setIsVisible(true);
    }
  }, [show]);

  const handleAgree = () => {
    localStorage.setItem('userAgreedToCookies', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-[100] bg-[#1A1A1A] rounded-t-2xl border-t border-x border-[var(--color-safety)]/30 p-4 md:p-6 shadow-[0_0_30px_rgba(251,188,5,0.1)]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-safety)]/5 to-transparent opacity-100 pointer-events-none rounded-t-2xl"></div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
            <p className="text-gray-300 text-sm md:text-base text-center md:text-left">
              Používaním tejto stránky súhlasíte s používaním súborov cookies.
            </p>
            <button
              onClick={handleAgree}
              className="bg-[var(--color-safety)] text-black px-8 py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-yellow-400 transition-all text-sm shrink-0"
            >
              Potvrdiť
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
