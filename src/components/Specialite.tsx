'use client';
import { useState } from 'react';
import './Specialite.css';

interface ServiceData {
  title: string;
  description: string;
  iconSrc: string;
}

// === Données automates ===
const fallbackAutomates: ServiceData[] = [
  { title: "BA 400", description: "Analyseur de biochimie automatique 400 tests/h", iconSrc: '/automates/ba400.jpg' },
  { title: "Biosensor F200", description: "Analyseur d'immuno-analyse par fluorescence...", iconSrc: '/automates/biosenser.png' },
  { title: 'Cobas E411', description: "Immunologique analyseur pour un accès aléatoire traitement des immunoessais basés ECL.", iconSrc: '/automates/cobas.png' },
  { title: 'Cobas C311', description: "Analyseur de chimie clinique automatisé...", iconSrc: '/automates/cobas301.png' },
  { title: 'GENEXPERT', description: "PCR en temps réel rapide (60 min)", iconSrc: '/automates/genexpert.jpg' },
  { title: 'GENRUi KT6610', description: "Analyseur automatisé pour sang...", iconSrc: '/automates/genru.png' },
  { title: "HLC 723GX", description: "Système HPLC pour dosage rapide", iconSrc: '/automates/hlc.jpg' },
  { title: 'ABX Pentra XL 80', description: "Cadence jusqu’à 80 échantillons/h", iconSrc: '/automates/apx.jpeg' },
  { title: 'KONELAB 20', description: "Analyseur à chargement continu...", iconSrc: '/automates/konelab.jpg' },
  { title: 'Minicap Flex Piercing', description: "Analyseur pour dépistage protéines sanguines", iconSrc: '/automates/minicap.png' },
  { title: "SPIN 640 Plus", description: "Analyseur automatique de chimie clinique", iconSrc: '/automates/spin.png' },
  { title: "STA Satellite®", description: "Automate d’Hémostase de paillasse", iconSrc: '/automates/sta.jpg' },
  { title: 'START', description: "Analyseur de coagulation semi-automatique", iconSrc: '/automates/start.jpg' },
  { title: 'SYSMEX XN-550', description: "XN-550 passeur automatique, Rerun-Reflex", iconSrc: '/automates/sysmex.jpg' },
  { title: "VIDAS", description: "Automate d’immunoanalyses multiparamétriques", iconSrc: '/automates/vidas.jpg' },
  { title: "VITEK 2 COMPACT 60", description: "Identification bactérienne + antibiogramme", iconSrc: '/automates/vitek.jpg' },
];

// === Spécialités ===
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
  { title: 'Parasitologie', description: 'Recherche de parasites.', iconSrc: '/icons/parasite.png' },
  { title: 'Mycologie', description: 'Identification des champignons.', iconSrc: '/icons/mycology.png' },
  { title: 'Génétique & Génomique', description: 'Analyses génétiques.', iconSrc: '/icons/gene.png' },
  { title: 'Biologie moléculaire', description: 'Analyses moléculaires.', iconSrc: '/icons/molecule.png' },
  { title: 'Immunofluoroscence', description: 'Analyses immunofluoroscences.', iconSrc: '/icons/fluore.png' },
];

// === Composant principal ===
export default function AutomatesBySpecialite() {
  const [activeSpec, setActiveSpec] = useState<string | null>(null);

  const automatesBySpec = fallbackAutomates.filter(a => {
    if (!activeSpec) return false;
    if (activeSpec === 'Biochimie') return ['BA 400','KONELAB 20','Cobas C311','SPIN 640 Plus'].includes(a.title);
    if (activeSpec === 'Hématologie') return ['GENRUi KT6610','SYSMEX XN-550','ABX Pentra XL 80'].includes(a.title);
    if (activeSpec === 'Immunologie') return ['VIDAS','Biosensor F200','Cobas E411'].includes(a.title);
    if (activeSpec === 'Biologie moléculaire') return ['GENEXPERT'].includes(a.title);
    if (activeSpec === 'Hémostase') return ['STA Satellite®','START'].includes(a.title);
    if (activeSpec === 'Glycohémoglobine') return ['HLC 723GX'].includes(a.title);
    if (activeSpec === 'Sérologie') return ['Minicap Flex Piercing'].includes(a.title);
    if (activeSpec === 'Microbiologie') return ['VITEK 2 COMPACT 60'].includes(a.title);
    return false;
  });

  return (
    <div className="ab-container">
      <h1>Nos automates par spécialité</h1>

      <div className="ab-nav">
        {specialites.map((s) => (
          <button
            key={s.title}
            className={activeSpec === s.title ? 'active' : ''}
            onClick={() => setActiveSpec(activeSpec === s.title ? null : s.title)}
          >
            <img src={s.iconSrc} alt={s.title} />
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {activeSpec && (
        <div className="ab-grid">
          {automatesBySpec.length > 0 ? (
            automatesBySpec.map(a => (
              <div key={a.title} className="ab-card">
                <img src={a.iconSrc} alt={a.title} />
                <h3>{a.title}</h3>
                <p>{a.description}</p>
              </div>
            ))
          ) : (
            <p className="ab-empty">Aucun automate disponible pour cette spécialité.</p>
          )}
        </div>
      )}
    </div>
  );
}
