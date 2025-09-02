import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { MdMessage } from 'react-icons/md';
import { Link } from 'react-router-dom';
const ContactTab = () => {
    const [isHovered, setIsHovered] = useState(false);
    const baseStyle = {
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
    return (_jsx(Link, { to: "/contact", style: baseStyle, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: _jsx(MdMessage, { size: 24, color: "white" }) }));
};
export default ContactTab;
