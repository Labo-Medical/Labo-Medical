import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchPayloadDocuments } from '../services/payloadApi';
const DEFAULT_CONTENT = {
    id: "document",
    title: "Ressources documentaires",
    description: "Retrouvez ici tous les documents indispensables à vos activités professionnelles.\n\nIls sont mis à jour régulièrement.",
    documents: [
        {
            title: "Guide des bonnes pratiques (PDF)",
            url: "/docs/guides.pdf",
        },
    ],
};
export default function Documents() {
    const [content, setContent] = useState(DEFAULT_CONTENT);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchPayloadDocuments()
            .then((data) => {
            if (data)
                setContent(data);
        })
            .catch(() => {
            setContent(DEFAULT_CONTENT);
        })
            .finally(() => {
            setLoading(false);
        });
    }, []);
    if (loading)
        return _jsx("p", { style: styles.placeholder, children: "Chargement..." });
    return (_jsxs(motion.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, style: styles.section, children: [_jsx("h1", { style: styles.title, children: content.title }), content.description.split('\n\n').map((para, idx) => (_jsx("p", { style: styles.paragraph, children: para }, idx))), content.documents && (_jsx("ul", { style: styles.list, children: content.documents.map((doc, i) => (_jsxs("li", { style: styles.listItem, children: ["\uD83D\uDCC4", ' ', _jsx("a", { href: doc.url, target: "_blank", rel: "noopener noreferrer", style: styles.link, children: doc.title })] }, i))) }))] }, content.id));
}
const styles = {
    section: {
        background: '#fafafa',
        borderRadius: '10px',
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        maxWidth: '900px',
        margin: '20px auto',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        color: '#000',
    },
    title: {
        color: '#800020',
        fontSize: '2rem',
        fontWeight: 700,
        marginBottom: '1rem',
    },
    paragraph: {
        fontSize: '1.05rem',
        lineHeight: 1.6,
        marginBottom: '1rem',
    },
    list: {
        marginTop: '1.5rem',
        paddingLeft: 0,
        listStyle: 'none',
    },
    listItem: {
        marginBottom: '0.8rem',
        fontSize: '1.05rem',
        display: 'flex',
        alignItems: 'center',
        color: '#000',
    },
    link: {
        color: '#000',
        textDecoration: 'none',
        borderBottom: '1px dotted #800020',
        transition: 'color 0.3s, border-color 0.3s',
    },
    placeholder: {
        textAlign: 'center',
        color: '#555',
        fontStyle: 'italic',
        marginTop: '1rem',
    },
};
