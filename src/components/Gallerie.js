import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import "react-photo-album/rows.css"; // pour des tailles uniformes
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { fetchPayloadGallery } from "../services/payloadApi";
const fallbackPhotos = [
    { src: "/plateau/4.jpg", width: 800, height: 600 },
    { src: "/plateau/5.jpg", width: 800, height: 600 },
    { src: "/plateau/6.jpg", width: 800, height: 600 },
    { src: "/plateau/7.jpg", width: 800, height: 600 },
    { src: "/plateau/8.jpg", width: 1600, height: 900 },
    { src: "/plateau/9.jpg", width: 800, height: 600 },
    { src: "/plateau/10.jpg", width: 1600, height: 900 },
    { src: "/plateau/11.jpg", width: 800, height: 600 },
    { src: "/plateau/12.jpg", width: 1600, height: 900 },
    { src: "/plateau/13.jpg", width: 800, height: 600 },
    { src: "/plateau/14.jpg", width: 1600, height: 900 },
    { src: "/plateau/15.jpg", width: 1600, height: 900 },
    { src: "/plateau/16.jpg", width: 1600, height: 900 },
    { src: "/plateau/17.jpg", width: 800, height: 600 },
    { src: "/plateau/18.jpg", width: 800, height: 600 },
    { src: "/plateau/19.jpg", width: 800, height: 600 },
    { src: "/plateau/20.jpg", width: 1600, height: 900 },
    { src: "/plateau/21.jpg", width: 1600, height: 900 },
    { src: "/plateau/22.jpg", width: 1600, height: 900 },
    { src: "/plateau/23.jpg", width: 1600, height: 900 },
];
export default function Galerie() {
    const [photos, setPhotos] = useState(fallbackPhotos);
    const [showAll, setShowAll] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const scrollRef = useRef(null);
    useEffect(() => {
        fetchPayloadGallery()
            .then((data) => {
            if (data.length > 0)
                setPhotos(data);
        })
            .catch(() => setPhotos(fallbackPhotos));
    }, []);
    // Défilement horizontal automatique
    useEffect(() => {
        if (showAll)
            return;
        const container = scrollRef.current;
        if (!container)
            return;
        const scrollSpeed = 1;
        let animationFrame;
        const step = () => {
            if (!container)
                return;
            container.scrollLeft += scrollSpeed;
            if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                container.scrollLeft = 0;
            }
            animationFrame = requestAnimationFrame(step);
        };
        animationFrame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrame);
    }, [photos, showAll]);
    const slides = photos.map(({ src, width, height }) => ({ src, width, height }));
    return (_jsx("section", { className: "gallerie-section", children: _jsxs("div", { style: { maxWidth: 1200, margin: "auto", padding: 16 }, children: [_jsx("h2", { style: { color: "#831616" }, children: "GALLERIE" }), !showAll ? (_jsx("div", { ref: scrollRef, style: {
                        display: "flex",
                        overflowX: "auto",
                        gap: 10,
                        scrollBehavior: "smooth",
                        padding: "10px 0",
                    }, children: photos.map((photo, index) => (_jsx("img", { src: photo.src, alt: `Photo ${index + 1}`, style: {
                            width: 250,
                            height: 160,
                            objectFit: "cover",
                            cursor: "pointer",
                            borderRadius: 8,
                            flexShrink: 0,
                        }, onClick: () => setLightboxIndex(index) }, index))) })) : (
                // Grille responsive
                _jsx("div", { style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: 10,
                        padding: "10px 0",
                    }, children: photos.map((photo, index) => (_jsx("div", { style: {
                            width: "100%",
                            paddingTop: `${(photo.height / photo.width) * 100}%`,
                            position: "relative",
                            borderRadius: 8,
                            overflow: "hidden",
                            cursor: "pointer",
                        }, onClick: () => setLightboxIndex(index), children: _jsx("img", { src: photo.src, alt: `Photo ${index + 1}`, style: {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            } }) }, index))) })), _jsx("div", { style: { textAlign: "center", marginTop: 20 }, children: !showAll ? (_jsx("button", { onClick: () => setShowAll(true), style: {
                            padding: "10px 20px",
                            fontSize: 16,
                            cursor: "pointer",
                            borderRadius: 5,
                            border: "1px solid #333",
                            backgroundColor: "#800020",
                            color: "#fff",
                        }, children: "Voir toutes les photos" })) : (_jsx("button", { onClick: () => setShowAll(false), style: {
                            padding: "10px 20px",
                            fontSize: 16,
                            cursor: "pointer",
                            borderRadius: 5,
                            border: "1px solid #333",
                            backgroundColor: "#555",
                            color: "#fff",
                        }, children: "Retour au d\u00E9filement" })) }), lightboxIndex !== null && (_jsx(Lightbox, { slides: slides, open: lightboxIndex !== null, index: lightboxIndex, close: () => setLightboxIndex(null) }))] }) }));
}
