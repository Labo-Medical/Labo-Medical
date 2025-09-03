import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, TranslationKey } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_KEY = 'site_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    // Load saved language from localStorage
    try {
      const saved = localStorage.getItem(LANG_KEY) as Language;
      if (saved && translations[saved]) {
        setLanguageState(saved);
      }
    } catch (e) {
      // ignore localStorage errors
    }
  }, []);

  useEffect(() => {
    // Update document attributes and save to localStorage
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = translations[language].title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', translations[language].description);
    }

    try {
      localStorage.setItem(LANG_KEY, language);
    } catch (e) {
      // ignore localStorage errors
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (translations[lang]) {
      setLanguageState(lang);
    }
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.fr[key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
