export declare function fetchCollection<T>(slug: string, limit?: number): Promise<T[]>;
export declare function fetchGlobal<T>(slug: string): Promise<T | null>;
export type HeroPayload = {
    hero_title: string;
    hero_description: string;
    hero_video: string;
    hero_button_label: string;
    hero_button_url: string;
};
export declare function fetchPayloadHero(): Promise<HeroPayload | null>;
export type SocialLinkPayload = {
    platform: string;
    url: string;
    icon?: {
        url: string;
    };
};
export type HeaderPayload = {
    logo?: {
        url: string;
    };
    socialLinks?: SocialLinkPayload[];
};
export declare function fetchPayloadHeader(): Promise<HeaderPayload | null>;
export type FooterPayload = {
    logo?: {
        url: string;
    };
    engagementText?: string;
    socialLinks?: {
        url: string;
        icon?: {
            url: string;
        };
        platform: string;
    }[];
    labLocations?: {
        name: string;
        address: string;
    }[];
};
export declare function fetchPayloadFooter(): Promise<FooterPayload | null>;
export type ArticlePayload = {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    image: {
        url: string;
    };
};
export declare function fetchPayloadBlogs(): Promise<ArticlePayload[]>;
export declare function fetchPayloadBlogArticles(): Promise<{
    id: string;
    title: string;
    content: string;
}[]>;
export type CataloguePayload = {
    id: string;
    title: string;
    description: string;
    documents: {
        title: string;
        url: string;
    }[];
};
export declare function fetchPayloadCatalogue(): Promise<CataloguePayload | null>;
export type CentraleAchatsPayload = {
    id: string;
    title: string;
    description: string;
};
export declare function fetchPayloadCentraleAchats(): Promise<CentraleAchatsPayload | null>;
export type ChiffresPayload = {
    title: string;
    stats: {
        label: string;
        value: string;
    }[];
};
export declare function fetchPayloadChiffres(): Promise<ChiffresPayload | null>;
export type DocumentPayload = {
    id: string;
    title: string;
    description: string;
    documents: {
        title: string;
        url: string;
    }[];
};
export declare function fetchPayloadDocuments(): Promise<DocumentPayload | null>;
export type GalleryImagePayload = {
    src: string;
    width: number;
    height: number;
    srcSet?: {
        src: string;
        width: number;
        height: number;
    }[];
};
export declare function fetchPayloadGallery(): Promise<GalleryImagePayload[]>;
export type HistoriquePayload = {
    title?: string;
    paragraphs?: string[];
    history?: {
        year: string;
        title: string;
        text: string;
    }[];
};
export declare function fetchPayloadHistorique(): Promise<HistoriquePayload | null>;
export declare function fetchPayloadValeurs(): Promise<{
    icon: string;
    title: string;
    text: string;
}[]>;
export type AnnoncePayload = {
    id: string;
    titre: string;
    description: string;
    image: string;
    lien: string;
};
export declare function fetchPayloadAnnonces(): Promise<AnnoncePayload[]>;
export type CharfPageData = {
    doctor: {
        name: string;
        photo: {
            url: string;
        };
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
    slides: {
        url: string;
        alt: string;
    }[];
    mapEmbedUrl: string;
};
export declare function fetchPayloadCharfPage(): Promise<CharfPageData | null>;
export type LabKawassimPageData = CharfPageData;
export declare function fetchPayloadLabKawassimPage(): Promise<LabKawassimPageData | null>;
export type LabSouaniPageData = CharfPageData;
export declare function fetchPayloadLabSouaniPage(): Promise<LabSouaniPageData | null>;
export type LabConfig = {
    id: string;
    name: string;
    description: string;
    labId: string;
    apiUrl: string;
};
export declare function fetchLabs(): Promise<LabConfig[]>;
