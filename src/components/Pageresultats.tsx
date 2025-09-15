import { useEffect, useState, CSSProperties } from "react";
import { isAuthenticated, logout } from "../auth";
import { fetchPageResultats, PageresultatPayload } from "../services/payloadApi";

type User = {
  email: string;
  role: string;
};

export default function PageResultats() {
  const [user, setUser] = useState<User | null>(null);
  const [modules, setModules] = useState<PageresultatPayload[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token || !user) return;

    fetchPageResultats(token)
      .then(setModules)
      .catch(() => setError("Impossible de charger les modules depuis Payload CMS"));
  }, [user]);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Modules de Résultats</h1>
        {user && (
          <div>
            <span style={{ color: "#800000", fontWeight: "bold" }}>
              Bienvenue {user.email}
            </span>{" "}
            <span style={{ color: "#800000", fontWeight: "bold" }}>
              ({user.role})
            </span>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Déconnexion
            </button>
          </div>
        )}
      </header>

      {error && <div style={styles.error}>{error}</div>}

      <section style={styles.modulesGrid}>
        {modules.map((mod) => (
          <div
            key={mod.id}
            style={styles.labModule}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                styles.labModuleHover.boxShadow!)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "none")
            }
          >
            <h2>{mod.titre}</h2>
            <p>{mod.description}</p>
            <a
              href={mod.urlAcces}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.accessButton}
            >
              Accéder à l’application du labo
            </a>
          </div>
        ))}
      </section>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
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
    cursor: "default",
    transition: "box-shadow 0.3s ease",
  },
  labModuleHover: {
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  accessButton: {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#800000",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
};
