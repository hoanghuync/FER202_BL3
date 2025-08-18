import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGraduationCap, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <FaGraduationCap className="me-2 fs-4 text-primary" />
              <span className="fw-bold">Student Management System</span>
            </div>
            <p className="text-muted mb-0 mt-2">
              Exercise 2: React Components & State Management
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end mt-3 mt-md-0">
            <p className="text-muted mb-0">
              Made with <FaHeart className="text-danger" /> using React & Bootstrap
            </p>
            <small className="text-muted">© 2024 Student Management</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
