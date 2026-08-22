import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  bgImage: string;
  overlayClass?: string;
  className?: string;
  imageClassName?: string;
}

export default function ParallaxSection({ 
  children, 
  bgImage, 
  overlayClass = "bg-gradient-to-b from-[#0D0D0D] via-[#0D0D0D]/80 to-[#0D0D0D]",
  className = "",
  imageClassName = "object-cover object-center"
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={bgImage}
          alt="Background"
          className={`w-full h-[104%] ${imageClassName}`}
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <div className={`absolute inset-0 z-10 ${overlayClass}`}></div>
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
