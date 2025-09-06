import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import PhotoAlbum from "react-photo-album";
import "react-photo-album/masonry.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { fetchPayloadGallery, type GalleryImagePayload } from "../services/payloadApi";

const fallbackPhotos: GalleryImagePayload[] = [
  {
    src: "/plateau/4.jpg",
    width: 800,
    height: 600,
    srcSet: [
      { src: "/plateau/4.jpg", width: 400, height: 300 },
      { src: "/plateau/4.jpg", width: 200, height: 150 },
    ],
  },
  
  {
    src: "/plateau/5.jpg",
    width: 800,
    height: 600,
    srcSet: [
      { src: "/plateau/5.jpg", width: 400, height: 300 },
      { src: "/plateau/5.jpg", width: 200, height: 150 },
    ],
  },

  {
    src: "/plateau/6.jpg",
    width: 800,
    height: 600,
    srcSet: [
      { src: "/plateau/6.jpg", width: 400, height: 300 },
      { src: "/plateau/6.jpg", width: 200, height: 150 },
    ],
  },
  
  {
    src: "/plateau/7.jpg",
    width: 800,
    height: 600,
    srcSet: [
      { src: "/plateau/7.jpg", width: 400, height: 300 },
      { src: "/plateau/7.jpg", width: 200, height: 150 },
    ],
  },
  {
    src: "/plateau/8.jpg",
    width: 1600,
    height: 900,
    srcSet: [
      { src: "/plateau/8.jpg", width: 800, height: 450 },
      { src: "/plateau/8.jpg", width: 400, height: 225 },
    ],
  },
  {
    src: "/plateau/9.jpg",
    width: 800,
    height: 600,
    srcSet: [
      { src: "/plateau/9.jpg", width: 400, height: 300 },
      { src: "/plateau/9.jpg", width: 200, height: 150 },
    ],
  },
  {
    src: "/plateau/10.jpg",
    width: 1600,
    height: 900,
    srcSet: [
      { src: "/plateau/10.jpg", width: 800, height: 450 },
      { src: "/plateau/10.jpg", width: 400, height: 225 },
    ],
  },
  {
    src: "/plateau/11.jpg",
    width: 800,
    height: 600,
    srcSet: [
      { src: "/plateau/11.jpg", width: 400, height: 300 },
      { src: "/plateau/11.jpg", width: 200, height: 150 },
    ],
  },
  {
    src: "/plateau/12.jpg",
    width: 1600,
    height: 900,
    srcSet: [
      { src: "/plateau/12.jpg", width: 800, height: 450 },
      { src: "/plateau/12.jpg", width: 400, height: 225 },
    ],
  },
  {
    src: "/plateau/13.jpg",
    width: 800,
    height: 600,
    srcSet: [
      { src: "/plateau/13.jpg", width: 400, height: 300 },
      { src: "/plateau/13.jpg", width: 200, height: 150 },
    ],
  },
  {
    src: "/plateau/14.jpg",
    width: 1600,
    height: 900,
    srcSet: [
      { src: "/plateau/14.jpg", width: 800, height: 450 },
      { src: "/plateau/14.jpg", width: 400, height: 225 },
    ],
  },

  {
    src: "/plateau/15.jpg",
    width: 1600,
    height: 900,
    srcSet: [
      { src: "/plateau/15.jpg", width: 800, height: 450 },
      { src: "/plateau/15.jpg", width: 400, height: 225 },
    ],
  },
  
  {
    src: "/plateau/16.jpg",
    width: 1600,
    height: 900,
    srcSet: [
      { src: "/plateau/16.jpg", width: 800, height: 450 },
      { src: "/plateau/16.jpg", width: 400, height: 225 },
    ],
  },
  {
    src: "/plateau/17.jpg",
    width: 800,
    height: 600,
    srcSet: [
      { src: "/plateau/17.jpg", width: 400, height: 300 },
      { src: "/plateau/17.jpg", width: 200, height: 150 },
    ],
  },
  
  {
    src: "/plateau/18.jpg",
    width: 800,
    height: 600,
    srcSet: [
      { src: "/plateau/18.jpg", width: 400, height: 300 },
      { src: "/plateau/18.jpg", width: 200, height: 150 },
    ],
  },

  {
    src: "/plateau/19.jpg",
    width: 800,
    height: 600,
    srcSet: [
      { src: "/plateau/19.jpg", width: 400, height: 300 },
      { src: "/plateau/19.jpg", width: 200, height: 150 },
    ],
  },
  {
    src: "/plateau/20.jpg",
    width: 1600,
    height: 900,
    srcSet: [
      { src: "/plateau/20.jpg", width: 800, height: 450 },
      { src: "/plateau/20.jpg", width: 400, height: 225 },
    ],
  },

  {
    src: "/plateau/21.jpg",
    width: 1600,
    height: 900,
    srcSet: [
      { src: "/plateau/21.jpg", width: 800, height: 450 },
      { src: "/plateau/21.jpg", width: 400, height: 225 },
    ],
  },

  {
    src: "/plateau/22.jpg",
    width: 1600,
    height: 900,
    srcSet: [
      { src: "/plateau/22.jpg", width: 800, height: 450 },
      { src: "/plateau/22.jpg", width: 400, height: 225 },
    ],
  },

  {
    src: "/plateau/23.jpg",
    width: 1600,
    height: 900,
    srcSet: [
      { src: "/plateau/23.jpg", width: 800, height: 450 },
      { src: "/plateau/23.jpg", width: 400, height: 225 },
    ],
  },
];

export default function Galerie() {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState<GalleryImagePayload[]>(fallbackPhotos);
  const [visibleCount, setVisibleCount] = useState(4);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchPayloadGallery()
      .then((data) => {
        if (data.length > 0) setPhotos(data);
      })
      .catch(() => {
        setPhotos(fallbackPhotos);
      });
  }, []);

  const visiblePhotos = photos.slice(0, visibleCount);
  const slides = photos.map(({ src, width, height }) => ({ src, width, height }));

  return (
    <section className="gallerie-section">
      <div style={{ maxWidth: 1200, margin: "auto", padding: 16 }}>
        <h2 style={{ color: "#831616" }}>{t('home.gallery.title')}</h2>

        <PhotoAlbum
          layout="masonry"
          photos={visiblePhotos}
          spacing={10}
          padding={5}
          onClick={({ index }) => setLightboxIndex(index)}
        />

        {visibleCount < photos.length && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button
              onClick={() => setVisibleCount(photos.length)}
              style={{
                padding: "10px 20px",
                fontSize: 16,
                cursor: "pointer",
                borderRadius: 5,
                border: "1px solid #333",
                backgroundColor: "#800020",
                color: "#fff",
              }}
            >
              {t('home.gallery.more')}
            </button>
          </div>
        )}

        {lightboxIndex !== null && (
          <Lightbox
            slides={slides}
            open={lightboxIndex !== null}
            index={lightboxIndex}
            close={() => setLightboxIndex(null)}
            />
        )}
      </div>
    </section>
  );
}
