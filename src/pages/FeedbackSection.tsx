import { useState, useEffect, lazy, Suspense } from 'react';
import './FeedbackSection.css';
import { fetchPayloadFeedbackSettings } from '../services/payloadApi2';
import { Helmet } from 'react-helmet-async';

const FeedbackForm = lazy(() => import('../components/FeedbackForm'));

const DEFAULT_PHONE = '+212601812070';

export default function FeedbackSection() {
  const [whatsappNumber, setWhatsappNumber] = useState<string>(DEFAULT_PHONE);

  useEffect(() => {
    fetchPayloadFeedbackSettings()
      .then((data) => {
        if (data?.whatsappNumber) setWhatsappNumber(data.whatsappNumber);
        // googleFormUrl is not used, so we skip updating it
      })
      .catch(() => {
        console.warn('Paramètres Payload non accessibles, fallback activé.');
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Retour & Avis - Les Laboratoires Zeroual</title>
        <meta
          name="description"
          content="Donnez votre avis ou envoyez vos réclamations aux Laboratoires Zeroual."
        />
        <meta property="og:title" content="Retour & Avis - Les Laboratoires Zeroual" />
        <meta
          property="og:description"
          content="Partagez votre expérience avec les Laboratoires Zeroual."
        />
        <meta property="og:image" content="/logo.jpg" />
      </Helmet>

      <section className="feedback-section">
        <div className="whatsapp-contact">
          <p>
            📱 Pour toute réclamation veuillez nous contacter au :{' '}
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter via WhatsApp"
            >
              {whatsappNumber}
            </a>
          </p>
        </div>

        <Suspense fallback={<div>Chargement du formulaire de retour...</div>}>
          <FeedbackForm />
        </Suspense>
      </section>
    </>
  );
}
