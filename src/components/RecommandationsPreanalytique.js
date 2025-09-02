import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchPayloadRecommandations } from '../services/payloadApi2';
const DEFAULT_CONTENT = {
    id: "recommandation",
    title: "Récommandations préanalytiques",
    description: "Préparez vos examens de manière optimale grâce à nos recommandations pré-analytiques détaillées.\n\nCes conseils vous assurent des résultats fiables.",
};
export default function RecommandationsPreanalytique() {
    const [content, setContent] = useState(DEFAULT_CONTENT);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchPayloadRecommandations()
            .then((data) => {
            if (data)
                setContent(data);
        })
            .catch(() => {
            setContent(DEFAULT_CONTENT);
        })
            .finally(() => setLoading(false));
    }, []);
    if (loading)
        return _jsx("p", { style: styles.placeholder, children: "Chargement..." });
    return (_jsxs(motion.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, style: styles.section, children: [_jsx("h1", { style: styles.title, children: content.title }), content.description.split('\n\n').map((para, idx) => (_jsx("p", { style: styles.paragraph, children: para }, idx)))] }, content.id));
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
};
