import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchPayloadValeurs } from '../services/payloadApi';

type ValeurItem = {
  title: string;
  text: string;
  icon: string;
};

const fallbackValeurs: ValeurItem[] = [
  {
    title: 'Qualité & Recherche Biomédicale',
    text: 'Technologies avancées et amélioration continue.',
    icon: '/icons/quality.svg',
  },
  {
    title: 'Services & Proximité',
    text: 'Accueil personnalisé et maillage territorial efficace.',
    icon: '/icons/proximity.svg',
  },
  {
    title: 'Compétence & Réseautage',
    text: "Un esprit d’équipe fort et une expertise rigoureuse.",
    icon: '/icons/skills.svg',
  },
  {
    title: 'Impartialité & Confidentialité',
    text: 'Éthique, confiance et relations humaines solides.',
    icon: '/icons/respect.svg',
  },
];

export default function Valeur() {
  const { t } = useTranslation();
  const [valeurs, setValeurs] = useState<ValeurItem[]>(fallbackValeurs);

  useEffect(() => {
    fetchPayloadValeurs()
      .then((data) => {
        if (data && data.length > 0) {
          const merged = fallbackValeurs.map((fallback, index) => ({
            ...fallback,
            title: data[index]?.title || fallback.title,
            text: data[index]?.text || fallback.text,
            icon: data[index]?.icon || fallback.icon,
          }));
          setValeurs(merged);
        }
      })
      .catch(() => setValeurs(fallbackValeurs));
  }, []);

  return (
    <main style={{ padding: '2rem 1rem', backgroundColor: '#fff' }}>
      <section style={{ textAlign: 'center', margin: '0 auto', maxWidth: '1200px' }}>
        <h2
          style={{
            color: '#7b1621',
            fontSize: '1.8rem',
            marginBottom: '2rem',
            fontWeight: 700,
          }}
        >
          {t('values.title')}
        </h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            gap: '1.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
          }}
        >
          {valeurs.map((valeur, index) => (
            <div
              key={index}
              style={{
                width: '200px',
                textAlign: 'center',
                padding: '1rem',
                borderRadius: '10px',
                background: '#fafafa',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                flexShrink: 0,
              }}
            >
              <h3
                style={{
                  color: '#515557',
                  fontSize: '1.05rem',
                  marginBottom: '1rem',
                }}
              >
                {valeur.title}
              </h3>
              <img
                src={valeur.icon}
                alt={valeur.title}
                style={{
                  width: '64px',
                  height: '64px',
                  marginBottom: '1rem',
                  transition: 'transform 0.2s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.12)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
              />
              <p
                style={{
                  color: '#333',
                  fontSize: '0.95rem',
                  lineHeight: 1.4,
                }}
              >
                {valeur.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
