import './Blog.css';
import { useEffect, useState } from 'react';
import { fetchPayloadBlogs } from '../services/payloadApi';

type ArticlePay = {
  title: string;
  excerpt: string;
  slug: string;
  image: { url: string };
  id: string;
};

const fallbackArticles: ArticlePay[] = [
  {
    title: "Pourquoi faire un bilan sanguin régulier ?",
    excerpt: "Découvrez l'importance du suivi biologique pour votre santé et les principaux examens à réaliser.",
    slug: "blogarticle",
    image: { url: "/blog/blog1.jpg" },
    id: 'fallback1'
  },
  {
    title: "Comprendre vos résultats d’analyses",
    excerpt: "Nos biologistes vous expliquent comment lire et interpréter vos résultats de laboratoire.",
    slug: "blogarticle",
    image: { url: "/blog/blog2.jpg" },
    id: 'fallback2'
  },
  {
    title: "Préparer sa visite au laboratoire",
    excerpt: "Conseils pratiques pour un prélèvement réussi et un accueil optimal dans nos laboratoires.",
    slug: "blogarticle",
    image: { url: "/blog/blog3.jpg" },
    id: 'fallback3'
  },
  {
    title: "Les nouveautés en biologie médicale",
    excerpt: "Restez informé des dernières avancées et innovations dans le domaine de la biologie médicale.",
    slug: "blogarticle",
    image: { url: "/blog/blog4.jpg" },
    id: 'fallback4'
  }
];

export default function Blog() {
  const [articles, setArticles] = useState<ArticlePay[] | null>(null);

  useEffect(() => {
    fetchPayloadBlogs()
      .then(data => {
        if (data && data.length > 0) setArticles(data);
        else setArticles(null);
      })
      .catch(() => setArticles(null));
  }, []);

  const displayArticles = articles || fallbackArticles;

  return (
    <section className="blog-section">
      <h2>Les actualités de la biologie médicale</h2>
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
            <a href={`/${displayArticles[0].slug}`} className="blog-link">Lire l'article</a>
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
                <a href={`/${article.slug}`} className="blog-link">Lire l'article</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
