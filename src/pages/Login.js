import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { login } from "../auth"; // ton auth.ts
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email, password); // appel auth.ts
            setLoading(false);
            window.location.href = "/pageresultats"; // redirection après succès
        }
        catch (err) {
            console.error(err);
            setError("Email ou mot de passe incorrect.");
            setLoading(false);
        }
    }
    return (_jsxs("div", { style: { maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }, children: [_jsx("h2", { style: { textAlign: "center", marginBottom: "20px", color: "#800000" }, children: "Connexion" }), error && _jsx("p", { style: { color: "#333", textAlign: "center" }, children: error }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { style: { marginBottom: "15px" }, children: [_jsx("label", { htmlFor: "email", style: { color: "#333" }, children: "Email" }), _jsx("input", { id: "email", type: "email", value: email, onChange: e => setEmail(e.target.value), required: true, style: { width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ccc", color: "#333" } })] }), _jsxs("div", { style: { marginBottom: "15px" }, children: [_jsx("label", { htmlFor: "password", style: { color: "#333" }, children: "Mot de passe" }), _jsx("input", { id: "password", type: "password", value: password, onChange: e => setPassword(e.target.value), required: true, style: { width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ccc", color: "#333" } })] }), _jsx("button", { type: "submit", disabled: loading, style: {
                            width: "100%",
                            padding: "10px",
                            borderRadius: "6px",
                            border: "none",
                            backgroundColor: "#007bff",
                            color: "white",
                            cursor: loading ? "not-allowed" : "pointer"
                        }, children: loading ? "Connexion..." : "Se connecter" })] })] }));
}
