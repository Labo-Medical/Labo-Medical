import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchPayloadBlogs } from "../services/payloadApi";
/**
 * Listing + lecture inline (même page)
 * - Respecte les champs Payload déjà utilisés: id, title, excerpt, slug, image.url
 * - Lecture complète s'appuie sur un champ texte HTML existant côté Payload: `content` OU `body` (optionnel)
 *   → si votre collection Payload expose `content` ou `body`, il sera rendu ici sans rien changer à l'API.
 */
const fallbackArticles = [
    { id: "fallback1", title: "Pourquoi faire un bilan sanguin régulier ?", excerpt: "Pourquoi faire un bilan sanguin régulier", slug: "blogarticle", image: { url: "/blog/blog1.jpg" } },
    { id: "fallback2", title: "Comprendre vos résultats d’analyses", excerpt: "Comprendre vos résultats d’analyses", slug: "blogarticle", image: { url: "/blog/blog2.jpg" } },
    { id: "fallback3", title: "Préparer sa visite au laboratoire", excerpt: "Préparer sa visite au laboratoire", slug: "blogarticle", image: { url: "/blog/blog3.jpg" } },
    { id: "fallback4", title: "Les nouveautés en biologie médicale", excerpt: "Les nouveautés en biologie médicale", slug: "blogarticle", image: { url: "/blog/blog4.jpg" } },
];
export default function BlogPage() {
    const [articles, setArticles] = useState(fallbackArticles);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);
    // UI state (front-only)
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(null); // article affiché en plein
    const PAGE_SIZE = 9;
    const containerRef = useRef(null);
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await fetchPayloadBlogs();
                if (!mounted)
                    return;
                if (Array.isArray(data) && data.length > 0) {
                    setArticles(data);
                }
                else {
                    setArticles(fallbackArticles);
                }
            }
            catch (e) {
                // setError("Impossible de charger les articles. Affichage des contenus par défaut.");
                setArticles(fallbackArticles);
            }
            finally {
                setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);
    // Quand on ouvre un article: scroll au début du bloc + activer ESC pour fermer
    useEffect(() => {
        if (selected && containerRef.current) {
            const top = containerRef.current.getBoundingClientRect().top + window.scrollY - 16;
            window.scrollTo({ top, behavior: "smooth" });
        }
    }, [selected]);
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape" && selected)
                setSelected(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [selected]);
    // Recherche (titre + extrait)
    const filtered = useMemo(() => {
        if (!query.trim())
            return articles;
        const q = query.toLowerCase();
        return articles.filter((a) => (a.title || "").toLowerCase().includes(q) || (a.excerpt || "").toLowerCase().includes(q));
    }, [articles, query]);
    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const pageSafe = Math.min(page, totalPages);
    const start = (pageSafe - 1) * PAGE_SIZE;
    const visible = filtered.slice(start, start + PAGE_SIZE);
    // Helpers
    const truncate = (text, n = 140) => (text && text.length > n ? text.slice(0, n).replace(/\s+\S*$/, "…") : text || "");
    const goTo = (p) => setPage(Math.min(Math.max(1, p), totalPages));
    const getContentHtml = (a) => {
        const raw = a.content || a.body || "";
        return basicSanitize(raw);
    };
    if (loading) {
        return (_jsxs("section", { style: sx.section, children: [_jsx(Hero, {}), _jsx("div", { style: sx.container, children: _jsx("div", { style: sx.grid, children: Array.from({ length: 9 }).map((_, i) => (_jsx(SkeletonCard, {}, i))) }) })] }));
    }
    return (_jsxs("section", { style: sx.section, children: [_jsx(Hero, {}), _jsx("div", { ref: containerRef, style: sx.container, children: selected ? (_jsxs("article", { style: sx.articleFull, children: [_jsx("button", { style: sx.backBtn, onClick: () => setSelected(null), "aria-label": "Retour au listing", children: "\u2190 Retour au blog (Esc)" }), _jsx("h2", { style: sx.fullTitle, children: selected.title }), selected.image?.url && (_jsx("img", { src: selected.image.url, alt: selected.title, style: sx.fullImage })), selected.excerpt && _jsx("p", { style: sx.lead, children: selected.excerpt }), _jsx("div", { style: sx.fullContent, children: _jsx("div", { dangerouslySetInnerHTML: { __html: getContentHtml(selected) } }) })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { style: sx.toolbar, children: [_jsx("div", { style: sx.searchBox, children: _jsx("input", { value: query, onChange: (e) => {
                                            setQuery(e.target.value);
                                            setPage(1);
                                        }, placeholder: "Rechercher un article\u2026", "aria-label": "Rechercher dans le blog", style: sx.searchInput }) }), _jsxs("span", { style: sx.count, children: [filtered.length, " article", filtered.length > 1 ? "s" : ""] })] }), _jsx("div", { style: sx.grid, children: visible.length === 0 ? (_jsx("div", { style: sx.empty, children: "Aucun article ne correspond \u00E0 votre recherche." })) : (visible.map((a) => (_jsxs("div", { style: sx.card, children: [_jsx("div", { style: sx.thumbWrap, children: a.image?.url ? (_jsx("img", { src: a.image.url, alt: a.title, style: sx.thumb, loading: "lazy" })) : (_jsx("div", { style: { ...sx.thumb, display: "grid", placeItems: "center", fontSize: 12, color: "#888" }, children: "Image indisponible" })) }), _jsxs("div", { style: sx.cardBody, children: [_jsx("h3", { style: sx.cardTitle, children: a.title }), a.excerpt && _jsx("p", { style: sx.cardExcerpt, children: truncate(a.excerpt, 150) }), _jsx("div", { style: sx.cardFooter, children: _jsx("button", { style: sx.readMoreBtn, onClick: () => setSelected(a), "aria-expanded": selected && selected.id === a.id ? "true" : "false", "aria-controls": `article-${a.id}`, children: "Lire l\u2019article \u2192" }) })] })] }, a.id)))) }), totalPages > 1 && (_jsxs("nav", { style: sx.pagination, "aria-label": "Pagination du blog", children: [_jsx("button", { style: sx.pageBtn, onClick: () => goTo(pageSafe - 1), disabled: pageSafe === 1, children: "\u2190 Pr\u00E9c\u00E9dent" }), _jsx("ul", { style: sx.pageList, children: Array.from({ length: totalPages }).map((_, i) => {
                                        const p = i + 1;
                                        const active = p === pageSafe;
                                        return (_jsx("li", { children: _jsx("button", { style: { ...sx.pageNum, ...(active ? sx.pageNumActive : {}) }, onClick: () => goTo(p), "aria-current": active ? "page" : undefined, children: p }) }, p));
                                    }) }), _jsx("button", { style: sx.pageBtn, onClick: () => goTo(pageSafe + 1), disabled: pageSafe === totalPages, children: "Suivant \u2192" })] }))] })) })] }));
}
/* ----------------------------- UI sub-components ---------------------------- */
function Hero() {
    return (_jsx("header", { style: sx.hero, children: _jsxs("div", { style: sx.heroInner, children: [_jsx("h1", { style: sx.heroTitle, children: "Blog & Conseils Sant\u00E9" }), _jsx("p", { style: sx.heroSubtitle, children: "Actualit\u00E9s, explications d\u2019analyses et bonnes pratiques au quotidien." })] }) }));
}
function SkeletonCard() {
    return (_jsxs("div", { style: sx.card, children: [_jsx("div", { style: { ...sx.thumbWrap, background: "#f2f2f2" } }), _jsxs("div", { style: sx.cardBody, children: [_jsx("div", { style: { height: 20, background: "#eee", borderRadius: 8, marginBottom: 10 } }), _jsx("div", { style: { height: 14, background: "#f0f0f0", borderRadius: 8, marginBottom: 8 } }), _jsx("div", { style: { height: 14, width: "70%", background: "#f5f5f5", borderRadius: 8 } })] })] }));
}
/* ----------------------------- Sanitize minimal ----------------------------- */
function basicSanitize(html) {
    if (!html)
        return "";
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
const sx = {
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
