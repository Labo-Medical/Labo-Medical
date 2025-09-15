// services/payloadApi.ts

// 🌐 Configuration
const BASE_URL = import.meta.env.VITE_API_URL || 'leslaboratoireszeroual.ma/api';

// 🔧 Utilitaire générique pour les appels fetch
async function fetcher<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`);
    if (!res.ok) {
      console.error(`Erreur HTTP ${res.status} sur ${endpoint}`);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Erreur Payload sur ${endpoint}:`, err);
    return null;
  }
}

// 📦 Utilitaires pour les collections
export async function fetchCollection<T>(slug: string, limit = 10): Promise<T[]> {
  const data = await fetcher<{ docs: T[] }>(`${slug}?limit=${limit}`);
  return data?.docs || [];
}

// 🌐 Utilitaires pour les globals
export async function fetchGlobal<T>(slug: string): Promise<T | null> {
  const data = await fetcher<{ [key: string]: T }>(`globals/${slug}`);
  return data?.[slug] || null;
}

//
// 🧠 Données spécifiques
//

// Hero
export type HeroPayload = {
  hero_title: string;
  hero_description: string;
  hero_video: string;
  hero_button_label: string;
  hero_button_url: string;
};

export async function fetchPayloadHero(): Promise<HeroPayload | null> {
  return await fetchGlobal<HeroPayload>('hero');
}

// Header
export type SocialLinkPayload = {
  platform: string;
  url: string;
  icon?: { url: string };
};

export type HeaderPayload = {
  logo?: { url: string };
  socialLinks?: SocialLinkPayload[];
};

export async function fetchPayloadHeader(): Promise<HeaderPayload | null> {
  return await fetchGlobal<HeaderPayload>('header');
}

// Footer
export type FooterPayload = {
  logo?: { url: string };
  engagementText?: string;
  socialLinks?: { url: string; icon?: { url: string }; platform: string }[];
  labLocations?: { name: string; address: string }[];
};

export async function fetchPayloadFooter(): Promise<FooterPayload | null> {
  return await fetchGlobal<FooterPayload>('footer');
}

// Blog

// BlogArticle
// src/services/payloadApi.ts
import { ArticlePayload } from "../types/articles";

export async function fetchPayloadBlogs(): Promise<ArticlePayload[]> {
  try {
    const res = await fetch(`${BASE_URL}/blogs?depth=1`);
    if (!res.ok) throw new Error("Erreur API blogs");
    const json = await res.json();

    // Payload retourne { docs: [...], totalDocs, ... }
    return (json.docs || []).map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      excerpt: doc.excerpt,
      slug: doc.slug,
      image: { url: doc.image?.url || "" },
      content: doc.content || doc.body || "",
    }));
  } catch (e) {
    console.error("fetchPayloadBlogs error:", e);
    return [];
  }
}


// Catalogue
export type CataloguePayload = {
  id: string;
  title: string;
  description: string;
  documents: { title: string; url: string }[];
};

export async function fetchPayloadCatalogue(): Promise<CataloguePayload | null> {
  const data = await fetcher<{ docs: CataloguePayload[] }>('catalogue?limit=1');
  return data?.docs?.[0] || null;
}

// Centrale Achats
export type CentraleAchatsPayload = {
  id: string;
  title: string;
  description: string;
};

export async function fetchPayloadCentraleAchats(): Promise<CentraleAchatsPayload | null> {
  const data = await fetcher<{ docs: CentraleAchatsPayload[] }>('centraleachat?limit=1');
  return data?.docs?.[0] || null;
}

// Chiffres
export type ChiffresPayload = {
  title: string;
  stats: { label: string; value: string }[];
};

export async function fetchPayloadChiffres(): Promise<ChiffresPayload | null> {
  const data = await fetcher<{ docs: ChiffresPayload[] }>('chiffre?limit=1');
  return data?.docs?.[0] || null;
}

// Documents
export type DocumentPayload = {
  id: string;
  title: string;
  description: string;
  documents: { title: string; url: string }[];
};

export async function fetchPayloadDocuments(): Promise<DocumentPayload | null> {
  const data = await fetcher<{ docs: DocumentPayload[] }>('document?limit=1');
  return data?.docs?.[0] || null;
}

// Gallery
export type GalleryImagePayload = {
  src: string;
  width: number;
  height: number;
  srcSet?: { src: string; width: number; height: number }[];
};

export async function fetchPayloadGallery(): Promise<GalleryImagePayload[]> {
  const data = await fetcher<{ docs: any[] }>('gallery');
  const images = data?.docs?.[0]?.images || [];
  return images.map((img: any) => ({
    src: img.image?.url || '',
    width: img.width || 800,
    height: img.height || 600,
    srcSet: img.srcSet?.map((set: any) => ({
      src: set.url,
      width: set.width,
      height: set.height,
    })),
  }));
}

// Historique
export type HistoriquePayload = {
  title?: string;
  paragraphs?: string[];
  history?: { year: string; title: string; text: string }[];
};

export async function fetchPayloadHistorique(): Promise<HistoriquePayload | null> {
  return await fetchCollection<HistoriquePayload>('historique', 1).then((docs) => docs[0] || null);
}

// Valeurs
export async function fetchPayloadValeurs(): Promise<{ icon: string; title: string; text: string }[]> {
  return await fetchCollection<{ icon: string; title: string; text: string }>('valeur');
}

// Annonces
export type AnnoncePayload = {
  id: string;
  titre: string;
  description: string;
  image: string;
  lien: string;
};

export async function fetchPayloadAnnonces(): Promise<AnnoncePayload[]> {
  return await fetchCollection<AnnoncePayload>('annonce');
}

// Labo Charf
export type CharfPageData = {
  doctor: {
    name: string;
    photo: { url: string };
    description: string;
  };
  contact: {
    title: string;
    address: string;
    email: string;
    phone: string;
    whatsapp: string;
    hours: string;
  };
  slides: { url: string; alt: string }[];
  mapEmbedUrl: string;
};

export async function fetchPayloadCharfPage(): Promise<CharfPageData | null> {
  return await fetchCollection<CharfPageData>('labocharf', 1).then((docs) => docs[0] || null);
}

// Labo Kawassim
export type LabKawassimPageData = CharfPageData;

export async function fetchPayloadLabKawassimPage(): Promise<LabKawassimPageData | null> {
  return await fetchCollection<LabKawassimPageData>('labokawacim', 1).then((docs) => docs[0] || null);
}

// Labo Souani
export type LabSouaniPageData = CharfPageData;

export async function fetchPayloadLabSouaniPage(): Promise<LabSouaniPageData | null> {
  return await fetchCollection<LabSouaniPageData>('labosouani', 1).then((docs) => docs[0] || null);
}

export type PageresultatPayload = {
  id: string;
  titre: string;
  description?: string;
  labId: string;
  urlAcces: string;
  actif: boolean;
};

export async function fetchPageResultats(token: string): Promise<PageresultatPayload[]> {
  const endpoint = `pageresultats?where[actif][equals]=true`;
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.docs || [];
}

