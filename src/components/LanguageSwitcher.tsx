import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

export default function LanguageSwitcher() {
  try {
    const { language, setLanguage } = useLanguage();
    
    const languages = [
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'ar', name: 'العربية', flag: '🇲🇦' }
    ];

    const handleLanguageChange = (languageCode: string) => {
      console.log('Language changed to:', languageCode);
      setLanguage(languageCode as Language);
    };

    return (
      <div className="language-switcher" style={{ 
        position: 'fixed',
        right: '15px',
        top: 'calc(50% - 100px)',
        zIndex: 10000,
        background: '#ffffff',
        padding: '12px',
        borderRadius: '12px',
        border: '2px solid #6E0B14',
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        minWidth: '140px'
      }}>
        <div style={{ 
          marginBottom: '8px', 
          fontSize: '0.75rem', 
          fontWeight: 'bold', 
          color: '#6E0B14',
          textAlign: 'center'
        }}>
          Language
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 8px',
                border: language === lang.code ? '2px solid #6E0B14' : '1px solid #ddd',
                borderRadius: '6px',
                background: language === lang.code ? '#f8f2f3' : 'transparent',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: language === lang.code ? 'bold' : 'normal',
                color: language === lang.code ? '#6E0B14' : '#333',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (language !== lang.code) {
                  e.currentTarget.style.background = '#f5f5f5';
                }
              }}
              onMouseLeave={(e) => {
                if (language !== lang.code) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '1rem' }}>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('LanguageSwitcher error:', error);
    return (
      <div style={{ 
        background: '#ff4444', 
        color: 'white', 
        padding: '8px', 
        borderRadius: '4px',
        position: 'fixed',
        right: '15px',
        top: '50%',
        zIndex: 10000
      }}>
        Translation Error
      </div>
    );
  }
}
