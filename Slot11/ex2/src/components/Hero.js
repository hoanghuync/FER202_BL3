import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUsers, FaChartLine, FaAward } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="hero-section text-white py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={8} className="text-center text-lg-start">
            <h1 className="display-4 fw-bold mb-4">
              Student Management System
            </h1>
            <p className="lead mb-4">
              Efficiently manage and organize student information with our comprehensive 
              management platform. Search, filter, and sort through student records with ease.
            </p>
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
              <div className="d-flex align-items-center">
                <FaUsers className="me-2 fs-4 text-primary" />
                <span>10+ Students</span>
              </div>
              <div className="d-flex align-items-center">
                <FaChartLine className="me-2 fs-4 text-success" />
                <span>Real-time Updates</span>
              </div>
              <div className="d-flex align-items-center">
                <FaAward className="me-2 fs-4 text-warning" />
                <span>Advanced Features</span>
              </div>
            </div>
          </Col>
          <Col lg={4} className="text-center mt-4 mt-lg-0">
            <div className="hero-illustration">
              <div className="bg-white bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" 
                   style={{ width: '200px', height: '200px' }}>
                <FaUsers className="text-white" style={{ fontSize: '4rem' }} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
