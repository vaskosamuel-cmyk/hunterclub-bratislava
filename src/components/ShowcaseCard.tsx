import React, { useState } from 'react';
import { Info, ChevronRight, Target, ChevronDown, ChevronUp, User, Zap, Shield, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Highlight {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface ShowcaseCardProps {
  pkg: any;
  subtitle: string;
  image: string;
  highlights: Highlight[];
  details?: string[];
  onInfoClick: (pkg: any) => void;
  onBuyClick: () => void;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ 
  pkg, 
  subtitle, 
  image, 
  highlights, 
  details,
  onInfoClick, 
  onBuyClick 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();

  // Filter out highlights that are now displayed via details
  const filteredHighlights = highlights.filter(h => h.label !== "Počet výstrelov" && h.label !== "Zbrane");

  return (
    <div className="w-[90vw] shrink-0 snap-center md:w-auto md:shrink-1 bg-[#111] rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 flex flex-col group relative z-20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:scale-[1.02] hover:border-[var(--color-safety)]/50 hover:shadow-[0_40px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,199,0,0.15)]">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-forest)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Image Header */}
      <div className="h-[280px] relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-[#111]/30 to-transparent z-10"></div>
        <img 
          src={image} 
          alt={pkg.name} 
          className="w-full h-full object-cover opacity-90 brightness-110 group-hover:scale-110 group-hover:brightness-125 group-hover:contrast-110 transition-all duration-700" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute bottom-6 left-5 right-5 z-20">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white uppercase leading-tight mb-0.5 drop-shadow-lg tracking-tight">
            {t(`packages.${pkg.key}.name`).replace(/Balíček |Paket |Package |„|“/g, '')}
          </h3>
          <p className="text-[var(--color-safety)] text-xs font-bold uppercase tracking-[0.15em] drop-shadow-md">
            {t('showcaseCard.subtitle')}
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 md:p-6 pt-4 flex-grow flex flex-col relative z-20">
        <div className="space-y-3 mb-6 flex-grow">
          {/* Guns and Rounds */}
          {pkg.details && (
            <div className="space-y-2">
              <h5 className="text-[var(--color-safety)] text-[10px] font-bold uppercase tracking-wider mb-2">{t('showcaseCard.content')}</h5>
              {(isExpanded ? (t(`packages.${pkg.key}.details`) as unknown as string[]) : (t(`packages.${pkg.key}.details`) as unknown as string[]).slice(0, 3)).map((detail: string, i: number) => (
                <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                  <Target className="w-4 h-4 text-[var(--color-safety)] shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
              {(t(`packages.${pkg.key}.details`) as unknown as string[]).length > 3 && (
                <button 
                  onClick={() => setIsExpanded(!isExpanded)} 
                  className="text-[var(--color-safety)] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:text-white transition-colors mt-2"
                >
                  {isExpanded ? t('showcaseCard.less') : t('showcaseCard.more')}
                  {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              )}
            </div>
          )}

          {/* Other Highlights */}
          {filteredHighlights.length > 0 && (
            <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
              {filteredHighlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 group/item">
                  <div className="text-[var(--color-safety)] mt-0.5 shrink-0 transition-transform group-hover/item:scale-110">
                    {React.cloneElement(h.icon as React.ReactElement, { className: 'w-4 h-4' })}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase tracking-wider leading-none mb-1">{h.label}</span>
                    <span className="text-sm font-bold text-white leading-tight">{h.value}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <div className="text-2xl md:text-3xl font-display font-bold text-white leading-none tracking-widest">{pkg.price}</div>
            <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">{t('showcaseCard.perPerson')}</div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onInfoClick(pkg)} 
              className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors border border-white/10"
              title={t('showcaseCard.moreInfo')}
            >
              <Info className="w-5 h-5" />
            </button>
            <button 
              onClick={onBuyClick} 
              className="bg-[var(--color-safety)] text-black hover:bg-yellow-400 px-5 h-10 rounded-sm font-bold uppercase tracking-widest transition-all text-xs flex items-center gap-2 shadow-[0_4px_15px_rgba(251,188,5,0.2)] hover:shadow-[0_8px_25px_rgba(251,188,5,0.4)] group/btn"
            >
              {t('showcaseCard.buy')} <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseCard;
