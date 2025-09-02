import { useState } from 'react';
import Catalogue from '../components/Catalogue';
import RecommandationsPreanalytique from '../components/RecommandationsPreanalytique';
import CentraleAchat from '../components/CentraleAchat';
import Document from '../components/Document';
import Prelevement from '../components/Prelevement';
import './ProPage.css'; // Assuming you have a CSS file for styles
import { Helmet } from 'react-helmet-async';

const menuItems = [
  { key: 'documents', label: 'Documents' },
  { key: 'recommandations-preanalytique', label: 'Récommandations préanalytique' },
  { key: 'centrale-achats', label: 'Centrale d\'achats' },
  { key: 'catalogues', label: 'Catalogues' },
  { key: 'prelevements', label: 'Prélèvements' },
];

export default function ProPage() {
  const [activeTab, setActiveTab] = useState(menuItems[0].key);

  const renderContent = () => {
    switch (activeTab) {
      case 'documents':
        return <Document />;
      case 'recommandations-preanalytique':
        return <RecommandationsPreanalytique />;
      case 'centrale-achats':
        return <CentraleAchat />;
      case 'catalogues':
        return <Catalogue />;
      case 'prelevements':
        return <Prelevement />;
      default:
        return <div>Contenu non disponible</div>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Espace Pros - Laboratoires Zeroual</title>
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
                <button onClick={() => setActiveTab(key)}>{label}</button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="vrp-main">{renderContent()}</main>
      </div>
    </>
  );
}
