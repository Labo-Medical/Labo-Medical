import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchPayloadAutomates, type ServiceData } from '../services/payloadApi2';

// Build i18n-backed fallback data for automates
function buildFallbackAutomates(t: (key: string) => string): ServiceData[] {
  return [
    { title: t('home.automates.items.auto1.title'), description: t('home.automates.items.auto1.desc'), iconSrc: '/automates/a2.png' },
    { title: t('home.automates.items.auto2.title'), description: t('home.automates.items.auto2.desc'), iconSrc: '/automates/a3.png' },
    { title: t('home.automates.items.auto3.title'), description: t('home.automates.items.auto3.desc'), iconSrc: '/automates/a4.png' },
    { title: t('home.automates.items.auto4.title'), description: t('home.automates.items.auto4.desc'), iconSrc: '/automates/a5.png' },
    { title: t('home.automates.items.auto5.title'), description: t('home.automates.items.auto5.desc'), iconSrc: '/automates/a6.png' },
    { title: t('home.automates.items.auto6.title'), description: t('home.automates.items.auto6.desc'), iconSrc: '/automates/a7.png' },
    { title: t('home.automates.items.auto7.title'), description: t('home.automates.items.auto7.desc'), iconSrc: '/automates/a8.png' },
    { title: t('home.automates.items.auto8.title'), description: t('home.automates.items.auto8.desc'), iconSrc: '/automates/a9.png' },
    { title: t('home.automates.items.auto9.title'), description: t('home.automates.items.auto9.desc'), iconSrc: '/automates/a10.png' },
    { title: t('home.automates.items.auto10.title'), description: t('home.automates.items.auto10.desc'), iconSrc: '/automates/4.png' },
    { title: t('home.automates.items.auto11.title'), description: t('home.automates.items.auto11.desc'), iconSrc: '/automates/7.png' },
    { title: t('home.automates.items.auto12.title'), description: t('home.automates.items.auto12.desc'), iconSrc: '/automates/9.png' },
    { title: t('home.automates.items.auto13.title'), description: t('home.automates.items.auto13.desc'), iconSrc: '/automates/12.png' },
  ];
}

// === Spécialités médicales ===
function buildSpecialites(t: (key: string) => string): ServiceData[] {
  return [
    { title: t('home.specialties.items.s1.title'), description: t('home.specialties.items.s1.desc'), iconSrc: '/icons/prelevement.png' },
    { title: t('home.specialties.items.s2.title'), description: t('home.specialties.items.s2.desc'), iconSrc: '/icons/biochemy.svg' },
    { title: t('home.specialties.items.s3.title'), description: t('home.specialties.items.s3.desc'), iconSrc: '/icons/hematology.svg' },
    { title: t('home.specialties.items.s4.title'), description: t('home.specialties.items.s4.desc'), iconSrc: '/icons/microbiology.svg' },
    { title: t('home.specialties.items.s5.title'), description: t('home.specialties.items.s5.desc'), iconSrc: '/icons/immunology.svg' },
    { title: t('home.specialties.items.s6.title'), description: t('home.specialties.items.s6.desc'), iconSrc: '/icons/hormonology.svg' },
    { title: t('home.specialties.items.s7.title'), description: t('home.specialties.items.s7.desc'), iconSrc: '/icons/allergy.png' },
    { title: t('home.specialties.items.s8.title'), description: t('home.specialties.items.s8.desc'), iconSrc: '/icons/hemostase.svg' },
    { title: t('home.specialties.items.s9.title'), description: t('home.specialties.items.s9.desc'), iconSrc: '/icons/glyco.png' },
    { title: t('home.specialties.items.s10.title'), description: t('home.specialties.items.s10.desc'), iconSrc: '/icons/serology.svg' },
    { title: t('home.specialties.items.s11.title'), description: t('home.specialties.items.s11.desc'), iconSrc: '/icons/bacteria.svg' },
    { title: t('home.specialties.items.s12.title'), description: t('home.specialties.items.s12.desc'), iconSrc: '/icons/vitamine.svg' },
    { title: t('home.specialties.items.s13.title'), description: t('home.specialties.items.s13.desc'), iconSrc: '/icons/parasite.svg' },
    { title: t('home.specialties.items.s14.title'), description: t('home.specialties.items.s14.desc'), iconSrc: '/icons/molecule.svg' },
    { title: t('home.specialties.items.s15.title'), description: t('home.specialties.items.s15.desc'), iconSrc: '/icons/gene.png' },
    { title: t('home.specialties.items.s16.title'), description: t('home.specialties.items.s16.desc'), iconSrc: '/icons/molecule.png' },
  ];
}

// (Composant SpecialiteIcon supprimé car non utilisé)

// === Section spécialités avec GRID responsive ===
function SpecialitesSection() {
  const { t } = useTranslation();
  const items = useMemo(() => buildSpecialites(t), [t]);
  return (
    <section style={{ marginTop: '2rem', backgroundColor: '#f4f6fa', padding: '2rem 1rem', borderRadius: '12px' }}>
      <h2 style={{ fontSize: '1.6rem', textAlign: 'center', marginBottom: '1.5rem', color: '#800020' }}>
        {t('home.specialties.title')}
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
          gap: '0.6rem',
          justifyContent: 'center',
        }}
      >
        {items.map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              width: '100%', // important pour que grid contrôle la largeur
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <div
              style={{
                backgroundColor: '#f0f0f0',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.4rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <img src={s.iconSrc} alt={s.title} style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
            </div>
            <span style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: 500 }}>{s.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}


// === Carte automate ===
function AutomateCard({ title, description, iconSrc }: ServiceData) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '260px',
      }}
    >
      <img src={iconSrc} alt={title} style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem', background: '#f4f6fa' }} />
      <h3 style={{ fontSize: '1.1rem', color: '#800020', marginBottom: '0.5rem', textAlign: 'center' }}>{title}</h3>
      <p style={{ fontSize: '0.97rem', color: '#444', textAlign: 'center' }}>{description}</p>
    </div>
  );
}

// === Composant principal ===
export default function Services() {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(4);
  const [automates, setAutomates] = useState<ServiceData[]>(() => buildFallbackAutomates(t));

  useEffect(() => {
    fetchPayloadAutomates()
      .then((data) => { if (data.length > 0) setAutomates(data); })
      .catch(() => setAutomates(buildFallbackAutomates(t)));
  }, [t]);

  return (
    <section style={{ padding: '2rem', backgroundColor: '#f8f9fb', borderRadius: '12px' }}>
     
      <h2 style={{ color: '#800020', marginBottom: '2rem', fontWeight: 700, textAlign: 'center' }}>
        {t('home.automates.title')}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '24px' }}>
        {automates.slice(0, visibleCount).map((item, index) => (
          <AutomateCard key={index} {...item} />
        ))}
      </div>
      {visibleCount < automates.length && (
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button
            onClick={() => setVisibleCount((prev) => Math.min(prev + 4, automates.length))}
            style={{ backgroundColor: '#800020', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '1rem', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
          >
            {t('home.common.more')}
          </button>
        </div>
      )}
       <SpecialitesSection />
    </section>
  );
}
