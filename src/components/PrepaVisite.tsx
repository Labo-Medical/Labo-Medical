// src/PrepareAnalyses.tsx
import { useState } from "react";
import "./PrepaVisite.css";

export default function PrepareAnalyses() {
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
                À votre accueil au laboratoire, une secrétaire médicale constituera un dossier informatique complet reprenant les informations essentielles permettant une prise en charge fiable et un rendu des résultats conforme aux attentes du prescripteur. Suivez nos conseils pour préparer au mieux votre visite.
              </p>

              <h3>Documents à apporter :</h3>
              <ul>
                <li>L'ordonnance médicale comportant les analyses prescrites par votre médecin.</li>
                <li>Votre carte Vitale et/ou votre attestation de sécurité sociale.</li>
                <li>Votre attestation de mutuelle en cours de validité et/ou votre attestation CMU.</li>
                <li>Les documents de prise en charge (affection longue durée, maternité, accident du travail…).</li>
                <li>
                  Dans le cadre de la mise en place de l'INS, une pièce d'identité vous sera demandée à chaque première visite, ainsi que tous les 5 ans. Il sera également nécessaire de la représenter en cas de changement des traits d'identité ou pour certaines analyses telles que le groupe sanguin, une commission permis de conduire, etc. afin de respecter une identitovigilance stricte.
                </li>
              </ul>
              <p className="highlight">Merci de vous munir de ces documents.</p>

              <h3>Quels sont les honoraires ?</h3>
              <p>
                Les laboratoires Biogroup sont conventionnés auprès des organismes obligatoires et complémentaires. Ils appliquent les tarifs réglementés par la loi suivante : Arrêté du 03/12/87 (JO du 12/12/87).
              </p>
              <p>
                Afin de bénéficier d'une prise en charge complète, n'oubliez pas d'apporter votre carte vitale, votre attestation de mutuelle à jour, ainsi que tout document pouvant justifier de vos droits (attestation CMU, AME…).
              </p>
              <p>
                En l'absence de prescription, vous devrez régler le montant total des examens sans supplément ou dépassement d'honoraire.
              </p>
              <p>
                Si la plupart des examens est pris en charge par l'Assurance Maladie, certains d'entre eux ne donnent pas lieu à un remboursement. On dit alors qu'ils sont "Hors Nomenclature". En cas de prescription par votre médecin d'examens non remboursés par la sécurité sociale, nos secrétaires médicales vous informeront du montant des examens et demanderont votre accord à leur réalisation lors de votre enregistrement. Tous les laboratoires appartiennent à une association de gestion agréée (AGA).
              </p>

              <h3>Dois-je prendre rendez-vous ?</h3>
              <p>
                Les prélèvements s'effectuent généralement sans rendez-vous. Cependant certains examens nécessitent une prise en charge particulière. Si vous avez un doute, il est donc préférable de téléphoner à votre laboratoire.
              </p>
              <p>
                Certains laboratoires proposent des prises de rendez-vous afin de réduire le temps d'attente. Informez-vous auprès de votre laboratoire ou retrouvez ces informations sur nos fiches laboratoires.
              </p>

              <h3>Quand dois-je venir au laboratoire ?</h3>
              <p>Certaines analyses sont à faire précisément à certaines heures, à certains jours. Par exemple :</p>
              <ul>
                <li>Le cortisol est à réaliser à 8h du matin (sauf mention contraire sur l'ordonnance).</li>
                <li>Les dosages hormonaux nécessitent de respecter les jours indiqués par votre médecin : ex : J2 = 2ième jour du cycle.</li>
                <li>Le dosage de T4 libre doit être réalisé <b>avant la prise de Lévothyrox</b>.</li>
                <li>La TSH est à doser de préférence <b>le matin</b>.</li>
                <li>Pour un dosage de médicament (antirejet par exemple), la prise de sang doit avoir lieu <b>avant la prise</b>. La posologie et la date et heure de dernière prise vous seront demandées.</li>
                <li>Un prélèvement bactériologique ou mycologique doit être réalisé <b>avant la prise de l'antibiotique/antimycosique</b> (sauf avis contraire du médecin).</li>
                <li>Pour un spermogramme : un délai d'abstinence est à respecter.</li>
              </ul>
            </div>
          )}

          {activeSection === "ajeun" && (
            <div className="prepare-section animate-in">
              <h2>À jeun ?</h2>
              <p>
                L'état de jeûne est nécessaire à l'obtention d'un spécimen sanguin conforme à la réalisation de certaines analyses.
              </p>
              <p className="highlight">
                Il est défini par une absence de prise de nourriture depuis plus de 8 heures.
              </p>
              <p>Mais vous pouvez :</p>
              <ul>
                <li>Vous laver les dents.</li>
                <li>Boire de l'eau, du café ou du thé sans sucre ni lait.</li>
                <li>Prendre vos médicaments SAUF si un dosage spécifique de ceux-ci est demandé.</li>
              </ul>
              <p>
                Il sera important de signaler à votre laboratoire tout traitement en cours, en particulier ceux contenant de la BIOTINE ou vitamine B8 (QIZENDAY®, compléments alimentaires, etc.).
              </p>
              <p>
                En cas de doute sur vos examens, venez à jeun de minimum 8 heures ou contactez votre laboratoire.
              </p>
              <p>
                Retrouvez ci-dessous une liste non-exhaustive des principaux examens nécessitant d'être à jeun :
              </p>
              <ul>
                <li>CALCITONINE (Thyrocalcitonine) : Arrêt du traitement aux IPP antiulcéreux, Inhibiteurs de la Pompe à Protons depuis 15 jours (omeprazole, ésoméprazole, lanzoprazol, pentoprazol, rabéprazol).</li>
                <li>CROSSLAPS – CTX</li>
                <li>CRYOGLOBULINE</li>
                <li>GLYCEMIE A JEUN</li>
                <li>GLYCOSURIE</li>
                <li>HOMOCYSTEINE</li>
                <li>PARATHORMONE – PTH</li>
                <li>PHOSPHORE</li>
                <li>TESTOSTERONE</li>
                <li>TRIGLYCERIDES – BILAN LIPIDIQUE</li>
                <li>HELIKIT (recherche de portage de l'Helicobacter pylori – test respiratoire à l'Urée 13C – air expiré) :</li>
              </ul>
              <p>
                Il est nécessaire de venir muni du kit que vous aurez cherché à la pharmacie avec la même ordonnance.
              </p>
              <p>
                Test respiratoire à réaliser à jeun strict depuis au moins 6 heures (sans boire, ni manger, ni fumer).
              </p>
              <p>Il est impératif de respecter :</p>
              <ul>
                <li>un arrêt de tout traitement antibiotique au minimum 4 semaines avant le test.</li>
                <li>un arrêt des inhibiteurs de la pompe à protons, des anti-sécrétoires, au minimum 2 semaines avant le test (omeprazole, ésoméprazole, lanzoprazol, pentoprazol, rabéprazol).</li>
                <li>un arrêt des antiacides et pansements gastro-intestinaux 24 heures avant le test.</li>
              </ul>
            </div>
          )}

          {activeSection === "enfants" && (
            <div className="prepare-section animate-in">
              <h2>Le prélèvement des enfants</h2>
              <p>Nos préleveurs sont formés aux prélèvements pédiatriques sur les tout petits.</p>
              <h3>Comment vous pouvez aider votre enfant ?</h3>
              <p>
                Il est très important de pouvoir gérer votre réaction face à une situation stressante pour vous et pour votre enfant. Les enfants sont très sensibles au stress de leur parent. Plus vous serez détendu, plus votre enfant le sera lui aussi.
              </p>
              <h4>Le préparer :</h4>
              <p>
                il est préférable d'informer votre enfant à l'avance qu'il va faire une prise de sang et lui expliquer pourquoi il doit la réaliser. Si votre enfant sait à quoi s'attendre, il sera probablement moins inquiet de ce qu'il va se passer. Nous vous recommandons de prévenir votre enfant 1 à 2 jours avant la prise de sang.
              </p>
              <h4>Lui expliquer l'acte :</h4>
              <p>
                soyez honnête avec votre enfant et expliquez-lui le déroulement d'une prise de sang. Utilisez des mots rassurants qu'il pourra comprendre. Vous pourrez lui expliquer ce qu'il va voir, sentir et entendre tout le long de l'acte.
              </p>
              <h4>Le rassurer :</h4>
              <p>
                il est important de rassurer votre enfant sur la durée d'une prise de sang, qui dure en général seulement quelques minutes.
              </p>
              <p>
                Vous pourrez également l'habituer aux aiguilles et autres équipements médicaux, en lui montrant sous forme de jouet.
              </p>
              <p>
                Vous pourrez aussi lui dire qu'il a le droit de ne pas aimer ce qui se passe et de s'exprimer s'il a mal. L'enfant appréhendera moins la prise de sang s'il sait qu'il pourra exprimer ce qu'il ressent. En revanche il sera important de lui dire que son rôle le plus important est de ne pas bouger durant la prise de sang.
              </p>
              <h4>Le distraire :</h4>
              <p>
                distraire son enfant durant une prise de sang pourra l'aider à passer l'acte en toute sérénité. Vous pourrez amener un petit jouet, son doudou, un livre… Vous pourrez également le distraire en utilisant son imagination. Demandez-lui de fermer ses yeux et vous raconter son endroit préféré.
              </p>
              <h4>Utilisation de patch EMLA :</h4>
              <p>
                L'utilisation de patch EMLA (les mêmes patchs utilisés lors des vaccins) apportent un réel confort à l'enfant. L'anesthésie locale qu'il procure rend le prélèvement totalement indolore. Ces patchs sont délivrés sur prescription médicale, il faut donc vous rapprocher de votre médecin traitant.
              </p>
            </div>
          )}

          {activeSection === "femmes-enceintes" && (
            <div className="prepare-section animate-in">
              <h2>Suivi des femmes enceintes</h2>
              <p>
                Durant la grossesse, un grand nombre d'examens biologiques sera à réaliser au laboratoire :
              </p>
              <h3>Le dosage de l'hormone HCG</h3>
              <p>
                Votre test de grossesse est positif, le premier examen à réaliser est une prise de sang permettant de doser l'hormone HCG (Hormone Chorionique Gonadotrope) afin de confirmer la grossesse.
              </p>
              <p>
                Pour évaluer la bonne tenue de l'embryon on peut renouveler le dosage des HCG deux jours après, le taux doit doubler. Il peut y avoir également une interférence ou faux positif en début de grossesse avec certains traitements de stimulation hormonale.
              </p>
              <h3>Les dépistages de la Rubéole et de la Toxoplasmose</h3>
              <p>
                Depuis plusieurs années, les dépistages de la Rubéole et de la Toxoplasmose sont devenus obligatoires en France. Ces deux maladies sont des maladies bénignes qui peuvent cependant être dangereuses pour le fœtus si elles sont contractées au cours de la grossesse. En début de grossesse, il faut donc réaliser une prise de sang afin de mesurer le taux d'anticorps anti rubéoleux et d'effectuer une sérologie de la toxoplasmose.
              </p>
              <p>
                Si vos tests sont négatifs, il faudra refaire tous les mois ces analyses pour contrôler que vous n'avez pas été contaminée.
              </p>
              <h3>Groupe sanguin</h3>
              <p>
                En début de grossesse, il vous sera également demandé de faire une prise de sang pour vérifier votre groupe sanguin et votre rhésus. Cette analyse est importante afin de déterminer une éventuelle incompatibilité sanguine entre votre fœtus et vous, mais aussi dans le cas où une hémorragie importante venait à se déclarer durant l'accouchement.
              </p>
              <h3>La recherche d'anémie et de carences</h3>
              <p>
                Un certain nombre d'examens pourra vous être prescrit permettant de dépister une anémie ou des carences. L'anémie étant fréquente chez la femme enceinte au 3ème trimestre, la NFS (Numération formule sanguine) est ainsi prescrite au cours du 6ème mois de grossesse.
              </p>
              <h3>Le dépistage du diabète gestationnel</h3>
              <p>
                Un diabète gestationnel peut apparaître durant la grossesse au cours des 2ème et 3ème trimestres. Un premier dosage de la glycémie à jeun sera réalisé dès les premières consultations puis un autre examen sera prévu entre la 24ème et 28ème semaine de grossesse. Cet examen est un dosage de la glycémie à jeun, à 1h et à 2h. Après la première prise de sang à jeun, nos équipes médicales vous apporteront une boisson sucrée qu'il faudra boire. Une prise de sang sera ensuite réalisée à 1h puis à 2h après la prise du glucose. Ceci est appelé l'Hyperglycémie provoquée par voie orale (HGPO).
              </p>
            </div>
          )}

          {activeSection === "microbio" && (
            <div className="prepare-section animate-in">
              <h2>Les analyses microbiologiques</h2>
              <p>
                Certains examens bactériologiques sont à réaliser par vos soins (recueil de selles, d'urines, expectorations…). Des kits dédiés avec des fiches de préconisations vous seront données en fonction de la prescription. D'autres analyses seront réalisées au laboratoire ou par votre infirmièr(e) à domicile.
              </p>
              <p>
                Des modalités de prélèvement spécifique sont à respecter. Elles sont décrites dans des fiches explicatives qui peuvent vous être remises au laboratoire.
              </p>
              <p>
                Tout notre personnel est à votre disposition pour vous expliquer la marche à suivre.
              </p>
              <p>
                Une fois le prélèvement réalisé chez vous, vous pourrez venir déposer vos récipients au laboratoire.
              </p>
            </div>
          )}

          {activeSection === "domicile" && (
            <div className="prepare-section animate-in">
              <h2>Le prélèvement à domicile</h2>
              <p>
                Certains de nos laboratoires proposent d'effectuer certains prélèvements sanguins à domicile sur rendez-vous.
              </p>
              <p>
                En prenant rendez-vous dans votre laboratoire ou par téléphone, renseignez-vous si votre laboratoire propose ce service. Si oui, il faudra alors préciser la liste des examens prescrits afin que l'on puisse vous renseigner sur votre préparation avant le prélèvement.
              </p>
              <p>
                Un créneau horaire vous sera donné en fonction de la programmation des tournées du préleveur.
              </p>
              <p>
                Le déplacement vous sera remboursé s'il est précisé sur l'ordonnance « prélèvement à domicile » ou vous sera facturé en supplément.
              </p>
              <p>
                Il vous sera demandé de préparer une copie de votre attestation de sécurité sociale et de votre mutuelle, pour que nous puissions prendre en charge le Tiers-Payant.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
