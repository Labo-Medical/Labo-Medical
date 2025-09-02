import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import "./Faq.css";
// Questions/réponses par défaut - Avant le prélèvement
const faqBeforeFallback = [
    {
        question: "J’ai plusieurs ordonnances de médecins différents, que dois-je faire ?",
        answer: (_jsx("p", { children: "Il n\u2019y a aucun probl\u00E8me, nous ferons un dossier pour chacune des ordonnances. Chaque m\u00E9decin aura les r\u00E9sultats des analyses qu\u2019il a demand\u00E9es. Nous ne les facturerons qu\u2019une seule fois. C\u2019est totalement transparent pour vous, tout se passe au secr\u00E9tariat. Nous ne vous pr\u00E9l\u00E8verons qu\u2019une seule fois." })),
    },
    {
        question: "Puis-je être accompagné et allongé ?",
        answer: (_jsx("p", { children: "Vous pouvez tout-\u00E0-fait \u00EAtre accompagn\u00E9 dans la mesure o\u00F9 l\u2019accompagnant ne d\u00E9range pas la bonne r\u00E9alisation du pr\u00E9l\u00E8vement. Si besoin, tous les laboratoires du groupe Zeroual ont des salles de pr\u00E9l\u00E8vement avec des fauteuils que l\u2019on peut incliner ou des lits pour vous allonger. Pensez simplement \u00E0 nous avertir ou \u00E0 nous le demander." })),
    },
    {
        question: "Vais-je attendre longtemps ?",
        answer: (_jsx("p", { children: "Toutes nos \u00E9quipes font le maximum pour minimiser l\u2019attente. Cependant, un temps minimum est n\u00E9cessaire pour assurer le maximum de s\u00E9curit\u00E9, pour vous comme pour nous (v\u00E9rifications des informations d\u2019identit\u00E9, prise en charge, acte de prise de sang sans pr\u00E9cipitation, \u00E9tiquetage des tubes\u2026). De plus, le nombre de pr\u00E9leveurs est en accord avec les pr\u00E9visions d\u2019affluence au laboratoire." })),
    },
    {
        question: "Puis-je venir à n’importe quelle heure ?",
        answer: (_jsxs("p", { children: ["Nous vous accueillons 7j/7 & 24h/24. Le d\u00E9tail est \u00E0 v\u00E9rifier aupr\u00E8s de chaque laboratoire dans la rubrique ", _jsx("a", { href: "/contact", children: "Trouver un laboratoire" }), ". Les prises de sang peuvent \u00EAtre r\u00E9alis\u00E9es pour la plupart sans contrainte horaire, en respectant les conditions de je\u00FBne \u00E9ventuelles. Les pr\u00E9l\u00E8vements en vue de certaines analyses doivent cependant respecter des contraintes d\u2019horaires : certains param\u00E8tres varient au cours de la journ\u00E9e. Renseignez-vous aupr\u00E8s de votre laboratoire ou sur la rubrique ", _jsx("a", { href: "#", children: "Pr\u00E9parez vos analyses" }), ".", _jsx("br", {}), _jsx("br", {}), "Afin d\u2019assurer une fiabilit\u00E9 optimale des r\u00E9sultats en \u00E9vitant le stockage de votre pr\u00E9l\u00E8vement sur site, certains laboratoires ne r\u00E9aliseront plus les prises de sang \u00E0 partir d\u2019une certaine heure. En effet, votre pr\u00E9l\u00E8vement ne pourra plus \u00EAtre envoy\u00E9 \u00E0 temps au plateau technique. Renseignez-vous sur les heures limites de pr\u00E9l\u00E8vements."] })),
    },
    {
        question: "La prise de sang et mes médicaments",
        answer: (_jsxs("p", { children: ["Avant votre prise de sang, vous pouvez prendre les m\u00E9dicaments qui vous ont \u00E9t\u00E9 pr\u00E9conis\u00E9s. Toutefois, il existe une exception : le pr\u00E9l\u00E8vement sanguin doit \u00EAtre r\u00E9alis\u00E9 AVANT la prise habituelle du traitement si votre ordonnance pr\u00E9cise qu\u2019il s\u2019agit d\u2019un dosage du m\u00E9dicament lui-m\u00EAme.", _jsx("br", {}), _jsx("br", {}), "Il sera important de signaler \u00E0 votre laboratoire tout traitement en cours, en particulier ceux contenant de la BIOTINE ou vitamine B8 (QIZENDAY\u00AE, compl\u00E9ments alimentaires, etc.).", _jsx("br", {}), _jsx("br", {}), "Si vous avez un doute, demandez conseil \u00E0 votre m\u00E9decin et/ou biologiste."] })),
    },
    {
        question: "Je suis mineur",
        answer: (_jsx("p", { children: "Un pr\u00E9l\u00E8vement sur un mineur ne peut \u00EAtre effectu\u00E9 sans la pr\u00E9sence d\u2019un parent responsable, ou dans le cadre du planning familial, mais toujours accompagn\u00E9 d\u2019un adulte. Les r\u00E9sultats seront transmis au m\u00E9decin prescripteur ou au responsable l\u00E9gal." })),
    },
    {
        question: "J’aimerais faire une analyse, mais je n’ai pas d’ordonnance",
        answer: (_jsxs("p", { children: ["Pour une analyse dite \u00AB courante \u00BB (b\u00EAta-HCG, glyc\u00E9mie, cholest\u00E9rol, HIV\u2026) : il n\u2019y a aucun probl\u00E8me, nous ferons l\u2019analyse que vous nous demandez. Elle vous sera tarifi\u00E9e selon sa cotation \u00E0 la Nomenclature de Biologie M\u00E9dicale.", _jsx("br", {}), _jsx("br", {}), "Pour une demande plus particuli\u00E8re, \u00E0 partir du moment o\u00F9 l\u2019analyse est r\u00E9alisable au Maroc dans un laboratoire agr\u00E9\u00E9, nous vous proposerons un devis. L\u2019analyse sera tarifi\u00E9e selon sa cotation \u00E0 la Nomenclature de Biologie M\u00E9dicale ou selon sa cotation par le Laboratoire ex\u00E9cutant, major\u00E9e des \u00E9ventuels frais de transmission. Dans tous les cas, rien ne sera r\u00E9alis\u00E9 sans votre accord ni validation du tarif annonc\u00E9.", _jsx("br", {}), _jsx("br", {}), "Pour une analyse r\u00E9alis\u00E9e dans un laboratoire \u00E9tranger ou hors parcours de soins, prenez contact avec votre Biologiste."] })),
    },
    {
        question: "Dois-je prendre rendez-vous au laboratoire ?",
        answer: (_jsxs("p", { children: ["Les laboratoires Zeroual vous accueillent toute la journ\u00E9e sans RDV. Certains laboratoires peuvent proposer des prises de rendez-vous afin de faciliter votre passage.", _jsx("br", {}), _jsx("br", {}), "Pour les prises de sang chez les enfants de moins de 5 ans et les pr\u00E9l\u00E8vements bact\u00E9riologiques, quel que soit l\u2019\u00E2ge, une prise de rendez-vous est parfois n\u00E9cessaire.", _jsx("br", {}), _jsx("br", {}), "Pour voir les horaires ou prendre rendez-vous, s\u00E9lectionnez votre laboratoire dans la liste de ", _jsx("a", { href: "/rdv", children: "Trouver un laboratoire" }), "."] })),
    },
    {
        question: "Quels examens nécessitent d’être à jeun ?",
        answer: (_jsxs("div", { children: [_jsxs("p", { children: ["L\u2019\u00E9tat de je\u00FBne est n\u00E9cessaire \u00E0 l\u2019obtention d\u2019un sp\u00E9cimen sanguin conforme \u00E0 la r\u00E9alisation de certaines analyses.", _jsx("br", {}), _jsx("strong", { children: "Il est d\u00E9fini par une absence de prise de nourriture depuis 8 \u00E0 12 heures." })] }), _jsxs("ul", { children: [_jsx("li", { children: "CALCITONINE (Thyrocalcitonine) : Arr\u00EAt du traitement aux IPP antiulc\u00E9reux, Inhibiteurs de la Pompe \u00E0 Protons depuis 15 jours (omeprazole, \u00E9som\u00E9prazole, lanzoprazol, pentoprazol, rab\u00E9prazol)." }), _jsx("li", { children: "CROSSLAPS \u2013 CTX" }), _jsx("li", { children: "CRYOGLOBULINE" }), _jsx("li", { children: "GLYCEMIE A JEUN" }), _jsx("li", { children: "HELIKIT : Pas de tabac depuis la veille au soir, arr\u00EAt du traitement aux IPP antiulc\u00E9reux (Inhibiteurs de la Pompe \u00E0 Protons depuis 15 jours : omeprazole, \u00E9som\u00E9prazole, lanzoprazol, pentoprazol, rab\u00E9prazol)." }), _jsx("li", { children: "HOMOCYSTEINE" }), _jsx("li", { children: "PARATHORMONE \u2013 PTH" }), _jsx("li", { children: "PHOSPHORE" }), _jsx("li", { children: "TESTOSTERONE" }), _jsx("li", { children: "TRIGLYCERIDES \u2013 BILAN LIPIDIQUE" })] })] })),
    },
    {
        question: "Je suis une personne à handicap, comment puis-je être accueillie ?",
        answer: (_jsx("p", { children: "Tous nos laboratoires proposent une solution pour nos patients \u00E0 handicap. Le registre public d\u2019accessibilit\u00E9 du laboratoire peut vous \u00EAtre fourni sur demande. N\u2019h\u00E9sitez pas \u00E0 contacter le laboratoire pour organiser votre pr\u00E9l\u00E8vement dans les meilleures conditions." })),
    },
];
// Questions/réponses par défaut - Après le prélèvement
const faqAfterFallback = [
    {
        question: "Il m’est arrivé d’avoir un bleu après un prélèvement",
        answer: (_jsxs("p", { children: ["Si la veine ne se referme pas assez vite ou si le pr\u00E9l\u00E8vement a \u00E9t\u00E9 difficile, un bleu peut appara\u00EEtre. Nos pr\u00E9leveurs font tout pour \u00E9viter ce genre d\u2019inconv\u00E9nients. Le bleu vient de l\u2019accumulation de sang entre la paroi de la veine et la peau. Il peut \u00EAtre impressionnant mais n\u2019est jamais grave et dispara\u00EEt spontan\u00E9ment.", _jsx("br", {}), _jsx("br", {}), "Afin de minimiser l\u2019apparition de ces h\u00E9matomes, il est recommand\u00E9 d\u2019exercer une pression pendant plusieurs minutes apr\u00E8s la prise de sang."] })),
    },
    {
        question: "Quand et comment vais-je recevoir mes résultats ?",
        answer: (_jsxs("p", { children: ["Classiquement, vous recevrez vos r\u00E9sultats le jour m\u00EAme, par voie \u00E9lectronique, plus rapide et plus \u00E9cologique, sous forme de mail crypt\u00E9 ou en acc\u00E9dant au serveur de r\u00E9sultat s\u00E9curis\u00E9 de votre laboratoire. Certains examens plus sp\u00E9cialis\u00E9s peuvent demander un d\u00E9lai suppl\u00E9mentaire.", _jsx("br", {}), _jsx("br", {}), "Vous avez \u00E9galement la possibilit\u00E9 de venir chercher vos r\u00E9sultats au laboratoire. Dans ce cas, il faudra le signaler \u00E0 la secr\u00E9taire d\u2019accueil, qui vous remettra un coupon garantissant votre confidentialit\u00E9. Le laboratoire peut aussi vous adresser les r\u00E9sultats par courrier postal avec un d\u00E9lai rallong\u00E9 de 2 \u00E0 3 jours apr\u00E8s validation du dossier. Des frais d\u2019envois postaux de 2\u20AC par r\u00E9sultat pourront vous \u00EAtre demand\u00E9s.", _jsx("br", {}), _jsx("br", {}), "Dans le cas de r\u00E9sultats pr\u00E9occupants ou s\u2019ils le jugent n\u00E9cessaire, les biologistes du laboratoire peuvent \u00EAtre amen\u00E9s \u00E0 contacter votre m\u00E9decin ou un m\u00E9decin de garde ou vous-m\u00EAme directement par t\u00E9l\u00E9phone."] })),
    },
    {
        question: "Quelqu’un au laboratoire peut-il m’interpréter les résultats ?",
        answer: (_jsx("p", { children: "Bien s\u00FBr, les biologistes des laboratoires Zeroual sont disponibles pour r\u00E9pondre \u00E0 l\u2019ensemble de vos questions et interpr\u00E9ter en toute confidentialit\u00E9 vos r\u00E9sultats. Demandez-le \u00E0 l\u2019accueil !" })),
    },
    {
        question: "Que se passe-t-il en cas d’anomalie importante sur un résultat ?",
        answer: (_jsx("p", { children: "Votre m\u00E9decin prescripteur est syst\u00E9matiquement pr\u00E9venu en cas d\u2019anomalie importante sur votre r\u00E9sultat. Au cas o\u00F9 il ne serait pas joignable, le laboratoire vous contactera pour vous pr\u00E9venir et vous donner les directives \u00E0 suivre : reprendre un RDV avec votre m\u00E9decin, contacter SOS m\u00E9decin, aller directement aux urgences\u2026" })),
    },
    {
        question: "Comment faire une demande d’accès à mon dossier médical ?",
        answer: (_jsxs("div", { children: [_jsx("p", { children: "Pour acc\u00E9der \u00E0 votre dossier m\u00E9dical, vous pouvez remplir les formulaires suivants et les transmettre par email ou par courrier \u00E0 votre laboratoire :" }), _jsxs("ul", { children: [_jsx("li", { children: "Formulaire d\u2019acc\u00E8s au dossier m\u00E9dical par le patient" }), _jsx("li", { children: "Formulaire d\u2019acc\u00E8s au dossier m\u00E9dical d\u2019un patient d\u00E9c\u00E9d\u00E9 par les ayants droit" }), _jsx("li", { children: "Formulaire d\u2019opposition du patient \u00E0 la communication de son dossier m\u00E9dical apr\u00E8s son d\u00E9c\u00E8s" })] })] })),
    },
    {
        question: "Comment signaler une non-conformité ou faire une réclamation ?",
        answer: (_jsxs("p", { children: ["Pour toute r\u00E9clamation ou signalement d\u2019une non-conformit\u00E9, nous vous invitons \u00E0 remplir le formulaire sur notre espace d\u00E9di\u00E9 :", _jsx("br", {}), _jsx("a", { href: "#", children: "D\u00E9posez une r\u00E9clamation >\u2026" })] })),
    },
    {
        question: "J’ai reçu mon compte-rendu chiffré, pourquoi ?",
        answer: (_jsxs("p", { children: ["Le laboratoire vous a transmis votre compte-rendu d\u2019examens sous la forme d\u2019un fichier PDF chiffr\u00E9 joint au courrier \u00E9lectronique de notification. Pour vous prot\u00E9ger, ce chiffrement permet que ce document m\u00E9dical ne soit pas directement lisible ou index\u00E9 sur Internet.", _jsx("br", {}), _jsx("br", {}), "Seul le destinataire du courrier \u00E9lectronique est en mesure d\u2019associer le fichier re\u00E7u et la clef (improprement appel\u00E9e mot-de-passe) n\u00E9cessaire \u00E0 son ouverture. La solution technique Adobe ne permet pas la suppression ou la modification de la clef de chiffrement. Le fichier reste donc prot\u00E9g\u00E9 lors de son stockage sur votre ordinateur. En contrepartie, il n\u2019est pas r\u00E9utilisable ou diffusible \u00E0 un tiers, sauf \u00E0 lui transmettre en m\u00EAme temps votre clef de chiffrement personnelle.", _jsx("br", {}), _jsx("br", {}), "Si vous souhaitez conserver dans votre dossier m\u00E9dical des documents non chiffr\u00E9s, vous devez utiliser le serveur de r\u00E9sultats du laboratoire. Celui-ci vous permet l\u2019acc\u00E8s \u00E0 la totalit\u00E9 de votre dossier m\u00E9dical et vous donne la possibilit\u00E9 de t\u00E9l\u00E9charger des pi\u00E8ces non prot\u00E9g\u00E9es."] })),
    },
    {
        question: "Que faire si j’ai égaré la clé de chiffrement de mes comptes-rendus ?",
        answer: (_jsxs("p", { children: ["Le laboratoire vous a transmis votre compte-rendu d\u2019examens sous la forme d\u2019un fichier PDF chiffr\u00E9 joint au courrier \u00E9lectronique de notification.", _jsx("br", {}), _jsx("br", {}), "Le PDF n\u2019est pas lisible, sauf \u00E0 conna\u00EEtre la clef de d\u00E9chiffrement. Nous vous invitons \u00E0 joindre le secr\u00E9tariat du laboratoire qui pourra vous indiquer la marche \u00E0 suivre pour retrouver la clef utilis\u00E9e au moment de l\u2019envoi de vos documents."] })),
    },
];
// Fonction simulée de fetch - remplace par ta fonction fetch réelle depuis Strapi
async function fetchFAQFromStrapi() {
    // Exemple fetch : const res = await fetch("http://localhost:1337/api/faqs?populate=*");
    // const json = await res.json();
    // return json.data;
    // Pour le moment retourne un tableau vide pour forcer fallback
    return [];
}
export default function FAQTwoColumns() {
    const [faqBefore, setFaqBefore] = useState(faqBeforeFallback);
    const [faqAfter, setFaqAfter] = useState(faqAfterFallback);
    const [openBefore, setOpenBefore] = useState(null);
    const [openAfter, setOpenAfter] = useState(null);
    useEffect(() => {
        fetchFAQFromStrapi()
            .then((data) => {
            if (!data || data.length === 0)
                return; // fallback
            const before = data
                .filter((item) => item.attributes.category === "before")
                .map((item) => ({
                question: item.attributes.question,
                answer: _jsx("div", { dangerouslySetInnerHTML: { __html: item.attributes.answer } }),
            }));
            const after = data
                .filter((item) => item.attributes.category === "after")
                .map((item) => ({
                question: item.attributes.question,
                answer: _jsx("div", { dangerouslySetInnerHTML: { __html: item.attributes.answer } }),
            }));
            if (before.length > 0)
                setFaqBefore(before);
            if (after.length > 0)
                setFaqAfter(after);
        })
            .catch((err) => {
            console.error("Erreur récupération FAQ Strapi, fallback aux données locales.", err);
        });
    }, []);
    const toggleBefore = (index) => {
        setOpenBefore(openBefore === index ? null : index);
    };
    const toggleAfter = (index) => {
        setOpenAfter(openAfter === index ? null : index);
    };
    return (_jsxs("div", { className: "faq-container", children: [_jsx("h1", { className: "faq-title", children: "Foire aux questions" }), _jsxs("div", { className: "faq-columns", children: [_jsxs("section", { className: "faq-column", "aria-labelledby": "faq-before-title", children: [_jsx("h2", { id: "faq-before-title", className: "faq-column-title", children: "Avant le pr\u00E9l\u00E8vement" }), faqBefore.map((item, idx) => (_jsxs("div", { className: "faq-item", children: [_jsxs("button", { className: `faq-question ${openBefore === idx ? "open" : ""}`, onClick: () => toggleBefore(idx), "aria-expanded": openBefore === idx, "aria-controls": `before-answer-${idx}`, id: `before-question-${idx}`, children: [item.question, _jsx("span", { className: `faq-arrow ${openBefore === idx ? "rotated" : ""}`, "aria-hidden": "true", children: "\u25BC" })] }), _jsx("div", { id: `before-answer-${idx}`, role: "region", "aria-labelledby": `before-question-${idx}`, className: `faq-answer ${openBefore === idx ? "show" : ""}`, children: item.answer })] }, idx)))] }), _jsxs("section", { className: "faq-column", "aria-labelledby": "faq-after-title", children: [_jsx("h2", { id: "faq-after-title", className: "faq-column-title", children: "Apr\u00E8s le pr\u00E9l\u00E8vement" }), faqAfter.map((item, idx) => (_jsxs("div", { className: "faq-item", children: [_jsxs("button", { className: `faq-question ${openAfter === idx ? "open" : ""}`, onClick: () => toggleAfter(idx), "aria-expanded": openAfter === idx, "aria-controls": `after-answer-${idx}`, id: `after-question-${idx}`, children: [item.question, _jsx("span", { className: `faq-arrow ${openAfter === idx ? "rotated" : ""}`, "aria-hidden": "true", children: "\u25BC" })] }), _jsx("div", { id: `after-answer-${idx}`, role: "region", "aria-labelledby": `after-question-${idx}`, className: `faq-answer ${openAfter === idx ? "show" : ""}`, children: item.answer })] }, idx)))] })] })] }));
}
