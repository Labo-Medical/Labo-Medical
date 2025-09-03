import { useEffect, useState } from 'react';
import { fetchPayloadChiffres, type ChiffresPayload } from '../services/payloadApi';
import { FaMicroscope, FaMapMarkerAlt, FaChartPie, FaCogs } from 'react-icons/fa';

const fallbackData: ChiffresPayload = {
  title: "En chiffres",
  stats: [
    { label: "Examens spécialisés/semaines", value: "300" },
    { label: "Laboratoires", value: "03" },
    { label: "Interventions", value: "15%" },
    { label: "Plateau technique", value: "01" },
  ],
};

export default function Chiffres() {
  const [data, setData] = useState<ChiffresPayload>(fallbackData);

  useEffect(() => {
    // Temporarily disabled to fix rendering issues
    // fetchPayloadChiffres()
    //   .then((remoteData) => {
    //     if (remoteData) setData(remoteData);
    //   })
    //   .catch(() => {
    //     console.warn('PayloadCMS indisponible, fallback utilisé.');
    //   });
  }, []);

  return (
    <section style={{
      marginBottom: "3rem",
      textAlign: "center"
    }}>
      <h2 style={{
        color: "#515557",
        fontWeight: 600,
        fontSize: "2.2rem",
        marginBottom: "1.5rem",
        textAlign: "center",
        borderBottom: "3px solid #7b1e3b",
        paddingBottom: "0.3rem"
      }}>
        {data.title}
      </h2>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "center"
      }}>
        {data.stats.map((s, idx) => {
          const icon =
            idx === 0 ? <FaMicroscope /> :
            idx === 1 ? <FaMapMarkerAlt /> :
            idx === 2 ? <FaChartPie /> :
            <FaCogs />;
          return (
            <div key={idx} style={{
              background: "#fff",
              borderRadius: "1rem",
              boxShadow: "0 8px 30px rgba(123, 30, 59, 0.1)",
              padding: "2rem 1.5rem",
              maxWidth: "140px",
              flex: "1 1 140px",
              textAlign: "center",
              transition: "transform 0.25s ease",
              cursor: "default"
            }}>
              <div style={{
                color: "#7b1e3b",
                fontSize: "2.8rem",
                marginBottom: "0.7rem"
              }}>
                {icon}
              </div>
              <div style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#222"
              }}>
                {s.value}
              </div>
              <div style={{
                color: "#7b1e3b",
                fontWeight: 700,
                marginTop: "0.2rem",
                fontSize: "0.9rem"
              }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
