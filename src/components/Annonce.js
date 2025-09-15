import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchPayloadAnnonces } from '../services/payloadApi';
const DEFAULT_ANNONCES = [
    {
        id: '1',
        titre: 'Bilan de santé complet',
        description: 'Faites un bilan médical pour mieux connaître votre santé.',
        image: { url: '/annonces/5.webp' },
        lien: '/annonce/1',
    },
    {
        id: '2',
        titre: 'Nouveau centre à Charf',
        description: 'Ouverture d’un nouveau laboratoire avec équipement de pointe.',
        image: { url: '/annonces/Charf.png' },
        lien: '/annonce/2',
    },
    {
        id: '3',
        titre: 'Recrutement : rejoignez notre équipe',
        description: 'Veuillez deposer votre candidature sur ce lien.',
        image: { url: '/annonces/9.jpg' },
        lien: '/annonce/3',
    },
    {
        id: '4',
        titre: 'Horaires 7/24',
        description: 'Nos laboratoires sont ouverts 7j/7 et 24h/24.',
        image: { url: '/annonces/3.webp' },
        lien: '/annonce/4',
    },
    {
        id: '5',
        titre: 'Service à domicile',
        description: 'Prélevez en toute sérénité sans vous déplacer.',
        image: { url: '/annonces/4.webp' },
        lien: '/annonce/5',
    },
];
export default function Annonce() {
    const [annonces, setAnnonces] = useState(DEFAULT_ANNONCES);
    const [index, setIndex] = useState(0);
    const [selectedAnnonce, setSelectedAnnonce] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isSmallMobile, setIsSmallMobile] = useState(false);
    useEffect(() => {
        // détecter mobile et petit écran
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsSmallMobile(window.innerWidth < 480);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        fetchPayloadAnnonces()
            .then((data) => {
            if (data && data.length > 0) {
                setAnnonces(data.map((a) => ({
                    ...a,
                    image: typeof a.image === 'string' ? { url: a.image } : a.image,
                })));
            }
        })
            .catch(() => {
            setAnnonces(DEFAULT_ANNONCES);
        });
    }, []);
    const next = () => setIndex((i) => (i + 1) % annonces.length);
    const prev = () => setIndex((i) => (i - 1 + annonces.length) % annonces.length);
    return (_jsxs("div", { style: styles.container, children: [_jsxs("div", { style: styles.header, children: [_jsx("h2", { style: styles.title, children: "\uD83D\uDCE2 Annonces" }), _jsxs("div", { children: [_jsx("button", { onClick: prev, style: styles.nav, children: "\u2039" }), _jsx("button", { onClick: next, style: styles.nav, children: "\u203A" })] })] }), _jsx("div", { style: {
                    ...styles.grid,
                    gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr',
                    gridTemplateRows: isMobile ? 'auto' : 'repeat(2, 1fr)',
                    height: isMobile ? 'auto' : '500px',
                }, children: _jsx(AnimatePresence, { mode: "sync", children: annonces.map((a, i) => {
                        const isMain = i === index;
                        const isVisible = (i + 5 - index) % 5 < 5;
                        return isVisible ? (_jsxs(motion.div, { layout: true, initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -30 }, transition: { duration: 0.5 }, style: {
                                ...styles.card,
                                ...(isMain
                                    ? {
                                        ...styles.cardMain,
                                        gridColumn: isMobile ? '1 / -1' : '1 / 2',
                                        gridRow: isMobile ? 'auto' : '1 / 3',
                                        minHeight: isMobile ? '220px' : '100%',
                                    }
                                    : styles.cardSmall),
                                backgroundImage: `url(${a.image.url})`,
                            }, children: [_jsx("div", { style: styles.overlay }), _jsxs("div", { style: styles.cardContent, children: [_jsx("h3", { style: {
                                                ...styles.cardTitle,
                                                fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : '1.2rem',
                                            }, children: a.titre }), _jsx("p", { style: {
                                                ...styles.cardDesc,
                                                fontSize: isSmallMobile ? '0.75rem' : isMobile ? '0.85rem' : '0.95rem',
                                            }, children: a.description }), _jsx("button", { style: {
                                                ...styles.cardButton,
                                                fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : '0.9rem',
                                                padding: isSmallMobile
                                                    ? '0.25rem 0.5rem'
                                                    : isMobile
                                                        ? '0.3rem 0.6rem'
                                                        : '0.4rem 0.8rem',
                                            }, onClick: () => setSelectedAnnonce(a), children: "Voir l\u2019annonce" })] })] }, a.id)) : null;
                    }) }) }), selectedAnnonce && (_jsx("div", { style: styles.modalOverlay, onClick: () => setSelectedAnnonce(null), children: _jsxs(motion.div, { onClick: (e) => e.stopPropagation(), initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4 }, style: {
                        ...styles.modalContent,
                        padding: isSmallMobile ? '1rem' : '2rem',
                    }, children: [_jsx("button", { onClick: () => setSelectedAnnonce(null), style: styles.closeButton, children: "\u2716" }), _jsx("img", { src: selectedAnnonce.image.url, alt: selectedAnnonce.titre, style: {
                                ...styles.modalImage,
                                maxHeight: isSmallMobile ? '50vh' : isMobile ? '60vh' : '400px',
                                marginTop: isSmallMobile ? '0.5rem' : isMobile ? '1rem' : '120px',
                            } }), _jsx("h3", { style: {
                                ...styles.modalTitle,
                                fontSize: isSmallMobile ? '1.1rem' : '1.5rem',
                            }, children: selectedAnnonce.titre }), _jsx("p", { style: {
                                ...styles.modalDesc,
                                fontSize: isSmallMobile ? '0.85rem' : '1rem',
                            }, children: selectedAnnonce.description })] }) }))] }));
}
const styles = {
    container: {
        maxWidth: 1200,
        margin: '2rem auto',
        padding: '0 1rem',
        fontFamily: 'Segoe UI, sans-serif',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    title: {
        fontSize: '1.8rem',
        color: '#6E0B14',
        fontWeight: 700,
    },
    nav: {
        fontSize: '1.5rem',
        background: '#eee',
        border: 'none',
        borderRadius: '50%',
        width: '2.5rem',
        height: '2.5rem',
        cursor: 'pointer',
        marginLeft: '0.5rem',
    },
    grid: {
        display: 'grid',
        gap: '1rem',
    },
    card: {
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '1rem',
        color: '#fff',
    },
    cardMain: {},
    cardSmall: {
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1))',
        zIndex: 1,
    },
    cardContent: {
        position: 'relative',
        zIndex: 2,
    },
    cardTitle: {
        fontWeight: 700,
        marginBottom: '0.5rem',
    },
    cardDesc: {
        marginBottom: '0.5rem',
    },
    cardButton: {
        display: 'inline-block',
        background: '#fff',
        color: '#6E0B14',
        borderRadius: '4px',
        fontWeight: 600,
        textDecoration: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    modalContent: {
        position: 'relative',
        background: '#fff',
        borderRadius: '12px',
        textAlign: 'center',
        maxWidth: '800px',
        width: '90%',
        color: '#333',
        boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
    },
    modalImage: {
        maxWidth: '100%',
        borderRadius: '8px',
        marginBottom: '1rem',
    },
    closeButton: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        fontSize: '1.5rem',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: '#444',
    },
    modalTitle: {
        fontWeight: 'bold',
        margin: '1rem 0',
    },
    modalDesc: {
        color: '#555',
    },
};
