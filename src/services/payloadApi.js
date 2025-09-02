// services/payloadApi.ts
// 🌐 Configuration
const BASE_URL = import.meta.env.VITE_API_URL || 'leslaboratoireszeroual.ma/api';
// 🔧 Utilitaire générique pour les appels fetch
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
export async function fetchCollection(slug, limit = 10) {
    const data = await fetcher(`${slug}?limit=${limit}`);
    return data?.docs || [];
}
// 🌐 Utilitaires pour les globals
export async function fetchGlobal(slug) {
    const data = await fetcher(`globals/${slug}`);
    return data?.[slug] || null;
}
export async function fetchPayloadHero() {
    return await fetchGlobal('hero');
}
export async function fetchPayloadHeader() {
    return await fetchGlobal('header');
}
export async function fetchPayloadFooter() {
    return await fetchGlobal('footer');
}
export async function fetchPayloadBlogs() {
    return await fetchCollection('blog');
}
// BlogArticle
export async function fetchPayloadBlogArticles() {
    const data = await fetcher('blogarticle?limit=10');
    return data?.docs?.map((item) => ({
        id: item.id,
        title: item.title,
        content: item.content,
    })) || [];
}
export async function fetchPayloadCatalogue() {
    const data = await fetcher('catalogue?limit=1');
    return data?.docs?.[0] || null;
}
export async function fetchPayloadCentraleAchats() {
    const data = await fetcher('centraleachat?limit=1');
    return data?.docs?.[0] || null;
}
export async function fetchPayloadChiffres() {
    const data = await fetcher('chiffre?limit=1');
    return data?.docs?.[0] || null;
}
export async function fetchPayloadDocuments() {
    const data = await fetcher('document?limit=1');
    return data?.docs?.[0] || null;
}
export async function fetchPayloadGallery() {
    const data = await fetcher('gallery');
    const images = data?.docs?.[0]?.images || [];
    return images.map((img) => ({
        src: img.image?.url || '',
        width: img.width || 800,
        height: img.height || 600,
        srcSet: img.srcSet?.map((set) => ({
            src: set.url,
            width: set.width,
            height: set.height,
        })),
    }));
}
export async function fetchPayloadHistorique() {
    return await fetchCollection('historique', 1).then((docs) => docs[0] || null);
}
// Valeurs
export async function fetchPayloadValeurs() {
    return await fetchCollection('valeur');
}
export async function fetchPayloadAnnonces() {
    return await fetchCollection('annonce');
}
export async function fetchPayloadCharfPage() {
    return await fetchCollection('labocharf', 1).then((docs) => docs[0] || null);
}
export async function fetchPayloadLabKawassimPage() {
    return await fetchCollection('labokawacim', 1).then((docs) => docs[0] || null);
}
export async function fetchPayloadLabSouaniPage() {
    return await fetchCollection('labosouani', 1).then((docs) => docs[0] || null);
}
export async function fetchLabs() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/labs`);
    if (!res.ok) {
        throw new Error("Impossible de charger les labos depuis PayloadCMS");
    }
    const data = await res.json();
    return data.docs;
}
