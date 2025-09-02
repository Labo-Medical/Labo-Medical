import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MdAssignment, MdLocationOn, MdVisibility, MdHelpOutline, } from "react-icons/md";
import { useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
// ✅ Lazy loading du composant Propage
const Propage = lazy(() => import("../components/Propage"));
const styles = {
    card: {
        background: "#fff",
        borderRadius: "1rem",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.07)",
        padding: "1.5rem",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        margin: "0.5rem",
        width: "180px",
        flexShrink: 0,
    },
    feature: {},
    equipment: {
        borderLeft: "5px solid #6e0b14",
    },
    iconWrapper: {
        marginBottom: "1rem",
        fontSize: "2rem",
        color: "#6e0b14",
    },
    image: {
        height: "64px",
        objectFit: "contain",
    },
    title: {
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "#6e0b14",
        marginBottom: "0.5rem",
    },
    description: {
        fontSize: "0.9rem",
        color: "#444",
        lineHeight: 1.4,
    },
    link: {
        marginTop: "1rem",
        color: "#1e56b3",
        textDecoration: "none",
        fontWeight: 500,
        fontSize: "0.85rem",
    },
};
const Card = (props) => {
    const isFeature = props.type === "feature";
    return (_jsxs("div", { style: {
            ...styles.card,
            ...(isFeature ? styles.feature : styles.equipment),
        }, children: [_jsx("div", { style: styles.iconWrapper, children: isFeature ? props.icon : (_jsx("img", { src: props.image, alt: props.name, style: styles.image })) }), _jsx("h2", { style: styles.title, children: isFeature ? props.title : props.name }), _jsx("p", { style: styles.description, children: props.description }), "link" in props && (_jsx("a", { style: styles.link, href: props.link, children: "En savoir plus \u2192" }))] }));
};
export default function ProPage() {
    const features = [
        {
            type: "feature",
            title: "Récommandations pré-analytiques",
            description: "Préparer vos examens de manière optimale.",
            icon: _jsx(MdAssignment, { size: 26, color: "#A9A9A9" }),
            link: "/propage",
        },
        {
            type: "feature",
            title: "Prélèvements",
            description: "Accès aux soins simplifié partout.",
            icon: _jsx(MdLocationOn, { size: 26, color: "#A9A9A9" }),
            link: "/propage",
        },
        {
            type: "feature",
            title: "Centrales d'achats",
            description: "Centrales d'achats pour les professionnels.",
            icon: _jsx(MdVisibility, { size: 26, color: "#A9A9A9" }),
            link: "/propage",
        },
        {
            type: "feature",
            title: "Documentation",
            description: "Des documents indispensables.",
            icon: _jsx(MdHelpOutline, { size: 26, color: "#A9A9A9" }),
            link: "/propage",
        },
    ];
    const [description] = useState("Médecins, infirmiers, sages-femmes — accédez à vos outils et ressources dédiés.");
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Espace Pros - Laboratoires Zeroual" }), _jsx("meta", { name: "description", content: "Acc\u00E9dez aux outils, ressources et documentations d\u00E9di\u00E9es aux professionnels de sant\u00E9 chez Laboratoires Zeroual." }), _jsx("meta", { property: "og:title", content: "Espace Pros - Laboratoires Zeroual" }), _jsx("meta", { property: "og:description", content: "M\u00E9decins, infirmiers, sages-femmes \u2014 Retrouvez toutes les ressources pour faciliter vos d\u00E9marches professionnelles." }), _jsx("meta", { property: "og:image", content: "/logo.jpg" })] }), _jsxs("main", { style: {
                    padding: "2rem",
                    fontFamily: "'Montserrat', sans-serif",
                    background: "#f8f9fb",
                }, children: [_jsxs("section", { style: { textAlign: "center", marginBottom: "2rem" }, children: [_jsx("h1", { style: { fontSize: "2.2rem", color: "#6e0b14", fontWeight: 700 }, children: "Bienvenue sur Espace Pros" }), _jsx("p", { style: {
                                    fontSize: "1rem",
                                    color: "#555",
                                    maxWidth: "600px",
                                    margin: "0.8rem auto 0",
                                    lineHeight: 1.5,
                                }, children: description })] }), _jsx("section", { style: {
                            display: "flex",
                            flexWrap: "nowrap",
                            overflowX: "auto",
                            paddingBottom: "1rem",
                        }, children: features.map((item, i) => (_jsx(Card, { ...item }, i))) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Chargement des ressources professionnelles..." }), children: _jsx(Propage, {}) })] })] }));
}
