import React, { useEffect, useState } from 'react';
import { fetchPayloadLogos } from '../services/payloadApi2';

const styles = `
.logo-slider-container {
  padding: 40px 20px;
  text-align: center;
}

.logo-slider-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.logo-slider {
  position: relative;
  width: 100%;
  height: 100px;
  overflow: hidden;
  background: transparent;
  margin-bottom: 40px;
}

.slider-track {
  display: flex;
  align-items: center;
  animation: scroll 15s linear infinite;
}

.logo {
  flex: 0 0 auto;
  margin-right: 20px;
}

.logo img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

const fallbackLogos = [
  '/partenaires/renault.png',
  '/partenaires/yazaki.jpg',
  '/partenaires/aptiv.png',
  '/partenaires/cmim.png',
  '/partenaires/gmd.jpeg',
  '/partenaires/mupras.jpeg',
  '/partenaires/oeuvres.jpeg',
];

const LogoSlider: React.FC = () => {
  const [logos, setLogos] = useState<string[]>(fallbackLogos);

  useEffect(() => {
    fetchPayloadLogos()
      .then((data) => {
        if (data && data.length > 0) setLogos(data);
      })
      .catch(() => {
        setLogos(fallbackLogos);
      });
  }, []);

  const duplicatedLogos = [...logos, ...logos];

  return (
    <>
      <style>{styles}</style>
      <div className="logo-slider-container">
        <h2 className="logo-slider-title">Nos partenaires</h2>
        <div className="logo-slider">
          <div className="slider-track">
            {duplicatedLogos.map((logo, index) => (
              <div key={index} className="logo">
                <img src={logo} alt={`Logo partenaire ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoSlider;
