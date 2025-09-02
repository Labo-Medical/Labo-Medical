import { useEffect, useState } from 'react';
import { fetchPayloadAutomates, type ServiceData } from '../services/payloadApi2';

// === Données fallback automates ===
const fallbackAutomates: ServiceData[] = [
  { title: "Automate d'immunoessais", description: "Analyse immunologique, sérologique, hormonologique et allergologique.", iconSrc: '/automates/a2.png' },
  { title: "Analyseur d'hématologie", description: "Numération Formule Sanguine (NFS) et détection d’anomalies sanguines.", iconSrc: '/automates/a3.png' },
  { title: 'Analyseur biochimique', description: "Chimie clinique pour analyses in vitro.", iconSrc: '/automates/a4.png' },
  { title: 'Analyseur Hématologique', description: "Utilise l’impédance et la cytométrie pour analyser les cellules sanguines.", iconSrc: '/automates/a5.png' },
  { title: 'Analyseur immunologique ', description: "Électrochimiluminescence pour détection d'analytes dans divers fluides.", iconSrc: '/automates/a6.png' },
  { title: 'Spectrophotomètre', description: "Mesure de l’absorbance pour analyser la concentration d’une substance.", iconSrc: '/automates/a7.png' },
  { title: 'Analyseur de chimie clinique', description: "Biochimie, immunologie, hématologie, hormonologie, serologie, vitaminologie.", iconSrc: '/automates/a8.png' },
  { title: "Analyseur d'hémostase", description: "Étude de la coagulation sanguine.", iconSrc: '/automates/a9.png' },
  { title: 'Analyseur de glycohémoglobine', description: "Mesure HbA1c via HPLC pour suivi du diabète.", iconSrc: '/automates/a10.png' },
  { title: 'Analyseur hématologique automatisé', description: "Analyses complètes de la formule sanguine.", iconSrc: '/automates/4.png' },
  { title: 'Analyseur de chimie clinique compact et automatisé', description: "Tests biochimiques.", iconSrc: '/automates/7.png' },
  { title: "Système d'électrophorèse automatisé", description: "Système d'électrophorèse automatisé.", iconSrc: '/automates/9.png' },
  { title: " Analyseur d'immunoanalyse automatique", description: "Analyseur d'immunoanalyse automatique.", iconSrc: '/automates/12.png' },
];

// === Spécialités médicales ===
const specialites: ServiceData[] = [
  { title: 'Prélèvements', description: 'Simplifiez vos prélèvements.', iconSrc: '/icons/prelevement.png' },
  { title: 'Biochimie', description: 'Analyse des substances chimiques.', iconSrc: '/icons/biochemy.svg' },
  { title: 'Hématologie', description: 'Étude des cellules sanguines.', iconSrc: '/icons/hematology.svg' },
  { title: 'Microbiologie', description: 'Identification des agents pathogènes.', iconSrc: '/icons/microbiology.svg' },
  { title: 'Immunologie', description: 'Tests sur la réponse immunitaire.', iconSrc: '/icons/immunology.svg' },
  { title: 'Hormonologie', description: 'Exploration du système endocrinien.', iconSrc: '/icons/hormonology.svg' },
  { title: 'Allergologie', description: 'Diagnostic des allergies.', iconSrc: '/icons/allergy.png' },
  { title: 'Hémostase', description: 'Analyses de coagulation.', iconSrc: '/icons/hemostase.svg' },
  { title: 'Glycohémoglobine', description: 'Suivi du diabète HbA1c.', iconSrc: '/icons/glyco.png' },
  { title: 'Sérologie', description: 'Détection d’anticorps.', iconSrc: '/icons/serology.svg' },
  { title: 'Virologie', description: 'Diagnostic viral.', iconSrc: '/icons/bacteria.svg' },
  { title: 'Vitaminologie', description: 'Évaluation des carences.', iconSrc: '/icons/vitamine.svg' },
  { title: 'Parasitologie', description: 'Recherche de parasites.', iconSrc: '/icons/parasite.svg' },
  { title: 'Mycologie', description: 'Identification des champignons.', iconSrc: '/icons/molecule.svg' },
  { title: 'Génétique & Génomique', description: 'Analyses genétiques.', iconSrc: '/icons/gene.png' },
  { title: 'Biologie moléculaire', description: 'Analyses moléculaires.', iconSrc: '/icons/molecule.png' },
];

// === Composant spécialité ===
// === Composant spécialité ===
function SpecialiteIcon({ title, iconSrc }: Pick<ServiceData, 'title' | 'iconSrc'>) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <div
        style={{
          backgroundColor: '#f0f0f0',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '0.4rem',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <img src={iconSrc} alt={title} style={{ width: '36px', height: '36px' }} />
      </div>
      <span style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: 500 }}>{title}</span>
    </div>
  );
}

// === Section spécialités avec GRID responsive ===
function SpecialitesSection() {
  return (
    <section style={{ marginTop: '2rem', backgroundColor: '#f4f6fa', padding: '2rem 1rem', borderRadius: '12px' }}>
      <h2 style={{ fontSize: '1.6rem', textAlign: 'center', marginBottom: '1.5rem', color: '#800020' }}>
        Nos domaines d’expertise
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
          gap: '0.6rem',
          justifyContent: 'center',
        }}
      >
        {specialites.map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              width: '100%', // important pour que grid contrôle la largeur
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <div
              style={{
                backgroundColor: '#f0f0f0',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.4rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <img src={s.iconSrc} alt={s.title} style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
            </div>
            <span style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: 500 }}>{s.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}


// === Carte automate ===
function AutomateCard({ title, description, iconSrc }: ServiceData) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '260px',
      }}
    >
      <img src={iconSrc} alt={title} style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem', background: '#f4f6fa' }} />
      <h3 style={{ fontSize: '1.1rem', color: '#800020', marginBottom: '0.5rem', textAlign: 'center' }}>{title}</h3>
      <p style={{ fontSize: '0.97rem', color: '#444', textAlign: 'center' }}>{description}</p>
    </div>
  );
}

// === Composant principal ===
export default function Services() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [automates, setAutomates] = useState<ServiceData[]>(fallbackAutomates);

  useEffect(() => {
    fetchPayloadAutomates()
      .then((data) => { if (data.length > 0) setAutomates(data); })
      .catch(() => setAutomates(fallbackAutomates));
  }, []);

  return (
    <section style={{ padding: '2rem', backgroundColor: '#f8f9fb', borderRadius: '12px' }}>
     
      <h2 style={{ color: '#800020', marginBottom: '2rem', fontWeight: 700, textAlign: 'center' }}>
        Nos dispositifs médicaux de diagnostic
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '24px' }}>
        {automates.slice(0, visibleCount).map((item, index) => (
          <AutomateCard key={index} {...item} />
        ))}
      </div>
      {visibleCount < automates.length && (
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button
            onClick={() => setVisibleCount((prev) => Math.min(prev + 4, automates.length))}
            style={{ backgroundColor: '#800020', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '1rem', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
          >
            Voir plus
          </button>
        </div>
      )}
       <SpecialitesSection />
    </section>
  );
}