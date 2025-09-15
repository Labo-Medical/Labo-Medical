// ../types/annonces.ts
export interface Annonce {
  id: string;
  titre: string;
  description: string;
  image: { url: string };
  lien: string;
}