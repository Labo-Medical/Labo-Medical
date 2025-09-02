import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const cards = [
  {
    icon: '/icons/politic.svg',
    title: 'NOS POLITIQUES',
    text: 'Consultez nos politiques : Confidentialité, Qualité et RH.',
    link: '/politic',
  },
  {
    icon: '/icons/lists.svg',
    title: 'PRÉPAREZ VOTRE VISITE',
    text: 'Conseils utiles pour vos examens médicaux.',
    link: '/prepavisite',
  },
  {
    icon: '/icons/computer.svg',
    title: 'ACCÉDEZ À VOS RÉSULTATS',
    text: 'Consultez vos résultats en ligne, en toute sécurité.',
    link: '/resultat',
  },
  {
    icon: '/icons/chat.svg',
    title: 'FAQ',
    text: 'Réponses aux questions fréquentes.',
    link: '/faq',
  },
];

export default function SliderCards() {
  return (
    <section style={{ padding: '2rem 1rem', background: 'transparent' }}>
      <motion.div
        style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          justifyItems: 'center',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            style={{
              background: '#fff',
              borderRadius: '16px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
              padding: '1.2rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              border: '1px solid #eee',
              transition: 'all 0.3s ease',
            }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link to={card.link} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
                style={{
                  background: '#f2f2f2',
                  borderRadius: '50%',
                  padding: '10px',
                  marginBottom: '1rem',
                  border: '1px solid #ddd',
                }}
              >
                <img
                  src={card.icon}
                  alt=""
                  style={{ width: '40px', height: '40px' }}
                />
              </div>
              <h4
                style={{
                  color: '#6e0b14',
                  fontSize: '1rem',
                  marginBottom: '0.4rem',
                  fontWeight: 600,
                }}
              >
                {card.title}
              </h4>
              <p
                style={{
                  color: '#444',
                  fontSize: '0.9rem',
                  lineHeight: '1.4',
                  padding: '0 0.5rem',
                }}
              >
                {card.text}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
