import React from 'react';
import { useTranslation } from 'react-i18next';

const FloatingLanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    try { localStorage.setItem('app:lang', language); } catch {}
  };

  const currentLanguage = (i18n.language || '').split('-')[0];

  // ✅ Images de drapeaux
  const languages = [
    { code: 'fr', flag: '/icons/fr.png' },
    { code: 'en', flag: '/icons/en.png' },
    { code: 'es', flag: '/icons/es.png' },
    { code: 'ar', flag: '/icons/ma.png' },
  ];

  return (
    <div style={styles.container}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          style={{
            ...styles.button,
            ...(currentLanguage === lang.code ? styles.active : styles.inactive),
          }}
          title={lang.code.toUpperCase()}
        >
          <img src={lang.flag} alt={lang.code} style={{ width: '18px', height: '18px' }} />
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',       // fixé en haut à droite
    top: '10px',
    right: '10px',
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
    zIndex: 2000,
    background: 'transparent',
    padding: '6px 10px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(239, 242, 244, 0.92)',
  } as React.CSSProperties,
  button: {
    borderRadius: '6px',
    padding: '4px',
    cursor: 'pointer',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    background: 'transparent',
    border: 'none', // plus de contour noir par défaut
  } as React.CSSProperties,
  active: {
    border: '1px solid #7b1621',
    backgroundColor: '#7b1621',
    transform: 'scale(1.1)',
  } as React.CSSProperties,
  inactive: {
    border: 'none',
    backgroundColor: '#fff',
  } as React.CSSProperties,
};

export default FloatingLanguageSwitcher;
