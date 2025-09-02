import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fetchPayloadLabKawassimPage } from "../services/payloadApi";
const fallbackData = {
    doctor: {
        name: "Dr. LAHLOU TAOUFIK",
        photo: { url: "/fond/sar1.svg" },
        description: "Spécialiste en biologie médicale.",
    },
    contact: {
        title: "Laboratoire médicale Zeroual Kawassim",
        address: "Magasin N°60, Complexe Kawassim Tranche N°7, Al Moujahidin, Tanger 90000",
        email: "kawassimlab@leslaboratoireszeroual.ma",
        phone: "05 39 38 35 57",
        whatsapp: "06 44 38 82 86",
        hours: "7j/7 - 24h/24",
    },
    slides: [
        { url: "/plateau/kawa1.webp", alt: "Laboratoire" },
        { url: "/plateau/13.jpg", alt: "Accueil" },
        { url: "/plateau/6.jpg", alt: "Matériel médical" },
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1001.1453528905728!2d-5.8576189329771955!3d35.765846272560026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b87cbd2eb0c01%3A0xf6b13ada8a580187!2sLaboratoire%20Zeroual%20Kawassim!5e1!3m2!1sfr!2sma!4v1749252246161!5m2!1sfr!2sma",
};
export default function LaboratoireKawassimPage() {
    const [data, setData] = useState(fallbackData);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        fetchPayloadLabKawassimPage()
            .then((d) => {
            if (d)
                setData(d);
        })
            .catch(() => {
            console.warn("PayloadCMS indisponible, fallback utilisé.");
        });
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % data.slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [data.slides]);
    return (_jsxs("div", { style: {
            paddingTop: 20,
            backgroundColor: "#fdfdfd",
            color: "#333",
            fontFamily: '"Segoe UI", sans-serif',
        }, className: "lab-container", children: [_jsxs("div", { style: {
                    display: "grid",
                    gridTemplateColumns: "2fr 3fr",
                    gridTemplateRows: "auto auto",
                    gap: "1rem",
                    padding: "0.5rem 1rem",
                }, className: "lab-grid", children: [_jsxs("section", { style: {
                            background: "linear-gradient(135deg, #ffffff, #f0f0f0)",
                            padding: "1.5rem",
                            borderRadius: "12px",
                            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.08)",
                            textAlign: "center",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            gridRow: "span 2",
                        }, className: "doctor-presentation", onMouseEnter: (e) => {
                            const el = e.currentTarget;
                            el.style.transform = "scale(1.02)";
                            el.style.boxShadow = "0 8px 18px rgba(0, 0, 0, 0.12)";
                        }, onMouseLeave: (e) => {
                            const el = e.currentTarget;
                            el.style.transform = "none";
                            el.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.08)";
                        }, children: [_jsx("img", { src: data.doctor.photo.url, alt: data.doctor.name, style: {
                                    width: "140px",
                                    height: "140px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "3px solid #800000",
                                    marginBottom: "1rem",
                                } }), _jsx("h2", { style: {
                                    margin: "0.5rem 0 0.4rem",
                                    fontSize: "1.6rem",
                                    color: "#800000",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.6px",
                                }, children: data.doctor.name }), _jsx("p", { style: {
                                    fontSize: "0.95rem",
                                    lineHeight: 1.4,
                                    color: "#555",
                                    margin: 0,
                                }, children: data.doctor.description })] }), _jsxs("section", { style: {
                            backgroundColor: "#f9f9f9",
                            padding: "0.5rem 0.8rem",
                            borderRadius: "10px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                            marginBottom: "0.2rem",
                        }, className: "contact-info", children: [_jsx("h2", { style: { color: "#800000", marginBottom: "0.6rem", fontSize: "1.2rem" }, children: data.contact.title }), _jsxs("p", { style: { margin: "0.2rem 0", color: "#444", fontSize: "0.92rem" }, children: ["Adresse : ", data.contact.address] }), _jsxs("p", { style: { margin: "0.2rem 0", color: "#444", fontSize: "0.92rem" }, children: ["Email : ", data.contact.email] }), _jsxs("p", { style: { margin: "0.2rem 0", color: "#444", fontSize: "0.92rem" }, children: ["Fixe : ", data.contact.phone] }), _jsxs("p", { style: { margin: "0.2rem 0", color: "#444", fontSize: "0.92rem" }, children: ["WhatsApp : ", data.contact.whatsapp] }), _jsxs("p", { style: { margin: "0.2rem 0", color: "#444", fontSize: "0.92rem" }, children: ["Horaires : ", data.contact.hours] })] }), _jsx("section", { style: {
                            position: "relative",
                            width: "100%",
                            maxWidth: "660px",
                            height: "330px",
                            margin: "0 auto",
                            overflow: "hidden",
                            borderRadius: "16px",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
                        }, className: "lab-slider", children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { className: "slide", initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 }, transition: { duration: 0.8 }, style: {
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                }, children: _jsx("img", { src: data.slides[index].url, alt: data.slides[index].alt, style: {
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "16px",
                                    } }) }, data.slides[index].url) }) })] }), _jsxs("section", { style: { padding: "1.5rem 2rem" }, className: "lab-map", children: [_jsx("h2", { style: { marginBottom: "1rem", color: "#800000", fontSize: "1.3rem" }, children: "Localisation" }), _jsx("iframe", { src: data.mapEmbedUrl, width: "100%", height: "300", style: { border: 0, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }, allowFullScreen: true, loading: "lazy", title: "Localisation du laboratoire Kawassim", referrerPolicy: "no-referrer-when-downgrade" })] })] }));
}
