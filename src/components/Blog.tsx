// src/components/Blog.tsx
import './Blog.css';
import { useEffect, useState } from "react";
import { fetchPayloadBlogs } from "../services/payloadApi";
import { ArticlePayload } from "../types/articles";
import { Link } from "react-router-dom";

const fallbackArticles: ArticlePayload[] = [
  {
    id : '1',
    title: "Pourquoi faire un bilan sanguin régulier ?",
    excerpt: "Découvrez l'importance du suivi biologique pour votre santé et les principaux examens à réaliser.",
    slug: "blogarticle",
    image: { url: "/blog/blog1.jpg" },
    content: 'Contenu complet'
  },
  {
    id : '2',
    title: "Comprendre vos résultats d’analyses",
    excerpt: "Nos biologistes vous expliquent comment lire et interpréter vos résultats de laboratoire.",
    slug: "blogarticle",
    image: { url: "/blog/blog2.jpg" },
    content: 'Contenu complet'
  },
  {
    id : '3',
    title: "Préparer sa visite au laboratoire",
    excerpt: "Conseils pratiques pour un prélèvement réussi et un accueil optimal dans nos laboratoires.",
    slug: "blogarticle",
    image: { url: "/blog/blog3.jpg" },
    content: 'Contenu complet'
  },
  {
    id : '4',
    title: "Les nouveautés en biologie médicale",
    excerpt: "Restez informé des dernières avancées et innovations dans le domaine de la biologie médicale.",
    slug: "blogarticle",
    image: { url: "/blog/blog4.jpg" },
    content: 'Contenu complet'
  }
];

export default function Blog() {
  const [articles, setArticles] = useState<ArticlePayload[]>(fallbackArticles);

  useEffect(() => {
    fetchPayloadBlogs()
      .then((data) => {
        if (data.length > 0) setArticles(data);
      })
      .catch(() => setArticles(fallbackArticles));
  }, []);

  const displayArticles = articles;

  return (
    <section className="blog-section" style={{ padding: "2rem 0" }}>
      <h2 style={{ color: "#831616", marginBottom: "1.5rem", textAlign: "center" }}>
        Les actualités de la biologie médicale
      </h2>

      <div
        className="blog-main-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1.5rem",
          maxWidth: 1200,
          margin: "auto",
        }}
      >
        {/* Article principal */}
        <Link
          to={`/${displayArticles[0].slug}`}
          className="blog-main-article"
          style={{
            display: "block",
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <img
            src={displayArticles[0].image.url}
            alt={displayArticles[0].title}
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />
          <div
            className="blog-main-content"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              background: "rgba(229, 238, 239, 0.99)", // vert transparent
              color: "#000", // texte noir
              padding: "1rem"
            }}
          >
            <h3 style={{ margin: 0 }}>{displayArticles[0].title}</h3>
            <p style={{ margin: "0.5rem 0 0" }}>{displayArticles[0].excerpt}</p>
            <span style={{ fontWeight: "bold", textDecoration: "underline" }}>Lire l'article</span>
          </div>
        </Link>

        {/* Liste des articles secondaires */}
        <div
          className="blog-side-list"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {displayArticles.slice(1, 4).map(article => (
            <Link
              to={`/${article.slug}`}
              className="blog-side-article"
              key={article.id}
              style={{
                display: "block",
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={article.image.url}
                alt={article.title}
                style={{ width: "100%", height: "120px", objectFit: "cover" }}
              />
              <div
                className="blog-side-content"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  background: "rgba(226, 220, 218, 0.81)", 
                  color: "#000", // texte noir
                  padding: "0.5rem"
                }}
              >
                <h4 style={{ margin: 0, fontSize: "0.95rem" }}>{article.title}</h4>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.8rem" }}>{article.excerpt}</p>
                <span style={{ fontWeight: "bold", fontSize: "0.8rem", textDecoration: "underline" }}>
                  Lire l'article
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
