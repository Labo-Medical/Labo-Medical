import React, { type CSSProperties, useState } from 'react';
import { MdMessage } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ContactTab: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle: CSSProperties = {
    position: 'fixed',
    right: 0,
    top: '50%',
    transform: `translateY(-50%) rotate(-0deg) ${isHovered ? 'translateX(-10px)' : ''}`,
    backgroundColor: '#800000', // Couleur grenat
    color: 'white',
    padding: '10px 20px',
    fontWeight: 'bold',
    borderRadius: '8px 8px 0 0',
    textDecoration: 'none',
    transition: 'transform 0.3s ease',
    zIndex: 1000,
    transformOrigin: 'bottom right',
  };

  return (
    <Link
      to="/contact"
      style={baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MdMessage size={24} color="white" />
    </Link>
  );
};

export default ContactTab;
