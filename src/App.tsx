import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// Initialize i18n configuration for multi-language support
import './i18n';


// Pages
import Home from './pages/Home';
import About from './pages/About';
import Patient from './pages/Patient';
import Pro from './pages/Pro';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Politic from './pages/Politic';
import FeedbackSection from './pages/FeedbackSection';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ContactTab from './components/ContactTab';
import ErrorBoundary from './components/ErrorBoundary';
// import FloatingLanguageSwitcher from './components/FloatingLanguageSwitcher';
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

// Styles
import './App.css';


export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Handle RTL (Right-to-Left) direction for Arabic language
    // This ensures proper text direction and layout for RTL languages like Arabic
    const handleLanguageChange = () => {
      const isArabic = i18n.language === 'ar';
      document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
      document.documentElement.lang = i18n.language;
    };

    // Set initial direction based on current language
    handleLanguageChange();

    // Listen for language changes to update document direction dynamically
    i18n.on('languageChanged', handleLanguageChange);

    // Cleanup listener on component unmount to prevent memory leaks
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Header />
          <ContactTab />
          {/* The language switcher is currently disabled */}
          {/* <FloatingLanguageSwitcher /> */}
          <main>
            <ErrorBoundary>
              <Routes>
                {/* Home page route */}
                <Route path="/" element={<Home />} />
                {/* About page with nested routes */}
                <Route path="/about/*" element={<About />} />
                {/* Patient space with nested routes */}
                <Route path="/patient/*" element={<Patient />} />
                {/* Professional space with nested routes */}
                <Route path="/pro/*" element={<Pro />} />
                {/* Contact page */}
                <Route path="/contact" element={<Contact />} />
                {/* Institutional policies page */}
                <Route path="/politic" element={<Politic />} />
                {/* Blog listing page */}
                <Route path="/blog" element={<Blog />} />
                {/* Individual blog article page */}
                <Route path="/blogarticle" element={<BlogArticle />} />
                {/* Visit preparation section with nested routes */}
                <Route path="/prepavisite/*" element={<PrepaVisite />} />
                {/* Results access page */}
                <Route path="/resultat" element={<Resultat />} />
                {/* FAQ page */}
                <Route path="/faq" element={<Faq />} />
                {/* Specialties page */}
                <Route path="/specialite" element={<Specialite />} />
                {/* Feedback and complaints section */}
                <Route path="/feedbackSection" element={<FeedbackSection />} />
                {/* Individual lab pages */}
                <Route path="/labokawacim" element={<LaboKawacim />} />
                <Route path="/labosouani" element={<LaboSouani />} />
                <Route path="/labocharf" element={<LaboCharf />} />
                {/* Partners page */}
                <Route path="/collaborateurs" element={<Collaborateurs />} />
                {/* Latest news/announcements */}
                <Route path="/latestnews" element={<LatestNews />} />
                {/* Professional page */}
                <Route path="/propage" element={<Propage />} />
                {/* Catalog page */}
                <Route path="/catalogue" element={<Catalogue />} />
                {/* Central purchasing page */}
                <Route path="/centraleachat" element={<CentraleAchat />} />
                {/* Sampling/prelevement page */}
                <Route path="/prelevement" element={<Prelevement />} />
                {/* Login page */}
                <Route path="/login" element={<Login />} />
                {/* Appointment booking page */}
                <Route path="/rdv" element={<Rdv />} />
                {/* Results page */}
                <Route path="/pageresultats" element={<Pageresultats />} />
                {/* Pre-analytical recommendations */}
                <Route path="/recommandationpreanalytique" element={<RecommandationsPreanalytique />} />
                {/* Catch-all route for 404 page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
