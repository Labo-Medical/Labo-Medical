import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
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
  return (
    <>
      <Helmet>
        <title>Les Laboratoires Zeroual - Accueil</title>
        <meta
          name="description"
          content="Page d’accueil des Laboratoires Zeroual, votre référence en analyses médicales et microbiologie à Tanger."
        />
        <meta property="og:title" content="Les Laboratoires Zeroual - Accueil" />
        <meta property="og:description" content="Découvrez nos services d’analyses médicales." />
        <meta property="og:image" content="/logo.jpg" />
      </Helmet>

      <main className="home-page">
        <Suspense fallback={<div>Chargement de la section Hero...</div>}>
          <Hero />
        </Suspense>

        <Suspense fallback={<div>Chargement de l’annonce...</div>}>
          <ImageSlider />
        </Suspense>

        <Suspense fallback={<div>Chargement des cartes slider...</div>}>
          <SliderCard />
        </Suspense>

        <Suspense fallback={<div>Chargement des valeurs...</div>}>
          <Valeur />
        </Suspense>

        <Suspense fallback={<div>Chargement des spécialités...</div>}>
          <Specialite />
        </Suspense>

        <Suspense fallback={<div>Chargement de la galerie...</div>}>
          <Gallerie />
        </Suspense>

        <Suspense fallback={<div>Chargement du blog...</div>}>
          <Blog />
        </Suspense>
      </main>
    </>
  );
}
