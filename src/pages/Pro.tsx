import {
  MdAssignment,
  MdLocationOn,
  MdVisibility,
  MdHelpOutline,
} from "react-icons/md";
import { useState, lazy, Suspense, type JSX } from "react";
import { Helmet } from "react-helmet-async";

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
  const features: FeatureCard[] = [
    {
      type: "feature",
      title: "Récommandations pré-analytiques",
      description: "Préparer vos examens de manière optimale.",
      icon: <MdAssignment size={26} color="#A9A9A9" />,
      link: "/propage",
    },
    {
      type: "feature",
      title: "Prélèvements",
      description: "Accès aux soins simplifié partout.",
      icon: <MdLocationOn size={26} color="#A9A9A9" />,
      link: "/propage",
    },
    {
      type: "feature",
      title: "Centrales d'achats",
      description: "Centrales d'achats pour les professionnels.",
      icon: <MdVisibility size={26} color="#A9A9A9" />,
      link: "/propage",
    },
    {
      type: "feature",
      title: "Documentation",
      description: "Des documents indispensables.",
      icon: <MdHelpOutline size={26} color="#A9A9A9" />,
      link: "/propage",
    },
  ];

  const [description] = useState<string>(
    "Médecins, infirmiers, sages-femmes — accédez à vos outils et ressources dédiés."
  );

  return (
    <>
      <Helmet>
        <title>Espace Pros - Laboratoires Zeroual</title>
        <meta
          name="description"
          content="Accédez aux outils, ressources et documentations dédiées aux professionnels de santé chez Laboratoires Zeroual."
        />
        <meta property="og:title" content="Espace Pros - Laboratoires Zeroual" />
        <meta
          property="og:description"
          content="Médecins, infirmiers, sages-femmes — Retrouvez toutes les ressources pour faciliter vos démarches professionnelles."
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
            Bienvenue sur Espace Pros
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
            {description}
          </p>
        </section>

        <section
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
            paddingBottom: "1rem",
          }}
        >
          {features.map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </section>

        {/* 💡 Chargement différé du bloc Propage */}
        <Suspense fallback={<div>Chargement des ressources professionnelles...</div>}>
          <Propage />
        </Suspense>
      </main>
    </>
  );
}
