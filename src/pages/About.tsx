import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// 💡 Lazy loading des composants
const Presentation = lazy(() => import('../components/Presentation'));
const Historique = lazy(() => import('../components/Historique'));
const Chiffres = lazy(() => import('../components/Chiffre'));
const Partenaire = lazy(() => import('../components/Partenaire'));
const Specialites = lazy(() => import('../components/Specialite'));

export default function AboutBiogroup() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('pages.about.title')}</title>
      </Helmet>

      <main style={{ fontFamily: "'Montserrat', Arial, sans-serif", padding: '2rem' }}>
        <Suspense fallback={<div>{t('components.loading_presentation')}</div>}>
          <Presentation />
        </Suspense>

        <Suspense fallback={<div>{t('components.loading_history')}</div>}>
          <Historique />
        </Suspense>

        <Suspense fallback={<div>{t('components.loading_numbers')}</div>}>
          <Chiffres />
        </Suspense>

        <Suspense fallback={<div>{t('components.loading_partners')}</div>}>
          <Partenaire />
        </Suspense>

        <Suspense fallback={<div>{t('components.loading_specialties')}</div>}>
          <Specialites />
        </Suspense>
      </main>
    </>
  );
}
