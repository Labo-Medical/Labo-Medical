import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchPayloadCentraleAchats } from '../services/payloadApi';
const DEFAULT_CONTENT = {
    id: "centraleachat",
    title: "Centrale d'achats",
    description: "LES LABORATOIRES ZEROUAL est une centrale d’achats spécialisée dans les industries médicales qui sont présentes en Afrique.\n\n" +
        "Etant implantés au plus près de nos clients, notre promesse est d’aborder toutes les questions posées par un projet en termes d’approvisionnement et de Supply Chain afin d’apporter, en toutes circonstances, une réponse adaptée aux besoins des laboratoires médicaux, des cliniques, des hôpitaux etc.\n\n" +
        "Bien plus qu’un fournisseur d’équipements, de réactifs et de consommables, nous sommes le partenaire privilégié pour booster la qualité de vos achats et optimiser vos coûts d’approvisionnement.\n\n" +
        "Le principe est simple : l’union fait la force. En mutualisant les achats de nos clients, nous sommes à même d’acheter en plus grande quantité auprès des fabricants et fournisseurs. Ce qui nous donne davantage de poids pour vous négocier les meilleurs prix aux meilleurs délais.\n\n" +
        "En nous confiant vos achats non stratégiques vous ferez des économies d’échelle mais surtout vous serez débarrassés des contraintes administratives et logistiques pour gagner du temps et mieux vous concentrer sur vos activités clés.",
};
export default function CentraleAchats() {
    const [content, setContent] = useState(DEFAULT_CONTENT);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchPayloadCentraleAchats()
            .then((data) => {
            if (data)
                setContent(data);
        })
            .catch(() => {
            setContent(DEFAULT_CONTENT);
        })
            .finally(() => setLoading(false));
    }, []);
    if (loading)
        return _jsx("p", { style: styles.placeholder, children: "Chargement..." });
    return (_jsxs(motion.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, style: styles.section, children: [_jsx("h1", { style: styles.title, children: content.title }), content.description.split('\n\n').map((para, idx) => (_jsx("p", { style: styles.paragraph, children: para }, idx)))] }, content.id));
}
const styles = {
    section: {
        background: '#fafafa',
        borderRadius: '12px',
        padding: '2rem 2.5rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        maxWidth: '1100px',
        margin: '25px auto',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        color: '#000',
        lineHeight: 1.7,
    },
    title: {
        color: '#800020',
        fontSize: '2.2rem',
        fontWeight: 700,
        marginBottom: '1.2rem',
        textAlign: 'center',
    },
    paragraph: {
        fontSize: '1.05rem',
        marginBottom: '1.2rem',
        textAlign: 'justify',
    },
    placeholder: {
        textAlign: 'center',
        color: '#555',
        fontStyle: 'italic',
        marginTop: '1rem',
    },
};
