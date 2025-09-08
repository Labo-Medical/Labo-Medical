import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Catalogue from '../components/Catalogue';
import RecommandationsPreanalytique from '../components/RecommandationsPreanalytique';
import CentraleAchat from '../components/CentraleAchat';
import Document from '../components/Document';
import Prelevement from '../components/Prelevement';
import './ProPage.css'; // Assuming you have a CSS file for styles
import { Helmet } from 'react-helmet-async';

const menuItems = [
  { key: 'documents', label: 'pro_menu.documents' },
  { key: 'recommandations-preanalytique', label: 'pro_menu.recommendations' },
  { key: 'centrale-achats', label: 'pro_menu.central_purchase' },
  { key: 'catalogues', label: 'pro_menu.catalogues' },
  { key: 'prelevements', label: 'pro_menu.sampling' },
];

export default function ProPage() {
  const [activeTab, setActiveTab] = useState(menuItems[0].key);
  const { t, i18n } = useTranslation();

  const renderContent = () => {
    switch (activeTab) {
      case 'documents':
        return <Document key={`documents-${i18n.language}`} />;
      case 'recommandations-preanalytique':
        return <RecommandationsPreanalytique key={`recommendations-${i18n.language}`} />;
      case 'centrale-achats':
        return <CentraleAchat key={`centrale-${i18n.language}`} />;
      case 'catalogues':
        return <Catalogue key={`catalogues-${i18n.language}`} />;
      case 'prelevements':
        return <Prelevement key={`prelevement-${i18n.language}`} />;
      default:
        return <div>{t('components.propage.unavailable')}</div>;
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('pages.pro.title')}</title>
        <meta
          name="description"
          content="Découvrez nos catalogues, recommandations pré-analytiques, centrale d'achats, documents et solutions de prélèvements pour professionnels de santé."
        />
        <meta property="og:title" content="Espace Pros - Laboratoires Zeroual" />
        <meta
          property="og:description"
          content="Accédez aux ressources et documents professionnels indispensables pour optimiser vos activités médicales et de laboratoire."
        />
        <meta property="og:image" content="/logo.jpg" />
      </Helmet>

      <div className="vrp-container">
        <aside className="vrp-sidebar">
          <ul>
            {menuItems.map(({ key, label }) => (
              <li key={key} className={key === activeTab ? 'active' : ''}>
                <button onClick={() => setActiveTab(key)}>{t(label)}</button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="vrp-main">{renderContent()}</main>
      </div>
    </>
  );
}
