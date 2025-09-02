import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './Contact.css';
import { useEffect, useState, lazy, Suspense } from 'react';
import { fetchPayloadLabs } from '../services/payloadApi2';
import { Helmet } from 'react-helmet-async';
import emailjs from 'emailjs-com';
const ContactForm = lazy(() => import('../components/ContactForm'));
const fallbackLabs = [
    { name: 'Kawacim', address: 'Magasin N°60, Complexe Kawassim Tranche N°7, Al Moujahidin, Tanger 90000', phone: '05 39 38 35 57' },
    { name: 'Souani', address: '43 hay, boulevard Anfa, Tanger 90000', phone: '05 39 33 63 20' },
    { name: 'Charf', address: '12 Rue Nationale, 59000 Charf', phone: '05 39 33 63 20' },
];
export default function Contact() {
    const [labs, setLabs] = useState(fallbackLabs);
    const [form, setForm] = useState({ name: '', email: '', laboratoire: '', message: '' });
    const [sent, setSent] = useState(false);
    const [filter, setFilter] = useState('');
    useEffect(() => {
        fetchPayloadLabs()
            .then((data) => {
            if (data.length > 0)
                setLabs(data);
            else
                setLabs(fallbackLabs);
        })
            .catch(() => setLabs(fallbackLabs));
    }, []);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleFilter = (e) => {
        setFilter(e.target.value);
        setForm({ ...form, laboratoire: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await emailjs.send('service_k9l97n8', // 🔁  ID EmailJS
            'template_7xfeibq', // 🔁  ID de template
            {
                name: form.name,
                email: form.email,
                laboratoire: form.laboratoire,
                message: form.message,
            }, '-x18GprKZj2ZDhbKR' // 🔁 clé publique EmailJS
            );
            console.log('✅ Email envoyé avec succès');
            setSent(true);
            setForm({ name: '', email: '', laboratoire: '', message: '' });
        }
        catch (error) {
            console.error('❌ Erreur lors de l’envoi :', error);
        }
    };
    const filteredLabs = filter ? labs.filter((lab) => lab.name === filter) : labs;
    const leftLabs = filteredLabs.slice(0, 2);
    const rightLabs = filteredLabs.slice(2, 4);
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Contact - Les Laboratoires Zeroual" }), _jsx("meta", { name: "description", content: "Contactez les Laboratoires Zeroual..." }), _jsx("meta", { property: "og:title", content: "Contact - Les Laboratoires Zeroual" }), _jsx("meta", { property: "og:description", content: "Formulaire de contact et informations..." }), _jsx("meta", { property: "og:image", content: "/logo.jpg" })] }), _jsxs("main", { className: "contact-bootstrap", children: [_jsx("h2", { className: "contact-page", children: "Formulaire de contact & Nos laboratoires m\u00E9dicaux" }), _jsx("h3", { children: "Contactez-nous par mail au contact@leslaboratoireszeroual.ma" }), _jsxs("div", { className: "contact-row", children: [_jsx(Suspense, { fallback: _jsx("div", { children: "Chargement du formulaire..." }), children: _jsx(ContactForm, { form: form, sent: sent, handleChange: handleChange, handleSubmit: handleSubmit, handleFilter: handleFilter }) }), _jsxs("div", { className: "contact-cards-double", children: [_jsx("div", { className: "contact-cards-col", children: leftLabs.map((lab) => (_jsxs("div", { className: "contact-card", children: [_jsx("h5", { children: lab.name }), _jsxs("p", { children: [lab.address, _jsx("br", {}), "T\u00E9l. ", lab.phone] })] }, lab.name))) }), _jsx("div", { className: "contact-cards-col", children: rightLabs.map((lab) => (_jsxs("div", { className: "contact-card", children: [_jsx("h5", { children: lab.name }), _jsxs("p", { children: [lab.address, _jsx("br", {}), "T\u00E9l. ", lab.phone] })] }, lab.name))) })] })] })] })] }));
}
