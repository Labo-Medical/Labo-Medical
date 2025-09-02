import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fetchPayloadLabSouaniPage, type LabSouaniPageData } from "../services/payloadApi";

const fallbackData: LabSouaniPageData = {
  doctor: {
    name: "Dr. LYOUSSI NOUREDDINE",
    photo: { url: "/fond/sar.jpg" },
    description:
      "Spécialiste en biologie médicale.",
  },
  contact: {
    title: "Laboratoire médicale Zeroual Souani",
    address: "43 hay, boulevard Anfa, Tanger 90000",
    email: "souanilab@leslaboratoireszeroual.ma",
    phone: "05 39 33 63 20",
    whatsapp: "06 28 77 35 81",
    hours: "08h00 - 20h00",
  },
  slides: [
    { url: "/fond/souani2.jpeg", alt: "Laboratoire" },
    { url: "/fond/souani1.jpeg", alt: "Accueil" },
    { url: "/fond/souani3.jpeg", alt: "Matériel médical" },
  ],
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3254.0748040818303!2d-5.826470888629062!3d35.77011157244426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b878c75ed821b%3A0x1bf08c0b020f7d74!2sLaboratoire%20Zeroual%20Souani!5e1!3m2!1sfr!2sma!4v1750166666255!5m2!1sfr!2sma",
};

export default function LaboratoireSouaniPage() {
  const [data, setData] = useState<LabSouaniPageData>(fallbackData);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchPayloadLabSouaniPage()
      .then((d) => {
        if (d) setData(d);
      })
      .catch(() => {
        console.warn("PayloadCMS indisponible, fallback utilisé.");
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % data.slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data.slides]);

  return (
    <div
      style={{
        paddingTop: 20,
        backgroundColor: "#fdfdfd",
        color: "#333",
        fontFamily: '"Segoe UI", sans-serif',
      }}
      className="lab-container"
    >
      {/* Présentation Docteur */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          gridTemplateRows: "auto auto",
          gap: "1rem",
          padding: "0.5rem 1rem",
        }}
        className="lab-grid"
      >
        <section
          style={{
            background: "linear-gradient(135deg, #ffffff, #f0f0f0)",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.08)",
            textAlign: "center",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            gridRow: "span 2",
          }}
          className="doctor-presentation"
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.transform = "scale(1.02)";
            el.style.boxShadow = "0 8px 18px rgba(0, 0, 0, 0.12)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.transform = "none";
            el.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.08)";
          }}
        >
          <img
            src={data.doctor.photo.url}
            alt={data.doctor.name}
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #800000",
              marginBottom: "1rem",
            }}
          />
          <h2
            style={{
              margin: "0.5rem 0 0.4rem",
              fontSize: "1.6rem",
              color: "#800000",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
            }}
          >
            {data.doctor.name}
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.4,
              color: "#555",
              margin: 0,
            }}
          >
            {data.doctor.description}
          </p>
        </section>

        {/* Contact */}
        <section
          style={{
            backgroundColor: "#f9f9f9",
            padding: "0.5rem 0.8rem",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
            marginBottom: "0.2rem",
          }}
          className="contact-info"
        >
          <h2 style={{ color: "#800000", marginBottom: "0.6rem", fontSize: "1.2rem" }}>
            {data.contact.title}
          </h2>
          <p style={{ margin: "0.2rem 0", color: "#444", fontSize: "0.92rem" }}>
            Adresse : {data.contact.address}
          </p>
          <p style={{ margin: "0.2rem 0", color: "#444", fontSize: "0.92rem" }}>
            Email : {data.contact.email}
          </p>
          <p style={{ margin: "0.2rem 0", color: "#444", fontSize: "0.92rem" }}>
            Fixe : {data.contact.phone}
          </p>
          <p style={{ margin: "0.2rem 0", color: "#444", fontSize: "0.92rem" }}>
            WhatsApp : {data.contact.whatsapp}
          </p>
          <p style={{ margin: "0.2rem 0", color: "#444", fontSize: "0.92rem" }}>
            Horaires : {data.contact.hours}
          </p>
        </section>

        {/* Slider */}
        <section
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "660px",
            height: "330px",
            margin: "0 auto",
            overflow: "hidden",
            borderRadius: "16px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
          }}
          className="lab-slider"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={data.slides[index].url}
              className="slide"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              <img
                src={data.slides[index].url}
                alt={data.slides[index].alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </section>
      </div>

      {/* Map */}
      <section style={{ padding: "1.5rem 2rem" }} className="lab-map">
        <h2 style={{ marginBottom: "1rem", color: "#800000", fontSize: "1.3rem" }}>
          Localisation
        </h2>
        <iframe
          src={data.mapEmbedUrl}
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
          allowFullScreen
          loading="lazy"
          title="Localisation du laboratoire Souani"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
}
