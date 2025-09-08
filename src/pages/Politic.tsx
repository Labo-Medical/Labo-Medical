import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// 💡 Lazy loading du composant grille
const PoliticGrid = lazy(() => import('../components/PoliticGrid'));

const styles = {
  page: {
    padding: '2rem',
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: '#f9f9fb',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '2rem',
    color: '#6e0b14',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '2rem',
  },
};

export default function PoliticPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pages.politic.title')}</title>
        <meta
          name="description"
          content="Découvrez les politiques institutionnelles des Laboratoires Zeroual : RH, Qualité et Confidentialité, accessibles et téléchargeables."
        />
        <meta property="og:title" content={t('pages.politic.title')} />
        <meta
          property="og:description"
          content="Nos engagements formalisés à travers des documents officiels pour garantir qualité, éthique et confidentialité."
        />
        <meta property="og:image" content="/logo.jpg" />
      </Helmet>

      <main style={styles.page}>
        <h1 style={styles.title}>{t('pages.politic.heading')}</h1>
        <p style={styles.subtitle}>
          Retrouvez ici nos engagements formalisés à travers des documents accessibles et téléchargeables.
        </p>

        <Suspense fallback={<div>{t('pages.politic.loading_documents')}</div>}>
          <PoliticGrid />
        </Suspense>
      </main>
    </>
  );
}
