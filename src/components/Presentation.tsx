import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchPayloadPresentation, type PresentationData } from '../services/payloadApi2';

const getFallbackData = (t: (key: string) => string): PresentationData => ({
  title: t('presentation.title'),
  paragraphs: [
    t('presentation.paragraph1'),
    t('presentation.paragraph2'),
    t('presentation.paragraph3'),
    t('presentation.paragraph4'),
    t('presentation.paragraph5'),
    t('presentation.paragraph6'),
  ],
});

export default function Presentation() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<PresentationData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const remoteData = await fetchPayloadPresentation();
        if (remoteData) {
          setData(remoteData);
        } else {
          setData(getFallbackData(t));
        }
      } catch {
        console.warn('PayloadCMS indisponible, fallback utilisé.');
        setData(getFallbackData(t));
      }
    };

    loadData();
  }, [i18n.language, t]);

  if (!data) {
    return <div>{t('common.loading')}</div>;
  }

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
