import { useEffect } from 'react';

export default function LanguageSwitcher() {
  console.log('🔥 LanguageSwitcher is rendering!');
  
  useEffect(() => {
    // Direct DOM manipulation to ensure visibility
    const langSwitcher = document.createElement('div');
    langSwitcher.id = 'direct-lang-switcher';
    langSwitcher.innerHTML = `
      <div style="
        position: fixed !important;
        top: 20px !important;
        right: 20px !important;
        z-index: 999999999 !important;
        background: #ff0000 !important;
        color: white !important;
        padding: 15px !important;
        border-radius: 8px !important;
        border: 3px solid white !important;
        font-family: Arial, sans-serif !important;
        font-size: 14px !important;
        font-weight: bold !important;
        text-align: center !important;
        box-shadow: 0 0 20px rgba(255,0,0,0.8) !important;
        min-width: 200px !important;
      ">
        🚨 LANGUAGE SWITCHER 🚨<br>
        <div style="margin: 10px 0;">
          <button onclick="alert('French selected!')" style="
            background: white;
            color: #ff0000;
            border: none;
            padding: 8px 15px;
            margin: 2px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
          ">🇫🇷 FR</button>
          <button onclick="alert('Spanish selected!')" style="
            background: white;
            color: #ff0000;
            border: none;
            padding: 8px 15px;
            margin: 2px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
          ">🇪🇸 ES</button>
          <button onclick="alert('Arabic selected!')" style="
            background: white;
            color: #ff0000;
            border: none;
            padding: 8px 15px;
            margin: 2px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
          ">🇸🇦 AR</button>
        </div>
        <div style="font-size: 11px; opacity: 0.9;">
          DIRECT DOM INJECTION!
        </div>
      </div>
    `;
    
    document.body.appendChild(langSwitcher);
    
    return () => {
      const el = document.getElementById('direct-lang-switcher');
      if (el) el.remove();
    };
  }, []);

  const handleLanguageChange = (lang: string) => {
    console.log(`Language changed to: ${lang}`);
    alert(`Language changed to: ${lang}`);
  };

  return (
    <>
      {/* React-based version */}
      <div 
        id="react-lang-switcher"
        style={{ 
          position: 'fixed',
          right: '10px',
          top: '10px',
          zIndex: 999999,
          background: '#ff0000',
          color: '#ffffff',
          padding: '15px',
          borderRadius: '8px',
          border: '3px solid #ffffff',
          boxShadow: '0 0 20px rgba(255,0,0,0.8)',
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
          minWidth: '180px',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        🚨 REACT LANG SWITCHER 🚨
        <div style={{ margin: '10px 0' }}>
          <button
            onClick={() => handleLanguageChange('FR')}
            style={{
              background: '#ffffff',
              color: '#ff0000',
              border: 'none',
              padding: '5px 10px',
              margin: '2px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🇫🇷 FR
          </button>
          <button
            onClick={() => handleLanguageChange('ES')}
            style={{
              background: '#ffffff',
              color: '#ff0000',
              border: 'none',
              padding: '5px 10px',
              margin: '2px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🇪🇸 ES
          </button>
          <button
            onClick={() => handleLanguageChange('AR')}
            style={{
              background: '#ffffff',
              color: '#ff0000',
              border: 'none',
              padding: '5px 10px',
              margin: '2px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🇸🇦 AR
          </button>
        </div>
        <div style={{ fontSize: '11px', opacity: 0.9 }}>
          REACT VERSION!
        </div>
      </div>
    </>
  );
}