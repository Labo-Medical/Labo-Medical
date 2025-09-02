import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { fetchPayloadHeader, type HeaderPayload } from '../services/payloadApi';
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
                NOS LABORATOIRES PARTENAIRES
              </NavLink>
              <ul className="submenu">
                <li><NavLink to="/about">Présentation</NavLink></li>
                <li><NavLink to="/labokawacim">Laboratoire Zeroual Kawassim</NavLink></li>
                <li><NavLink to="/labosouani">Laboratoire Zeroual Souani</NavLink></li>
                <li><NavLink to="/labocharf">Laboratoire Zeroual Charf</NavLink></li>
                <li><NavLink to="/specialite">Spécialités Biologiques</NavLink></li>
              </ul>
            </li>
            <li className="has-submenu">
              <NavLink to="/pro" className={({ isActive }) => (isActive ? 'active' : '')}>
                ESPACE PROS
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
                ESPACE PATIENT
              </NavLink>
              <ul className="submenu">
                <li><NavLink to="/rdv">Prendre RDV (Prélèvement)</NavLink></li>
                <li><NavLink to="/prepavisite">Préparer analyses</NavLink></li>
                <li><NavLink to="/resultat">Résultats</NavLink></li>
                <li><NavLink to="/faq">FAQ</NavLink></li>
                <li><NavLink to="/blog">Actualités biologiques</NavLink></li>
              </ul>
            </li>
            <li>
              <NavLink to="/feedbacksection" className={({ isActive }) => (isActive ? 'active' : '')}>
                RÉCLAMATIONS & SUGGESTIONS
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                CONTACT
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
