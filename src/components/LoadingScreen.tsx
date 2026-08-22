import { motion } from 'motion/react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center"
      >
        <img 
          src="/images/logohunterclubstrelnica.png" 
          alt="Hunter Club Logo" 
          className="h-32 md:h-48 w-auto" 
          referrerPolicy="no-referrer" 
        />
      </motion.div>
    </div>
  );
}
