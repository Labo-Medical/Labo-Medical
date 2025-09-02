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
const cardStyle = {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
    width: '180px',
    minHeight: '200px',
    padding: '1.2rem 1rem',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    border: '1px solid #eee',
    transition: 'all 0.3s ease',
};
const iconWrapperStyle = {
    background: '#f2f2f2',
    borderRadius: '50%',
    padding: '10px',
    marginBottom: '1rem',
    border: '1px solid #ddd',
};
const iconStyle = {
    width: '40px',
    height: '40px',
};
const titleStyle = {
    color: '#6e0b14',
    fontSize: '1rem',
    marginBottom: '0.4rem',
    fontWeight: 600,
};
const textStyle = {
    color: '#444',
    fontSize: '0.9rem',
    lineHeight: '1.4',
    padding: '0 0.5rem',
};
export default function SliderCards() {
    return (_jsx("section", { style: { padding: '2rem 1rem', background: 'transparent' }, children: _jsx(motion.div, { style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch',
                gap: '1.5rem',
                flexWrap: 'nowrap',
                flexDirection: 'row',
            }, initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: cards.map((card, idx) => (_jsx(motion.div, { style: cardStyle, whileHover: { scale: 1.05, y: -4 }, whileTap: { scale: 0.96 }, children: _jsxs(Link, { to: card.link, style: { textDecoration: 'none', color: 'inherit' }, children: [_jsx("div", { style: iconWrapperStyle, children: _jsx("img", { src: card.icon, alt: "", style: iconStyle }) }), _jsx("h4", { style: titleStyle, children: card.title }), _jsx("p", { style: textStyle, children: card.text })] }) }, idx))) }) }));
}
