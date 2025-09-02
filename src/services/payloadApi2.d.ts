import { JSX } from 'react';
export type NewsItem = {
    id: string;
    title: string;
    link: string;
};
export declare function fetchPayloadTicker(): Promise<NewsItem[]>;
export declare function fetchPayloadLogos(): Promise<string[]>;
export type PolicyItem = {
    title: string;
    description: string;
    file: string;
    icon?: JSX.Element;
};
export declare function fetchPayloadPolicies(): Promise<PolicyItem[]>;
export type PrelevementContent = {
    id: string;
    title: string;
    description: string;
    documentUrl?: string;
};
export declare function fetchPayloadPrelevement(): Promise<PrelevementContent | null>;
export type PresentationData = {
    title: string;
    paragraphs: string[];
};
export declare function fetchPayloadPresentation(): Promise<PresentationData | null>;
export type RecommandationContent = {
    id: string;
    title: string;
    description: string;
};
export declare function fetchPayloadRecommandations(): Promise<RecommandationContent | null>;
export declare function fetchResultatsServerLink(): Promise<string | null>;
export type ServiceData = {
    title: string;
    description: string;
    iconSrc: string;
};
export declare function fetchPayloadAutomates(): Promise<ServiceData[]>;
export type Lab = {
    name: string;
    address: string;
    phone: string;
};
export declare function fetchPayloadLabs(): Promise<Lab[]>;
export type FeedbackSettings = {
    whatsappNumber: string;
    googleFormUrl: string;
};
export declare function fetchPayloadFeedbackSettings(): Promise<FeedbackSettings | null>;
