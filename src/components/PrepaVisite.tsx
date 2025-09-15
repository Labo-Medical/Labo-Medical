// src/PrepareAnalyses.tsx
import { useState } from "react";
import "./PrepaVisite.css";
import { useTranslation } from "react-i18next";

export default function PrepareAnalyses() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("preparer");

  const sections = [
    { id: "preparer", label: "Préparer votre visite" },
    { id: "ajeun", label: "À jeun ?" },
    { id: "enfants", label: "Le prélèvement des enfants" },
    { id: "femmes-enceintes", label: "Suivi des femmes enceintes" },
    { id: "microbio", label: "Les analyses microbiologiques" },
    { id: "domicile", label: "Le prélèvement à domicile" },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="prepare-container">
      <div className="prepare-header">
        <h1>Je prépare mes analyses</h1>
        <p>
          Retrouvez les informations et conseils pratiques à suivre pour faciliter vos démarches au laboratoire.
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
              <h2>Préparer votre visite</h2>
              <p>
                À votre arrivée au laboratoire, une secrétaire médicale constituera un
          dossier reprenant vos informations essentielles permettant une prise
          en charge fiable et un rendu des résultats conformes aux attentes de
          votre médecin. Suivez nos conseils pour préparer au mieux votre visite.
              </p>

              <h3>Documents à apporter :</h3>
              <ul>
                <li>
                  L'ordonnance médicale comportant les analyses prescrites par votre
                  médecin.
                </li>
                <li>
                  Votre carte d’assurance maladie (CNSS, CNOPS, AMO/RAMED) ou
                  attestation de votre mutuelle privée.
                </li>
                <li>
                  Les documents de prise en charge s’il y a lieu (maternité, accident
                  de travail, maladie chronique…).
                </li>
                <li>
                  Une pièce d’identité en cours de validité (CIN, passeport, carte de
                  séjour).
                </li>
              </ul>
              <p className="highlight">Merci de vous munir de ces documents.</p>

              <h3>Quels sont les honoraires ?</h3>
               <p>
                Les laboratoires Zeroual sont conventionnés
                avec les principaux organismes de couverture médicale au Maroc (CNSS,
                CNOPS, AMO, mutuelles et assurances privées).
              </p>
              <p>
                En l’absence de prescription médicale, les examens restent à votre
                charge et devront être réglés directement au laboratoire.
              </p>

              <h3>Dois-je prendre rendez-vous ?</h3>
              <p>
                La plupart des prélèvements s’effectuent sans rendez-vous. Toutefois,
                certains examens nécessitent une organisation spécifique (ex.
                spermogramme, tests dynamiques, charges virales). En cas de doute, il
                est préférable d’appeler votre laboratoire.
              </p>
              <p>
                Certains laboratoires (comme Labonord Tanger) proposent la prise de
                rendez-vous afin de réduire le temps d’attente. Renseignez-vous auprès
                de votre laboratoire.
              </p>

        <h3>Quand dois-je venir au laboratoire ?</h3>
        <p>
          Certaines analyses doivent être réalisées à des horaires précis. Par
          exemple :
        </p>
        <ul>
          <li>
            Le cortisol est à réaliser à 8h du matin (sauf indication contraire
            du médecin).
          </li>
          <li>
            Les dosages hormonaux nécessitent de respecter les jours indiqués
            par votre médecin (ex. J2 = 2ᵉ jour du cycle).
          </li>
          <li>
            Le dosage de T4 libre doit être réalisé <b>avant la prise du
            Levothyrox</b>.
          </li>
          <li>La TSH est à doser de préférence <b>le matin</b>.</li>
          <li>
            Pour un dosage de médicament (ex. anti-rejet), la prise de sang doit
            avoir lieu <b>avant la prise</b>. La posologie et l’heure de la
            dernière prise vous seront demandées.
          </li>
          <li>
            Un prélèvement bactériologique ou mycologique doit être réalisé{" "}
            <b>avant la prise de l’antibiotique ou de l’antimycosique</b> (sauf
            avis contraire du médecin).
          </li>
          <li>
            Pour un spermogramme : un délai d’abstinence de 3 à 5 jours est
            requis.
          </li>
        </ul>
            </div>
          )}

          {activeSection === "ajeun" && (
            <div className="prepare-section animate-in">
              <h2>À jeun ?</h2>
                <p>
                  L’état de jeûne est nécessaire à l’obtention de certains résultats
                  fiables.
                </p>
                <p className="highlight">
                  Le jeûne correspond à une absence de prise de nourriture depuis au
                  moins 8 heures.
                </p>
                <p>Vous pouvez toutefois :</p>
                <ul>
                  <li>Vous laver les dents.</li>
                  <li>Boire de l’eau, du café ou du thé sans sucre ni lait.</li>
                  <li>
                    Prendre vos médicaments <b>sauf</b> si un dosage spécifique est
                    demandé.
                  </li>
                </ul>
                <p>
                  Signalez à votre laboratoire tout traitement en cours, en particulier
                  ceux contenant de la biotine (vitamine B8).
                </p>
                <p>Voici quelques examens nécessitant d’être réalisés à jeun :</p>
                <ul>
                  <li>Glycémie à jeun</li>
                  <li>Bilan lipidique (cholestérol, triglycérides)</li>
                  <li>Calcitonine</li>
                  <li>Homocystéine</li>
                  <li>Phosphore</li>
                  <li>Parathormone (PTH)</li>
                  <li>Test de l’Helicobacter pylori (Helikit)</li>
                </ul>
                <p>
                  Pour le test respiratoire <b>Helikit</b>, il faut être strictement à
                  jeun depuis au moins 6 heures et respecter l’arrêt des antibiotiques
                  (4 semaines avant), des inhibiteurs de pompe à protons (2 semaines
                  avant), et des antiacides (24h avant).
                </p>
            </div>
          )}

          {activeSection === "enfants" && (
            <div className="prepare-section animate-in">
              <h2>Le prélèvement des enfants</h2>
              <p>
                Nos préleveurs sont formés aux prélèvements pédiatriques, même pour
                les tout-petits.
              </p>
              <h3>Comment aider votre enfant ?</h3>
              <p>
                Prévenez votre enfant 1 à 2 jours avant la prise de sang, expliquez-lui
                avec des mots simples et rassurants, et préparez un jouet, un doudou ou
                un livre pour le distraire.
              </p>
              <p>
                Un patch anesthésiant (type EMLA), disponible en pharmacie sur
                prescription médicale, peut être utilisé pour réduire la douleur.
              </p>
                  </div>
                )}

          {activeSection === "femmes-enceintes" && (
            <div className="prepare-section animate-in">
              <h2>Suivi des femmes enceintes</h2>
              <p>Pendant la grossesse, plusieurs examens biologiques sont réalisés :</p>
                <ul>
                  <li>
                    <b>Dosage HCG</b> : confirmer la grossesse.
                  </li>
                  <li>
                    <b>Sérologies</b> : dépistage toxoplasmose, rubéole, hépatite B, VIH,
                    syphilis…
                  </li>
                  <li>
                    <b>Groupe sanguin et rhésus</b> : indispensable en début de grossesse.
                  </li>
                  <li>
                    <b>NFS (numération sanguine)</b> : dépistage de l’anémie (fréquente au
                    3ᵉ trimestre).
                  </li>
                  <li>
                    <b>Dépistage diabète gestationnel</b> : glycémie à jeun + HGPO entre
                    24ᵉ et 28ᵉ semaine.
                  </li>
                </ul>

            </div>
          )}

          {activeSection === "microbio" && (
            <div className="prepare-section animate-in">
              <h2>Les analyses microbiologiques</h2>
              <p>
                Certains prélèvements (urines, selles, expectorations…) doivent être
                réalisés par vos soins, à domicile, à l’aide de kits fournis par le
                laboratoire avec notice explicative.
              </p>
              <p>
                Nos équipes sont disponibles pour vous expliquer les modalités et
                recevoir vos échantillons.
              </p>
            </div>
          )}

          {activeSection === "domicile" && (
            <div className="prepare-section animate-in">
              <h2>Le prélèvement à domicile</h2>
              <p>
                Nos laboratoires proposent un service de prélèvement sanguin à
                domicile sur rendez-vous.
              </p>
              <p>
                Le rendez-vous doit être pris à l’avance en précisant la liste des
                analyses prescrites. Un créneau horaire vous sera communiqué selon la
                tournée du préleveur.
              </p>
              <p>
                Les prélèvements sont gratuits.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
