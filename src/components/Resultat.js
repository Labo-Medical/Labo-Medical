import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { fetchResultatsServerLink } from '../services/payloadApi2';
import { motion } from 'framer-motion';
import './Resultats.css';
import Contact from '../pages/Contact';
import PrepaVisite from './PrepaVisite';
import Faq from './Faq';
import { isAuthenticated } from '../auth';
const menuItems = [
    { key: 'resultats', label: 'Vos résultats' },
    { key: 'rdv', label: 'Prendre rendez-vous' },
    { key: 'prep', label: 'Préparer ma visite' },
    { key: 'faq', label: 'FAQ' },
];
const DEFAULT_LINK = "../pageresultats/";
export default function VosResultatsPage() {
    const [activeTab, setActiveTab] = useState('resultats');
    const [serveurLink, setServeurLink] = useState(DEFAULT_LINK);
    useEffect(() => {
        fetchResultatsServerLink()
            .then((link) => {
            if (link)
                setServeurLink(link);
        })
            .catch(() => {
            setServeurLink(DEFAULT_LINK);
        });
    }, []);
    const methods = [
        {
            title: 'En ligne',
            desc: 'Demandez l’accès aux secrétaires lors de votre enregistrement. Vos résultats seront disponibles sur un serveur internet sécurisé, accessible depuis la fiche de votre laboratoire.',
            linkText: 'serveur de résultats',
            linkUrl: serveurLink,
        },
        {
            title: 'Par téléphone',
            desc: 'Communiquez votre numéro de portable aux secrétaires lors de votre enregistrement.',
        },
        {
            title: 'Au laboratoire',
            desc: 'Signalez aux secrétaires que vous préférez venir chercher vos résultats sur place. Nous vous remettrons un coupon garantissant votre confidentialité.',
        },
        {
            title: 'Votre médecin',
            desc: 'Vos résultats seront transmis à votre médecin selon le mode de transmission de son choix : poste, fax, connexion sécurisée…',
        },
    ];
    return (_jsxs("div", { className: "vrp-container", children: [_jsx("aside", { className: "vrp-sidebar", children: _jsx("ul", { role: "tablist", children: menuItems.map(item => (_jsx("li", { className: item.key === activeTab ? 'active' : '', role: "presentation", children: _jsx("button", { role: "tab", "aria-selected": item.key === activeTab, tabIndex: item.key === activeTab ? 0 : -1, onClick: () => setActiveTab(item.key), children: item.label }) }, item.key))) }) }), _jsxs("main", { className: "vrp-main", children: [activeTab === 'resultats' && (_jsxs(_Fragment, { children: [_jsxs(motion.header, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [_jsx("h1", { children: "Vos r\u00E9sultats d\u2019analyses" }), _jsx("p", { children: "Les laboratoires Zeroual s\u2019engagent \u00E0 poursuivre leurs efforts de fiabilit\u00E9 et justesse des r\u00E9sultats rendus dans le respect des bonnes pratiques professionnelles et \u00E0 assurer un service rapide et fiable selon les d\u00E9lais annonc\u00E9s." })] }), _jsx(motion.section, { className: "vrp-methods", initial: "hidden", whileInView: "visible", viewport: { once: true }, variants: { hidden: {}, visible: {} }, children: methods.map((m, idx) => (_jsxs(motion.div, { className: "vrp-method", initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, transition: { delay: idx * 0.1, type: 'spring', stiffness: 200 }, children: [_jsx("h3", { children: m.title }), _jsxs("p", { children: [m.desc, ' ', m.linkText && m.linkUrl && (isAuthenticated() ? (_jsx("a", { href: m.linkUrl, target: "_blank", rel: "noopener noreferrer", children: m.linkText })) : (_jsx("button", { onClick: () => {
                                                        alert("Veuillez vous connecter pour accéder à vos résultats.");
                                                        window.location.href = "/login";
                                                    }, className: "protected-link", children: m.linkText })))] })] }, m.title))) })] })), activeTab === 'rdv' && _jsx(Contact, {}), activeTab === 'prep' && _jsx(PrepaVisite, {}), activeTab === 'faq' && _jsx(Faq, {})] })] }));
}
