import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../i18n/translations';

type Language = 'sk' | 'de' | 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: { returnObjects?: boolean }) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. Check URL first for shareable links
    if (typeof window !== 'undefined') {
      const pathLang = window.location.pathname.split('/')[1];
      if (pathLang === 'sk' || pathLang === 'de' || pathLang === 'en' || pathLang === 'ru') {
        return pathLang as Language;
      }
    }
    // 2. Default to Slovak for base URL
    return 'sk';
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string, options?: { returnObjects?: boolean }): any => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to Slovak if translation is missing
        let fallbackValue: any = translations['sk'];
        for (const fk of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fk in fallbackValue) {
            fallbackValue = fallbackValue[fk];
          } else {
            return key; // Return key if not found in fallback either
          }
        }
        return options?.returnObjects ? fallbackValue : (fallbackValue as string);
      }
    }
    
    return options?.returnObjects ? value : (value as string);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
