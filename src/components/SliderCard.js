import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const cards = [
    {
        icon: '/icons/politic.svg',
        title: 'NOS POLITIQUES',
        text: 'Consultez nos politiques : Confidentialité, Qualité et RH.',
        link: '/politic',
    },
    {
        icon: '/icons/lists.svg',
        title: 'PRÉPAREZ VOTRE VISITE',
        text: 'Conseils utiles pour vos examens médicaux.',
        link: '/prepavisite',
    },
    {
        icon: '/icons/computer.svg',
        title: 'ACCÉDEZ À VOS RÉSULTATS',
        text: 'Consultez vos résultats en ligne, en toute sécurité.',
        link: '/resultat',
    },
    {
        icon: '/icons/chat.svg',
        title: 'FAQ',
        text: 'Réponses aux questions fréquentes.',
        link: '/faq',
    },
];
export default function SliderCards() {
    return (_jsx("section", { style: styles.section, children: _jsx(motion.div, { style: styles.grid, initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: cards.map((card, idx) => (_jsx(motion.div, { style: styles.card, whileHover: { scale: 1.05, y: -4 }, whileTap: { scale: 0.96 }, children: _jsxs(Link, { to: card.link, style: styles.link, children: [_jsx("div", { style: styles.iconWrapper, children: _jsx("img", { src: card.icon, alt: "", style: styles.icon }) }), _jsx("h4", { style: styles.title, children: card.title }), _jsx("p", { style: styles.text, children: card.text })] }) }, idx))) }) }));
}
const styles = {
    section: {
        padding: '2rem 1rem',
        background: 'transparent',
    },
    grid: {
        display: 'grid',
        gap: '1.5rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        justifyItems: 'center',
    },
    card: {
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
        padding: '1.2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        border: '1px solid #eee',
        transition: 'all 0.3s ease',
        width: '100%',
        maxWidth: '300px',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        width: '100%',
    },
    iconWrapper: {
        background: '#f2f2f2',
        borderRadius: '50%',
        padding: '10px',
        marginBottom: '1rem',
        border: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: '40px',
        height: '40px',
    },
    title: {
        color: '#6e0b14',
        fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
        marginBottom: '0.4rem',
        fontWeight: 600,
    },
    text: {
        color: '#444',
        fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
        lineHeight: 1.4,
        padding: '0 0.5rem',
    },
};
