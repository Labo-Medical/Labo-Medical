/**
 * LANGUAGE SWITCHER COMPONENT
 *
 * This component provides a modern dropdown menu to switch between different languages.
 * It supports Spanish, French, English, and Arabic with appropriate flag emojis.
 * The active language is highlighted with a special style.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to change the application language
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    try { localStorage.setItem('app:lang', language); } catch {}
    setIsOpen(false);
  };

  const currentLanguage = (i18n.language || '').split('-')[0];

  // Supported languages with their display names and flag emojis
  const languages = [
    { code: 'es', name: t('components.language_names.es'), flag: '🇪🇸' },
    { code: 'fr', name: t('components.language_names.fr'), flag: '🇫🇷' },
    { code: 'en', name: t('components.language_names.en'), flag: '🇺🇸' },
    { code: 'ar', name: t('components.language_names.ar'), flag: '🇲🇦' },
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        className="language-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        title={t('language')}
      >
        <span className="flag">{currentLang.flag}</span>
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`language-option ${currentLanguage === lang.code ? 'active' : ''}`}
              title={lang.name}
            >
              <span className="flag">{lang.flag}</span>
              <span className="lang-name">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
