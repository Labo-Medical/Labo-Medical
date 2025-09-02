import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchPayloadPrelevement } from '../services/payloadApi2';
const DEFAULT_CONTENT = {
    id: "prelevement",
    title: "Prélèvements",
    description: "Simplifiez vos prélèvements grâce à nos solutions accessibles partout.\n\nContactez-nous pour plus d’informations.",
    documentUrl: "/docs/Prelevement.pdf",
};
export default function Prelevements() {
    const [content, setContent] = useState(DEFAULT_CONTENT);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchPayloadPrelevement()
            .then((data) => {
            if (data)
                setContent(data);
        })
            .catch(() => {
            setContent(DEFAULT_CONTENT);
        })
            .finally(() => setLoading(false));
    }, []);
    const openFullscreenPDF = (url) => {
        const win = window.open(url, '_blank', 'toolbar=no,scrollbars=yes,resizable=yes,fullscreen=yes');
        if (win) {
            win.focus();
        }
    };
    if (loading)
        return _jsx("p", { style: styles.placeholder, children: "Chargement..." });
    return (_jsxs(motion.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, style: styles.section, children: [_jsx("h1", { style: styles.title, children: content.title }), content.description.split('\n\n').map((para, idx) => (_jsx("p", { style: styles.paragraph, children: para }, idx))), content.documentUrl && (_jsx("div", { style: styles.documentContainer, children: _jsx("button", { onClick: () => content.documentUrl && openFullscreenPDF(content.documentUrl), style: styles.documentLink, children: "\uD83D\uDCC4 Voir le document PDF" }) }))] }, content.id));
}
const styles = {
    section: {
        background: '#fafafa',
        borderRadius: '12px',
        padding: '2rem 2.5rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        maxWidth: '900px',
        margin: '25px auto',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        color: '#000',
        lineHeight: 1.7,
    },
    title: {
        color: '#800020',
        fontSize: '2.2rem',
        fontWeight: 700,
        marginBottom: '1.2rem',
        textAlign: 'center',
    },
    paragraph: {
        fontSize: '1.05rem',
        marginBottom: '1rem',
        textAlign: 'justify',
    },
    placeholder: {
        textAlign: 'center',
        color: '#555',
        fontStyle: 'italic',
        marginTop: '1rem',
    },
    documentContainer: {
        marginTop: '2rem',
        textAlign: 'center',
    },
    documentLink: {
        display: 'inline-block',
        padding: '0.8rem 1.2rem',
        backgroundColor: '#800020',
        color: '#fff',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};
