import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './fr.json';
import en from './en.json';
import ar from './ar.json';
import es from './es.json';

// Define the translation resources for each supported language
// Each language object contains a 'translation' key with the JSON data
const resources = {
  fr: { translation: fr },
  en: { translation: en },
  ar: { translation: ar },
  es: { translation: es },
};

// List of supported languages in the application
const supported = ['fr', 'es', 'en', 'ar'] as const;
type Supported = typeof supported[number];

// Function to detect the initial language for the user
// Priority: localStorage > browser navigator language > fallback to French
function detectInitialLang(): Supported {
  try {
    if (typeof window !== 'undefined') {
      // Check if user has previously selected a language
      const saved = localStorage.getItem('app:lang');
      if (saved && (supported as readonly string[]).includes(saved)) return saved as Supported;
      
      // Fallback to browser's preferred language
      const nav = navigator.language || (navigator as any).userLanguage || '';
      const base = (nav || '').split('-')[0]; // Extract base language (e.g., 'en' from 'en-US')
      if ((supported as readonly string[]).includes(base)) return base as Supported;
    }
  } catch {}
  return 'fr'; // Default fallback language
}

// Initialize i18next with React integration
i18n
  .use(initReactI18next) // Connect i18next to React
  .init({
    resources, // Translation resources
    lng: detectInitialLang(), // Initial language
    fallbackLng: 'fr', // Fallback language if translation is missing
    supportedLngs: supported as unknown as string[], // Supported languages
    nonExplicitSupportedLngs: true, // Allow language variants (e.g., 'en-US' for 'en')
    load: 'languageOnly', // Load only the base language, not region variants
    interpolation: {
      escapeValue: false, // React already escapes values, so disable i18next escaping
    },
    debug: true, // Enable debug mode to log translation issues (can be set to false in production)
  });

export default i18n;

