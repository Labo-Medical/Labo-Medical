import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import des fichiers JSON depuis le dossier i18n
import fr from './fr.json';
import en from './en.json';
import ar from './ar.json';
import es from './es.json';

// Définition des ressources de traduction
const resources = {
  fr: { translation: fr },
  en: { translation: en },
  ar: { translation: ar },
  es: { translation: es },
};

// Langues supportées
const supported = ['fr', 'es', 'en', 'ar'] as const;
type Supported = typeof supported[number];

// Détection de la langue initiale
function detectInitialLang(): Supported {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app:lang');
      if (saved && supported.includes(saved as Supported)) return saved as Supported;

      const nav = navigator.language || (navigator as any).userLanguage || '';
      const base = nav.split('-')[0];
      if (supported.includes(base as Supported)) return base as Supported;
    }
  } catch {}
  return 'fr'; // fallback
}

// Initialisation i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: detectInitialLang(),
    fallbackLng: 'fr',
    supportedLngs: supported as unknown as string[],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    debug: true,
  });

export default i18n;
