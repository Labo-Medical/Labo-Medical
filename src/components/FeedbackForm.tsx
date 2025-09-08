import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FeedbackFormProps {}

// --- Liste des Google Forms (URL intégrées) ---
const FORM_URLS = {
  personnel: 'https://docs.google.com/forms/d/e/1FAIpQLSeSvORUEbpJLEjF6U7wlGqPgkER7ZsPX1IhpnOYurhpP1uzsw/viewform?embedded=true',
  patient: 'https://docs.google.com/forms/d/e/1FAIpQLSc3HkPikw_7CcMq3vefkrNlswiGYJ3aZ_MztsT-9mW9dnJqlw/viewform?embedded=true',
  utilisateur: 'https://docs.google.com/forms/d/e/1FAIpQLScLRWR2yg6WLfdpqnvYGIsZOWlXOoL_TZw6kL8MJ9eImkTApA/viewform?embedded=true',
  satisfaction: 'https://docs.google.com/forms/d/e/1FAIpQLSdImXX36p8-gGxMzJdZ3Rkkksgkhdg8n50Sb09s3pLPPyJSlA/viewform?embedded=true',
};

const FeedbackForm: React.FC<FeedbackFormProps> = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'personnel' | 'patient' | 'utilisateur' | 'satisfaction'>('personnel');

  const containerStyle: React.CSSProperties = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#2c3e50',
  };

  const tabsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '15px',
  };

  const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s, transform 0.2s',
    background: isActive ? '#86060aff' : '#ecf0f1',
    color: isActive ? 'white' : '#2c3e50',
    fontWeight: isActive ? 'bold' : 'normal',
    transform: isActive ? 'scale(1.05)' : 'scale(1)',
  });

  const formContainerStyle: React.CSSProperties = {
    background: '#ffffff',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(235, 225, 225, 0.85)',
  };

  const iframeStyle: React.CSSProperties = {
    width: '100%',
    height: '800px',
    border: 'none',
    borderRadius: '8px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{t('pages.feedback.title_text')}</h2>

      {/* Onglets */}
      <div style={tabsStyle}>
        <button
          style={tabButtonStyle(activeTab === 'personnel')}
          onClick={() => setActiveTab('personnel')}
        >
          {t('pages.feedback.tabs.personnel')}
        </button>
        <button
          style={tabButtonStyle(activeTab === 'patient')}
          onClick={() => setActiveTab('patient')}
        >
          {t('pages.feedback.tabs.patient')}
        </button>
        <button
          style={tabButtonStyle(activeTab === 'utilisateur')}
          onClick={() => setActiveTab('utilisateur')}
        >
          {t('pages.feedback.tabs.utilisateur')}
        </button>
        <button
          style={tabButtonStyle(activeTab === 'satisfaction')}
          onClick={() => setActiveTab('satisfaction')}
        >
          {t('pages.feedback.tabs.satisfaction')}
        </button>
      </div>

      {/* Conteneur du formulaire */}
      <div style={formContainerStyle}>
        <iframe
          src={FORM_URLS[activeTab]}
          style={iframeStyle}
          title={`Formulaire ${activeTab}`}
        >
          {t('common.loading')}
        </iframe>
      </div>
    </div>
  );
};

export default FeedbackForm;
