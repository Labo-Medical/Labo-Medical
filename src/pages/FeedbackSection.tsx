import { useState, useEffect, lazy, Suspense } from 'react';
import './FeedbackSection.css';
import { fetchPayloadFeedbackSettings } from '../services/payloadApi2';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const FeedbackForm = lazy(() => import('../components/FeedbackForm'));

const DEFAULT_PHONE = '+212601812070';

export default function FeedbackSection() {
  const { t } = useTranslation();
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
        <title>{t('pages.feedback.title')}</title>
        <meta
          name="description"
          content={t('pages.feedback.description')}
        />
        <meta property="og:title" content={t('pages.feedback.og_title')} />
        <meta
          property="og:description"
          content={t('pages.feedback.og_description')}
        />
        <meta property="og:image" content="/logo.jpg" />
      </Helmet>

      <section className="feedback-section">
        <div className="whatsapp-contact">
          <p>
            {t('pages.feedback.whatsapp_text')}{' '}
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

        <Suspense fallback={<div>{t('pages.feedback.loading')}</div>}>
          <FeedbackForm />
        </Suspense>
      </section>
    </>
  );
}
