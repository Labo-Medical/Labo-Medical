import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { fetchPayloadHeader } from '../services/payloadApi';
import './Header.css';
const fallback = {
    logo: '/logo.jpg',
    socialLinks: [
        { href: 'https://web.facebook.com/laboratoire.zeroual.kawassim/', icon: '/icons/facebook.svg', alt: 'Facebook' },
        { href: 'https://www.instagram.com/laboratoire_zeroual/', icon: '/icons/instagram.svg', alt: 'Instagram' },
        { href: 'https://linkedin.com/in/laboratoires_zeroual', icon: '/icons/linkedin.svg', alt: 'LinkedIn' },
    ],
};
export default function Header() {
    const [open, setOpen] = useState(false);
    const [headerConfig, setHeaderConfig] = useState(null);
    useEffect(() => {
        fetchPayloadHeader()
            .then(data => setHeaderConfig(data))
            .catch(() => setHeaderConfig(null));
    }, []);
    const toggleMenu = () => setOpen(prev => !prev);
    const logoSrc = headerConfig?.logo?.url || fallback.logo;
    const socialLinks = headerConfig?.socialLinks?.length
        ? headerConfig.socialLinks.map(s => ({
            href: s.url,
            icon: s.icon?.url || '',
            alt: s.platform,
        }))
        : fallback.socialLinks;
    return (_jsx("header", { className: "site-header", children: _jsxs("div", { className: "container", children: [_jsx("div", { className: "logo", children: _jsx(Link, { to: "/", "aria-label": "Retour \u00E0 l'accueil", children: _jsx("img", { src: logoSrc, alt: "Logo des Laboratoires Zeroual" }) }) }), _jsx("button", { className: "menu-toggle", "aria-label": "Ouvrir ou fermer le menu", "aria-haspopup": "true", "aria-expanded": open, onClick: toggleMenu, children: "\u2630" }), _jsxs("nav", { className: `main-nav${open ? ' open' : ''}`, "aria-label": "Navigation principale", children: [_jsxs("ul", { children: [_jsxs("li", { className: "has-submenu", children: [_jsx(NavLink, { to: "/about", className: ({ isActive }) => (isActive ? 'active' : ''), children: "NOS LABORATOIRES PARTENAIRES" }), _jsxs("ul", { className: "submenu", children: [_jsx("li", { children: _jsx(NavLink, { to: "/about", children: "Pr\u00E9sentation" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/labokawacim", children: "Laboratoire Zeroual Kawassim" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/labosouani", children: "Laboratoire Zeroual Souani" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/labocharf", children: "Laboratoire Zeroual Charf" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/specialite", children: "Sp\u00E9cialit\u00E9s Biologiques" }) })] })] }), _jsxs("li", { className: "has-submenu", children: [_jsx(NavLink, { to: "/pro", className: ({ isActive }) => (isActive ? 'active' : ''), children: "ESPACE PROS" }), _jsxs("ul", { className: "submenu", children: [_jsx("li", { children: _jsx(NavLink, { to: "/catalogue", children: "Catalogues" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/recommandationpreanalytique", children: "R\u00E9commandations pr\u00E9analytiques" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/centraleachat", children: "Centrale d'achats" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/propage", children: "Ressources documentaires" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/prelevement", children: "Pr\u00E9levements" }) })] })] }), _jsxs("li", { className: "has-submenu", children: [_jsx(NavLink, { to: "/patient", className: ({ isActive }) => (isActive ? 'active' : ''), children: "ESPACE PATIENT" }), _jsxs("ul", { className: "submenu", children: [_jsx("li", { children: _jsx(NavLink, { to: "/rdv", children: "Prendre RDV (Pr\u00E9l\u00E8vement)" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/prepavisite", children: "Pr\u00E9parer analyses" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/resultat", children: "R\u00E9sultats" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/faq", children: "FAQ" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/blog", children: "Actualit\u00E9s biologiques" }) })] })] }), _jsx("li", { children: _jsx(NavLink, { to: "/feedbacksection", className: ({ isActive }) => (isActive ? 'active' : ''), children: "R\u00C9CLAMATIONS & SUGGESTIONS" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/contact", className: ({ isActive }) => (isActive ? 'active' : ''), children: "CONTACT" }) })] }), _jsx("div", { className: "nav-extras", children: _jsx("div", { className: "social-icons", children: socialLinks.map(({ href, icon, alt }, index) => (_jsx("a", { href: href, target: "_blank", rel: "noopener noreferrer", "aria-label": alt, children: _jsx("img", { src: icon, alt: alt }) }, index))) }) })] })] }) }));
}
