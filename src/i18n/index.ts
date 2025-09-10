import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './fr.json';
import en from './en.json';
import ar from './ar.json';
import es from './es.json';


const resources = {
  fr: { translation: fr },
  en: { translation: en },
  ar: { translation: ar },
  es: { translation: es },
};

const supported = ['fr', 'es', 'en', 'ar'] as const;
type Supported = typeof supported[number];

function detectInitialLang(): Supported {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app:lang');
      if (saved && (supported as readonly string[]).includes(saved)) return saved as Supported;
      const nav = navigator.language || (navigator as any).userLanguage || '';
      const base = (nav || '').split('-')[0];
      if ((supported as readonly string[]).includes(base)) return base as Supported;
    }
  } catch {}
  return 'fr';
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: detectInitialLang(),
    fallbackLng: 'fr',
    supportedLngs: supported as unknown as string[],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    debug: true, // Temporarily enable debug mode to check for translation issues
  });

export default i18n;

