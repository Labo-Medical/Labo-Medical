import React, { useEffect, useMemo, useRef, useState } from "react";
import { type ArticlePayload, fetchPayloadBlogs } from "../services/payloadApi";
import { useTranslation } from 'react-i18next';
import { translateArticles, coverageCount } from '../utils/blogI18n';
import { tBlog } from '../utils/i18nHelpers';
import { blogTranslations } from '../i18n/blogs';

/**
 * Listing + lecture inline (même page)
 * - Respecte les champs Payload déjà utilisés: id, title, excerpt, slug, image.url
 * - Lecture complète s'appuie sur un champ texte HTML existant côté Payload: `content` OU `body` (optionnel)
 *   → si votre collection Payload expose `content` ou `body`, il sera rendu ici sans rien changer à l'API.
 */

const buildFallbackArticles = (i18n: any, t: (key: string) => string): ArticlePayload[] => {
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
      content: reg[id].content || '',
    })) as ArticlePayload[];
  }
  return [
    {
      id: 'fallback1',
      title: tBlog(i18n, t as any, 'articles.article1.title'),
      excerpt: tBlog(i18n, t as any, 'articles.article1.excerpt'),
      slug: 'blogarticle',
      image: { url: '/blog/blog1.jpg' },
      content: tBlog(i18n, t as any, 'articles.article1.content')
    },
    {
      id: 'fallback2',
      title: tBlog(i18n, t as any, 'articles.article2.title'),
      excerpt: tBlog(i18n, t as any, 'articles.article2.excerpt'),
      slug: 'blogarticle',
      image: { url: '/blog/blog2.jpg' },
      content: tBlog(i18n, t as any, 'articles.article2.content')
    },
    {
      id: 'fallback3',
      title: tBlog(i18n, t as any, 'articles.article3.title'),
      excerpt: tBlog(i18n, t as any, 'articles.article3.excerpt'),
      slug: 'blogarticle',
      image: { url: '/blog/blog3.jpg' },
      content: tBlog(i18n, t as any, 'articles.article3.content')
    },
    {
      id: 'fallback4',
      title: tBlog(i18n, t as any, 'articles.article4.title'),
      excerpt: tBlog(i18n, t as any, 'articles.article4.excerpt'),
      slug: 'blogarticle',
      image: { url: '/blog/blog4.jpg' },
      content: tBlog(i18n, t as any, 'articles.article4.content')
    },
  ];
};

