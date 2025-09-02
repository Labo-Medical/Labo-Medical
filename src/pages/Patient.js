import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { lazy, Suspense } from 'react';
import { MdAssignment, MdLocationOn, MdVisibility, MdHelpOutline, } from 'react-icons/md';
import { Helmet } from 'react-helmet-async';
// 💡 Lazy loading des composants lourds
const Faq = lazy(() => import('../components/Faq'));
const Resultats = lazy(() => import('../components/Resultat'));
const styles = {
    container: {
        padding: '2rem',
        fontFamily: "'Montserrat', sans-serif",
        background: 'linear-gradient(180deg, #f8f9fb 0%, #ffffff 100%)',
        color: '#333',
        minHeight: '100vh',
    },
    hero: {
        textAlign: 'center',
        marginBottom: '3rem',
    },
    heroTitle: {
        fontSize: '2.7rem',
        color: '#6E0B14',
        fontWeight: 700,
        marginBottom: '1rem',
        letterSpacing: '-0.5px',
    },
    heroText: {
        fontSize: '1.2rem',
        maxWidth: '720px',
        margin: '0 auto',
        color: '#444',
        lineHeight: 1.65,
    },
    section: {
        marginBottom: '3rem',
    },
    grid: {
        display: 'flex',
        flexWrap: 'nowrap',
        gap: '1.5rem',
        overflowX: 'auto',
        paddingBottom: '1rem',
        WebkitOverflowScrolling: 'touch',
    },
    card: {
        background: '#ffffff',
        borderRadius: '1rem',
        boxShadow: '0 10px 28px rgba(0, 0, 0, 0.08)',
        padding: '1.5rem',
        width: '240px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        textDecoration: 'none',
        color: 'inherit',
    },
    cardHover: {
        transform: 'translateY(-6px)',
        boxShadow: '0 14px 32px rgba(0, 0, 0, 0.12)',
    },
    iconWrapper: {
        marginBottom: '1.2rem',
        fontSize: '2.2rem',
        color: '#6E0B14',
    },
    cardTitle: {
        fontSize: '1.15rem',
        fontWeight: 600,
        color: '#6E0B14',
        marginBottom: '0.4rem',
    },
    cardText: {
        fontSize: '0.95rem',
        color: '#555',
        lineHeight: 1.5,
    },
};
const Card = ({ title, description, icon, link }) => {
    return (_jsxs("a", { href: link, "aria-label": title, style: styles.card, onMouseEnter: (e) => {
            Object.assign(e.currentTarget.style, styles.cardHover);
        }, onMouseLeave: (e) => {
            Object.assign(e.currentTarget.style, {
                transform: 'none',
                boxShadow: styles.card.boxShadow,
            });
        }, children: [_jsx("div", { style: styles.iconWrapper, children: icon }), _jsx("h2", { style: styles.cardTitle, children: title }), _jsx("p", { style: styles.cardText, children: description })] }));
};
export default function Patient() {
    const features = [
        {
            type: 'feature',
            title: 'Préparez votre visite',
            description: 'Conseils pratiques pour préparer vos examens et faciliter vos démarches au laboratoire.',
            icon: _jsx(MdAssignment, { size: 28, color: "#A9A9A9" }),
            link: '/prepavisite',
        },
        {
            type: 'feature',
            title: 'Trouvez votre laboratoire',
            description: 'Un accès simplifié aux soins où que vous soyez, avec un service de proximité.',
            icon: _jsx(MdLocationOn, { size: 28, color: "#A9A9A9" }),
            link: '/contact',
        },
        {
            type: 'feature',
            title: 'Accédez à vos résultats',
            description: 'Consultez vos analyses rapidement et en toute sécurité, depuis chez vous.',
            icon: _jsx(MdVisibility, { size: 28, color: "#A9A9A9" }),
            link: '/resultat',
        },
        {
            type: 'feature',
            title: 'Foire aux questions',
            description: 'Une réponse claire à chaque interrogation : explorez notre FAQ complète.',
            icon: _jsx(MdHelpOutline, { size: 28, color: "#A9A9A9" }),
            link: '/faq',
        },
    ];
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Espace Patient - Les Laboratoires Zeroual" }), _jsx("meta", { name: "description", content: "Organisez votre visite, acc\u00E9dez \u00E0 vos r\u00E9sultats d\u2019analyse, et trouvez toutes les informations utiles pour votre parcours patient." }), _jsx("meta", { property: "og:title", content: "Espace Patient - Les Laboratoires Zeroual" }), _jsx("meta", { property: "og:description", content: "Tout ce qu\u2019il vous faut pour naviguer sereinement dans vos d\u00E9marches m\u00E9dicales." }), _jsx("meta", { property: "og:image", content: "/logo.jpg" })] }), _jsxs("main", { style: styles.container, children: [_jsxs("section", { style: styles.hero, children: [_jsx("h1", { style: styles.heroTitle, children: "Bienvenue sur Espace Patient" }), _jsx("p", { style: styles.heroText, children: "Tout ce qu\u2019il vous faut pour organiser votre visite, acc\u00E9der \u00E0 vos analyses et naviguer plus sereinement dans vos d\u00E9marches m\u00E9dicales." })] }), _jsx("section", { style: styles.section, children: _jsx("div", { style: styles.grid, children: features.map((feature, index) => (_jsx(Card, { ...feature }, index))) }) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Chargement des r\u00E9sultats..." }), children: _jsx(Resultats, {}) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Chargement de la FAQ..." }), children: _jsx(Faq, {}) })] })] }));
}
