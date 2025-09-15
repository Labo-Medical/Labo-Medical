import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { fetchPayloadFooter } from '../services/payloadApi';
export default function Footer() {
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
    const [footerData, setFooterData] = useState(null);
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
        { label: 'Accueil', href: '/' },
        { label: 'Nos services', href: '/specialite' },
        { label: 'Prendre rendez-vous', href: '/rdv' },
        { label: 'Accès résultats', href: '/resultat' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact', href: '/contact' },
    ];
    const legalLinks = [
        { label: 'Mentions légales', href: '/mentions-legales' },
        { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
    ];
    return (_jsxs("footer", { style: styles.footer, children: [_jsxs("div", { style: styles.footerMain, children: [_jsxs("div", { style: styles.footerLogoBlock, children: [_jsx("img", { src: logoSrc, alt: "Laboratoires Zeroual", style: styles.footerLogo }), _jsx("p", { style: styles.footerEngagement, children: engagementText }), _jsx("div", { style: styles.footerSocials, children: socialLinks.map((social, idx) => (_jsx("a", { href: social.href, target: "_blank", rel: "noopener noreferrer", "aria-label": social.alt, children: _jsx("img", { src: social.icon, alt: social.alt, style: styles.socialIcon, onMouseOver: (e) => (e.currentTarget.style.transform = 'scale(1.1)'), onMouseOut: (e) => (e.currentTarget.style.transform = 'scale(1)') }) }, idx))) })] }), _jsxs("div", { style: styles.footerCol, children: [_jsx("h4", { style: styles.footerTitle, children: "Acc\u00E8s rapide" }), _jsx("ul", { style: styles.footerList, children: quickLinks.map((link, idx) => (_jsx("li", { children: _jsx("a", { href: link.href, style: styles.footerLink, children: link.label }) }, idx))) })] }), _jsxs("div", { style: styles.footerCol, children: [_jsx("h4", { style: styles.footerTitle, children: "Nos laboratoires partenaires" }), _jsx("ul", { style: styles.footerList, children: labLocations.map((lab, idx) => (_jsxs("li", { children: [`Laboratoire ${lab.name}`, " ", _jsx("br", {}), _jsx("span", { style: styles.footerAddress, children: lab.address })] }, idx))) })] })] }), _jsxs("div", { style: styles.footerBottom, children: [_jsx("ul", { style: styles.footerBottomLinks, children: legalLinks.map((link, idx) => (_jsx("li", { children: _jsx("a", { href: link.href, style: styles.footerBottomLink, children: link.label }) }, idx))) }), _jsx("p", { style: { color: '#555' }, children: "\u00A9 2025 Laboratoires Zeroual. Tous droits r\u00E9serv\u00E9s." })] })] }));
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
        flexWrap: 'wrap',
        gap: '50px',
    },
    footerLogoBlock: {
        flex: '1 1 300px',
        minWidth: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        textAlign: 'center',
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
        textAlign: 'center',
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
