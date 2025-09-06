/**
 * HEADER COMPONENT - Main Navigation Bar
 * 
 * This is the main navigation header that appears at the top of every page.
 * It includes the company logo, navigation menu, social media links, and language switcher.
 * 
 * Features:
 * - Multi-level dropdown navigation menus
 * - Responsive mobile hamburger menu
 * - Integration with language switching system
 * - Social media links (Facebook, Instagram, LinkedIn)
 * - API fallback for when backend is unavailable
 */

import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchPayloadHeader, type HeaderPayload } from '../services/payloadApi';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

// Fallback data used when the API is unavailable or slow to respond
const fallback = {
  logo: '/logo.png',
  socialLinks: [
    { href: 'https://web.facebook.com/laboratoire.zeroual.kawassim/', icon: '/icons/facebook.svg', alt: 'Facebook' },
    { href: 'https://www.instagram.com/laboratoire_zeroual/', icon: '/icons/instagram.svg', alt: 'Instagram' },
    { href: 'https://linkedin.com/in/laboratoires_zeroual', icon: '/icons/linkedin.svg', alt: 'LinkedIn' },
  ],
};

export default function Header() {
  // State for mobile menu toggle (hamburger menu)
  const [open, setOpen] = useState(false);
  
  // State for header configuration from API
  const [headerConfig, setHeaderConfig] = useState<HeaderPayload | null>(null);
  
  // Translation hook for multi-language support
  const { t } = useTranslation();

  // Fetch header data from API when component mounts
  useEffect(() => {
    fetchPayloadHeader()
      .then(data => setHeaderConfig(data))
      .catch(() => setHeaderConfig(null)); // Use fallback data if API fails
  }, []);

  // Toggle mobile menu open/closed state
  const toggleMenu = () => setOpen(prev => !prev);

  // Use API data if available, otherwise use fallback
  const logoSrc = headerConfig?.logo?.url || fallback.logo;
  const socialLinks = headerConfig?.socialLinks?.length
    ? headerConfig.socialLinks.map(s => ({
        href: s.url,
        icon: s.icon?.url || '',
        alt: s.platform,
      }))
    : fallback.socialLinks;

  return (
    <header className="site-header">
      <div className="container">
        <div className="logo">
          <Link to="/" aria-label="Retour à l'accueil">
            <img src={logoSrc} alt="Logo des Laboratoires Zeroual" />
          </Link>
        </div>

        <button
          className="menu-toggle"
          aria-label="Ouvrir ou fermer le menu"
          aria-haspopup="true"
          aria-expanded={open}
          onClick={toggleMenu}
        >
          &#9776;
        </button>

        <nav className={`main-nav${open ? ' open' : ''}`} aria-label="Navigation principale">
          <ul>
            <li className="has-submenu">
              <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('header.nav_labs')}
              </NavLink>
              <ul className="submenu">
                <li><NavLink to="/about">{t('header.nav_presentation')}</NavLink></li>
                <li><NavLink to="/labokawacim">{t('header.nav_kawassim')}</NavLink></li>
                <li><NavLink to="/labosouani">{t('header.nav_souani')}</NavLink></li>
                <li><NavLink to="/labocharf">{t('header.nav_charf')}</NavLink></li>
                <li><NavLink to="/specialite">{t('header.nav_specialties')}</NavLink></li>
              </ul>
            </li>
            <li className="has-submenu">
              <NavLink to="/pro" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('header.nav_pros')}
              </NavLink>
              <ul className="submenu">
                <li><NavLink to="/catalogue">{t('header.nav_catalogues')}</NavLink></li>
                <li><NavLink to="/recommandationpreanalytique">{t('header.nav_recommendations')}</NavLink></li>
                <li><NavLink to="/centraleachat">{t('header.nav_central_purchase')}</NavLink></li>
                <li><NavLink to="/propage">{t('header.nav_resources')}</NavLink></li>
                <li><NavLink to="/prelevement">{t('header.nav_sampling')}</NavLink></li>
              </ul>
            </li>
            <li className="has-submenu">
              <NavLink to="/patient" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('header.nav_patient')}
              </NavLink>
              <ul className="submenu">
                <li><NavLink to="/rdv">{t('header.nav_appointment')}</NavLink></li>
                <li><NavLink to="/prepavisite">{t('header.nav_prepare')}</NavLink></li>
                <li><NavLink to="/resultat">{t('header.nav_results')}</NavLink></li>
                <li><NavLink to="/faq">{t('header.nav_faq')}</NavLink></li>
                <li><NavLink to="/blog">{t('header.nav_news')}</NavLink></li>
              </ul>
            </li>
            <li>
              <NavLink to="/feedbacksection" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('header.nav_complaints')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('header.nav_contact')}
              </NavLink>
            </li>
          </ul>

          <div className="nav-extras">
            <LanguageSwitcher />
            <div className="social-icons">
              {socialLinks.map(({ href, icon, alt }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={alt}
                >
                  <img src={icon} alt={alt} />
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
