import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import './Home.css';

// 💡 Lazy loading des composants
const Hero = lazy(() => import('../components/Hero'));
const ImageSlider = lazy(() => import('../components/Annonce'));
const SliderCard = lazy(() => import('../components/SliderCard'));
const Valeur = lazy(() => import('../components/Valeur'));
const Specialite = lazy(() => import('../components/Specialite'));
const Gallerie = lazy(() => import('../components/Gallerie'));
const Blog = lazy(() => import('../components/Blog'));


export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pages.home.title')}</title>
        <meta
          name="description"
          content="Page d’accueil des Laboratoires Zeroual, votre référence en analyses médicales et microbiologie à Tanger."
        />
        <meta property="og:title" content={t('pages.home.title')} />
        <meta property="og:description" content="Découvrez nos services d’analyses médicales." />
        <meta property="og:image" content="/logo.jpg" />
      </Helmet>

      <main className="home-page">
        <Suspense fallback={<div>{t('pages.home.loading_hero')}</div>}>
          <Hero />
        </Suspense>

        <Suspense fallback={<div>{t('pages.home.loading_announce')}</div>}>
          <ImageSlider />
        </Suspense>

        <Suspense fallback={<div>{t('pages.home.loading_slider')}</div>}>
          <SliderCard />
        </Suspense>

        <Suspense fallback={<div>{t('pages.home.loading_values')}</div>}>
          <Valeur />
        </Suspense>

        <Suspense fallback={<div>{t('pages.home.loading_specialties')}</div>}>
          <Specialite />
        </Suspense>

        <Suspense fallback={<div>{t('pages.home.loading_gallery')}</div>}>
          <Gallerie />
        </Suspense>

        <Suspense fallback={<div>{t('pages.home.loading_blog')}</div>}>
          <Blog />
        </Suspense>
      </main>
    </>
  );
}
