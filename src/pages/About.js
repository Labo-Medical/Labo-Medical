import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
// 💡 Lazy loading des composants
const Presentation = lazy(() => import('../components/Presentation'));
const Historique = lazy(() => import('../components/Historique'));
const Chiffres = lazy(() => import('../components/Chiffre'));
const Partenaire = lazy(() => import('../components/Partenaire'));
const Specialites = lazy(() => import('../components/Specialite'));
export default function AboutBiogroup() {
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "\u00C0 propos - Les Laboratoires Zeroual" }) }), _jsxs("main", { style: { fontFamily: "'Montserrat', Arial, sans-serif", padding: '2rem' }, children: [_jsx(Suspense, { fallback: _jsx("div", { children: "Chargement de la pr\u00E9sentation..." }), children: _jsx(Presentation, {}) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Chargement de l\u2019historique..." }), children: _jsx(Historique, {}) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Chargement des chiffres..." }), children: _jsx(Chiffres, {}) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Chargement des partenaires..." }), children: _jsx(Partenaire, {}) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Chargement des sp\u00E9cialit\u00E9s..." }), children: _jsx(Specialites, {}) })] })] }));
}
