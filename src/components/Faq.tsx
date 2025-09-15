// src/Faq.tsx
import React, { useState, useEffect } from "react";
import "./Faq.css";
import { useTranslation } from "react-i18next";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

// === FAQ "Avant le prélèvement" ===
const faqBeforeFallback: FAQItem[] = [
  {
    question: "J’ai plusieurs ordonnances de médecins différents, que dois-je faire ?",
    answer: (
      <p>
        Pas de souci : nous enregistrons chaque ordonnance dans votre dossier et
        chaque médecin recevra uniquement les résultats des analyses qu’il a prescrites.
        Le prélèvement ne sera fait qu’une seule fois et vous ne serez pas facturé deux fois.
      </p>
    ),
  },
  {
    question: "Puis-je être accompagné et allongé ?",
    answer: (
      <p>
        Oui, vous pouvez être accompagné si cela ne gêne pas le bon déroulement du
        prélèvement. En cas de besoin, les laboratoires Zéroual disposent de fauteuils inclinables ou de lits permettant de
        réaliser le prélèvement en position allongée. Signalez-le à l’accueil.
      </p>
    ),
  },
  {
    question: "Vais-je attendre longtemps ?",
    answer: (
      <p>
        Nos équipes font le maximum pour limiter votre attente. Un temps minimum reste
        toutefois nécessaire pour garantir la sécurité : vérification de l’identité,
        enregistrement administratif (CNSS, CNOPS, AMO, assurance privée), étiquetage
        des tubes, prélèvement sans précipitation…
      </p>
    ),
  },
  {
    question: "Puis-je venir à n’importe quelle heure ?",
    answer: (
      <p>
        Notre laboratoire à Kawassim vous accueillent 7j/7 & 24h24. Certains
        prélèvements peuvent être réalisés à tout moment, mais d’autres nécessitent
        des horaires spécifiques (ex. cortisol le matin à 8h, tests hormonaux à des
        jours précis du cycle).  
        Renseignez-vous auprès de votre laboratoire
        <a href="/contact">Trouver un laboratoire</a>.
      </p>
    ),
  },
  {
    question: "La prise de sang et mes médicaments",
    answer: (
      <p>
        Vous pouvez en général prendre vos médicaments avant la prise de sang.  
        <b>Exception :</b> si le dosage du médicament est demandé (par ex. anti-rejet),
        le prélèvement doit se faire <b>avant la prise</b>.  
        Signalez toujours vos traitements en cours, en particulier ceux contenant de la
        biotine (vitamine B8).
      </p>
    ),
  },
  {
    question: "Je suis mineur",
    answer: (
      <p>
        Un prélèvement chez un mineur doit être fait en présence d’un parent ou d’un
        représentant légal. Les résultats seront transmis uniquement au médecin prescripteur
        ou au représentant légal.
      </p>
    ),
  },
  {
    question: "J’aimerais faire une analyse sans ordonnance",
    answer: (
      <p>
        Pour certaines analyses courantes (bêta-HCG, glycémie, cholestérol, VIH…),
        vous pouvez venir sans ordonnance.  
        Elles seront à votre charge, selon la tarification en vigueur.  
        Pour des examens spécifiques, un devis vous sera proposé avant réalisation,
        surtout s’ils doivent être envoyés à un laboratoire spécialisé.
      </p>
    ),
  },
  {
    question: "Dois-je prendre rendez-vous au laboratoire ?",
    answer: (
      <p>
        La majorité des prélèvements se fait sans rendez-vous.  
        Toutefois, certains examens (spermogramme, prélèvements bactériologiques,
        enfants de moins de 5 ans) nécessitent une prise de rendez-vous.  
        Vérifiez auprès de votre laboratoire ou via la rubrique{" "}
        <a href="/rdv">Prendre rendez-vous</a>.
      </p>
    ),
  },
  {
    question: "Quels examens nécessitent d’être à jeun ?",
    answer: (
      <div>
        <p>
          Le jeûne correspond à une absence d’alimentation depuis 8 à 12h (eau autorisée).  
          Exemples d’analyses nécessitant le jeûne :
        </p>
        <ul>
          <li>Glycémie à jeun</li>
          <li>Bilan lipidique (cholestérol, triglycérides)</li>
          <li>Homocystéine</li>
          <li>Phosphore</li>
          <li>Parathormone (PTH)</li>
          <li>Calcitonine</li>
          <li>Test Helicobacter pylori (Helikit)</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Je suis une personne à mobilité réduite, comment suis-je accueilli ?",
    answer: (
      <p>
        Notre réseau de laboratoires dispose des accès adaptés aux personnes à
        mobilité réduite. N’hésitez pas à prévenir l’accueil avant votre visite afin
        d’organiser au mieux votre prise en charge.
      </p>
    ),
  },
];

// === FAQ "Après le prélèvement" ===
const faqAfterFallback: FAQItem[] = [
  {
    question: "J’ai eu un bleu après le prélèvement, est-ce normal ?",
    answer: (
      <p>
        Cela peut arriver si la veine ne se referme pas rapidement.  
        Le bleu est lié à une petite diffusion de sang sous la peau.  
        Il est impressionnant mais sans gravité, et disparaît spontanément.  
        Pour limiter ce risque, il est conseillé d’exercer une pression ferme sur le
        point de ponction pendant quelques minutes.
      </p>
    ),
  },
  {
    question: "Quand et comment vais-je recevoir mes résultats ?",
    answer: (
      <p>
        Dans la majorité des cas, vos résultats sont disponibles le jour même ou le
        lendemain, selon les analyses.  
        Vous pouvez les recevoir via notre serveur sécurisé en ligne, par email crypté
        ou directement à l’accueil du laboratoire.  
        Certains examens spécialisés nécessitent un délai supplémentaire.
      </p>
    ),
  },
  {
    question: "Un biologiste peut-il m’expliquer mes résultats ?",
    answer: (
      <p>
        Oui, les biologistes du laboratoire sont disponibles pour commenter vos
        résultats en toute confidentialité. N’hésitez pas à en faire la demande à
        l’accueil ou par téléphone.
      </p>
    ),
  },
  {
    question: "Que se passe-t-il en cas de résultat anormal ?",
    answer: (
      <p>
        En cas d’anomalie significative, le biologiste prévient votre médecin
        prescripteur. Si celui-ci est injoignable, le laboratoire pourra vous
        contacter directement pour vous conseiller (consulter rapidement votre médecin,
        aller aux urgences…).
      </p>
    ),
  },
  {
    question: "Comment accéder à mon dossier médical ?",
    answer: (
      <p>
        Vous pouvez demander une copie de votre dossier médical auprès du laboratoire,
        en présentant une pièce d’identité.  
        Les résultats ne sont communiqués qu’au patient, à son représentant légal ou
        au médecin prescripteur.
      </p>
    ),
  },
  {
    question: "Comment signaler une réclamation ?",
    answer: (
      <p>
        Pour toute réclamation ou remarque sur votre prise en charge, adressez-vous à
        l’accueil ou utilisez notre formulaire en ligne
        <a href="/contact">Contact</a>.  
        Votre demande sera traitée en toute confidentialité.
      </p>
    ),
  },
  {
    question: "J’ai reçu mes résultats chiffrés, pourquoi ?",
    answer: (
      <p>
        Pour protéger la confidentialité de vos données médicales, nos
        laboratoires envoient les résultats sous forme de PDF sécurisé par mot de passe.  
        Vous pouvez également les consulter directement sur le serveur sécurisé du
        laboratoire, sans chiffrement.
      </p>
    ),
  },
];

export default function FAQTwoColumns() {
  const { t } = useTranslation();
  const [faqBefore, setFaqBefore] = useState<FAQItem[]>(faqBeforeFallback);
  const [faqAfter, setFaqAfter] = useState<FAQItem[]>(faqAfterFallback);

  const [openBefore, setOpenBefore] = useState<number | null>(null);
  const [openAfter, setOpenAfter] = useState<number | null>(null);

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
        {/* Avant prélèvement */}
        <section className="faq-column" aria-labelledby="faq-before-title">
          <h2 id="faq-before-title" className="faq-column-title">
            Avant le prélèvement
          </h2>
          {faqBefore.map((item, idx) => (
            <div key={idx} className="faq-item">
              <button
                className={`faq-question ${openBefore === idx ? "open" : ""}`}
                onClick={() => toggleBefore(idx)}
              >
                {item.question}
                <span className={`faq-arrow ${openBefore === idx ? "rotated" : ""}`}>
                  ▼
                </span>
              </button>
              <div className={`faq-answer ${openBefore === idx ? "show" : ""}`}>
                {item.answer}
              </div>
            </div>
          ))}
        </section>

        {/* Après prélèvement */}
        <section className="faq-column" aria-labelledby="faq-after-title">
          <h2 id="faq-after-title" className="faq-column-title">
            Après le prélèvement
          </h2>
          {faqAfter.map((item, idx) => (
            <div key={idx} className="faq-item">
              <button
                className={`faq-question ${openAfter === idx ? "open" : ""}`}
                onClick={() => toggleAfter(idx)}
              >
                {item.question}
                <span className={`faq-arrow ${openAfter === idx ? "rotated" : ""}`}>
                  ▼
                </span>
              </button>
              <div className={`faq-answer ${openAfter === idx ? "show" : ""}`}>
                {item.answer}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
