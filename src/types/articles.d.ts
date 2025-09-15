export type ArticlePayload = {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    image: {
        url: string;
    };
    content?: string;
    body?: string;
};
