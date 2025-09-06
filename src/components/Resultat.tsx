import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchResultatsServerLink } from '../services/payloadApi2';
import { motion } from 'framer-motion';
import './Resultats.css';
import Contact from '../pages/Contact';
import PrepaVisite from './PrepaVisite';
import Faq from './Faq';
import { isAuthenticated } from '../auth';

const menuKeys = [
  { key: 'resultats', labelKey: 'results.menu.results' },
  { key: 'rdv',        labelKey: 'results.menu.appointment' },
  { key: 'prep',       labelKey: 'results.menu.prepare' },
  { key: 'faq',        labelKey: 'results.menu.faq' },
];

const DEFAULT_LINK = "../pageresultats/";

export default function VosResultatsPage() {
  const { t } = useTranslation();
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
      title: t('results.methods.online.title'),
      desc: t('results.methods.online.desc'),
      linkText: t('results.methods.online.link'),
      linkUrl: serveurLink,
    },
    {
      title: t('results.methods.phone.title'),
      desc: t('results.methods.phone.desc'),
    },
    {
      title: t('results.methods.lab.title'),
      desc: t('results.methods.lab.desc'),
    },
    {
      title: t('results.methods.doctor.title'),
      desc: t('results.methods.doctor.desc'),
    },
  ];

  return (
    <div className="vrp-container">
      <aside className="vrp-sidebar">
        <ul role="tablist">
          {menuKeys.map(item => (
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
                {t(item.labelKey)}
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
              <h1>{t('results.title')}</h1>
              <p>{t('results.description')}</p>
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
                            alert(t('results.login_required'));
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
