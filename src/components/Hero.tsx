import { useEffect, useState } from 'react';
import { fetchPayloadHero, type HeroPayload } from '../services/payloadApi';

export default function Hero() {
  const [hero, setHero] = useState<HeroPayload | null>(null);

  useEffect(() => {
    fetchPayloadHero().then((data) => {
      setHero(data);
    });
  }, []);

  const videoUrl = hero?.hero_video || '/fond/video1.mp4';
  const titleHtml =
    hero?.hero_title || 'Bienvenue chez<br />LES LABORATOIRES ZEROUAL';
  const description =
    hero?.hero_description || 'Votre réseau de laboratoires médicaux.';
  const buttonUrl = hero?.hero_button_url || '/specialite';
  const buttonLabel = hero?.hero_button_label || 'Découvrir nos services';

  return (
    <>
      <style>
        {`
          .hero {
            position: relative;
            height: 60vh;
            overflow: hidden;
            color: #fff;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .hero video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 0;
          }

          .hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom right, rgba(0,0,0,0.3), rgba(0,0,0,0.3));
            z-index: 1;
          }

          .hero-content {
            position: relative;
            z-index: 2;
            max-width: 720px;
            margin: 0 auto;
            animation: fadeInUp 0.8s ease-out;
          }

          .hero-content h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            line-height: 1.3;
          }

          .hero-content p {
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
            color: #f0f0f0;
          }

          .hero-content a {
            background-color: #6E0B14;
            color: #fff;
            padding: 0.6rem 1.4rem;
            font-size: 0.95rem;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            transition: background 0.3s ease, transform 0.3s ease;
          }

          .hero-content a:hover {
            background-color: #4a0810;
            transform: scale(1.05);
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            .hero {
              padding: 40px 16px;
              height: auto;
            }

            .hero-content h1 {
              font-size: 1.8rem;
            }

            .hero-content p {
              font-size: 1rem;
            }
          }
        `}
      </style>

      <section className="hero">
        <video autoPlay muted loop playsInline>
          <source src={videoUrl} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo HTML5.
        </video>

        <div className="hero-content">
          <h1 dangerouslySetInnerHTML={{ __html: titleHtml }} />
          <p>{description}</p>
          <div style={{ marginTop: '12px' }}>
            <img
              src="/icons/24.png"
              alt="Service 24h/7"
              style={{
                height: '100px',
                display: 'inline-block',
              }}
            />
          </div>
          <a href={buttonUrl}>{buttonLabel}</a>
        </div>
      </section>
    </>
  );
}
