import { useEffect, useState, CSSProperties } from "react";
import { isAuthenticated, logout } from "../auth";
import {
  fetchLabs,
  // fetchResultatsByLab, // Remove this line if not exported
  type LabConfig,
} from "../services/payloadApi";
// Import the correct function if it has a different name, for example:
// import { fetchResultsByLab as fetchResultatsByLab } from "../services/payloadApi";
// import { fetchResultatsByLab } from "../services/payloadApi";

type User = {
  email: string;
  role: string;
};

type ResultatPayload = {
  id: string;
  patient: string;
  date: string;
  valeurs: string;
};
export default function PageResultats() {
  const [user, setUser] = useState<User | null>(null);
  const [labs, setLabs] = useState<LabConfig[]>([]);
  const [selectedLabId, setSelectedLabId] = useState<string | null>(null);
  const [labResults, setLabResults] = useState<ResultatPayload[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Vérifie l'auth au montage
  useEffect(() => {
    if (isAuthenticated()) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  // Charge les labos depuis PayloadCMS
  useEffect(() => {
    fetchLabs()
      .then(setLabs)
      .catch(() => setError("Impossible de charger les labos depuis CMS"));
  }, []);

  const handleModuleClick = async (lab: LabConfig) => {
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
    } catch (e) {
      setError("Erreur lors du chargement des résultats.");
      setLabResults([]);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Résultats Patients</h1>
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

      {/* Liste des modules labo */}
      <section style={styles.modulesGrid}>
        {labs.map((lab) => (
          <div
            key={lab.labId}
            style={styles.labModule}
            onClick={() => handleModuleClick(lab)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                styles.labModuleHover.boxShadow!)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "none")
            }
          >
            <h2>{lab.name}</h2>
            <p>{lab.description}</p>
            <button style={styles.accessButton}>Accéder au module</button>
          </div>
        ))}
      </section>

      {/* Résultats affichés */}
      {selectedLabId && (
        <section style={styles.resultsSection}>
          <h2>Résultats – {selectedLabId}</h2>
          {labResults.length > 0 ? (
            <ul>
              {labResults.map((r) => (
                <li key={r.id}>
                  {r.patient} – {r.date} – {r.valeurs}
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun résultat trouvé pour ce module.</p>
          )}
        </section>
      )}
    </div>
  );
}

//
// Styles
//
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
async function fetchResultatsByLab(apiUrl: string, token: string): Promise<ResultatPayload[]> {
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

