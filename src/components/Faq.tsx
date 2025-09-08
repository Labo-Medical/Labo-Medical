import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Faq.css";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

// Questions/réponses par défaut - Avant le prélèvement
const buildFaqBeforeFallback = (t: any): FAQItem[] => [
  {
    question: t('faq.before.question1'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.before.answer1') }} />
    ),
  },
  {
    question: t('faq.before.question2'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.before.answer2') }} />
    ),
  },
  {
    question: t('faq.before.question3'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.before.answer3') }} />
    ),
  },
  {
    question: t('faq.before.question4'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.before.answer4') }} />
    ),
  },
  {
    question: t('faq.before.question5'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.before.answer5') }} />
    ),
  },
  {
    question: t('faq.before.question6'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.before.answer6') }} />
    ),
  },
  {
    question: t('faq.before.question7'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.before.answer7') }} />
    ),
  },
  {
    question: t('faq.before.question8'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.before.answer8') }} />
    ),
  },
  {
    question: t('faq.before.question9'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.before.answer9') }} />
    ),
  },
  {
    question: t('faq.before.question10'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.before.answer10') }} />
    ),
  },
];

// Questions/réponses par défaut - Après le prélèvement
const buildFaqAfterFallback = (t: any): FAQItem[] => [
  {
    question: t('faq.after.question1'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.after.answer1') }} />
    ),
  },
  {
    question: t('faq.after.question2'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.after.answer2') }} />
    ),
  },
  {
    question: t('faq.after.question3'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.after.answer3') }} />
    ),
  },
  {
    question: t('faq.after.question4'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.after.answer4') }} />
    ),
  },
  {
    question: t('faq.after.question5'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.after.answer5') }} />
    ),
  },
  {
    question: t('faq.after.question6'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.after.answer6') }} />
    ),
  },
  {
    question: t('faq.after.question7'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.after.answer7') }} />
    ),
  },
  {
    question: t('faq.after.question8'),
    answer: (
      <div dangerouslySetInnerHTML={{ __html: t('faq.after.answer8') }} />
    ),
  },
];

// Fonction simulée de fetch - remplace par ta fonction fetch réelle depuis Strapi
async function fetchFAQFromStrapi(): Promise<
  { id: number; attributes: { question: string; answer: string; category: "before" | "after" } }[]
> {
  // Exemple fetch : const res = await fetch("http://localhost:1337/api/faqs?populate=*");
  // const json = await res.json();
  // return json.data;

  // Pour le moment retourne un tableau vide pour forcer fallback
  return [];
}

export default function FAQTwoColumns() {
  const { t } = useTranslation();
  const [faqBefore, setFaqBefore] = useState<FAQItem[]>([]);
  const [faqAfter, setFaqAfter] = useState<FAQItem[]>([]);

  const [openBefore, setOpenBefore] = useState<number | null>(null);
  const [openAfter, setOpenAfter] = useState<number | null>(null);

  // Initialize fallback data
  useEffect(() => {
    setFaqBefore(buildFaqBeforeFallback(t));
    setFaqAfter(buildFaqAfterFallback(t));
  }, [t]);

  useEffect(() => {
    fetchFAQFromStrapi()
      .then((data) => {
        if (!data || data.length === 0) return; // fallback

        const before = data
          .filter((item) => item.attributes.category === "before")
          .map((item) => ({
            question: item.attributes.question,
            answer: <div dangerouslySetInnerHTML={{ __html: item.attributes.answer }} />,
          }));

        const after = data
          .filter((item) => item.attributes.category === "after")
          .map((item) => ({
            question: item.attributes.question,
            answer: <div dangerouslySetInnerHTML={{ __html: item.attributes.answer }} />,
          }));

        if (before.length > 0) setFaqBefore(before);
        if (after.length > 0) setFaqAfter(after);
      })
      .catch((err) => {
        console.error("Erreur récupération FAQ Strapi, fallback aux données locales.", err);
      });
  }, []);

  const toggleBefore = (index: number) => {
    setOpenBefore(openBefore === index ? null : index);
  };

  const toggleAfter = (index: number) => {
    setOpenAfter(openAfter === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">{t('faq.title')}</h1>
      <div className="faq-columns">
        <section className="faq-column" aria-labelledby="faq-before-title">
          <h2 id="faq-before-title" className="faq-column-title">{t('faq.before_title')}</h2>
          {faqBefore.map((item, idx) => (
            <div key={idx} className="faq-item">
              <button
                className={`faq-question ${openBefore === idx ? "open" : ""}`}
                onClick={() => toggleBefore(idx)}
                aria-expanded={openBefore === idx}
                aria-controls={`before-answer-${idx}`}
                id={`before-question-${idx}`}
              >
                {item.question}
                <span className={`faq-arrow ${openBefore === idx ? "rotated" : ""}`} aria-hidden="true">▼</span>
              </button>
              <div
                id={`before-answer-${idx}`}
                role="region"
                aria-labelledby={`before-question-${idx}`}
                className={`faq-answer ${openBefore === idx ? "show" : ""}`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </section>

        <section className="faq-column" aria-labelledby="faq-after-title">
          <h2 id="faq-after-title" className="faq-column-title">{t('faq.after_title')}</h2>
          {faqAfter.map((item, idx) => (
            <div key={idx} className="faq-item">
              <button
                className={`faq-question ${openAfter === idx ? "open" : ""}`}
                onClick={() => toggleAfter(idx)}
                aria-expanded={openAfter === idx}
                aria-controls={`after-answer-${idx}`}
                id={`after-question-${idx}`}
              >
                {item.question}
                <span className={`faq-arrow ${openAfter === idx ? "rotated" : ""}`} aria-hidden="true">▼</span>
              </button>
              <div
                id={`after-answer-${idx}`}
                role="region"
                aria-labelledby={`after-question-${idx}`}
                className={`faq-answer ${openAfter === idx ? "show" : ""}`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
