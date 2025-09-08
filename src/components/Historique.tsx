import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchPayloadHistorique, type HistoriquePayload } from '../services/payloadApi';

export default function Historique() {
  const { t } = useTranslation();

  const fallbackData: Required<HistoriquePayload> = {
    title: t('components.historique.title'),
    paragraphs: [
      t('components.historique.paragraphs[0]'),
      t('components.historique.paragraphs[1]'),
    ],
    history: [
      { 
        year: t('components.historique.history[0].year'), 
        title: t('components.historique.history[0].title'), 
        text: t('components.historique.history[0].text') 
      },
      { 
        year: t('components.historique.history[1].year'), 
        title: t('components.historique.history[1].title'), 
        text: t('components.historique.history[1].text') 
      },
      { 
        year: t('components.historique.history[2].year'), 
        title: t('components.historique.history[2].title'), 
        text: t('components.historique.history[2].text') 
      },
      { 
        year: t('components.historique.history[3].year'), 
        title: t('components.historique.history[3].title'), 
        text: t('components.historique.history[3].text') 
      },
    ],
  };

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
        setData(fallbackData); // Ensure fallback data is set with translations
      });
  }, [t]); // Add t as dependency to re-run when language changes

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
