import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
// 🗂️ Pages
import Home from './pages/Home';
import About from './pages/About';
import Patient from './pages/Patient';
import Pro from './pages/Pro';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Politic from './pages/Politic';
import FeedbackSection from './pages/FeedbackSection';
// 🧩 Composants
import Header from './components/Header';
import Footer from './components/Footer';
import ContactTab from './components/ContactTab';
import PrepaVisite from './components/PrepaVisite';
import Faq from './components/Faq';
import Blog from './components/Blog';
import BlogArticle from './components/BlogArticle';
import LaboKawacim from './components/LaboKawacim';
import LaboSouani from './components/LaboSouani';
import LaboCharf from './components/LaboCharf';
import Collaborateurs from './components/Partenaire';
import LatestNews from './components/Annonce';
import Resultat from './components/Resultat';
import Specialite from './components/Specialite';
import Propage from './components/Propage';
import Catalogue from './components/Catalogue';
import CentraleAchat from './components/CentraleAchat';
import Prelevement from './components/Prelevement';
import RecommandationsPreanalytique from './components/RecommandationsPreanalytique';
import Login from './pages/Login';
import Pageresultats from './components/Pageresultats';
import Rdv from './components/Rdv';
// 🎨 Styles
import './App.css';
export default function App() {
    useEffect(() => {
    }, []);
    return (_jsx(HelmetProvider, { children: _jsx(Router, { children: _jsxs("div", { className: "App", children: [_jsx(Header, {}), _jsx(ContactTab, {}), _jsx("main", { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/about/*", element: _jsx(About, {}) }), _jsx(Route, { path: "/patient/*", element: _jsx(Patient, {}) }), _jsx(Route, { path: "/pro/*", element: _jsx(Pro, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "/politic", element: _jsx(Politic, {}) }), _jsx(Route, { path: "/blog", element: _jsx(Blog, {}) }), _jsx(Route, { path: "/blogarticle", element: _jsx(BlogArticle, {}) }), _jsx(Route, { path: "/prepavisite/*", element: _jsx(PrepaVisite, {}) }), _jsx(Route, { path: "/resultat", element: _jsx(Resultat, {}) }), _jsx(Route, { path: "/faq", element: _jsx(Faq, {}) }), _jsx(Route, { path: "/specialite", element: _jsx(Specialite, {}) }), _jsx(Route, { path: "/feedbackSection", element: _jsx(FeedbackSection, {}) }), _jsx(Route, { path: "/labokawacim", element: _jsx(LaboKawacim, {}) }), _jsx(Route, { path: "/labosouani", element: _jsx(LaboSouani, {}) }), _jsx(Route, { path: "/labocharf", element: _jsx(LaboCharf, {}) }), _jsx(Route, { path: "/collaborateurs", element: _jsx(Collaborateurs, {}) }), _jsx(Route, { path: "/latestnews", element: _jsx(LatestNews, {}) }), _jsx(Route, { path: "/propage", element: _jsx(Propage, {}) }), _jsx(Route, { path: "/catalogue", element: _jsx(Catalogue, {}) }), _jsx(Route, { path: "/centraleachat", element: _jsx(CentraleAchat, {}) }), _jsx(Route, { path: "/prelevement", element: _jsx(Prelevement, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/rdv", element: _jsx(Rdv, {}) }), _jsx(Route, { path: "/pageresultats", element: _jsx(Pageresultats, {}) }), _jsx(Route, { path: "/recommandationpreanalytique", element: _jsx(RecommandationsPreanalytique, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }), _jsx(Footer, {})] }) }) }));
}
