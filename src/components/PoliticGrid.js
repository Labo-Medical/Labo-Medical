import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { FaUserTie, FaShieldAlt, FaFileContract } from 'react-icons/fa';
import { fetchPayloadPolicies } from '../services/payloadApi2';
const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        padding: '1rem 0',
    },
    card: {
        background: '#ffffff',
        borderRadius: '1rem',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
        padding: '1.5rem',
        transition: 'all 0.3s ease',
        textAlign: 'center',
    },
    icon: {
        fontSize: '2rem',
        color: '#6e0b14',
        marginBottom: '1rem',
    },
    cardTitle: {
        fontSize: '1.2rem',
        marginBottom: '0.5rem',
        color: '#333',
    },
    cardText: {
        fontSize: '0.95rem',
        color: '#666',
        marginBottom: '1rem',
        lineHeight: 1.4,
    },
    pdfViewer: {
        width: '100%',
        height: '400px',
        border: '1px solid #ccc',
        borderRadius: '0.5rem',
    },
    button: {
        marginTop: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#6e0b14',
        color: '#fff',
        border: 'none',
        borderRadius: '0.4rem',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    fullScreenOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    },
    fullScreenEmbed: {
        width: '90vw',
        height: '90vh',
        border: 'none',
        borderRadius: '0.5rem',
    },
    closeButton: {
        position: 'absolute',
        top: '2rem',
        right: '3rem',
        fontSize: '3rem',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
};
const fallbackPolicies = [
    {
        title: 'Politique RH',
        description: "Notre politique RH met l'accent sur l'éthique, le respect, la diversité et l'épanouissement professionnel.",
        file: '/politics/rh.pdf',
        icon: _jsx(FaUserTie, {}),
    },
    {
        title: 'Politique Qualité',
        description: 'La qualité est au cœur de nos engagements. Ce document décrit nos objectifs et processus qualité.',
        file: '/politics/qualite.pdf',
        icon: _jsx(FaShieldAlt, {}),
    },
];
export default function PolicyGrid() {
    const [policies, setPolicies] = useState([]);
    const [fullScreenFile, setFullScreenFile] = useState(null);
    useEffect(() => {
        fetchPayloadPolicies()
            .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
                const enriched = data.map((item, idx) => ({
                    ...item,
                    icon: idx === 0 ? _jsx(FaUserTie, {}) :
                        idx === 1 ? _jsx(FaShieldAlt, {}) :
                            _jsx(FaFileContract, {}),
                }));
                setPolicies(enriched);
            }
            else {
                setPolicies(fallbackPolicies);
            }
        })
            .catch(() => {
            setPolicies(fallbackPolicies);
        });
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx("div", { style: styles.grid, children: policies.map((doc, idx) => (_jsxs("div", { style: styles.card, children: [_jsx("div", { style: styles.icon, children: doc.icon }), _jsx("h2", { style: styles.cardTitle, children: doc.title }), _jsx("p", { style: styles.cardText, children: doc.description }), _jsx("embed", { src: doc.file, type: "application/pdf", style: styles.pdfViewer }), _jsx("button", { style: styles.button, onClick: () => setFullScreenFile(doc.file), children: "Voir en plein \u00E9cran" })] }, idx))) }), fullScreenFile && (_jsxs("div", { style: styles.fullScreenOverlay, onClick: () => setFullScreenFile(null), children: [_jsx("span", { style: styles.closeButton, onClick: () => setFullScreenFile(null), children: "\u00D7" }), _jsx("embed", { src: fullScreenFile, type: "application/pdf", style: styles.fullScreenEmbed })] }))] }));
}
