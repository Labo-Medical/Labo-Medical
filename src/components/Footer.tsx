import { useState, useEffect } from 'react';
import { fetchPayloadFooter, type FooterPayload } from '../services/payloadApi';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  
  const fallback = {
    logo: '/logo.png',
    engagementText: 'Nos Laboratoires partenaires s’engagent pour la qualité, la proximité et la confidentialité de vos analyses médicales.',
    socialLinks: [
      { href: 'https://web.facebook.com/laboratoire.zeroual.kawassim/', icon: '/icons/facebook.svg', alt: 'Facebook' },
      { href: 'https://www.instagram.com/laboratoire_zeroual/', icon: '/icons/instagram.svg', alt: 'Instagram' },
      { href: 'https://linkedin.com/in/laboratoires_zeroual', icon: '/icons/linkedin.svg', alt: 'LinkedIn' },
    ],
    labLocations: [
      { name: 'Zeroual Kawacim', address: 'Magasin N°60, Complexe Kawassim Tranche N°7, Al Moujahidin, Tanger 90000' },
      { name: 'Zeroual Charf', address: '8 rue d’Anfa, Charf' },
      { name: 'Zeroual Souani', address: '43 hay, boulevard Anfa, Tanger 90000' },
    ],
  };

  const [footerData, setFooterData] = useState<FooterPayload | null>(null);

  useEffect(() => {
    fetchPayloadFooter()
      .then(data => setFooterData(data))
      .catch(() => setFooterData(null));
  }, []);

  const logoSrc = footerData?.logo?.url || fallback.logo;
  const engagementText = footerData?.engagementText || fallback.engagementText;
  const socialLinks = footerData?.socialLinks?.length
    ? footerData.socialLinks.map(s => ({
        href: s.url,
        icon: s.icon?.url || '',
        alt: s.platform,
      }))
    : fallback.socialLinks;

  const labLocations = footerData?.labLocations?.length
    ? footerData.labLocations
    : fallback.labLocations;

  const quickLinks = [
    { label: t('home'), href: '/' },
    { label: t('our_services'), href: '/specialite' },
    { label: t('take_appointment'), href: '/rdv' },
    { label: t('access_results'), href: '/resultat' },
    { label: t('faq'), href: '/faq' },
    { label: t('contact'), href: '/contact' },
  ];

  const legalLinks = [
    { label: t('legal_mentions'), href: '/mentions-legales' },
    { label: t('privacy_policy_full'), href: '/politique-confidentialite' },
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.footerMain}>
        <div style={styles.footerLogoBlock}>
          <img src={logoSrc} alt="Laboratoires Zeroual" style={styles.footerLogo} />
          <p style={styles.footerEngagement}>{engagementText}</p>
          <div style={styles.footerSocials}>
            {socialLinks.map((social, idx) => (
              <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.alt}>
                <img
                  src={social.icon}
                  alt={social.alt}
                  style={styles.socialIcon}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </a>
            ))}
          </div>
        </div>

        <div style={styles.footerCol}>
          <h4 style={styles.footerTitle}>Accès rapide</h4>
          <ul style={styles.footerList}>
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} style={styles.footerLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.footerCol}>
          <h4 style={styles.footerTitle}>Nos laboratoires partenaires</h4>
          <ul style={styles.footerList}>
            {labLocations.map((lab, idx) => (
              <li key={idx}>
                {`Laboratoire ${lab.name}`} <br />
                <span style={styles.footerAddress}>{lab.address}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={styles.footerBottom}>
        <ul style={styles.footerBottomLinks}>
          {legalLinks.map((link, idx) => (
            <li key={idx}>
              <a href={link.href} style={styles.footerBottomLink}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p style={{ color: '#555' }}>{t('copyright')}</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: '#f8f8f8',
    padding: '50px 0 0 0',
    fontFamily: 'inherit',
    color: '#222',
  },
  footerMain: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    flexWrap: 'wrap' as 'wrap',
    gap: '50px',
  },
  footerLogoBlock: {
    flex: '1 1 300px',
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '16px',
    textAlign: 'center' as const,
  },
  footerLogo: {
    width: '130px',
    height: 'auto',
    marginBottom: '12px',
  },
  footerEngagement: {
    fontSize: '1rem',
    color: '#555',
    maxWidth: '320px',
    margin: '0 auto',
  },
  footerSocials: {
    display: 'flex',
    justifyContent: 'center',
    gap: '18px',
    marginTop: '10px',
  },
  socialIcon: {
    width: '26px',
    height: '26px',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  footerCol: {
    flex: '1 1 200px',
    minWidth: '180px',
  },
  footerTitle: {
    fontSize: '1.2rem',
    fontWeight: 600,
    marginBottom: '15px',
    color: '#222',
  },
  footerList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  footerLink: {
    color: '#820000ff',
    textDecoration: 'none',
    fontSize: '1rem',
    display: 'inline-block',
    marginBottom: '10px',
    transition: 'color 0.2s ease',
  },
  footerAddress: {
    color: '#666',
    fontSize: '0.95rem',
  },
  footerBottom: {
    borderTop: '1px solid #e0e0e0',
    marginTop: '40px',
    padding: '20px 0',
    textAlign: 'center' as const,
  },
  footerBottomLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    listStyle: 'none',
    padding: 0,
    margin: '0 0 10px 0',
  },
  footerBottomLink: {
    color: '#007b8f',
    textDecoration: 'none',
    fontSize: '0.98rem',
    transition: 'color 0.2s ease',
  },
};