// Petit helper TypeScript pour lire un éventuel champ HTML "content" ou "body" sans changer le modèle
type MaybeWithContent = ArticlePayload & { content?: string; body?: string };

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const [rawArticles, setRawArticles] = useState<ArticlePayload[] | null>(null);
  const [articles, setArticles] = useState<ArticlePayload[]>(buildFallbackArticles(i18n, t));
  // const [loading, setLoading] = useState(false); // No longer needed without API calls
  // const [error, setError] = useState<string | null>(null);

  // UI state (front-only)
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<ArticlePayload | null>(null); // article affiché en plein
  const PAGE_SIZE = 9;

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch canonical articles once; translate client-side on language changes
  useEffect(() => {
    let mounted = true;
    fetchPayloadBlogs()
      .then((docs) => {
        if (!mounted) return;
        setRawArticles((docs && docs.length > 0) ? docs : null);
      })
      .catch(() => mounted && setRawArticles(null));
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (rawArticles && rawArticles.length > 0) {
      const translated = translateArticles(rawArticles, i18n.language);
      const top = rawArticles.slice(0, 4);
      const fullCoverage = coverageCount(top, i18n.language) === top.length;
      if (fullCoverage) {
        setArticles(translated);
      } else {
        setArticles(buildFallbackArticles(i18n, t));
      }
    } else {
      setArticles(buildFallbackArticles(i18n, t));
    }
  }, [rawArticles, i18n.language, t]);

  // Keep the opened article in sync when language/articles change
  useEffect(() => {
    if (!selected) return;
    const updated = articles.find(a => a.id === selected.id) || null;
    if (updated && (updated.title !== selected.title || (updated as any).content !== (selected as any).content)) {
      setSelected(updated);
    }
  }, [articles]);

  // Quand on ouvre un article: scroll au début du bloc + activer ESC pour fermer
  // Removed useEffect for scroll behavior - can be implemented differently if needed

  // Removed useEffect for ESC key handling - can be implemented differently if needed

  // Recherche (titre + extrait)
  const filtered = useMemo(() => {
    if (!query.trim()) return articles;
    const q = query.toLowerCase();
    return articles.filter((a) =>
      (a.title || "").toLowerCase().includes(q) || (a.excerpt || "").toLowerCase().includes(q)
    );
  }, [articles, query]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  // Helpers
  const truncate = (text: string, n = 140) => (text && text.length > n ? text.slice(0, n).replace(/\s+\S*$/, "…") : text || "");

  const goTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  const getContentHtml = (a: ArticlePayload) => {
    const raw = (a as MaybeWithContent).content || (a as MaybeWithContent).body || "";
    return basicSanitize(raw);
  };

  // No loading state needed since we always use translated fallback articles

  return (
    <section style={sx.section}>
      <Hero />

      <div ref={containerRef} style={sx.container}>
        {selected ? (
          <article style={sx.articleFull}>
            <button style={sx.backBtn} onClick={() => setSelected(null)} aria-label="Retour au listing">
              {tBlog(i18n as any, t as any, 'back_button')}
            </button>
            <h2 style={sx.fullTitle}>{selected.title}</h2>
            {selected.image?.url && (
              <img src={selected.image.url} alt={selected.title} style={sx.fullImage} />
            )}
            {selected.excerpt && <p style={sx.lead}>{selected.excerpt}</p>}
            <div style={sx.fullContent}>
              {/* Rendu HTML sécurisé basique */}
              <div dangerouslySetInnerHTML={{ __html: getContentHtml(selected) }} />
            </div>
          </article>
        ) : (
          <>
            {/* Barre d'outils */}
            <div style={sx.toolbar}>
              <div style={sx.searchBox}>
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder={tBlog(i18n as any, t as any, 'search.placeholder')}
                  aria-label="Rechercher dans le blog"
                  style={sx.searchInput}
                />
              </div>
              <span style={sx.count}>
                {filtered.length} article{filtered.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Grille d'articles */}
            <div style={sx.grid}>
              {visible.length === 0 ? (
                <div style={sx.empty}>{tBlog(i18n as any, t as any, 'empty')}</div>
              ) : (
                visible.map((a: ArticlePayload) => (
                  <div key={a.id} style={sx.card}>
                    <div style={sx.thumbWrap}>
                      {a.image?.url ? (
                        <img src={a.image.url} alt={a.title} style={sx.thumb} loading="lazy" />
                      ) : (
                        <div style={{ ...sx.thumb, display: "grid", placeItems: "center", fontSize: 12, color: "#888" }}>
                          {tBlog(i18n as any, t as any, 'image_unavailable')}
                        </div>
                      )}
                    </div>
                    <div style={sx.cardBody}>
                      <h3 style={sx.cardTitle}>{a.title}</h3>
                      {a.excerpt && <p style={sx.cardExcerpt}>{truncate(a.excerpt, 150)}</p>}
                      <div style={sx.cardFooter}>
                        <button
                          style={sx.readMoreBtn}
                          onClick={() => setSelected(a)}
                          aria-expanded={selected && (selected as ArticlePayload).id === a.id ? "true" : "false"}
                          aria-controls={`article-${a.id}`}
                        >
                          {tBlog(i18n as any, t as any, 'read_more')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav style={sx.pagination} aria-label={tBlog(i18n as any, t as any, 'pagination_label')}>
                <button style={sx.pageBtn} onClick={() => goTo(pageSafe - 1)} disabled={pageSafe === 1}>
                  {tBlog(i18n as any, t as any, 'previous')}
                </button>
                <ul style={sx.pageList}>
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    const active = p === pageSafe;
                    return (
                      <li key={p}>
                        <button
                          style={{ ...sx.pageNum, ...(active ? sx.pageNumActive : {}) }}
                          onClick={() => goTo(p)}
                          aria-current={active ? "page" : undefined}
                        >
                          {p}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <button style={sx.pageBtn} onClick={() => goTo(pageSafe + 1)} disabled={pageSafe === totalPages}>
                  {tBlog(i18n as any, t as any, 'next')}
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* ----------------------------- UI sub-components ---------------------------- */
function Hero() {
  const { t, i18n } = useTranslation();
  return (
    <header style={sx.hero}>
      <div style={sx.heroInner}>
        <h1 style={sx.heroTitle}>{tBlog(i18n as any, t as any, 'hero.title')}</h1>
        <p style={sx.heroSubtitle}>{tBlog(i18n as any, t as any, 'hero.subtitle')}</p>
      </div>
    </header>
  );
}

// Removed SkeletonCard component - no longer needed without loading state

/* ----------------------------- Sanitize minimal ----------------------------- */
function basicSanitize(html: string): string {
  if (!html) return "";
  let clean = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  clean = clean.replace(/ on[a-z]+\s*=\s*"[^"]*"/gi, "");
  clean = clean.replace(/ on[a-z]+\s*=\s*'[^']*'/gi, "");
  clean = clean.replace(/ on[a-z]+\s*=\s*[^\s>]+/gi, "");
  clean = clean.replace(/(href|src)\s*=\s*"javascript:[^"]*"/gi, "$1=\"#\"");
  clean = clean.replace(/(href|src)\s*=\s*'javascript:[^']*'/gi, "$1='#'");
  return clean;
}

/* --------------------------------- Styles --------------------------------- */
const burgundy = "#800020";
const sx: Record<string, React.CSSProperties> = {
  section: { background: "#fff", paddingBottom: 60 },
  container: { width: "min(1200px, 92%)", margin: "0 auto" },
  hero: { background: burgundy, color: "#fff", padding: "60px 0", marginBottom: 28 },
  heroInner: { width: "min(1200px, 92%)", margin: "0 auto" },
  heroTitle: { fontSize: 36, margin: 0, lineHeight: 1.2 },
  heroSubtitle: { marginTop: 8, opacity: 0.95, fontSize: 16 },

  toolbar: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 18 },
  searchBox: { flex: 1 },
  searchInput: { width: "100%", height: 44, padding: "0 14px", borderRadius: 10, border: "1px solid #e7e7e7", outline: "none", fontSize: 16 },
  count: { fontSize: 14, color: burgundy, fontWeight: 600 },

  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 },
  empty: { gridColumn: "1 / -1", background: "#fafafa", border: "1px dashed #e5e5e5", padding: 32, borderRadius: 12, textAlign: "center", color: "#666" },

  card: { background: "#fff", borderRadius: 16, boxShadow: "0 4px 18px rgba(0,0,0,0.08)", overflow: "hidden", display: "flex", flexDirection: "column" },
  thumbWrap: { width: "100%", aspectRatio: "16 / 9", overflow: "hidden" },
  thumb: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  cardBody: { padding: 16, display: "flex", flexDirection: "column", gap: 10 },
  cardTitle: { fontSize: 18, lineHeight: 1.3, color: burgundy, margin: 0 },
  cardExcerpt: { fontSize: 14, color: "#444", margin: 0 },
  cardFooter: { marginTop: "auto", display: "flex", justifyContent: "flex-end" },

  readMoreBtn: { background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: 14, fontWeight: 600 },

  pagination: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 22 },
  pageBtn: { padding: "10px 14px", borderRadius: 10, border: "1px solid #e7e7e7", background: "#fff", cursor: "pointer" },
  pageList: { display: "flex", listStyle: "none", margin: 0, padding: 0, gap: 8 },
  pageNum: { minWidth: 40, height: 40, borderRadius: 10, border: "1px solid #e7e7e7", background: "#fff", cursor: "pointer" },
  pageNumActive: { borderColor: burgundy, color: "#fff", background: burgundy, fontWeight: 700 },

  articleFull: { maxWidth: 800, margin: "0 auto", background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 4px 18px rgba(0,0,0,0.08)" },
  backBtn: { background: "none", border: "1px solid #e7e7e7", color: burgundy, cursor: "pointer", marginBottom: 20, fontWeight: 600, padding: "8px 12px", borderRadius: 10 },
  fullTitle: { fontSize: 28, marginBottom: 16, color: burgundy },
  lead: { fontSize: 16, color: "#333", lineHeight: 1.6, background: "#fff8f8", padding: 12, borderRadius: 10 },
  fullImage: { width: "100%", borderRadius: 12, margin: "16px 0" },
  fullContent: { fontSize: 16, color: "#333", lineHeight: 1.7 },
};
