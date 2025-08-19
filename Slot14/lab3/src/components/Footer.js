import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaHeart, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <h6 className="mb-2">Student Management System</h6>
            <p className="small text-muted mb-0">
              Built with <FaHeart className="text-danger" /> using React & Bootstrap
            </p>
          </Col>
          
          <Col md={6} className="text-center text-md-end mt-3 mt-md-0">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#" className="text-white text-decoration-none">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-white text-decoration-none">
                <FaLinkedin size={20} />
              </a>
            </div>
            <p className="small text-muted mt-2 mb-0">
              © 2024 All rights reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
