// services/payloadExtraApi.ts
// 🌐 Configuration
const BASE_URL = import.meta.env.VITE_API_URL || 'leslaboratoireszeroual.ma/api';
// 🔧 Utilitaire générique
async function fetcher(endpoint) {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}`);
        if (!res.ok) {
            console.error(`Erreur HTTP ${res.status} sur ${endpoint}`);
            return null;
        }
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(`Erreur Payload sur ${endpoint}:`, err);
        return null;
    }
}
// 📦 Utilitaires pour les collections
async function fetchCollection(slug, limit = 10) {
    const data = await fetcher(`${slug}?limit=${limit}`);
    return data?.docs || [];
}
async function fetchFirstItem(collection) {
    const data = await fetcher(`${collection}?limit=1`);
    return data?.docs?.[0] || null;
}
async function fetchByKey(key, collection) {
    const data = await fetcher(`${collection}?where[key][equals]=${key}`);
    return data?.docs?.[0] || null;
}
export async function fetchPayloadTicker() {
    const data = await fetcher('lastnews');
    return data?.docs?.map((item) => ({
        id: item.id || item._id,
        title: item.title,
        link: item.link,
    })) || [];
}
// Logos partenaires
export async function fetchPayloadLogos() {
    const data = await fetcher('partenaire');
    return data?.docs?.map((item) => item.logo?.url || '').filter(Boolean) || [];
}
export async function fetchPayloadPolicies() {
    const data = await fetcher('politic');
    return data?.docs?.map((item) => ({
        title: item.title,
        description: item.description,
        file: item.file?.url || '',
    })) || [];
}
export async function fetchPayloadPrelevement() {
    return await fetchFirstItem('prelevement');
}
export async function fetchPayloadPresentation() {
    const data = await fetcher('presentation');
    const item = data?.docs?.[0];
    return item
        ? {
            title: item.title,
            paragraphs: item.paragraphs || [],
        }
        : null;
}
export async function fetchPayloadRecommandations() {
    return await fetchFirstItem('recommandation');
}
// Lien serveur résultats
export async function fetchResultatsServerLink() {
    const item = await fetchByKey('resultats-server-link', 'resultat');
    return item?.value ?? null;
}
export async function fetchPayloadAutomates() {
    const data = await fetcher('specialite?limit=100');
    return data?.docs?.map((item) => ({
        title: item.title,
        description: item.description,
        iconSrc: item.icon?.url || '/assets/default-icon.png',
    })) || [];
}
export async function fetchPayloadLabs() {
    return await fetchCollection('contact', 100);
}
export async function fetchPayloadFeedbackSettings() {
    const item = await fetchByKey('feedback', 'feedbacksection');
    return item ?? null;
}
