import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import FloatingLanguageSwitcher from "./components/FloatingLanguageSwitcher";

import './i18n/i18n';

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
import HighlightTicker from './components/HighlightTicker';
import AnnonceAll from './components/AnnonceAll';

// 🎨 Styles
import './App.css';

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Charger la langue sauvegardée au démarrage
    try {
      const savedLang = localStorage.getItem('app:lang');
      if (savedLang && savedLang !== i18n.language) {
        i18n.changeLanguage(savedLang);
      }
    } catch {}

    // Gérer RTL/LTR en fonction de la langue
    const handleLanguageChange = () => {
      const isArabic = i18n.language === 'ar';
      document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
      document.documentElement.lang = i18n.language;
    };

    handleLanguageChange();
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Header />
          <HighlightTicker />
          <ContactTab />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about/*" element={<About />} />
              <Route path="/patient/*" element={<Patient />} />
              <Route path="/pro/*" element={<Pro />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/politic" element={<Politic />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blogarticle" element={<BlogArticle />} />
              <Route path="/prepavisite/*" element={<PrepaVisite />} />
              <Route path="/resultat" element={<Resultat />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/specialite" element={<Specialite />} />
              <Route path="/feedbackSection" element={<FeedbackSection />} />
              <Route path="/labokawacim" element={<LaboKawacim />} />
              <Route path="/labosouani" element={<LaboSouani />} />
              <Route path="/labocharf" element={<LaboCharf />} />
              <Route path="/collaborateurs" element={<Collaborateurs />} />
              <Route path="/latestnews" element={<LatestNews />} />
              <Route path="/propage" element={<Propage />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/centraleachat" element={<CentraleAchat />} />
              <Route path="/prelevement" element={<Prelevement />} />
              <Route path="/login" element={<Login />} />
              <Route path="/rdv" element={<Rdv />} />
              <Route path="/pageresultats" element={<Pageresultats />} />
              <Route path="/recommandationpreanalytique" element={<RecommandationsPreanalytique />} />
              <Route path="/annonceall" element={<AnnonceAll/>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />

          {/* 🌐 Sélecteur flottant visible partout */}
          <FloatingLanguageSwitcher />
        </div>
      </Router>
    </HelmetProvider>
  );
}
