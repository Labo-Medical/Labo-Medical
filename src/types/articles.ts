// src/types/article.ts
export type ArticlePayload = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  image: { url: string }; // image principale
  content?: string;       // contenu HTML complet (optionnel)
  body?: string;          // alias si tu préfères `body`
};
