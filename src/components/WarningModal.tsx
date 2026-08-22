import { motion, AnimatePresence } from 'motion/react';
import { Target, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface WarningModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function WarningModal({ isOpen, onConfirm, onCancel }: WarningModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-[#111] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-lg relative group z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-safety)]/5 to-transparent opacity-100 pointer-events-none"></div>
            
            <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20 transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-5 relative z-10">
              <div className="flex items-center gap-3 mb-4 pr-6">
                <div className="bg-[var(--color-safety)]/10 p-2 rounded-full border border-[var(--color-safety)]/20 shrink-0">
                  <Target className="w-5 h-5 text-[var(--color-safety)]" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-bold text-white uppercase leading-tight">Informácie o streľbe</h2>
                </div>
              </div>
              
              <div className="text-gray-300 space-y-3 mb-5 leading-relaxed text-xs">
                <p>
                  Naše stránky obsahujú informácie o zbraniach a strelive. Niektoré z nich sú určené pre odbornú verejnosť, ktorá je držiteľom zbrojného preukazu. Pokračovaním potvrdzujete, že ste sa oboznámili s týmito informáciami.
                </p>
              </div>

              {/* Prominent Public Shooting Info */}
              <div className="bg-[var(--color-safety)]/10 border border-[var(--color-safety)]/30 p-3 rounded-lg mb-5 shadow-inner">
                <p className="font-bold text-white uppercase text-center tracking-wider leading-relaxed text-[10px]">
                  STREĽBY PRE VEREJNOSŤ BEZ ZBROJNÉHO PREUKAZU SÚ MOŽNÉ ZA ÚČASTI NÁŠHO INŠTRUKTORA.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-end pt-3 border-t border-white/10">
                <button 
                  onClick={onCancel}
                  className="px-4 py-2 bg-transparent text-white border border-white/20 rounded-sm font-sans font-bold tracking-wider hover:bg-white/5 transition-all uppercase text-[10px] flex items-center justify-center"
                >
                  Zrušiť
                </button>
                <button 
                  onClick={onConfirm}
                  className="px-4 py-2 bg-[var(--color-safety)] text-black hover:bg-yellow-400 rounded-sm font-bold uppercase tracking-wider transition-all text-[10px] flex items-center justify-center"
                >
                  Rozumiem
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
