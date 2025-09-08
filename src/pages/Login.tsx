import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { login } from "../auth"; // ton auth.ts

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password); // appel auth.ts
      setLoading(false);
      window.location.href = "/pageresultats"; // redirection après succès
    } catch (err) {
      console.error(err);
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#800000" }}>{t('pages.login.title')}</h2>

      {error && <p style={{ color: "#333", textAlign: "center" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ color: "#333" }}>{t('pages.login.email')}</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ccc", color: "#333" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ color: "#333" }}>{t('pages.login.password')}</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ccc", color: "#333" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
