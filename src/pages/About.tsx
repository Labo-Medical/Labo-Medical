import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';

// 💡 Lazy loading des composants
const Presentation = lazy(() => import('../components/Presentation'));
const Historique = lazy(() => import('../components/Historique'));
const Chiffres = lazy(() => import('../components/Chiffre'));
const Partenaire = lazy(() => import('../components/Partenaire'));
const Specialites = lazy(() => import('../components/Specialite'));

export default function AboutBiogroup() {
  return (
    <>
      <Helmet>
        <title>À propos - Les Laboratoires Zeroual</title>
      </Helmet>

      <main style={{ fontFamily: "'Montserrat', Arial, sans-serif", padding: '2rem' }}>
        <Suspense fallback={<div>Chargement de la présentation...</div>}>
          <Presentation />
        </Suspense>

        <Suspense fallback={<div>Chargement de l’historique...</div>}>
          <Historique />
        </Suspense>

        <Suspense fallback={<div>Chargement des chiffres...</div>}>
          <Chiffres />
        </Suspense>

        <Suspense fallback={<div>Chargement des partenaires...</div>}>
          <Partenaire />
        </Suspense>

        <Suspense fallback={<div>Chargement des spécialités...</div>}>
          <Specialites />
        </Suspense>
      </main>
    </>
  );
}
