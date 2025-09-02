import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import Catalogue from '../components/Catalogue';
import RecommandationsPreanalytique from '../components/RecommandationsPreanalytique';
import CentraleAchat from '../components/CentraleAchat';
import Document from '../components/Document';
import Prelevement from '../components/Prelevement';
import './ProPage.css'; // Assuming you have a CSS file for styles
import { Helmet } from 'react-helmet-async';
const menuItems = [
    { key: 'documents', label: 'Documents' },
    { key: 'recommandations-preanalytique', label: 'Récommandations préanalytique' },
    { key: 'centrale-achats', label: 'Centrale d\'achats' },
    { key: 'catalogues', label: 'Catalogues' },
    { key: 'prelevements', label: 'Prélèvements' },
];
export default function ProPage() {
    const [activeTab, setActiveTab] = useState(menuItems[0].key);
    const renderContent = () => {
        switch (activeTab) {
            case 'documents':
                return _jsx(Document, {});
            case 'recommandations-preanalytique':
                return _jsx(RecommandationsPreanalytique, {});
            case 'centrale-achats':
                return _jsx(CentraleAchat, {});
            case 'catalogues':
                return _jsx(Catalogue, {});
            case 'prelevements':
                return _jsx(Prelevement, {});
            default:
                return _jsx("div", { children: "Contenu non disponible" });
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Espace Pros - Laboratoires Zeroual" }), _jsx("meta", { name: "description", content: "D\u00E9couvrez nos catalogues, recommandations pr\u00E9-analytiques, centrale d'achats, documents et solutions de pr\u00E9l\u00E8vements pour professionnels de sant\u00E9." }), _jsx("meta", { property: "og:title", content: "Espace Pros - Laboratoires Zeroual" }), _jsx("meta", { property: "og:description", content: "Acc\u00E9dez aux ressources et documents professionnels indispensables pour optimiser vos activit\u00E9s m\u00E9dicales et de laboratoire." }), _jsx("meta", { property: "og:image", content: "/logo.jpg" })] }), _jsxs("div", { className: "vrp-container", children: [_jsx("aside", { className: "vrp-sidebar", children: _jsx("ul", { children: menuItems.map(({ key, label }) => (_jsx("li", { className: key === activeTab ? 'active' : '', children: _jsx("button", { onClick: () => setActiveTab(key), children: label }) }, key))) }) }), _jsx("main", { className: "vrp-main", children: renderContent() })] })] }));
}
