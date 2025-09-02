import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Blog.css';
import { useEffect, useState } from 'react';
import { fetchPayloadBlogs } from '../services/payloadApi';
const fallbackArticles = [
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
    const [articles, setArticles] = useState(null);
    useEffect(() => {
        fetchPayloadBlogs()
            .then(data => {
            if (data && data.length > 0)
                setArticles(data);
            else
                setArticles(null);
        })
            .catch(() => setArticles(null));
    }, []);
    const displayArticles = articles || fallbackArticles;
    return (_jsxs("section", { className: "blog-section", children: [_jsx("h2", { children: "Les actualit\u00E9s de la biologie m\u00E9dicale" }), _jsxs("div", { className: "blog-main-layout", children: [_jsxs("div", { className: "blog-main-article", children: [_jsx("a", { href: `/${displayArticles[0].slug}`, children: _jsx("img", { src: displayArticles[0].image.url, alt: displayArticles[0].title }) }), _jsxs("div", { className: "blog-main-content", children: [_jsx("h3", { children: displayArticles[0].title }), _jsx("p", { children: displayArticles[0].excerpt }), _jsx("a", { href: `/${displayArticles[0].slug}`, className: "blog-link", children: "Lire l'article" })] })] }), _jsx("div", { className: "blog-side-list", children: displayArticles.slice(1, 4).map(article => (_jsxs("div", { className: "blog-side-article", children: [_jsx("a", { href: `/${article.slug}`, children: _jsx("img", { src: article.image.url, alt: article.title }) }), _jsxs("div", { className: "blog-side-content", children: [_jsx("h4", { children: article.title }), _jsx("p", { children: article.excerpt }), _jsx("a", { href: `/${article.slug}`, className: "blog-link", children: "Lire l'article" })] })] }, article.id))) })] })] }));
}
