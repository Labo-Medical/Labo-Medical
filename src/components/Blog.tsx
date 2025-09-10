import './Blog.css';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchPayloadBlogs, type ArticlePayload } from '../services/payloadApi';
import { translateArticles, coverageCount } from '../utils/blogI18n';
import { tBlog } from '../utils/i18nHelpers';
import { blogTranslations } from '../i18n/blogs';

const buildFallbackArticles = (i18n: any, t: (k: string) => string): ArticlePayload[] => {
  const lang = (i18n.language || '').split('-')[0] || i18n.language;
  const reg = (blogTranslations as any)[lang];
  if (reg && reg.fallback1 && reg.fallback2 && reg.fallback3 && reg.fallback4) {
    const mapIdToImg: Record<string, string> = {
      fallback1: '/blog/blog1.jpg',
      fallback2: '/blog/blog2.jpg',
      fallback3: '/blog/blog3.jpg',
      fallback4: '/blog/blog4.jpg',
    };
    return ['fallback1','fallback2','fallback3','fallback4'].map((id) => ({
      id,
      title: reg[id].title || '',
      excerpt: reg[id].excerpt || '',
      slug: 'blogarticle',
      image: { url: mapIdToImg[id] },
    })) as ArticlePayload[];
  }
  // Fallback to JSON i18n if registry missing
  return [
    {
      id: 'fallback1',
      title: tBlog(i18n, t as any, 'articles.article1.title'),
      excerpt: tBlog(i18n, t as any, 'articles.article1.excerpt'),
      slug: 'blogarticle',
      image: { url: '/blog/blog1.jpg' },
    },
    {
      id: 'fallback2',
      title: tBlog(i18n, t as any, 'articles.article2.title'),
      excerpt: tBlog(i18n, t as any, 'articles.article2.excerpt'),
      slug: 'blogarticle',
      image: { url: '/blog/blog2.jpg' },
    },
    {
      id: 'fallback3',
      title: tBlog(i18n, t as any, 'articles.article3.title'),
      excerpt: tBlog(i18n, t as any, 'articles.article3.excerpt'),
      slug: 'blogarticle',
      image: { url: '/blog/blog3.jpg' },
    },
    {
      id: 'fallback4',
      title: tBlog(i18n, t as any, 'articles.article4.title'),
      excerpt: tBlog(i18n, t as any, 'articles.article4.excerpt'),
      slug: 'blogarticle',
      image: { url: '/blog/blog4.jpg' },
    },
  ];
};

export default function Blog() {
  const { t, i18n } = useTranslation();
  const [rawArticles, setRawArticles] = useState<ArticlePayload[] | null>(null);

  // Fetch canonical blogs once (no locale), then translate client-side
  useEffect(() => {
    let mounted = true;
    fetchPayloadBlogs()
      .then((data) => {
        if (!mounted) return;
        setRawArticles((data && data.length > 0) ? data : null);
      })
      .catch(() => mounted && setRawArticles(null));
    return () => { mounted = false; };
  }, []);

  const fallbackArticles = useMemo(() => buildFallbackArticles(i18n, t), [t, i18n.language]);
  const translated = useMemo(() => {
    return rawArticles ? translateArticles(rawArticles, i18n.language) : null;
  }, [rawArticles, i18n.language]);

  // Prefer translated set only if we have coverage for at least the first 4 posts.
  const hasEnoughCoverage = useMemo(() => {
    if (!rawArticles || !translated) return false;
    const top = rawArticles.slice(0, 4);
    return coverageCount(top, i18n.language) === top.length;
  }, [rawArticles, translated, i18n.language]);

  const displayArticles = (hasEnoughCoverage && translated && translated.length >= 4 ? translated : null) || fallbackArticles;

  return (
    <section className="blog-section">
      <h2>{tBlog(i18n, t as any, 'hero.title')}</h2>
      <div className="blog-main-layout">
        <div className="blog-main-article">
          <a href={`/${displayArticles[0].slug}`}>
            <img
              src={displayArticles[0].image.url}
              alt={displayArticles[0].title}
            />
          </a>
          <div className="blog-main-content">
            <h3>{displayArticles[0].title}</h3>
            <p>{displayArticles[0].excerpt}</p>
            <a href={`/${displayArticles[0].slug}`} className="blog-link">{tBlog(i18n, t as any, 'read_more')}</a>
          </div>
        </div>

        <div className="blog-side-list">
          {displayArticles.slice(1, 4).map(article => (
            <div className="blog-side-article" key={article.id}>
              <a href={`/${article.slug}`}>
                <img src={article.image.url} alt={article.title} />
              </a>
              <div className="blog-side-content">
                <h4>{article.title}</h4>
                <p>{article.excerpt}</p>
                <a href={`/${article.slug}`} className="blog-link">{tBlog(i18n, t as any, 'read_more')}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
