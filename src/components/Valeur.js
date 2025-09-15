import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { fetchPayloadValeurs } from '../services/payloadApi';
const fallbackValeurs = [
    {
        title: 'Qualité & Recherche Biomédicale',
        text: 'Technologies avancées et amélioration continue.',
        icon: '/icons/quality.svg',
    },
    {
        title: 'Services & Proximité',
        text: 'Accueil personnalisé et maillage territorial efficace.',
        icon: '/icons/proximity.svg',
    },
    {
        title: 'Compétence & Réseautage',
        text: 'Un esprit d’équipe fort et une expertise rigoureuse.',
        icon: '/icons/skills.svg',
    },
    {
        title: 'Impartialité & Confidentialité',
        text: 'Éthique, confiance et relations humaines solides.',
        icon: '/icons/respect.svg',
    },
];
export default function ValeursDisplay() {
    const [valeurs, setValeurs] = useState(fallbackValeurs);
    useEffect(() => {
        fetchPayloadValeurs()
            .then((data) => {
            if (data && data.length > 0) {
                const merged = fallbackValeurs.map((fallback, index) => ({
                    ...fallback,
                    title: data[index]?.title || fallback.title,
                    text: data[index]?.text || fallback.text,
                    icon: data[index]?.icon || fallback.icon,
                }));
                setValeurs(merged);
            }
        })
            .catch(() => {
            setValeurs(fallbackValeurs);
        });
    }, []);
    return (_jsx("main", { style: { padding: '2rem 1rem', backgroundColor: '#fff' }, children: _jsxs("section", { style: { textAlign: 'center', margin: '0 auto', maxWidth: '1200px' }, children: [_jsx("h2", { style: {
                        color: '#7b1621',
                        fontSize: '1.8rem',
                        marginBottom: '2rem',
                        fontWeight: 700,
                    }, children: "Les Laboratoires Zeroual vous apportent un service de qualit\u00E9 et de proximit\u00E9." }), _jsx("div", { style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem',
                    }, children: valeurs.map((valeur, index) => (_jsxs("div", { style: {
                            textAlign: 'center',
                            padding: '1rem',
                            borderRadius: '10px',
                            background: '#fafafa',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                            transition: 'transform 0.3s ease',
                        }, children: [_jsx("h3", { style: {
                                    color: '#515557',
                                    fontSize: '1.05rem',
                                    marginBottom: '1rem',
                                }, children: valeur.title }), _jsx("img", { src: valeur.icon, alt: valeur.title, style: {
                                    width: '64px',
                                    height: '64px',
                                    marginBottom: '1rem',
                                    transition: 'transform 0.2s ease',
                                }, onMouseOver: (e) => (e.currentTarget.style.transform = 'scale(1.12)'), onMouseOut: (e) => (e.currentTarget.style.transform = 'scale(1.0)') }), _jsx("p", { style: {
                                    color: '#333',
                                    fontSize: '0.95rem',
                                    lineHeight: 1.4,
                                }, children: valeur.text })] }, index))) })] }) }));
}
