import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
const AnnonceAll = () => {
    const [annonces, setAnnonces] = useState(DEFAULT_ANNONCES);
    const [, setIsMobile] = useState(false);
    useEffect(() => {
        const fetchAnnonces = async () => {
            try {
                const annoncesPayload = await fetchPayloadAnnonces();
                const annonces = annoncesPayload.map((annonce) => ({
                    ...annonce,
                    image: { url: annonce.image },
                }));
                setAnnonces(annonces);
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchAnnonces();
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (_jsxs("div", { style: {
            maxWidth: '1200px',
            margin: '40px auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            border: '1px solid #ddd',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }, children: [_jsx("h1", { style: {
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                }, children: "Toutes les annonces" }), _jsx("div", { style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }, children: annonces.map((annonce, index) => (_jsxs("div", { style: {
                        margin: '20px',
                        width: 'calc(33.33% - 20px)',
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    }, children: [_jsx("img", { src: annonce.image.url, alt: annonce.titre, style: {
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover',
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                            } }), _jsxs("div", { style: {
                                padding: '20px',
                            }, children: [_jsx("h2", { style: {
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        marginBottom: '10px',
                                    }, children: annonce.titre }), _jsx("p", { style: {
                                        marginBottom: '20px',
                                    }, children: annonce.description }), _jsx(Link, { to: annonce.lien, style: {
                                        textDecoration: 'none',
                                        color: '#337ab7',
                                    }, children: "Voir plus" })] })] }, index))) })] }));
};
export default AnnonceAll;
