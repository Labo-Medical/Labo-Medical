import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import { useI18n } from '../i18n';
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
  const { t } = useI18n();
  return (
    <>
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
        <meta property="og:title" content={t('home.title')} />
        <meta property="og:description" content={t('home.ogDescription')} />
        <meta property="og:image" content="/logo.jpg" />
      </Helmet>

      <main className="home-page">
        <Suspense fallback={<div>{t('home.loadingHero')}</div>}>
          <Hero />
        </Suspense>

        <Suspense fallback={<div>{t('home.loadingAnnonce')}</div>}>
          <ImageSlider />
        </Suspense>

        <Suspense fallback={<div>{t('home.loadingSlider')}</div>}>
          <SliderCard />
        </Suspense>

        <Suspense fallback={<div>{t('home.loadingValeur')}</div>}>
          <Valeur />
        </Suspense>

        <Suspense fallback={<div>{t('home.loadingSpecialite')}</div>}>
          <Specialite />
        </Suspense>

        <Suspense fallback={<div>{t('home.loadingGallerie')}</div>}>
          <Gallerie />
        </Suspense>

        <Suspense fallback={<div>{t('home.loadingBlog')}</div>}>
          <Blog />
        </Suspense>
      </main>
    </>
  );
}
