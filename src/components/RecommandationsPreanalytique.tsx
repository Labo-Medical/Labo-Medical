import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fetchPayloadRecommandations, type RecommandationContent } from '../services/payloadApi2';

export default function RecommandationsPreanalytique() {
  const { t, i18n } = useTranslation();

  const getDefaultContent = (): RecommandationContent => ({
    id: "recommandation",
    title: t('recommendations.title'),
    description: t('recommendations.description'),
  });

  const [content, setContent] = useState<RecommandationContent>(getDefaultContent());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayloadRecommandations(i18n.language)
      .then((data) => {
        if (data) {
          setContent({ ...getDefaultContent() });
        } else {
          setContent(getDefaultContent());
        }
      })
      .catch(() => {
        setContent(getDefaultContent());
      })
      .finally(() => setLoading(false));
  }, [i18n.language]);

  if (loading) return <p style={styles.placeholder}>{t('common.loading')}</p>;

  return (
    <motion.section
      key={content.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={styles.section}
    >
      <h1 style={styles.title}>{content.title}</h1>
      {content.description.split('\n\n').map((para, idx) => (
        <p key={idx} style={styles.paragraph}>{para}</p>
      ))}
    </motion.section>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    background: '#fafafa',
    borderRadius: '12px',
    padding: '2rem 2.5rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    maxWidth: '900px',
    margin: '25px auto',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    color: '#000',
    lineHeight: 1.7,
  },
  title: {
    color: '#800020',
    fontSize: '2.2rem',
    fontWeight: 700,
    marginBottom: '1.2rem',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: '1.05rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  placeholder: {
    textAlign: 'center',
    color: '#555',
    fontStyle: 'italic',
    marginTop: '1rem',
  },
};
