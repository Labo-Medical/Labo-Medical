import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
// --- Liste des Google Forms (URL intégrées) ---
const FORM_URLS = {
    personnel: 'https://docs.google.com/forms/d/e/1FAIpQLSeSvORUEbpJLEjF6U7wlGqPgkER7ZsPX1IhpnOYurhpP1uzsw/viewform?embedded=true',
    patient: 'https://docs.google.com/forms/d/e/1FAIpQLSc3HkPikw_7CcMq3vefkrNlswiGYJ3aZ_MztsT-9mW9dnJqlw/viewform?embedded=true',
    utilisateur: 'https://docs.google.com/forms/d/e/1FAIpQLScLRWR2yg6WLfdpqnvYGIsZOWlXOoL_TZw6kL8MJ9eImkTApA/viewform?embedded=true',
    satisfaction: 'https://docs.google.com/forms/d/e/1FAIpQLSdImXX36p8-gGxMzJdZ3Rkkksgkhdg8n50Sb09s3pLPPyJSlA/viewform?embedded=true',
};
const FeedbackForm = () => {
    const [activeTab, setActiveTab] = useState('personnel');
    const containerStyle = {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    };
    const titleStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#2c3e50',
    };
    const tabsStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '15px',
    };
    const tabButtonStyle = (isActive) => ({
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
    const formContainerStyle = {
        background: '#ffffff',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(235, 225, 225, 0.85)',
    };
    const iframeStyle = {
        width: '100%',
        height: '800px',
        border: 'none',
        borderRadius: '8px',
    };
    return (_jsxs("div", { style: containerStyle, children: [_jsx("h2", { style: titleStyle, children: "Merci de nous soumettre votre avis, suggestion ou r\u00E9clamation" }), _jsxs("div", { style: tabsStyle, children: [_jsx("button", { style: tabButtonStyle(activeTab === 'personnel'), onClick: () => setActiveTab('personnel'), children: "Personnel" }), _jsx("button", { style: tabButtonStyle(activeTab === 'patient'), onClick: () => setActiveTab('patient'), children: "Patients" }), _jsx("button", { style: tabButtonStyle(activeTab === 'utilisateur'), onClick: () => setActiveTab('utilisateur'), children: "Utilisateurs" }), _jsx("button", { style: tabButtonStyle(activeTab === 'satisfaction'), onClick: () => setActiveTab('satisfaction'), children: "Satisfaction" })] }), _jsx("div", { style: formContainerStyle, children: _jsx("iframe", { src: FORM_URLS[activeTab], style: iframeStyle, title: `Formulaire ${activeTab}`, children: "Chargement\u2026" }) })] }));
};
export default FeedbackForm;
