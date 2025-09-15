import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchPayloadBlogs, fetchPayloadAnnonces } from "../services/payloadApi";
// Fallback data
const fallbackArticles = [
    {
        id: "fallback1",
        title: "Titre de l'article 1",
        slug: "article-1",
        excerpt: "This is a sample excerpt",
        image: { url: "/sample-image.jpg" },
    },
    {
        id: "fallback2",
        title: "Titre de l'article 2",
        slug: "article-2",
        excerpt: "This is another sample excerpt",
        image: { url: "/another-sample-image.jpg" },
    },
];
const fallbackAnnonces = [
    {
        id: "fallback1",
        titre: "Titre de l'annonce 1",
        description: "Description de l'annonce 1",
        image: { url: "/annonce1.jpg" },
        lien: "/annonceall"
    },
    {
        id: "fallback2",
        titre: "Titre de l'annonce 2",
        description: "Description de l'annonce 2",
        image: { url: "/annonce2.jpg" },
        lien: "/annonceall"
    },
];
// Styled components
const TickerWrapper = styled.div `
  background-color: #fefefe;
  padding: 20px;
  border-bottom: 2px solid #ddd;
`;
const TickerInner = styled.div `
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const Highlight = styled.div `
  margin: 10px;
  padding: 15px 20px;
  background: linear-gradient(135deg, #f0f8ff, #e6f7ff);
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;
const HighlightTitle = styled.h3 `
  font-size: 18px;
  font-weight: 700;
  color: #0077cc;
  text-align: center;
  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const HighlightTicker = () => {
    const [highlights, setHighlights] = useState([]);
    useEffect(() => {
        const fetchHighlights = async () => {
            try {
                const blogs = await fetchPayloadBlogs();
                const latestBlogs = blogs.slice(0, 2).map((b) => ({
                    id: b.id,
                    title: b.title,
                    slug: b.slug,
                    type: "article",
                }));
                const annoncesPayload = await fetchPayloadAnnonces();
                const latestAnnonces = annoncesPayload.slice(0, 2).map((a) => ({
                    id: a.id,
                    title: a.titre,
                    slug: a.lien || "/annonceall",
                    type: "annonce",
                }));
                setHighlights([...latestBlogs, ...latestAnnonces]);
            }
            catch {
                // fallback
                const fallback = [
                    ...fallbackArticles.map((a) => ({ id: a.id, title: a.title, slug: a.slug, type: "article" })),
                    ...fallbackAnnonces.map((a) => ({ id: a.id, title: a.titre, slug: a.lien, type: "annonce" })),
                ];
                setHighlights(fallback);
            }
        };
        fetchHighlights();
    }, []);
    if (highlights.length === 0)
        return null;
    return (_jsx(TickerWrapper, { children: _jsx(TickerInner, { children: highlights.slice(0, 4).map((highlight) => {
                const link = highlight.type === "article" ? `/blogarticle/${highlight.slug}` : "/annonceall";
                return (_jsx(Highlight, { children: _jsx(HighlightTitle, { children: _jsx(Link, { to: link, children: highlight.title }) }) }, highlight.id));
            }) }) }));
};
export default HighlightTicker;
