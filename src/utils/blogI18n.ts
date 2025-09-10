import type { ArticlePayload } from '../services/payloadApi';
import { blogTranslations, type BlogTranslation } from '../i18n/blogs';

function mergeArticle(a: ArticlePayload, tr?: BlogTranslation): ArticlePayload {
  if (!tr) return a;
  return {
    ...a,
    title: tr.title ?? a.title,
    excerpt: tr.excerpt ?? a.excerpt,
    slug: tr.slug ?? a.slug,
    image: tr.image ?? a.image,
    content: tr.content ?? a.content,
  } as ArticlePayload;
}

export function translateArticles(articles: ArticlePayload[], lang: string): ArticlePayload[] {
  const map = blogTranslations[lang] || {};
  return articles.map((a) => {
    const key = a.slug || a.id;
    const tr = map[key];
    return mergeArticle(a, tr);
  });
}

export function translateArticle(article: ArticlePayload, lang: string): ArticlePayload {
  const map = blogTranslations[lang] || {};
  const key = article.slug || article.id;
  return mergeArticle(article, map[key]);
}

export function hasTranslationFor(lang: string, key: string): boolean {
  const map = blogTranslations[lang] || {};
  return Boolean(map[key]);
}

export function coverageCount(articles: ArticlePayload[], lang: string): number {
  const map = blogTranslations[lang] || {};
  let count = 0;
  for (const a of articles) {
    const key = a.slug || a.id;
    if (map[key]) count++;
  }
  return count;
}
