import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { isAuthenticated, logout } from "../auth";
import { fetchLabs, } from "../services/payloadApi";
export default function PageResultats() {
    const [user, setUser] = useState(null);
    const [labs, setLabs] = useState([]);
    const [selectedLabId, setSelectedLabId] = useState(null);
    const [labResults, setLabResults] = useState([]);
    const [error, setError] = useState(null);
    // Vérifie l'auth au montage
    useEffect(() => {
        if (isAuthenticated()) {
            const storedUser = localStorage.getItem("user");
            if (storedUser)
                setUser(JSON.parse(storedUser));
        }
    }, []);
    // Charge les labos depuis PayloadCMS
    useEffect(() => {
        fetchLabs()
            .then(setLabs)
            .catch(() => setError("Impossible de charger les labos depuis CMS"));
    }, []);
    const handleModuleClick = async (lab) => {
        const token = localStorage.getItem("authToken");
        if (!token || !user || user.role !== "admin") {
            setError("Accès refusé : seuls les administrateurs peuvent consulter.");
            return;
        }
        try {
            const results = await fetchResultatsByLab(lab.apiUrl, token);
            setLabResults(results);
            setSelectedLabId(lab.labId);
            setError(null);
        }
        catch (e) {
            setError("Erreur lors du chargement des résultats.");
            setLabResults([]);
        }
    };
    const handleLogout = () => {
        logout();
        setUser(null);
    };
    return (_jsxs("div", { style: styles.pageContainer, children: [_jsxs("header", { style: styles.header, children: [_jsx("h1", { style: styles.title, children: "R\u00E9sultats Patients" }), user && (_jsxs("div", { children: [_jsxs("span", { style: { color: "#800000", fontWeight: "bold" }, children: ["Bienvenue ", user.email] }), " ", _jsxs("span", { style: { color: "#800000", fontWeight: "bold" }, children: ["(", user.role, ")"] }), _jsx("button", { onClick: handleLogout, style: styles.logoutButton, children: "D\u00E9connexion" })] }))] }), error && _jsx("div", { style: styles.error, children: error }), _jsx("section", { style: styles.modulesGrid, children: labs.map((lab) => (_jsxs("div", { style: styles.labModule, onClick: () => handleModuleClick(lab), onMouseEnter: (e) => (e.currentTarget.style.boxShadow =
                        styles.labModuleHover.boxShadow), onMouseLeave: (e) => (e.currentTarget.style.boxShadow = "none"), children: [_jsx("h2", { children: lab.name }), _jsx("p", { children: lab.description }), _jsx("button", { style: styles.accessButton, children: "Acc\u00E9der au module" })] }, lab.labId))) }), selectedLabId && (_jsxs("section", { style: styles.resultsSection, children: [_jsxs("h2", { children: ["R\u00E9sultats \u2013 ", selectedLabId] }), labResults.length > 0 ? (_jsx("ul", { children: labResults.map((r) => (_jsxs("li", { children: [r.patient, " \u2013 ", r.date, " \u2013 ", r.valeurs] }, r.id))) })) : (_jsx("p", { children: "Aucun r\u00E9sultat trouv\u00E9 pour ce module." }))] }))] }));
}
//
// Styles
//
const styles = {
    pageContainer: {
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f9f9f9",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
    },
    title: {
        fontSize: "28px",
        color: "#333",
    },
    logoutButton: {
        marginLeft: "15px",
        padding: "5px 10px",
        cursor: "pointer",
    },
    error: {
        color: "red",
        marginBottom: "15px",
    },
    modulesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
    },
    labModule: {
        background: "#fff",
        padding: "15px",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease",
    },
    labModuleHover: {
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
    accessButton: {
        marginTop: "10px",
        padding: "8px 12px",
        backgroundColor: "#800000",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    resultsSection: {
        marginTop: "30px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
    },
};
async function fetchResultatsByLab(apiUrl, token) {
    const response = await fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des résultats.");
    }
    return response.json();
}
