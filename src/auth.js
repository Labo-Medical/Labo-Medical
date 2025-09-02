// src/auth.ts
/// <reference types="vite/client" />
export async function login(email, password) {
    const apiUrl = import.meta.env.VITE_PAYLOAD_URL ||
        'http://leslaboratoireszeroual.ma/api';
    const response = await fetch(`${apiUrl}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        throw new Error("Connexion échouée");
    }
    const data = await response.json();
    // Stockage du JWT dans localStorage
    localStorage.setItem("authToken", data.token);
    return data.user;
}
export function isAuthenticated() {
    return !!localStorage.getItem("authToken");
}
export function logout() {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
}
