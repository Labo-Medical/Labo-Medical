import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { fetchPayloadAutomates } from '../services/payloadApi2';
// === Données fallback automates ===
const fallbackAutomates = [
    { title: "BA 400", description: "Analyseur de biochimie automatique 400 tests/h", iconSrc: '/automates/ba400.jpg' },
    { title: "Biosensor F200", description: " Analyseur d'immuno-analyse par fluorescence qui sert au diagnostic in vitro rapide et fiable d'un large éventail de paramètres : les infections, les maladies chroniques et d'autres biomarqueurs", iconSrc: '/automates/biosenser.png' },
    { title: 'Cobas E411', description: "Immunologique analyseur pour un accès aléatoire traitement des immunoessais basés ECL.", iconSrc: '/automates/cobas.png' },
    { title: 'Cobas C311', description: "Analyseur de chimie clinique automatisé qui sert à effectuer des tests qualitatifs, semi-quantitatifs et quantitatifs sur des échantillons de sang, de sérum, de plasma et d'urine, ainsi que des mesures sélectives d'ions", iconSrc: '/automates/cobas301.png' },
    { title: 'GENEXPERT', description: "Il permet la réalisation de test de biologie moléculaire (PCR, nested PCR et RT-PCR en temps réelle), de manière flexible, à la demande, avec un temps de rendu de résultat rapide (60 min)", iconSrc: '/automates/genexpert.jpg' },
    { title: 'GENRUi KT6610', description: "Analyseur automatisé qui permet d'analyser le sang tels que la formule leucocytaire des globules blancs en cinq parties, et d'autres paramètres comme les globules rouges et les plaquettes", iconSrc: '/automates/genru.png' },
    { title: "HLC 723GX", description: "Cette technologie comprend un système HPLC (chromatographie en phase liquide à haute performance) précis et entièrement automatisé qui permet le dosage d’un échantillon en 1 min 30 s", iconSrc: '/automates/hlc.jpg' },
    { title: 'ABX Pentra XL 80', description: "Cadence jusqu’a 80 échantillons analysés par heure : Cytochimie, impedance, optique", iconSrc: '/automates/apx.jpeg' },
    { title: 'KONELAB 20', description: "Analyseur à chargement continu et aléatoire destiné à la réalisation d’analyses biochimiques de routine, ainsi qu’au dosage des électrolytes et à la recherche de protéines spécifiques", iconSrc: '/automates/konelab.jpg' },
    { title: 'Minicap Flex Piercing', description: "Analyseur qui va permettre cette séparation afin de dépister les anomalies portant sur les protéines présentes dans le sang ", iconSrc: '/automates/minicap.png' },
    { title: "SPIN 640 Plus", description: "Analyseur automatique de chimie clinique qui sert à effectuer des tests de laboratoire sur des échantillons de patients pour détecter des maladies, des marqueurs cardiaques, des drogues et des maladies infectieuses", iconSrc: '/automates/spin.png' },
    { title: "STA Satellite®", description: "Automate d’Hémostase de paillasse, permet la réalisation simultanée des tests chronométriques, colorimétriques et immunologiques", iconSrc: '/automates/sta.jpg' },
    { title: 'START', description: "Analyseur de coagulation semi-automatique", iconSrc: '/automates/start.jpg' },
    { title: 'SYSMEX XN-550', description: "Le XN-550 dispose d’un passeur automatique, du système Rerun-Reflex et du chargement en continu des échantillons", iconSrc: '/automates/sysmex.jpg' },
    { title: "VIDAS", description: "Automate d’immunoanalyses multiparamétriques", iconSrc: '/automates/vidas.jpg' },
    { title: "VITEK 2 COMPACT 60", description: "Appareil automatisé et compact pour l’Identification bactérienne et l’antibiogramme sous forme d’appareil compact", iconSrc: '/automates/vitek.jpg' },
];
// === Spécialités médicales ===
const specialites = [
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
    { title: 'Génétique & Génomique', description: 'Analyses genétiques.', iconSrc: '/icons/gene.png' },
    { title: 'Biologie moléculaire', description: 'Analyses moléculaires.', iconSrc: '/icons/molecule.png' },
    { title: 'Immunofluoroscence', description: 'Analyses immunofluoroscences.', iconSrc: '/icons/fluore.png' },
];
// === Section spécialités avec GRID responsive ===
function SpecialitesSection() {
    return (_jsxs("section", { style: {
            marginTop: '2rem',
            backgroundColor: '#f4f6fa',
            padding: '2rem 1rem',
            borderRadius: '12px',
        }, children: [_jsx("h2", { style: {
                    fontSize: '1.6rem',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    color: '#800020',
                }, children: "Nos domaines d\u2019expertise" }), _jsx("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', // colonnes plus petites
                    gap: '1rem', // réduire l’espacement
                    justifyContent: 'center',
                }, children: specialites.map((s, i) => (_jsxs("div", { style: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        width: '100%',
                    }, onMouseEnter: (e) => { e.currentTarget.style.transform = 'scale(1.05)'; }, onMouseLeave: (e) => { e.currentTarget.style.transform = 'scale(1)'; }, children: [_jsx("div", { style: {
                                backgroundColor: '#f0f0f0',
                                borderRadius: '50%',
                                width: '70px', // réduit 
                                height: '70px', // réduit 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '0.8rem', // réduit de 1rem → 0.8rem
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            }, children: _jsx("img", { src: s.iconSrc, alt: s.title, style: {
                                    width: '50%', // réduit de 60% → 50%
                                    height: '50%',
                                    objectFit: 'contain',
                                } }) }), _jsx("span", { style: {
                                textAlign: 'center',
                                fontSize: '0.9rem', // réduit de 0.9rem 
                                fontWeight: 500,
                                color: '#000',
                                lineHeight: '1.1',
                                marginTop: '0.4rem', // réduit de 0.5rem → 0.4rem
                            }, children: s.title })] }, i))) })] }));
}
// === Carte automate ===
function AutomateCard({ title, description, iconSrc }) {
    return (_jsxs("div", { style: {
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '260px',
        }, children: [_jsx("img", { src: iconSrc, alt: title, style: { width: '200px', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem', background: '#f4f6fa' } }), _jsx("h3", { style: { fontSize: '1.1rem', color: '#800020', marginBottom: '0.5rem', textAlign: 'center' }, children: title }), _jsx("p", { style: { fontSize: '0.97rem', color: '#444', textAlign: 'center' }, children: description })] }));
}
// === Composant principal ===
export default function Services() {
    const [visibleCount, setVisibleCount] = useState(4);
    const [automates, setAutomates] = useState(fallbackAutomates);
    useEffect(() => {
        fetchPayloadAutomates()
            .then((data) => { if (data.length > 0)
            setAutomates(data); })
            .catch(() => setAutomates(fallbackAutomates));
    }, []);
    return (_jsxs("section", { style: { padding: '2rem', backgroundColor: '#f8f9fb', borderRadius: '12px' }, children: [_jsx("h2", { style: { color: '#800020', marginBottom: '2rem', fontWeight: 700, textAlign: 'center' }, children: "Nos dispositifs m\u00E9dicaux de diagnostic" }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '24px' }, children: automates.slice(0, visibleCount).map((item, index) => (_jsx(AutomateCard, { ...item }, index))) }), visibleCount < automates.length && (_jsx("div", { style: { textAlign: 'center', marginTop: 32 }, children: _jsx("button", { onClick: () => setVisibleCount((prev) => Math.min(prev + 4, automates.length)), style: { backgroundColor: '#800020', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '1rem', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }, children: "Voir plus" }) })), _jsx(SpecialitesSection, {})] }));
}
