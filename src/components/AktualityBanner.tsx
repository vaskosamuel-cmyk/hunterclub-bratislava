import { useState, useEffect } from 'react';
import { Megaphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AktualityBanner() {
  const [aktuality, setAktuality] = useState<{text: string} | null>(null);

  useEffect(() => {
    fetch(`/content/aktuality.json?t=${new Date().getTime()}`)
      .then(async res => {
        if (!res.ok) return null;
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          return null;
        }
      })
      .then(data => {
        if (data && data.text && data.text.trim() !== '') {
          setAktuality(data);
        } else {
          setAktuality(null);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <AnimatePresence>
      {aktuality && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-[var(--color-safety)] text-[var(--color-tactical)] border-b border-black/10 overflow-hidden shadow-lg w-full z-50 relative"
        >
          <div className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-2.5 md:py-3 lg:py-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center md:text-left">
              <div className="flex items-center gap-2 bg-black/5 px-3 py-0.5 rounded-full md:mb-0 mb-1 flex-shrink-0">
                <div className="w-1.5 h-1.5 bg-[var(--color-tactical)] rounded-full animate-ping"></div>
                <Megaphone className="w-3 h-3 text-[var(--color-tactical)]" />
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                  AKTUALITY
                </p>
                <div className="w-1.5 h-1.5 bg-[var(--color-tactical)] rounded-full animate-ping"></div>
              </div>
              <p className="text-sm md:text-base font-bold tracking-wide leading-snug">
                {aktuality.text}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
