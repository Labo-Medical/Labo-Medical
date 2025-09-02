import { useEffect, useState } from 'react';
import { fetchPayloadHistorique, type HistoriquePayload } from '../services/payloadApi';

const fallbackData: Required<HistoriquePayload> = {
  title: "Une plus grande couverture de la population au niveau local.",
  paragraphs: [
    "Ce réseau de proximité a pour ambition de mettre en place une biologie médicale indépendante,",
    "de qualité et d’innovation pour la santé et le bien vivre des patients.",
  ],
  history: [
    { year: "2023", title: "Année de création", text: "Réseau LES LABORATOIRES ZEROUAL" },
    { year: "2023", title: "1er laboratoire du réseau", text: "Premier laboratoire du réseau à Kawassim" },
    { year: "2024", title: "Deuxième laboratoire du réseau", text: "Deuxième laboratoire du réseau à Souani." },
    { year: "2025", title: "Troisième laboratoire du réseau", text: "Troisième laboratoire du réseau à Charf." },
  ],
};

export default function Historique() {
  const [data, setData] = useState<Required<HistoriquePayload>>(fallbackData);

  useEffect(() => {
    fetchPayloadHistorique()
      .then((remoteData) => {
        if (remoteData?.title && remoteData?.paragraphs && remoteData?.history) {
          setData({
            title: remoteData.title,
            paragraphs: remoteData.paragraphs,
            history: remoteData.history,
          });
        }
      })
      .catch(() => {
        console.warn('PayloadCMS indisponible, fallback utilisé.');
      });
  }, []);

  return (
    <section style={{
      position: "relative",
      marginBottom: "3rem",
      padding: "2rem 1rem 3rem",
      background: "#fff",
      borderRadius: "1rem",
      boxShadow: "0 8px 30px rgba(123, 30, 59, 0.1)",
    }}>
      <h2 style={{
        color: "#800020",
        fontWeight: 600,
        fontSize: "2.2rem",
        marginBottom: "1.5rem",
        textAlign: "center",
        borderBottom: "3px solid #7b1e3b",
        paddingBottom: "0.3rem"
      }}>
        {data.title}
      </h2>

      {data.paragraphs.map((p, idx) => (
        <p key={idx} style={{
          marginBottom: "1rem",
          color: "#000",
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center"
        }}>
          {p}
        </p>
      ))}

      <div style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        paddingTop: "3rem"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "300px",
          backgroundImage: "url('/pattern/tanger.jpg')",
          backgroundSize: "contain",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          opacity: 0.52,
          pointerEvents: "none",
          borderRadius: "1rem",
          filter: "grayscale(80%) brightness(1.1)",
          zIndex: 1
        }} />

        <div style={{
          position: "relative",
          display: "flex",
          gap: "2rem",
          flexWrap: "nowrap",
          overflowX: "auto",
          padding: "1rem 0",
          zIndex: 2,
          scrollbarWidth: "thin",
          scrollbarColor: "#7b1e3b transparent"
        }}>
          {data.history.map((h, idx) => (
            <div key={idx} style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: "1rem",
              boxShadow: "0 6px 20px rgba(123, 30, 59, 0.15)",
              padding: "1rem 1.2rem",
              minWidth: "220px",
              flexShrink: 0,
              textAlign: "center",
              transition: "transform 0.3s ease",
              cursor: "default",
              color: "#000"
            }}>
              <span style={{
                color: "#800020",
                fontWeight: 700,
                fontSize: "1.4rem",
                marginBottom: "0.5rem",
                display: "block"
              }}>
                {h.year}
              </span>
              <strong>{h.title}</strong>
              <p>{h.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
