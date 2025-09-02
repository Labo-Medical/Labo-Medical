import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, lazy, Suspense } from 'react';
import './FeedbackSection.css';
import { fetchPayloadFeedbackSettings } from '../services/payloadApi2';
import { Helmet } from 'react-helmet-async';
const FeedbackForm = lazy(() => import('../components/FeedbackForm'));
const DEFAULT_PHONE = '+212601812070';
export default function FeedbackSection() {
    const [whatsappNumber, setWhatsappNumber] = useState(DEFAULT_PHONE);
    useEffect(() => {
        fetchPayloadFeedbackSettings()
            .then((data) => {
            if (data?.whatsappNumber)
                setWhatsappNumber(data.whatsappNumber);
            // googleFormUrl is not used, so we skip updating it
        })
            .catch(() => {
            console.warn('Paramètres Payload non accessibles, fallback activé.');
        });
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Retour & Avis - Les Laboratoires Zeroual" }), _jsx("meta", { name: "description", content: "Donnez votre avis ou envoyez vos r\u00E9clamations aux Laboratoires Zeroual." }), _jsx("meta", { property: "og:title", content: "Retour & Avis - Les Laboratoires Zeroual" }), _jsx("meta", { property: "og:description", content: "Partagez votre exp\u00E9rience avec les Laboratoires Zeroual." }), _jsx("meta", { property: "og:image", content: "/logo.jpg" })] }), _jsxs("section", { className: "feedback-section", children: [_jsx("div", { className: "whatsapp-contact", children: _jsxs("p", { children: ["\uD83D\uDCF1 Pour toute r\u00E9clamation veuillez nous contacter au :", ' ', _jsx("a", { href: `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`, target: "_blank", rel: "noopener noreferrer", "aria-label": "Contacter via WhatsApp", children: whatsappNumber })] }) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Chargement du formulaire de retour..." }), children: _jsx(FeedbackForm, {}) })] })] }));
}
