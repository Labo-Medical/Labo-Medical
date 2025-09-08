import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const CentraleAchats: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={styles.section}
    >
      <h1 style={styles.title}>{t('central_purchase.title')}</h1>
      {t('central_purchase.description').split('\n\n').map((para, idx) => (
        <p key={idx} style={styles.paragraph}>{para}</p>
      ))}
    </motion.section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    background: '#fafafa',
    borderRadius: '12px',
    padding: '2rem 2.5rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    maxWidth: '1100px',
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
    marginBottom: '1.2rem',
    textAlign: 'justify',
  },
};

export default CentraleAchats;
