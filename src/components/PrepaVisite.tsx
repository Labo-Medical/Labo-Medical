// src/PrepareAnalyses.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./PrepaVisite.css";

export default function PrepareAnalyses() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("preparer");

  const sections = [
    { id: "preparer", label: t('prepare_visit.sections.preparer') },
    { id: "ajeun", label: t('prepare_visit.sections.ajeun') },
    { id: "enfants", label: t('prepare_visit.sections.enfants') },
    { id: "femmes-enceintes", label: t('prepare_visit.sections.femmes_enceintes') },
    { id: "microbio", label: t('prepare_visit.sections.microbio') },
    { id: "domicile", label: t('prepare_visit.sections.domicile') },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="prepare-container">
      <div className="prepare-header">
        <h1>{t('prepare_visit.title')}</h1>
        <p>
          {t('prepare_visit.subtitle')}
        </p>
      </div>

      <div className="prepare-content">
        <div className="prepare-nav">
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  className={activeSection === section.id ? "active" : ""}
                  onClick={() => handleSectionChange(section.id)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="prepare-details">
          {activeSection === "preparer" && (
            <div className="prepare-section animate-in">
              <h2>{t('prepare_visit.content.preparer.title')}</h2>
              <p>
                {t('prepare_visit.content.preparer.intro')}
              </p>

              <h3>{t('prepare_visit.content.preparer.documents_title')}</h3>
              <ul>
                <li>{t('prepare_visit.content.preparer.documents.ordonnance')}</li>
                <li>{t('prepare_visit.content.preparer.documents.carte_vitale')}</li>
                <li>{t('prepare_visit.content.preparer.documents.mutuelle')}</li>
                <li>{t('prepare_visit.content.preparer.documents.prise_en_charge')}</li>
                <li>
                  {t('prepare_visit.content.preparer.documents.identite')}
                </li>
              </ul>
              <p className="highlight">{t('prepare_visit.content.preparer.highlight')}</p>

              <h3>{t('prepare_visit.content.preparer.honoraires_title')}</h3>
              <p>
                {t('prepare_visit.content.preparer.honoraires_text')}
              </p>
              <p>
                {t('prepare_visit.content.preparer.prise_en_charge')}
              </p>
              <p>
                {t('prepare_visit.content.preparer.sans_prescription')}
              </p>
              <p>
                {t('prepare_visit.content.preparer.hors_nomenclature')}
              </p>

              <h3>{t('prepare_visit.content.preparer.rdv_title')}</h3>
              <p>
                {t('prepare_visit.content.preparer.rdv_text')}
              </p>
              <p>
                {t('prepare_visit.content.preparer.rdv_text2')}
              </p>

              <h3>{t('prepare_visit.content.preparer.horaire_title')}</h3>
              <p>{t('prepare_visit.content.preparer.horaire_intro')}</p>
              <ul>
                <li dangerouslySetInnerHTML={{ __html: t('prepare_visit.content.preparer.horaire_list.cortisol') }} />
                <li dangerouslySetInnerHTML={{ __html: t('prepare_visit.content.preparer.horaire_list.hormones') }} />
                <li dangerouslySetInnerHTML={{ __html: t('prepare_visit.content.preparer.horaire_list.t4') }} />
                <li dangerouslySetInnerHTML={{ __html: t('prepare_visit.content.preparer.horaire_list.tsh') }} />
                <li dangerouslySetInnerHTML={{ __html: t('prepare_visit.content.preparer.horaire_list.medicament') }} />
                <li dangerouslySetInnerHTML={{ __html: t('prepare_visit.content.preparer.horaire_list.antibiotique') }} />
                <li dangerouslySetInnerHTML={{ __html: t('prepare_visit.content.preparer.horaire_list.spermogramme') }} />
              </ul>
            </div>
          )}

          {activeSection === "ajeun" && (
            <div className="prepare-section animate-in">
              <h2>{t('prepare_visit.content.ajeun.title')}</h2>
              <p>
                {t('prepare_visit.content.ajeun.intro')}
              </p>
              <p className="highlight">
                {t('prepare_visit.content.ajeun.highlight')}
              </p>
              <p>{t('prepare_visit.content.ajeun.allowed')}</p>
              <ul>
                <li>{t('prepare_visit.content.ajeun.allowed_list.dents')}</li>
                <li>{t('prepare_visit.content.ajeun.allowed_list.eau')}</li>
                <li>{t('prepare_visit.content.ajeun.allowed_list.medicaments')}</li>
              </ul>
              <p>
                {t('prepare_visit.content.ajeun.biotine')}
              </p>
              <p>
                {t('prepare_visit.content.ajeun.doute')}
              </p>
              <p>
                {t('prepare_visit.content.ajeun.liste_title')}
              </p>
              <ul>
                <li dangerouslySetInnerHTML={{ __html: t('prepare_visit.content.ajeun.liste.calcitonine') }} />
                <li>{t('prepare_visit.content.ajeun.liste.crosslaps')}</li>
                <li>{t('prepare_visit.content.ajeun.liste.cryoglobulin')}</li>
                <li>{t('prepare_visit.content.ajeun.liste.glycemie')}</li>
                <li>{t('prepare_visit.content.ajeun.liste.glycosurie')}</li>
                <li>{t('prepare_visit.content.ajeun.liste.homocysteine')}</li>
                <li>{t('prepare_visit.content.ajeun.liste.parathormone')}</li>
                <li>{t('prepare_visit.content.ajeun.liste.phosphore')}</li>
                <li>{t('prepare_visit.content.ajeun.liste.testosterone')}</li>
                <li>{t('prepare_visit.content.ajeun.liste.triglycerides')}</li>
                <li>{t('prepare_visit.content.ajeun.liste.helikit')}</li>
              </ul>
              <p>
                {t('prepare_visit.content.ajeun.helikit_note')}
              </p>
              <p>
                {t('prepare_visit.content.ajeun.helikit_note2')}
              </p>
              <p>{t('prepare_visit.content.ajeun.helikit_conditions')}</p>
              <ul>
                <li>{t('prepare_visit.content.ajeun.helikit_conditions_list.antibiotique')}</li>
                <li>{t('prepare_visit.content.ajeun.helikit_conditions_list.ipp')}</li>
                <li>{t('prepare_visit.content.ajeun.helikit_conditions_list.antiacides')}</li>
              </ul>
            </div>
          )}

          {activeSection === "enfants" && (
            <div className="prepare-section animate-in">
              <h2>{t('prepare_visit.content.enfants.title')}</h2>
              <p>{t('prepare_visit.content.enfants.intro')}</p>
              <h3>{t('prepare_visit.content.enfants.help_title')}</h3>
              <p>
                {t('prepare_visit.content.enfants.help_intro')}
              </p>
              <h4>{t('prepare_visit.content.enfants.preparer_title')}</h4>
              <p>
                {t('prepare_visit.content.enfants.preparer_text')}
              </p>
              <h4>{t('prepare_visit.content.enfants.expliker_title')}</h4>
              <p>
                {t('prepare_visit.content.enfants.expliker_text')}
              </p>
              <h4>{t('prepare_visit.content.enfants.rassurer_title')}</h4>
              <p>
                {t('prepare_visit.content.enfants.rassurer_text')}
              </p>
              <p>
                {t('prepare_visit.content.enfants.jouets')}
              </p>
              <p>
                {t('prepare_visit.content.enfants.expression')}
              </p>
              <h4>{t('prepare_visit.content.enfants.distraire_title')}</h4>
              <p>
                {t('prepare_visit.content.enfants.distraire_text')}
              </p>
              <h4>{t('prepare_visit.content.enfants.emla_title')}</h4>
              <p>
                {t('prepare_visit.content.enfants.emla_text')}
              </p>
            </div>
          )}

          {activeSection === "femmes-enceintes" && (
            <div className="prepare-section animate-in">
              <h2>{t('prepare_visit.content.femmes_enceintes.title')}</h2>
              <p>
                {t('prepare_visit.content.femmes_enceintes.intro')}
              </p>
              <h3>{t('prepare_visit.content.femmes_enceintes.hcg_title')}</h3>
              <p>
                {t('prepare_visit.content.femmes_enceintes.hcg_text')}
              </p>
              <p>
                {t('prepare_visit.content.femmes_enceintes.hcg_doubling')}
              </p>
              <h3>{t('prepare_visit.content.femmes_enceintes.depistages_title')}</h3>
              <p>
                {t('prepare_visit.content.femmes_enceintes.depistages_text')}
              </p>
              <p>
                {t('prepare_visit.content.femmes_enceintes.depistages_followup')}
              </p>
              <h3>{t('prepare_visit.content.femmes_enceintes.groupe_sanguin_title')}</h3>
              <p>
                {t('prepare_visit.content.femmes_enceintes.groupe_sanguin_text')}
              </p>
              <h3>{t('prepare_visit.content.femmes_enceintes.anemie_title')}</h3>
              <p>
                {t('prepare_visit.content.femmes_enceintes.anemie_text')}
              </p>
              <h3>{t('prepare_visit.content.femmes_enceintes.diabete_title')}</h3>
              <p>
                {t('prepare_visit.content.femmes_enceintes.diabete_text')}
              </p>
            </div>
          )}

          {activeSection === "microbio" && (
            <div className="prepare-section animate-in">
              <h2>{t('prepare_visit.content.microbio.title')}</h2>
              <p>
                {t('prepare_visit.content.microbio.intro')}
              </p>
              <p>
                {t('prepare_visit.content.microbio.modalites')}
              </p>
              <p>
                {t('prepare_visit.content.microbio.disposition')}
              </p>
              <p>
                {t('prepare_visit.content.microbio.depot')}
              </p>
            </div>
          )}

          {activeSection === "domicile" && (
            <div className="prepare-section animate-in">
              <h2>{t('prepare_visit.content.domicile.title')}</h2>
              <p>
                {t('prepare_visit.content.domicile.intro')}
              </p>
              <p>
                {t('prepare_visit.content.domicile.rdv_text')}
              </p>
              <p>
                {t('prepare_visit.content.domicile.programmation')}
              </p>
              <p>
                {t('prepare_visit.content.domicile.remboursement')}
              </p>
              <p>
                {t('prepare_visit.content.domicile.attestation')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
