import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
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
const LogoSlider = () => {
    const [logos, setLogos] = useState(fallbackLogos);
    useEffect(() => {
        fetchPayloadLogos()
            .then((data) => {
            if (data && data.length > 0)
                setLogos(data);
        })
            .catch(() => {
            setLogos(fallbackLogos);
        });
    }, []);
    const duplicatedLogos = [...logos, ...logos];
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: styles }), _jsxs("div", { className: "logo-slider-container", children: [_jsx("h2", { className: "logo-slider-title", children: "Nos partenaires" }), _jsx("div", { className: "logo-slider", children: _jsx("div", { className: "slider-track", children: duplicatedLogos.map((logo, index) => (_jsx("div", { className: "logo", children: _jsx("img", { src: logo, alt: `Logo partenaire ${index + 1}` }) }, index))) }) })] })] }));
};
export default LogoSlider;
