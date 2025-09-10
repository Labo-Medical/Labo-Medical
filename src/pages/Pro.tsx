import {
  MdAssignment,
  MdLocationOn,
  MdVisibility,
  MdHelpOutline,
} from "react-icons/md";
import { lazy, Suspense, type JSX } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';

// ✅ Lazy loading du composant Propage
const Propage = lazy(() => import("../components/Propage"));

type FeatureCard = {
  type: "feature";
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
};

type EquipmentCard = {
  type: "equipment";
  name: string;
  description: string;
  image: string;
};

type CardProps = FeatureCard | EquipmentCard;

const styles = {
  card: {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.07)",
    padding: "1.5rem",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center" as const,
    margin: "0.5rem",
    width: "180px",
    flexShrink: 0,
  },
  feature: {},
  equipment: {
    borderLeft: "5px solid #6e0b14",
  },
  iconWrapper: {
    marginBottom: "1rem",
    fontSize: "2rem",
    color: "#6e0b14",
  },
  image: {
    height: "64px",
    objectFit: "contain" as const,
  },
  title: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#6e0b14",
    marginBottom: "0.5rem",
  },
  description: {
    fontSize: "0.9rem",
    color: "#444",
    lineHeight: 1.4,
  },
  link: {
    marginTop: "1rem",
    color: "#1e56b3",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "0.85rem",
  },
};

const Card = (props: CardProps) => {
  const isFeature = props.type === "feature";
  return (
    <div
      style={{
        ...styles.card,
        ...(isFeature ? styles.feature : styles.equipment),
      }}
    >
      <div style={styles.iconWrapper}>
        {isFeature ? props.icon : (
          <img src={props.image} alt={props.name} style={styles.image} />
        )}
      </div>
      <h2 style={styles.title}>{isFeature ? props.title : props.name}</h2>
      <p style={styles.description}>{props.description}</p>
      {"link" in props && (
        <a style={styles.link} href={props.link}>
          En savoir plus →
        </a>
      )}
    </div>
  );
};



export default function ProPage() {
  const { t } = useTranslation();
  const features: FeatureCard[] = [
    {
      type: "feature",
      title: t('pages.pro.features.recommendations.title'),
      description: t('pages.pro.features.recommendations.description'),
      icon: <MdAssignment size={26} color="#A9A9A9" />,
      link: "/propage",
    },
    {
      type: "feature",
      title: t('pages.pro.features.sampling.title'),
      description: t('pages.pro.features.sampling.description'),
      icon: <MdLocationOn size={26} color="#A9A9A9" />,
      link: "/propage",
    },
    {
      type: "feature",
      title: t('pages.pro.features.central_purchase.title'),
      description: t('pages.pro.features.central_purchase.description'),
      icon: <MdVisibility size={26} color="#A9A9A9" />,
      link: "/propage",
    },
    {
      type: "feature",
      title: t('pages.pro.features.documents.title'),
      description: t('pages.pro.features.documents.description'),
      icon: <MdHelpOutline size={26} color="#A9A9A9" />,
      link: "/propage",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('pages.pro.title')}</title>
        <meta
          name="description"
          content={t('pages.pro.og_description')}
        />
        <meta property="og:title" content={t('pages.pro.title')} />
        <meta
          property="og:description"
          content={t('pages.pro.og_description')}
        />
        <meta property="og:image" content="/logo.jpg" />
      </Helmet>

      <main
        style={{
          padding: "2rem",
          fontFamily: "'Montserrat', sans-serif",
          background: "#f8f9fb",
        }}
      >
        <section style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2.2rem", color: "#6e0b14", fontWeight: 700 }}>
            {t('pages.patient.welcome')}
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "#555",
              maxWidth: "600px",
              margin: "0.8rem auto 0",
              lineHeight: 1.5,
            }}
          >
            {t('pages.pro.description')}
          </p>
        </section>

        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            paddingBottom: "1rem",
          }}
        >
          {features.map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </section>

        {/* 💡 Chargement différé du bloc Propage */}
        <Suspense fallback={<div>{t('pages.pro.loading_resources')}</div>}>
          <Propage />
        </Suspense>
      </main>
    </>
  );
}
