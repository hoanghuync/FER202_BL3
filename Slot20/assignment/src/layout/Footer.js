import React from 'react';
import { Container } from 'react-bootstrap';
import { FaFacebook, FaGithub, FaEnvelope, FaMobileAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '32px 0 16px 0',
        marginTop: 40,
        boxShadow: '0 -2px 16px rgba(102,126,234,0.10)'
      }}
    >
      <Container className="text-center">
        <div className="mb-3 d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
          <span className="d-flex align-items-center justify-content-center fw-bold" style={{ fontSize: 22 }}>
            <FaMobileAlt className="me-2" /> PhoneStore
          </span>
          <span className="d-none d-md-inline mx-3" style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
          <div className="d-flex gap-3 justify-content-center">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: 22 }}>
              <FaFacebook />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: 22 }}>
              <FaGithub />
            </a>
            <a href="mailto:support@phonestore.com" style={{ color: 'white', fontSize: 22 }}>
              <FaEnvelope />
            </a>
          </div>
        </div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>
          &copy; {new Date().getFullYear()} PhoneStore. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 
