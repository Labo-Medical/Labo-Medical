import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';

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
  return (
    <>
      <Helmet>
        <title>Politiques Institutionnelles - Les Laboratoires Zeroual</title>
        <meta
          name="description"
          content="Découvrez les politiques institutionnelles des Laboratoires Zeroual : RH, Qualité et Confidentialité, accessibles et téléchargeables."
        />
        <meta property="og:title" content="Politiques Institutionnelles - Les Laboratoires Zeroual" />
        <meta
          property="og:description"
          content="Nos engagements formalisés à travers des documents officiels pour garantir qualité, éthique et confidentialité."
        />
        <meta property="og:image" content="/logo.jpg" />
      </Helmet>

      <main style={styles.page}>
        <h1 style={styles.title}>Nos Politiques Institutionnelles</h1>
        <p style={styles.subtitle}>
          Retrouvez ici nos engagements formalisés à travers des documents accessibles et téléchargeables.
        </p>

        <Suspense fallback={<div>Chargement des documents politiques...</div>}>
          <PoliticGrid />
        </Suspense>
      </main>
    </>
  );
}
