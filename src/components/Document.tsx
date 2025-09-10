import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fetchPayloadDocuments, type DocumentPayload } from '../services/payloadApi';

const getDefaultContent = (t: any): DocumentPayload => ({
  id: "document",
  title: t('documents.title'),
  description: t('documents.description'),
  documents: [
    {
      title: t('documents.good_practices'),
      url: "/docs/guides.pdf",
    },
  ],
});

export default function Documents() {
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState<DocumentPayload>(() => getDefaultContent(t));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayloadDocuments()
      .then((data) => {
        if (data) setContent(data);
      })
      .catch(() => {
        setContent(getDefaultContent(t));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [i18n.language, t]);

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

      {content.documents && (
        <ul style={styles.list}>
          {content.documents.map((doc, i) => (
            <li key={i} style={styles.listItem}>
              📄{' '}
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                {doc.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </motion.section>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    background: '#fafafa',
    borderRadius: '10px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    maxWidth: '900px',
    margin: '20px auto',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    color: '#000',
  },
  title: {
    color: '#800020',
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '1rem',
  },
  paragraph: {
    fontSize: '1.05rem',
    lineHeight: 1.6,
    marginBottom: '1rem',
  },
  list: {
    marginTop: '1.5rem',
    paddingLeft: 0,
    listStyle: 'none',
  },
  listItem: {
    marginBottom: '0.8rem',
    fontSize: '1.05rem',
    display: 'flex',
    alignItems: 'center',
    color: '#000',
  },
  link: {
    color: '#000',
    textDecoration: 'none',
    borderBottom: '1px dotted #800020',
    transition: 'color 0.3s, border-color 0.3s',
  },
  placeholder: {
    textAlign: 'center',
    color: '#555',
    fontStyle: 'italic',
    marginTop: '1rem',
  },
};
