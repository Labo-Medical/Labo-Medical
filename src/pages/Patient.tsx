import { lazy, Suspense } from 'react';
import {
  MdAssignment,
  MdLocationOn,
  MdVisibility,
  MdHelpOutline,
} from 'react-icons/md';
import type { JSX } from 'react';
import { Helmet } from 'react-helmet-async';


// 💡 Lazy loading des composants lourds
const Faq = lazy(() => import('../components/Faq'));
const Resultats = lazy(() => import('../components/Resultat'));

type FeatureCard = {
  type: 'feature';
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: "'Montserrat', sans-serif",
    background: 'linear-gradient(180deg, #f8f9fb 0%, #ffffff 100%)',
    color: '#333',
    minHeight: '100vh',
  },
  hero: {
    textAlign: 'center' as const,
    marginBottom: '3rem',
  },
  heroTitle: {
    fontSize: '2.7rem',
    color: '#6E0B14',
    fontWeight: 700,
    marginBottom: '1rem',
    letterSpacing: '-0.5px',
  },
  heroText: {
    fontSize: '1.2rem',
    maxWidth: '720px',
    margin: '0 auto',
    color: '#444',
    lineHeight: 1.65,
  },
  section: {
    marginBottom: '3rem',
  },
  grid: {
    display: 'flex',
    flexWrap: 'nowrap' as const,
    gap: '1.5rem',
    overflowX: 'auto' as const,
    paddingBottom: '1rem',
    WebkitOverflowScrolling: 'touch' as const,
  },
  card: {
    background: '#ffffff',
    borderRadius: '1rem',
    boxShadow: '0 10px 28px rgba(0, 0, 0, 0.08)',
    padding: '1.5rem',
    width: '240px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    textAlign: 'center' as const,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    textDecoration: 'none',
    color: 'inherit',
  },
  cardHover: {
    transform: 'translateY(-6px)',
    boxShadow: '0 14px 32px rgba(0, 0, 0, 0.12)',
  },
  iconWrapper: {
    marginBottom: '1.2rem',
    fontSize: '2.2rem',
    color: '#6E0B14',
  },
  cardTitle: {
    fontSize: '1.15rem',
    fontWeight: 600,
    color: '#6E0B14',
    marginBottom: '0.4rem',
  },
  cardText: {
    fontSize: '0.95rem',
    color: '#555',
    lineHeight: 1.5,
  },
};

const Card = ({ title, description, icon, link }: FeatureCard) => {
  return (
    <a
      href={link}
      aria-label={title}
      style={styles.card}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, styles.cardHover);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, {
          transform: 'none',
          boxShadow: styles.card.boxShadow,
        });
      }}
    >
      <div style={styles.iconWrapper}>{icon}</div>
      <h2 style={styles.cardTitle}>{title}</h2>
      <p style={styles.cardText}>{description}</p>
    </a>
  );
};

export default function Patient() {
  const features: FeatureCard[] = [
    {
      type: 'feature',
      title: 'Préparez votre visite',
      description:
        'Conseils pratiques pour préparer vos examens et faciliter vos démarches au laboratoire.',
      icon: <MdAssignment size={28} color="#A9A9A9" />,
      link: '/prepavisite',
    },
    {
      type: 'feature',
      title: 'Trouvez votre laboratoire',
      description:
        'Un accès simplifié aux soins où que vous soyez, avec un service de proximité.',
      icon: <MdLocationOn size={28} color="#A9A9A9" />,
      link: '/contact',
    },
    {
      type: 'feature',
      title: 'Accédez à vos résultats',
      description:
        'Consultez vos analyses rapidement et en toute sécurité, depuis chez vous.',
      icon: <MdVisibility size={28} color="#A9A9A9" />,
      link: '/resultat',
    },
    {
      type: 'feature',
      title: 'Foire aux questions',
      description:
        'Une réponse claire à chaque interrogation : explorez notre FAQ complète.',
      icon: <MdHelpOutline size={28} color="#A9A9A9" />,
      link: '/faq',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Espace Patient - Les Laboratoires Zeroual</title>
        <meta
          name="description"
          content="Organisez votre visite, accédez à vos résultats d’analyse, et trouvez toutes les informations utiles pour votre parcours patient."
        />
        <meta property="og:title" content="Espace Patient - Les Laboratoires Zeroual" />
        <meta
          property="og:description"
          content="Tout ce qu’il vous faut pour naviguer sereinement dans vos démarches médicales."
        />
        <meta property="og:image" content="/logo.jpg" />
      </Helmet>

      <main style={styles.container}>
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>Bienvenue sur Espace Patient</h1>
          <p style={styles.heroText}>
            Tout ce qu’il vous faut pour organiser votre visite, accéder à vos analyses et naviguer plus sereinement dans vos démarches médicales.
          </p>
        </section>

        <section style={styles.section}>
          <div style={styles.grid}>
            {features.map((feature, index) => (
              <Card key={index} {...feature} />
            ))}
          </div>
        </section>

        {/* 💡 Composants chargés dynamiquement */}
        <Suspense fallback={<div>Chargement des résultats...</div>}>
          <Resultats />
        </Suspense>

        <Suspense fallback={<div>Chargement de la FAQ...</div>}>
          <Faq />
        </Suspense>
      </main>
    </>
  );
}
