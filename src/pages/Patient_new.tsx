import { lazy, Suspense } from 'react';
import {
  MdAssignment,
  MdLocationOn,
  MdVisibility,
  MdHelpOutline,
} from 'react-icons/md';
import type { JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';


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
  const { t } = useTranslation();
  const features: FeatureCard[] = [
    {
      type: 'feature',
      title: t('pages.patient.features.prepare_visit.title'),
      description: t('pages.patient.features.prepare_visit.description'),
      icon: <MdAssignment size={28} color="#A9A9A9" />,
      link: '/prepavisite',
    },
    {
      type: 'feature',
      title: t('pages.patient.features.find_lab.title'),
      description: t('pages.patient.features.find_lab.description'),
      icon: <MdLocationOn size={28} color="#A9A9A9" />,
      link: '/contact',
    },
    {
      type: 'feature',
      title: t('pages.patient.features.access_results.title'),
      description: t('pages.patient.features.access_results.description'),
      icon: <MdVisibility size={28} color="#A9A9A9" />,
      link: '/resultat',
    },
    {
      type: 'feature',
      title: t('pages.patient.features.faq.title'),
      description: t('pages.patient.features.faq.description'),
      icon: <MdHelpOutline size={28} color="#A9A9A9" />,
      link: '/faq',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('pages.patient.title')}</title>
        <meta
          name="description"
          content={t('pages.patient.description')}
        />
        <meta property="og:title" content={t('pages.patient.title')} />
        <meta
          property="og:description"
          content={t('pages.patient.og_description')}
        />
        <meta property="og:image" content="/logo.jpg" />
      </Helmet>

      <main style={styles.container}>
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>{t('pages.patient.welcome')}</h1>
          <p style={styles.heroText}>
            {t('pages.patient.hero_text')}
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
        <Suspense fallback={<div>{t('pages.patient.loading_results')}</div>}>
          <Resultats />
        </Suspense>

        <Suspense fallback={<div>{t('pages.patient.loading_faq')}</div>}>
          <Faq />
        </Suspense>
      </main>
    </>
  );
}
