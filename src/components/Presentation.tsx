import { useEffect, useState } from 'react';
import { fetchPayloadPresentation, type PresentationData } from '../services/payloadApi2';

const fallbackData: PresentationData = {
  title: "Présentation des Laboratoires Zeroual",
  paragraphs: [
    "Le réseau LES LABORATOIRES ZEROUAL est composé de 03 Laboratoires Médicaux sis à Kawassim, Souani et Charf. Le plateau technique principal se situe à Kawassim et 2 plateaux secondaires sont installés à Souani et à Charf, avec :",
    "- Un accueil personnalisé avec ou sans rendez-vous.",
    "- Une qualité technique et une compétence garantissant fiabilité et précision des résultats d’examens.",
    "- Un rendu rapide des résultats dans les délais annoncés, accessibles par internet.",
    "- Un dossier médical unique dans tous nos laboratoires.",
    "Le laboratoire Zeroual Kawassim s’est engagé dans une démarche d’accréditation selon la Norme NM ISO 15189.",
  ],
};

export default function Presentation() {
  const [data, setData] = useState<PresentationData>(fallbackData);

  useEffect(() => {
    fetchPayloadPresentation()
      .then((remoteData) => {
        if (remoteData) setData(remoteData);
      })
      .catch(() => {
        console.warn('PayloadCMS indisponible, fallback utilisé.');
      });
  }, []);

  return (
    <section style={{
      background: "#fff",
      padding: "3rem 1.5rem",
      borderRadius: "1rem",
      marginBottom: "3rem",
      boxShadow: "0 8px 30px rgba(123, 30, 59, 0.1)"
    }}>
      <h1 style={{
        color: "#7b1e3b",
        fontWeight: 700,
        fontSize: "2.8rem",
        marginBottom: "2rem",
        textAlign: "center"
      }}>
        {data.title}
      </h1>

      {data.paragraphs.map((p, idx) =>
        p.startsWith('-') ? (
          <li key={idx} style={{
            maxWidth: "1200px",
            margin: "0.8rem auto",
            fontSize: "1.1rem",
            color: "#444",
            listStyle: "disc inside"
          }}>
            {p.replace('-', '').trim()}
          </li>
        ) : (
          <p key={idx} style={{
            maxWidth: "1200px",
            margin: "0.8rem auto",
            fontSize: "1.1rem",
            color: "#444"
          }}>
            {p}
          </p>
        )
      )}
    </section>
  );
}
