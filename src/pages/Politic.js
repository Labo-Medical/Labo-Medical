import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
// 💡 Lazy loading du composant grille
const PoliticGrid = lazy(() => import('../components/PoliticGrid'));
const styles = {
    page: {
        padding: '2rem',
        fontFamily: "'Segoe UI', sans-serif",
        backgroundColor: '#f9f9fb',
        textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        color: '#6e0b14',
        marginBottom: '0.5rem',
    },
    subtitle: {
        fontSize: '1rem',
        color: '#555',
        marginBottom: '2rem',
    },
};
export default function PoliticPage() {
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Politiques Institutionnelles - Les Laboratoires Zeroual" }), _jsx("meta", { name: "description", content: "D\u00E9couvrez les politiques institutionnelles des Laboratoires Zeroual : RH, Qualit\u00E9 et Confidentialit\u00E9, accessibles et t\u00E9l\u00E9chargeables." }), _jsx("meta", { property: "og:title", content: "Politiques Institutionnelles - Les Laboratoires Zeroual" }), _jsx("meta", { property: "og:description", content: "Nos engagements formalis\u00E9s \u00E0 travers des documents officiels pour garantir qualit\u00E9, \u00E9thique et confidentialit\u00E9." }), _jsx("meta", { property: "og:image", content: "/logo.jpg" })] }), _jsxs("main", { style: styles.page, children: [_jsx("h1", { style: styles.title, children: "Nos Politiques Institutionnelles" }), _jsx("p", { style: styles.subtitle, children: "Retrouvez ici nos engagements formalis\u00E9s \u00E0 travers des documents accessibles et t\u00E9l\u00E9chargeables." }), _jsx(Suspense, { fallback: _jsx("div", { children: "Chargement des documents politiques..." }), children: _jsx(PoliticGrid, {}) })] })] }));
}
