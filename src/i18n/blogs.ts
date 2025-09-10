// Client-side blog translation registry.
// This file manages translations for blog articles that are not stored in a CMS.
// It maps language codes to article identifiers and their translated content.
// Used when articles don't have dynamic translations from a backend.

// Type definition for blog article translations
// Each field can be overridden per language
export type BlogTranslation = {
  title?: string;
  excerpt?: string;
  content?: string;
  slug?: string;
  image?: { url: string };
};

// Translation registry structure:
// language -> articleId -> translation overrides
export const blogTranslations: Record<string, Record<string, BlogTranslation>> = {
  // Keys here are article identifiers (slug or id) to match against article data.
  // For fallback articles, we use ids like 'fallback1', 'fallback2', etc.
  fr: {
    fallback1: {
      title: 'Pourquoi faire un bilan sanguin régulier ?',
      excerpt: "Pourquoi faire un bilan sanguin régulier",
      content:
        "Un bilan sanguin régulier est essentiel pour surveiller votre santé globale. Nos biologistes recommandent des contrôles périodiques pour détecter précocement d'éventuelles anomalies et prévenir les complications. Découvrez pourquoi ces examens sont importants et comment ils contribuent à votre bien-être.",
    },
    fallback2: {
      title: "Comprendre vos résultats d'analyses",
      excerpt: "Comprendre vos résultats d'analyses",
      content:
        "Nos biologistes vous expliquent comment lire et interpréter vos résultats de laboratoire. Apprenez à déchiffrer les valeurs normales, comprendre les unités de mesure et identifier les signes qui nécessitent une consultation médicale. Une interprétation correcte de vos analyses est la clé d'une prise en charge adaptée.",
    },
    fallback3: {
      title: 'Préparer sa visite au laboratoire',
      excerpt: 'Préparer sa visite au laboratoire',
      content:
        "Pour une visite optimale au laboratoire, une bonne préparation est essentielle. Découvrez les documents à apporter, les conditions de jeûne à respecter et les conseils pratiques pour faciliter votre prélèvement. Nos équipes sont là pour vous accompagner à chaque étape.",
    },
    fallback4: {
      title: 'Les nouveautés en biologie médicale',
      excerpt: 'Les nouveautés en biologie médicale',
      content:
        "La biologie médicale évolue constamment avec de nouvelles techniques et technologies. Découvrez les dernières avancées en matière d'analyses, les nouveaux marqueurs biologiques et les innovations qui améliorent la précision et la rapidité des diagnostics.",
    },
  },
  en: {
    fallback1: {
      title: 'Why get regular blood tests?',
      excerpt: 'Why get regular blood tests?',
      content:
        'Regular blood tests are essential for monitoring your overall health. Our biologists recommend periodic checks to detect potential abnormalities early and prevent complications. Discover why these tests are important and how they contribute to your well-being.',
    },
    fallback2: {
      title: 'Understanding your test results',
      excerpt: 'Understanding your test results',
      content:
        'Our biologists explain how to read and interpret your laboratory results. Learn to decipher normal values, understand measurement units, and identify signs that require medical consultation. Correct interpretation of your tests is key to appropriate care.',
    },
    fallback3: {
      title: 'Preparing your laboratory visit',
      excerpt: 'Preparing your laboratory visit',
      content:
        'For an optimal laboratory visit, good preparation is essential. Discover the documents to bring, fasting conditions to respect, and practical tips to facilitate your sampling. Our teams are here to accompany you every step of the way.',
    },
    fallback4: {
      title: 'Latest developments in medical biology',
      excerpt: 'Latest developments in medical biology',
      content:
        'Medical biology is constantly evolving with new techniques and technologies. Discover the latest advances in analyses, new biological markers, and innovations that improve the accuracy and speed of diagnoses.',
    },
  },
  es: {
    fallback1: {
      title: '¿Por qué hacer un análisis de sangre regular?',
      excerpt: '¿Por qué hacer un análisis de sangre regular?',
      content:
        'Un análisis de sangre regular es esencial para vigilar su salud general. Nuestros biólogos recomiendan controles periódicos para detectar precozmente posibles anomalías y prevenir complicaciones. Descubra por qué estos exámenes son importantes y cómo contribuyen a su bienestar.',
    },
    fallback2: {
      title: 'Entender sus resultados de análisis',
      excerpt: 'Entender sus resultados de análisis',
      content:
        'Nuestros biólogos le explican cómo leer e interpretar sus resultados de laboratorio. Aprenda a descifrar los valores normales, comprender las unidades de medida e identificar las señales que requieren una consulta médica. Una interpretación correcta de sus análisis es la clave de una atención adaptada.',
    },
    fallback3: {
      title: 'Preparar su visita al laboratorio',
      excerpt: 'Preparar su visita al laboratorio',
      content:
        'Para una visita óptima al laboratorio, una buena preparación es esencial. Descubra los documentos a aportar, las condiciones de ayuno a respetar y los consejos prácticos para facilitar su toma de muestra. Nuestros equipos están ahí para acompañarlo en cada etapa.',
    },
    fallback4: {
      title: 'Las novedades en biología médica',
      excerpt: 'Las novedades en biología médica',
      content:
        'La biología médica evoluciona constantemente con nuevas técnicas y tecnologías. Descubra los últimos avances en materia de análisis, los nuevos marcadores biológicos y las innovaciones que mejoran la precisión y la rapidez de los diagnósticos.',
    },
  },
  ar: {
    fallback1: {
      title: 'لماذا إجراء تحليل دم منتظم؟',
      excerpt: 'لماذا إجراء تحليل دم منتظم؟',
      content:
        'التحليل الدموي المنتظم ضروري لمراقبة صحتك العامة. يوصي علماؤنا الأحياء بفحوصات دورية للكشف المبكر عن أي شذوذ ومنع المضاعفات. اكتشف لماذا هذه الفحوصات مهمة وكيف تساهم في رفاهيتك.',
    },
    fallback2: {
      title: 'فهم نتائج تحاليلك',
      excerpt: 'فهم نتائج تحاليلك',
      content:
        'يشرح لك علماؤنا الأحياء كيفية قراءة وتفسير نتائج مختبرك. تعلم فك رموز القيم الطبيعية، فهم وحدات القياس وتحديد العلامات التي تتطلب استشارة طبية. التفسير الصحيح لتحاليلك هو مفتاح رعاية مناسبة.',
    },
    fallback3: {
      title: 'تحضير زيارتك للمختبر',
      excerpt: 'تحضير زيارتك للمختبر',
      content:
        'لزيارة مثالية للمختبر، التحضير الجيد ضروري. اكتشف الوثائق المراد إحضارها، شروط الصيام المراد احترامها والنصائح العملية لتسهيل أخذ عينتك. فرقنا موجودة لمرافقتك في كل خطوة.',
    },
    fallback4: {
      title: 'المستجدات في علم الأحياء الطبي',
      excerpt: 'المستجدات في علم الأحياء الطبي',
      content:
        'يتطور علم الأحياء الطبي باستمرار مع تقنيات وأدوات جديدة. اكتشف أحدث التقدمات في مجال التحاليل، العلامات البيولوجية الجديدة والابتكارات التي تحسن الدقة وسرعة التشخيصات.',
    },
  },
};
