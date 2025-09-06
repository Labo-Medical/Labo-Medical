/**
 * INTERNATIONALIZATION (i18n) CONFIGURATION
 * 
 * This file sets up multi-language support for the Labo-Medical project.
 * It includes translations for Spanish, French, English, and Arabic languages.
 * 
 * The translations are organized by language code (es, fr, en, ar) and include
 * sections for navigation, values, documents, and professional menu items.
 * 
 * Default language is set to Spanish (es).
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources containing all text content for each supported language
const resources = {
  // Spanish translations (Default language)
  es: {
    translation: {
      "header": {
        "nav_labs": "NUESTROS LABORATORIOS ASOCIADOS",
        "nav_presentation": "Presentación",
        "nav_kawassim": "Laboratorio Zeroual Kawassim",
        "nav_souani": "Laboratorio Zeroual Souani",
        "nav_charf": "Laboratorio Zeroual Charf",
        "nav_specialties": "Especialidades Biológicas",
        "nav_pros": "ÁREA PROFESIONAL",
        "nav_catalogues": "Catálogos",
        "nav_recommendations": "Recomendaciones preanalíticas",
        "nav_central_purchase": "Central de compras",
        "nav_resources": "Recursos documentales",
        "nav_sampling": "Muestreo",
        "nav_patient": "ÁREA DEL PACIENTE",
        "nav_appointment": "Cita previa (Muestreo)",
        "nav_prepare": "Preparar análisis",
        "nav_results": "Resultados",
        "nav_faq": "FAQ",
        "nav_news": "Noticias biológicas",
        "nav_complaints": "QUEJAS Y SUGERENCIAS",
        "nav_contact": "CONTACTO"
      },
      "values": {
        "title": "Los Laboratorios Zeroual le brindan un servicio de calidad y proximidad.",
        "quality_title": "Calidad e Investigación Biomédica",
        "quality_text": "Tecnologías avanzadas y mejora continua.",
        "services_title": "Servicios y Proximidad",
        "services_text": "Acogida personalizada y red territorial eficiente.",
        "competence_title": "Competencia y Redes",
        "competence_text": "Fuerte espíritu de equipo y experiencia rigurosa.",
        "impartiality_title": "Imparcialidad y Confidencialidad",
        "impartiality_text": "Ética, confianza y relaciones humanas sólidas."
      },
      "documents": {
        "title": "Recursos documentales",
        "description": "Encuentre aquí todos los documentos esenciales para sus actividades profesionales.\n\nSe actualizan regularmente.",
        "good_practices": "Guía de buenas prácticas (PDF)"
      },
      "pro_menu": {
        "documents": "Documentos",
        "recommendations": "Recomendaciones preanalíticas",
        "central_purchase": "Central de compras",
        "catalogues": "Catálogos",
        "sampling": "Muestreo"
      }
    }
  },
  // French translations
  fr: {
    translation: {
      "header": {
        "nav_labs": "NOS LABORATOIRES PARTENAIRES",
        "nav_presentation": "Présentation",
        "nav_kawassim": "Laboratoire Zeroual Kawassim",
        "nav_souani": "Laboratoire Zeroual Souani",
        "nav_charf": "Laboratoire Zeroual Charf",
        "nav_specialties": "Spécialités Biologiques",
        "nav_pros": "ESPACE PROS",
        "nav_catalogues": "Catalogues",
        "nav_recommendations": "Récommandations préanalytiques",
        "nav_central_purchase": "Centrale d'achats",
        "nav_resources": "Ressources documentaires",
        "nav_sampling": "Prélevements",
        "nav_patient": "ESPACE PATIENT",
        "nav_appointment": "Prendre RDV (Prélèvement)",
        "nav_prepare": "Préparer analyses",
        "nav_results": "Résultats",
        "nav_faq": "FAQ",
        "nav_news": "Actualités biologiques",
        "nav_complaints": "RÉCLAMATIONS & SUGGESTIONS",
        "nav_contact": "CONTACT"
      },
      "values": {
        "title": "Les Laboratoires Zeroual vous apportent un service de qualité et de proximité.",
        "quality_title": "Qualité & Recherche Biomédicale",
        "quality_text": "Technologies avancées et amélioration continue.",
        "services_title": "Services & Proximité",
        "services_text": "Accueil personnalisé et maillage territorial efficace.",
        "competence_title": "Compétence & Réseautage",
        "competence_text": "Un esprit d'équipe fort et une expertise rigoureuse.",
        "impartiality_title": "Impartialité & Confidentialité",
        "impartiality_text": "Éthique, confiance et relations humaines solides."
      },
      "documents": {
        "title": "Ressources documentaires",
        "description": "Retrouvez ici tous les documents indispensables à vos activités professionnelles.\n\nIls sont mis à jour régulièrement.",
        "good_practices": "Guide des bonnes pratiques (PDF)"
      },
      "pro_menu": {
        "documents": "Documents",
        "recommendations": "Récommandations préanalytique",
        "central_purchase": "Centrale d'achats",
        "catalogues": "Catalogues",
        "sampling": "Prélèvements"
      }
    }
  },
  // English translations
  en: {
    translation: {
      "header": {
        "nav_labs": "OUR PARTNER LABORATORIES",
        "nav_presentation": "Presentation",
        "nav_kawassim": "Zeroual Kawassim Laboratory",
        "nav_souani": "Zeroual Souani Laboratory",
        "nav_charf": "Zeroual Charf Laboratory",
        "nav_specialties": "Biological Specialties",
        "nav_pros": "PROFESSIONAL AREA",
        "nav_catalogues": "Catalogues",
        "nav_recommendations": "Pre-analytical recommendations",
        "nav_central_purchase": "Central purchasing",
        "nav_resources": "Documentary resources",
        "nav_sampling": "Sampling",
        "nav_patient": "PATIENT AREA",
        "nav_appointment": "Book appointment (Sampling)",
        "nav_prepare": "Prepare analyses",
        "nav_results": "Results",
        "nav_faq": "FAQ",
        "nav_news": "Biological news",
        "nav_complaints": "COMPLAINTS & SUGGESTIONS",
        "nav_contact": "CONTACT"
      },
      "values": {
        "title": "Zeroual Laboratories provide you with quality and proximity service.",
        "quality_title": "Quality & Biomedical Research",
        "quality_text": "Advanced technologies and continuous improvement.",
        "services_title": "Services & Proximity",
        "services_text": "Personalized welcome and efficient territorial network.",
        "competence_title": "Competence & Networking",
        "competence_text": "Strong team spirit and rigorous expertise.",
        "impartiality_title": "Impartiality & Confidentiality",
        "impartiality_text": "Ethics, trust and solid human relationships."
      },
      "documents": {
        "title": "Documentary resources",
        "description": "Find here all the essential documents for your professional activities.\n\nThey are updated regularly.",
        "good_practices": "Good practices guide (PDF)"
      },
      "pro_menu": {
        "documents": "Documents",
        "recommendations": "Pre-analytical recommendations",
        "central_purchase": "Central purchasing",
        "catalogues": "Catalogues",
        "sampling": "Sampling"
      }
    }
  },
  // Arabic translations (RTL support)
  ar: {
    translation: {
      "header": {
        "nav_labs": "مختبراتنا الشريكة",
        "nav_presentation": "العرض التقديمي",
        "nav_kawassim": "مختبر زروال كاواسيم",
        "nav_souani": "مختبر زروال سواني",
        "nav_charf": "مختبر زروال شرف",
        "nav_specialties": "التخصصات البيولوجية",
        "nav_pros": "منطقة المختصين",
        "nav_catalogues": "الكتالوجات",
        "nav_recommendations": "التوصيات ما قبل التحليلية",
        "nav_central_purchase": "المشتريات المركزية",
        "nav_resources": "الموارد الوثائقية",
        "nav_sampling": "أخذ العينات",
        "nav_patient": "منطقة المريض",
        "nav_appointment": "حجز موعد (أخذ عينة)",
        "nav_prepare": "إعداد التحاليل",
        "nav_results": "النتائج",
        "nav_faq": "الأسئلة الشائعة",
        "nav_news": "الأخبار البيولوجية",
        "nav_complaints": "الشكاوى والاقتراحات",
        "nav_contact": "اتصل بنا"
      },
      "values": {
        "title": "مختبرات زروال تقدم لكم خدمة ذات جودة وقرب.",
        "quality_title": "الجودة والبحث الطبي الحيوي",
        "quality_text": "تقنيات متقدمة وتحسين مستمر.",
        "services_title": "الخدمات والقرب",
        "services_text": "استقبال شخصي وشبكة إقليمية فعالة.",
        "competence_title": "الكفاءة والتواصل",
        "competence_text": "روح فريق قوية وخبرة دقيقة.",
        "impartiality_title": "الحياد والسرية",
        "impartiality_text": "أخلاقيات وثقة وعلاقات إنسانية قوية."
      },
      "documents": {
        "title": "الموارد الوثائقية",
        "description": "اعثر هنا على جميع الوثائق الأساسية لأنشطتك المهنية.\n\nيتم تحديثها بانتظام.",
        "good_practices": "دليل الممارسات الجيدة (PDF)"
      },
      "pro_menu": {
        "documents": "الوثائق",
        "recommendations": "التوصيات ما قبل التحليلية",
        "central_purchase": "المشتريات المركزية",
        "catalogues": "الكتالوجات",
        "sampling": "أخذ العينات"
      }
    }
  }
};

// Determine initial language: saved -> browser -> default 'fr'
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

// Initialize i18n with configuration
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: detectInitialLang(), // Default to French; use saved/browser if available
    fallbackLng: 'fr',
    supportedLngs: supported as unknown as string[],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

export default i18n;
