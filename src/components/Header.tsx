import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { fetchPayloadHeader, type HeaderPayload } from '../services/payloadApi';
import { useLanguage } from '../i18n/LanguageContext';
import './Header.css';

const fallback = {
  logo: '/logo.png',
  socialLinks: [
    { href: 'https://web.facebook.com/laboratoire.zeroual.kawassim/', icon: '/icons/facebook.svg', alt: 'Facebook' },
    { href: 'https://www.instagram.com/laboratoire_zeroual/', icon: '/icons/instagram.svg', alt: 'Instagram' },
    { href: 'https://linkedin.com/in/laboratoires_zeroual', icon: '/icons/linkedin.svg', alt: 'LinkedIn' },
  ],
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [headerConfig, setHeaderConfig] = useState<HeaderPayload | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    fetchPayloadHeader()
      .then(data => setHeaderConfig(data))
      .catch(() => setHeaderConfig(null));
  }, []);

  const toggleMenu = () => setOpen(prev => !prev);

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
          <Link to="/" aria-label={t('home')}>
            <img src={logoSrc} alt={t('title')} />
          </Link>
        </div>

        <button
          className="menu-toggle"
          aria-label="Menu"
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
                {t('partner_labs')}
              </NavLink>
              <ul className="submenu">
                <li><NavLink to="/about">{t('presentation')}</NavLink></li>
                <li><NavLink to="/labokawacim">{t('lab_kawacim')}</NavLink></li>
                <li><NavLink to="/labosouani">{t('lab_souani')}</NavLink></li>
                <li><NavLink to="/labocharf">{t('lab_charf')}</NavLink></li>
                <li><NavLink to="/specialite">{t('services')}</NavLink></li>
              </ul>
            </li>
            <li className="has-submenu">
              <NavLink to="/pro" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('professional_space')}
              </NavLink>
              <ul className="submenu">
                <li><NavLink to="/catalogue">Catalogues</NavLink></li>
                <li><NavLink to="/recommandationpreanalytique">Récommandations préanalytiques</NavLink></li>
                <li><NavLink to="/centraleachat">Centrale d'achats</NavLink></li>
                <li><NavLink to="/propage">Ressources documentaires</NavLink></li>
                <li><NavLink to="/prelevement">Prélevements</NavLink></li>
              </ul>
            </li>
            <li className="has-submenu">
              <NavLink to="/patient" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('patient_space')}
              </NavLink>
              <ul className="submenu">
                <li><NavLink to="/rdv">{t('take_appointment_sampling')}</NavLink></li>
                <li><NavLink to="/prepavisite">{t('prepare_analysis')}</NavLink></li>
                <li><NavLink to="/resultat">{t('results')}</NavLink></li>
                <li><NavLink to="/faq">{t('faq')}</NavLink></li>
                <li><NavLink to="/blog">{t('biological_news')}</NavLink></li>
              </ul>
            </li>
            <li>
              <NavLink to="/feedbacksection" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('complaints_suggestions')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                {t('contact')}
              </NavLink>
            </li>
          </ul>

          <div className="nav-extras">
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
