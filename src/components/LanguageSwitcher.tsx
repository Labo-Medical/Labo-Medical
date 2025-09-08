/**
 * LANGUAGE SWITCHER COMPONENT
 * 
 * This component provides flag buttons to switch between different languages.
 * It supports Spanish, French, English, and Arabic with appropriate flag emojis.
 * The active language is highlighted with a special style.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();

  // Function to change the application language
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    try { localStorage.setItem('app:lang', language); } catch {}
  };

  const currentLanguage = (i18n.language || '').split('-')[0];

  // Supported languages with their display names and flag emojis
  const languages = [
    { code: 'es', name: t('components.language_names.es'), flag: '🇪🇸' },
    { code: 'fr', name: t('components.language_names.fr'), flag: '🇫🇷' },
    { code: 'en', name: t('components.language_names.en'), flag: '🇺🇸' },
    { code: 'ar', name: t('components.language_names.ar'), flag: '🇲🇦' },
  ];

  return (
    <div className="language-switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={currentLanguage === lang.code ? 'active' : ''}
          title={lang.name}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
