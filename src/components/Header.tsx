
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import appLogo from '../assets/app-header-logo.png'

interface HeaderProps {
  // Add any additional props as needed
}

const Header: React.FC<HeaderProps> = () => {
    const [selectedTab, setSelectedTab] = useState<string>('home');
  return (
    <header style={headerStyle}>
      <img src={appLogo} alt="Logo" style={logoStyle} />
      <nav style={navStyle}>
        <Link to="/" style={selectedTab === 'home' ? linkSelectedStyle :linkStyle} onClick={() => setSelectedTab('home')}>
          Home
        </Link>
        <Link to="/services" style={selectedTab === 'services' ? linkSelectedStyle :linkStyle} onClick={() => setSelectedTab('services')}>
          Services
        </Link>
        <Link to="/gallery" style={selectedTab === 'gallery' ? linkSelectedStyle :linkStyle} onClick={() => setSelectedTab('gallery')}>
          Gallery
        </Link>
        <Link to="/contact" style={selectedTab === 'contact' ? linkSelectedStyle :linkStyle} onClick={() => setSelectedTab('contact')}>
          Contact Us
        </Link>
      </nav>
    </header>
  );
};

// Styles (You can use a CSS-in-JS library like styled-components for better organization)
const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem',
  backgroundColor: '#333',
  color: '#fff',
};

const logoStyle: React.CSSProperties = {
  width: '50px', // Adjust the size as needed
};

const navStyle: React.CSSProperties = {
  display: 'flex',
};

const linkStyle: React.CSSProperties = {
  margin: '0 1rem',
  textDecoration: 'none',
  color: '#fff',
};
const linkSelectedStyle: React.CSSProperties = {
    margin: '0 1rem',
    textDecoration: 'none',
    color: 'red',
  };
export default Header;