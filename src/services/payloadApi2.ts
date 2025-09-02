// services/payloadExtraApi.ts

import { JSX } from 'react';

// 🌐 Configuration
const BASE_URL = import.meta.env.VITE_API_URL || 'leslaboratoireszeroual.ma/api';

// 🔧 Utilitaire générique
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
async function fetchCollection<T>(slug: string, limit = 10): Promise<T[]> {
  const data = await fetcher<{ docs: T[] }>(`${slug}?limit=${limit}`);
  return data?.docs || [];
}

async function fetchFirstItem<T>(collection: string): Promise<T | null> {
  const data = await fetcher<{ docs: T[] }>(`${collection}?limit=1`);
  return data?.docs?.[0] || null;
}

async function fetchByKey<T>(key: string, collection: string): Promise<T | null> {
  const data = await fetcher<{ docs: T[] }>(`${collection}?where[key][equals]=${key}`);
  return data?.docs?.[0] || null;
}

//
// 🧠 Données spécifiques
//

// Ticker
export type NewsItem = {
  id: string;
  title: string;
  link: string;
};

export async function fetchPayloadTicker(): Promise<NewsItem[]> {
  const data = await fetcher<{ docs: any[] }>('lastnews');
  return data?.docs?.map((item) => ({
    id: item.id || item._id,
    title: item.title,
    link: item.link,
  })) || [];
}

// Logos partenaires
export async function fetchPayloadLogos(): Promise<string[]> {
  const data = await fetcher<{ docs: any[] }>('partenaire');
  return data?.docs?.map((item) => item.logo?.url || '').filter(Boolean) || [];
}

// Politiques
export type PolicyItem = {
  title: string;
  description: string;
  file: string;
  icon?: JSX.Element;
};

export async function fetchPayloadPolicies(): Promise<PolicyItem[]> {
  const data = await fetcher<{ docs: any[] }>('politic');
  return data?.docs?.map((item) => ({
    title: item.title,
    description: item.description,
    file: item.file?.url || '',
  })) || [];
}

// Prélèvement
export type PrelevementContent = {
  id: string;
  title: string;
  description: string;
  documentUrl?: string;
};

export async function fetchPayloadPrelevement(): Promise<PrelevementContent | null> {
  return await fetchFirstItem<PrelevementContent>('prelevement');
}

// Présentation
export type PresentationData = {
  title: string;
  paragraphs: string[];
};

export async function fetchPayloadPresentation(): Promise<PresentationData | null> {
  const data = await fetcher<{ docs: any[] }>('presentation');
  const item = data?.docs?.[0];
  return item
    ? {
        title: item.title,
        paragraphs: item.paragraphs || [],
      }
    : null;
}

// Recommandations
export type RecommandationContent = {
  id: string;
  title: string;
  description: string;
};

export async function fetchPayloadRecommandations(): Promise<RecommandationContent | null> {
  return await fetchFirstItem<RecommandationContent>('recommandation');
}

// Lien serveur résultats
export async function fetchResultatsServerLink(): Promise<string | null> {
  const item = await fetchByKey<{ value: string }>('resultats-server-link', 'resultat');
  return item?.value ?? null;
}

// Automates / Services
export type ServiceData = {
  title: string;
  description: string;
  iconSrc: string;
};

export async function fetchPayloadAutomates(): Promise<ServiceData[]> {
  const data = await fetcher<{ docs: any[] }>('specialite?limit=100');
  return data?.docs?.map((item) => ({
    title: item.title,
    description: item.description,
    iconSrc: item.icon?.url || '/assets/default-icon.png',
  })) || [];
}

// Contacts / Lieux
export type Lab = {
  name: string;
  address: string;
  phone: string;
};

export async function fetchPayloadLabs(): Promise<Lab[]> {
  return await fetchCollection<Lab>('contact', 100);
}

// Feedback
export type FeedbackSettings = {
  whatsappNumber: string;
  googleFormUrl: string;
};

export async function fetchPayloadFeedbackSettings(): Promise<FeedbackSettings | null> {
  const item = await fetchByKey<FeedbackSettings>('feedback', 'feedbacksection');
  return item ?? null;
}
