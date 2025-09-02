import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import './Home.css';
// 💡 Lazy loading des composants
const Hero = lazy(() => import('../components/Hero'));
const ImageSlider = lazy(() => import('../components/Annonce'));
const SliderCard = lazy(() => import('../components/SliderCard'));
const Valeur = lazy(() => import('../components/Valeur'));
const Specialite = lazy(() => import('../components/Specialite'));
const Gallerie = lazy(() => import('../components/Gallerie'));
const Blog = lazy(() => import('../components/Blog'));
export default function Home() {
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Les Laboratoires Zeroual - Accueil" }), _jsx("meta", { name: "description", content: "Page d\u2019accueil des Laboratoires Zeroual, votre r\u00E9f\u00E9rence en analyses m\u00E9dicales et microbiologie \u00E0 Tanger." }), _jsx("meta", { property: "og:title", content: "Les Laboratoires Zeroual - Accueil" }), _jsx("meta", { property: "og:description", content: "D\u00E9couvrez nos services d\u2019analyses m\u00E9dicales." }), _jsx("meta", { property: "og:image", content: "/logo.jpg" })] }), _jsxs("main", { className: "home-page", children: [_jsx(Suspense, { fallback: _jsx("div", { children: "Chargement de la section Hero..." }), children: _jsx(Hero, {}) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Chargement de l\u2019annonce..." }), children: _jsx(ImageSlider, {}) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Chargement des cartes slider..." }), children: _jsx(SliderCard, {}) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Chargement des valeurs..." }), children: _jsx(Valeur, {}) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Chargement des sp\u00E9cialit\u00E9s..." }), children: _jsx(Specialite, {}) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Chargement de la galerie..." }), children: _jsx(Gallerie, {}) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Chargement du blog..." }), children: _jsx(Blog, {}) })] })] }));
}
