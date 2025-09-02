import React, { useState, useEffect } from "react";
import "./Faq.css";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

// Questions/réponses par défaut - Avant le prélèvement
const faqBeforeFallback: FAQItem[] = [
  {
    question: "J’ai plusieurs ordonnances de médecins différents, que dois-je faire ?",
    answer: (
      <p>
        Il n’y a aucun problème, nous ferons un dossier pour chacune des ordonnances. 
        Chaque médecin aura les résultats des analyses qu’il a demandées. Nous ne les facturerons qu’une seule fois. 
        C’est totalement transparent pour vous, tout se passe au secrétariat. Nous ne vous prélèverons qu’une seule fois.
      </p>
    ),
  },
  {
    question: "Puis-je être accompagné et allongé ?",
    answer: (
      <p>
        Vous pouvez tout-à-fait être accompagné dans la mesure où l’accompagnant ne dérange pas la bonne réalisation du prélèvement. Si besoin, tous les laboratoires du groupe Zeroual ont des salles de prélèvement avec des fauteuils que l’on peut incliner ou des lits pour vous allonger. Pensez simplement à nous avertir ou à nous le demander.
      </p>
    ),
  },
  {
    question: "Vais-je attendre longtemps ?",
    answer: (
      <p>
        Toutes nos équipes font le maximum pour minimiser l’attente. Cependant, un temps minimum est nécessaire pour assurer le maximum de sécurité, pour vous comme pour nous (vérifications des informations d’identité, prise en charge, acte de prise de sang sans précipitation, étiquetage des tubes…). De plus, le nombre de préleveurs est en accord avec les prévisions d’affluence au laboratoire.
      </p>
    ),
  },
  {
    question: "Puis-je venir à n’importe quelle heure ?",
    answer: (
      <p>
        Nous vous accueillons 7j/7 & 24h/24. Le détail est à vérifier auprès de chaque laboratoire dans la rubrique <a href="/contact">Trouver un laboratoire</a>. Les prises de sang peuvent être réalisées pour la plupart sans contrainte horaire, en respectant les conditions de jeûne éventuelles. Les prélèvements en vue de certaines analyses doivent cependant respecter des contraintes d’horaires : certains paramètres varient au cours de la journée. Renseignez-vous auprès de votre laboratoire ou sur la rubrique <a href="#">Préparez vos analyses</a>.<br /><br />
        Afin d’assurer une fiabilité optimale des résultats en évitant le stockage de votre prélèvement sur site, certains laboratoires ne réaliseront plus les prises de sang à partir d’une certaine heure. En effet, votre prélèvement ne pourra plus être envoyé à temps au plateau technique. Renseignez-vous sur les heures limites de prélèvements.
      </p>
    ),
  },
  {
    question: "La prise de sang et mes médicaments",
    answer: (
      <p>
        Avant votre prise de sang, vous pouvez prendre les médicaments qui vous ont été préconisés. Toutefois, il existe une exception : le prélèvement sanguin doit être réalisé AVANT la prise habituelle du traitement si votre ordonnance précise qu’il s’agit d’un dosage du médicament lui-même.<br /><br />
        Il sera important de signaler à votre laboratoire tout traitement en cours, en particulier ceux contenant de la BIOTINE ou vitamine B8 (QIZENDAY®, compléments alimentaires, etc.).<br /><br />
        Si vous avez un doute, demandez conseil à votre médecin et/ou biologiste.
      </p>
    ),
  },
  {
    question: "Je suis mineur",
    answer: (
      <p>
        Un prélèvement sur un mineur ne peut être effectué sans la présence d’un parent responsable, ou dans le cadre du planning familial, mais toujours accompagné d’un adulte. Les résultats seront transmis au médecin prescripteur ou au responsable légal.
      </p>
    ),
  },
  {
    question: "J’aimerais faire une analyse, mais je n’ai pas d’ordonnance",
    answer: (
      <p>
        Pour une analyse dite « courante » (bêta-HCG, glycémie, cholestérol, HIV…) : il n’y a aucun problème, nous ferons l’analyse que vous nous demandez. Elle vous sera tarifiée selon sa cotation à la Nomenclature de Biologie Médicale.<br /><br />
        Pour une demande plus particulière, à partir du moment où l’analyse est réalisable au Maroc dans un laboratoire agréé, nous vous proposerons un devis. L’analyse sera tarifiée selon sa cotation à la Nomenclature de Biologie Médicale ou selon sa cotation par le Laboratoire exécutant, majorée des éventuels frais de transmission. Dans tous les cas, rien ne sera réalisé sans votre accord ni validation du tarif annoncé.<br /><br />
        Pour une analyse réalisée dans un laboratoire étranger ou hors parcours de soins, prenez contact avec votre Biologiste.
      </p>
    ),
  },
  {
    question: "Dois-je prendre rendez-vous au laboratoire ?",
    answer: (
      <p>
        Les laboratoires Zeroual vous accueillent toute la journée sans RDV. Certains laboratoires peuvent proposer des prises de rendez-vous afin de faciliter votre passage.<br /><br />
        Pour les prises de sang chez les enfants de moins de 5 ans et les prélèvements bactériologiques, quel que soit l’âge, une prise de rendez-vous est parfois nécessaire.<br /><br />
        Pour voir les horaires ou prendre rendez-vous, sélectionnez votre laboratoire dans la liste de <a href="/rdv">Trouver un laboratoire</a>.
      </p>
    ),
  },
  {
    question: "Quels examens nécessitent d’être à jeun ?",
    answer: (
      <div>
        <p>
          L’état de jeûne est nécessaire à l’obtention d’un spécimen sanguin conforme à la réalisation de certaines analyses.<br />
          <strong>Il est défini par une absence de prise de nourriture depuis 8 à 12 heures.</strong>
        </p>
        <ul>
          <li>CALCITONINE (Thyrocalcitonine) : Arrêt du traitement aux IPP antiulcéreux, Inhibiteurs de la Pompe à Protons depuis 15 jours (omeprazole, ésoméprazole, lanzoprazol, pentoprazol, rabéprazol).</li>
          <li>CROSSLAPS – CTX</li>
          <li>CRYOGLOBULINE</li>
          <li>GLYCEMIE A JEUN</li>
          <li>HELIKIT : Pas de tabac depuis la veille au soir, arrêt du traitement aux IPP antiulcéreux (Inhibiteurs de la Pompe à Protons depuis 15 jours : omeprazole, ésoméprazole, lanzoprazol, pentoprazol, rabéprazol).</li>
          <li>HOMOCYSTEINE</li>
          <li>PARATHORMONE – PTH</li>
          <li>PHOSPHORE</li>
          <li>TESTOSTERONE</li>
          <li>TRIGLYCERIDES – BILAN LIPIDIQUE</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Je suis une personne à handicap, comment puis-je être accueillie ?",
    answer: (
      <p>
        Tous nos laboratoires proposent une solution pour nos patients à handicap. Le registre public d’accessibilité du laboratoire peut vous être fourni sur demande. N’hésitez pas à contacter le laboratoire pour organiser votre prélèvement dans les meilleures conditions.
      </p>
    ),
  },
];

// Questions/réponses par défaut - Après le prélèvement
const faqAfterFallback: FAQItem[] = [
  {
    question: "Il m’est arrivé d’avoir un bleu après un prélèvement",
    answer: (
      <p>
        Si la veine ne se referme pas assez vite ou si le prélèvement a été difficile, un bleu peut apparaître. Nos préleveurs font tout pour éviter ce genre d’inconvénients. Le bleu vient de l’accumulation de sang entre la paroi de la veine et la peau. Il peut être impressionnant mais n’est jamais grave et disparaît spontanément.<br /><br />
        Afin de minimiser l’apparition de ces hématomes, il est recommandé d’exercer une pression pendant plusieurs minutes après la prise de sang.
      </p>
    ),
  },
  {
    question: "Quand et comment vais-je recevoir mes résultats ?",
    answer: (
      <p>
        Classiquement, vous recevrez vos résultats le jour même, par voie électronique, plus rapide et plus écologique, sous forme de mail crypté ou en accédant au serveur de résultat sécurisé de votre laboratoire. Certains examens plus spécialisés peuvent demander un délai supplémentaire.<br /><br />
        Vous avez également la possibilité de venir chercher vos résultats au laboratoire. Dans ce cas, il faudra le signaler à la secrétaire d’accueil, qui vous remettra un coupon garantissant votre confidentialité. Le laboratoire peut aussi vous adresser les résultats par courrier postal avec un délai rallongé de 2 à 3 jours après validation du dossier. Des frais d’envois postaux de 2€ par résultat pourront vous être demandés.<br /><br />
        Dans le cas de résultats préoccupants ou s’ils le jugent nécessaire, les biologistes du laboratoire peuvent être amenés à contacter votre médecin ou un médecin de garde ou vous-même directement par téléphone.
      </p>
    ),
  },
  {
    question: "Quelqu’un au laboratoire peut-il m’interpréter les résultats ?",
    answer: (
      <p>
        Bien sûr, les biologistes des laboratoires Zeroual sont disponibles pour répondre à l’ensemble de vos questions et interpréter en toute confidentialité vos résultats. Demandez-le à l’accueil !
      </p>
    ),
  },
  {
    question: "Que se passe-t-il en cas d’anomalie importante sur un résultat ?",
    answer: (
      <p>
        Votre médecin prescripteur est systématiquement prévenu en cas d’anomalie importante sur votre résultat. Au cas où il ne serait pas joignable, le laboratoire vous contactera pour vous prévenir et vous donner les directives à suivre : reprendre un RDV avec votre médecin, contacter SOS médecin, aller directement aux urgences…
      </p>
    ),
  },
  {
    question: "Comment faire une demande d’accès à mon dossier médical ?",
    answer: (
      <div>
        <p>
          Pour accéder à votre dossier médical, vous pouvez remplir les formulaires suivants et les transmettre par email ou par courrier à votre laboratoire :
        </p>
        <ul>
          <li>Formulaire d’accès au dossier médical par le patient</li>
          <li>Formulaire d’accès au dossier médical d’un patient décédé par les ayants droit</li>
          <li>Formulaire d’opposition du patient à la communication de son dossier médical après son décès</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Comment signaler une non-conformité ou faire une réclamation ?",
    answer: (
      <p>
        Pour toute réclamation ou signalement d’une non-conformité, nous vous invitons à remplir le formulaire sur notre espace dédié :<br />
        <a href="#">Déposez une réclamation &gt;…</a>
      </p>
    ),
  },
  {
    question: "J’ai reçu mon compte-rendu chiffré, pourquoi ?",
    answer: (
      <p>
        Le laboratoire vous a transmis votre compte-rendu d’examens sous la forme d’un fichier PDF chiffré joint au courrier électronique de notification. Pour vous protéger, ce chiffrement permet que ce document médical ne soit pas directement lisible ou indexé sur Internet.<br /><br />
        Seul le destinataire du courrier électronique est en mesure d’associer le fichier reçu et la clef (improprement appelée mot-de-passe) nécessaire à son ouverture. La solution technique Adobe ne permet pas la suppression ou la modification de la clef de chiffrement. Le fichier reste donc protégé lors de son stockage sur votre ordinateur. En contrepartie, il n’est pas réutilisable ou diffusible à un tiers, sauf à lui transmettre en même temps votre clef de chiffrement personnelle.<br /><br />
        Si vous souhaitez conserver dans votre dossier médical des documents non chiffrés, vous devez utiliser le serveur de résultats du laboratoire. Celui-ci vous permet l’accès à la totalité de votre dossier médical et vous donne la possibilité de télécharger des pièces non protégées.
      </p>
    ),
  },
  {
    question: "Que faire si j’ai égaré la clé de chiffrement de mes comptes-rendus ?",
    answer: (
      <p>
        Le laboratoire vous a transmis votre compte-rendu d’examens sous la forme d’un fichier PDF chiffré joint au courrier électronique de notification.<br /><br />
        Le PDF n’est pas lisible, sauf à connaître la clef de déchiffrement. Nous vous invitons à joindre le secrétariat du laboratoire qui pourra vous indiquer la marche à suivre pour retrouver la clef utilisée au moment de l’envoi de vos documents.
      </p>
    ),
  },
];

// Fonction simulée de fetch - remplace par ta fonction fetch réelle depuis Strapi
async function fetchFAQFromStrapi(): Promise<
  { id: number; attributes: { question: string; answer: string; category: "before" | "after" } }[]
> {
  // Exemple fetch : const res = await fetch("http://localhost:1337/api/faqs?populate=*");
  // const json = await res.json();
  // return json.data;

  // Pour le moment retourne un tableau vide pour forcer fallback
  return [];
}

export default function FAQTwoColumns() {
  const [faqBefore, setFaqBefore] = useState<FAQItem[]>(faqBeforeFallback);
  const [faqAfter, setFaqAfter] = useState<FAQItem[]>(faqAfterFallback);

  const [openBefore, setOpenBefore] = useState<number | null>(null);
  const [openAfter, setOpenAfter] = useState<number | null>(null);

  useEffect(() => {
    fetchFAQFromStrapi()
      .then((data) => {
        if (!data || data.length === 0) return; // fallback

        const before = data
          .filter((item) => item.attributes.category === "before")
          .map((item) => ({
            question: item.attributes.question,
            answer: <div dangerouslySetInnerHTML={{ __html: item.attributes.answer }} />,
          }));

        const after = data
          .filter((item) => item.attributes.category === "after")
          .map((item) => ({
            question: item.attributes.question,
            answer: <div dangerouslySetInnerHTML={{ __html: item.attributes.answer }} />,
          }));

        if (before.length > 0) setFaqBefore(before);
        if (after.length > 0) setFaqAfter(after);
      })
      .catch((err) => {
        console.error("Erreur récupération FAQ Strapi, fallback aux données locales.", err);
      });
  }, []);

  const toggleBefore = (index: number) => {
    setOpenBefore(openBefore === index ? null : index);
  };

  const toggleAfter = (index: number) => {
    setOpenAfter(openAfter === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Foire aux questions</h1>
      <div className="faq-columns">
        <section className="faq-column" aria-labelledby="faq-before-title">
          <h2 id="faq-before-title" className="faq-column-title">Avant le prélèvement</h2>
          {faqBefore.map((item, idx) => (
            <div key={idx} className="faq-item">
              <button
                className={`faq-question ${openBefore === idx ? "open" : ""}`}
                onClick={() => toggleBefore(idx)}
                aria-expanded={openBefore === idx}
                aria-controls={`before-answer-${idx}`}
                id={`before-question-${idx}`}
              >
                {item.question}
                <span className={`faq-arrow ${openBefore === idx ? "rotated" : ""}`} aria-hidden="true">▼</span>
              </button>
              <div
                id={`before-answer-${idx}`}
                role="region"
                aria-labelledby={`before-question-${idx}`}
                className={`faq-answer ${openBefore === idx ? "show" : ""}`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </section>

        <section className="faq-column" aria-labelledby="faq-after-title">
          <h2 id="faq-after-title" className="faq-column-title">Après le prélèvement</h2>
          {faqAfter.map((item, idx) => (
            <div key={idx} className="faq-item">
              <button
                className={`faq-question ${openAfter === idx ? "open" : ""}`}
                onClick={() => toggleAfter(idx)}
                aria-expanded={openAfter === idx}
                aria-controls={`after-answer-${idx}`}
                id={`after-question-${idx}`}
              >
                {item.question}
                <span className={`faq-arrow ${openAfter === idx ? "rotated" : ""}`} aria-hidden="true">▼</span>
              </button>
              <div
                id={`after-answer-${idx}`}
                role="region"
                aria-labelledby={`after-question-${idx}`}
                className={`faq-answer ${openAfter === idx ? "show" : ""}`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
