import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';

// 🌐 i18n
import { LanguageProvider } from './i18n/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';


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

  return (
    <HelmetProvider>
      <LanguageProvider>
        <LanguageSwitcher />
        <Router>
          <div className="App">
            <Header />
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}
