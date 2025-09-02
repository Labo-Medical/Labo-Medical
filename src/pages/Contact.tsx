import './Contact.css';
import { useEffect, useState, lazy, Suspense } from 'react';
import { fetchPayloadLabs, type Lab } from '../services/payloadApi2';
import { Helmet } from 'react-helmet-async';
import emailjs from 'emailjs-com';

const ContactForm = lazy(() => import('../components/ContactForm'));

const fallbackLabs: Lab[] = [
  { name: 'Kawacim', address: 'Magasin N°60, Complexe Kawassim Tranche N°7, Al Moujahidin, Tanger 90000', phone: '05 39 38 35 57' },
  { name: 'Souani', address: '43 hay, boulevard Anfa, Tanger 90000', phone: '05 39 33 63 20' },
  { name: 'Charf', address: '12 Rue Nationale, 59000 Charf', phone: '05 39 33 63 20' },
];

export default function Contact() {
  const [labs, setLabs] = useState<Lab[]>(fallbackLabs);
  const [form, setForm] = useState({ name: '', email: '', laboratoire: '', message: '' });
  const [sent, setSent] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchPayloadLabs()
      .then((data) => {
        if (data.length > 0) setLabs(data);
        else setLabs(fallbackLabs);
      })
      .catch(() => setLabs(fallbackLabs));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
    setForm({ ...form, laboratoire: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await emailjs.send(
        'service_k9l97n8',     // 🔁  ID EmailJS
        'template_7xfeibq',    // 🔁  ID de template
        {
          name: form.name,
          email: form.email,
          laboratoire: form.laboratoire,
          message: form.message,
        },
        '-x18GprKZj2ZDhbKR'      // 🔁 clé publique EmailJS
      );

      console.log('✅ Email envoyé avec succès');
      setSent(true);
      setForm({ name: '', email: '', laboratoire: '', message: '' });
    } catch (error) {
      console.error('❌ Erreur lors de l’envoi :', error);
    }
  };

  const filteredLabs = filter ? labs.filter((lab) => lab.name === filter) : labs;
  const leftLabs = filteredLabs.slice(0, 2);
  const rightLabs = filteredLabs.slice(2, 4);

  return (
    <>
      <Helmet>
        <title>Contact - Les Laboratoires Zeroual</title>
        <meta name="description" content="Contactez les Laboratoires Zeroual..." />
        <meta property="og:title" content="Contact - Les Laboratoires Zeroual" />
        <meta property="og:description" content="Formulaire de contact et informations..." />
        <meta property="og:image" content="/logo.jpg" />
      </Helmet>

      <main className="contact-bootstrap">
        <h2 className="contact-page">Formulaire de contact & Nos laboratoires médicaux</h2>
        <h3>Veuillez nous contacter par mail au contact@leslaboratoireszeroual.ma</h3>

        <div className="contact-row">
          <Suspense fallback={<div>Chargement du formulaire...</div>}>
            <ContactForm
              form={form}
              sent={sent}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleFilter={handleFilter}
            />
          </Suspense>

          <div className="contact-cards-double">
            <div className="contact-cards-col">
              {leftLabs.map((lab) => (
                <div className="contact-card" key={lab.name}>
                  <h5>{lab.name}</h5>
                  <p>{lab.address}<br />Tél. {lab.phone}</p>
                </div>
              ))}
            </div>
            <div className="contact-cards-col">
              {rightLabs.map((lab) => (
                <div className="contact-card" key={lab.name}>
                  <h5>{lab.name}</h5>
                  <p>{lab.address}<br />Tél. {lab.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
