import React from 'react';
import { useTranslation } from 'react-i18next';

const FloatingLanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.label}>🌐</div>
      <div style={styles.switcher}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            style={{
              ...styles.button,
              ...(currentLanguage === lang.code ? styles.active : {}),
            }}
            title={lang.name}
          >
            {lang.flag}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  } as React.CSSProperties,
  label: {
    fontSize: '16px',
    marginBottom: '8px',
    color: '#7b1621',
  } as React.CSSProperties,
  switcher: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  } as React.CSSProperties,
  button: {
    background: '#fff',
    border: '2px solid #ddd',
    borderRadius: '8px',
    padding: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  active: {
    borderColor: '#7b1621',
    backgroundColor: '#7b1621',
    transform: 'scale(1.1)',
  } as React.CSSProperties,
};

export default FloatingLanguageSwitcher;
