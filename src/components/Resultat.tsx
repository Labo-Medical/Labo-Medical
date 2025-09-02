import { useState, useEffect } from 'react';
import { fetchResultatsServerLink } from '../services/payloadApi2';
import { motion } from 'framer-motion';
import './Resultats.css';
import Contact from '../pages/Contact';
import PrepaVisite from './PrepaVisite';
import Faq from './Faq';
import { isAuthenticated } from '../auth';

const menuItems = [
  { key: 'resultats', label: 'Vos résultats' },
  { key: 'rdv',        label: 'Prendre rendez-vous' },
  { key: 'prep',       label: 'Préparer ma visite' },
  { key: 'faq',        label: 'FAQ' },
];

const DEFAULT_LINK = "../pageresultats/";

export default function VosResultatsPage() {
  const [activeTab, setActiveTab] = useState('resultats');
  const [serveurLink, setServeurLink] = useState<string>(DEFAULT_LINK);

  useEffect(() => {
    fetchResultatsServerLink()
      .then((link) => {
        if (link) setServeurLink(link);
      })
      .catch(() => {
        setServeurLink(DEFAULT_LINK);
      });
  }, []);

  const methods = [
    {
      title: 'En ligne',
      desc: 'Demandez l’accès aux secrétaires lors de votre enregistrement. Vos résultats seront disponibles sur un serveur internet sécurisé, accessible depuis la fiche de votre laboratoire.',
      linkText: 'serveur de résultats',
      linkUrl: serveurLink,
    },
    {
      title: 'Par téléphone',
      desc: 'Communiquez votre numéro de portable aux secrétaires lors de votre enregistrement.',
    },
    {
      title: 'Au laboratoire',
      desc: 'Signalez aux secrétaires que vous préférez venir chercher vos résultats sur place. Nous vous remettrons un coupon garantissant votre confidentialité.',
    },
    {
      title: 'Votre médecin',
      desc: 'Vos résultats seront transmis à votre médecin selon le mode de transmission de son choix : poste, fax, connexion sécurisée…',
    },
  ];

  return (
    <div className="vrp-container">
      <aside className="vrp-sidebar">
        <ul role="tablist">
          {menuItems.map(item => (
            <li
              key={item.key}
              className={item.key === activeTab ? 'active' : ''}
              role="presentation"
            >
              <button
                role="tab"
                aria-selected={item.key === activeTab}
                tabIndex={item.key === activeTab ? 0 : -1}
                onClick={() => setActiveTab(item.key)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="vrp-main">
        {activeTab === 'resultats' && (
          <>
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>Vos résultats d’analyses</h1>
              <p>
                Les laboratoires Zeroual s’engagent à poursuivre leurs efforts de fiabilité
                et justesse des résultats rendus dans le respect des bonnes pratiques
                professionnelles et à assurer un service rapide et fiable selon les délais annoncés.
              </p>
            </motion.header>

            <motion.section
              className="vrp-methods"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: {} }}
            >
              {methods.map((m, idx) => (
                <motion.div
                  key={m.title}
                  className="vrp-method"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200 }}
                >
                  <h3>{m.title}</h3>
                  <p>
                    {m.desc}{' '}
                    {m.linkText && m.linkUrl && (
                      isAuthenticated() ? (
                        <a
                          href={m.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {m.linkText}
                        </a>
                      ) : (
                        <button
                          onClick={() => {
                            alert("Veuillez vous connecter pour accéder à vos résultats.");
                            window.location.href = "/login";
                          }}
                          className="protected-link"
                        >
                          {m.linkText}
                        </button>
                      )
                    )}
                  </p>
                </motion.div>
              ))}
            </motion.section>
          </>
        )}

        {activeTab === 'rdv' && <Contact />}
        {activeTab === 'prep' && <PrepaVisite />}
        {activeTab === 'faq' && <Faq />}
      </main>
    </div>
  );
}
