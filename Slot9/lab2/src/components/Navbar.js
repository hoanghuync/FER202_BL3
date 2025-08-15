import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaFilm } from 'react-icons/fa';

const NavigationBar = ({ activePage, onPageChange }) => {
  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      fixed="top"
      className="shadow-lg border-bottom border-secondary"
    >
      <Container>
        <Navbar.Brand 
          href="#home" 
          className="fw-bold text-primary d-flex align-items-center"
          onClick={() => onPageChange('home')}
          style={{ cursor: 'pointer' }}
        >
          <FaFilm className="me-2 fs-4" />
          Movie Explorer
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              className={`px-3 py-2 mx-1 rounded-pill transition ${
                activePage === 'home' 
                  ? 'bg-primary text-white' 
                  : 'text-light hover-bg-secondary'
              }`}
              onClick={() => onPageChange('home')}
              style={{ cursor: 'pointer' }}
            >
              Free Movies
            </Nav.Link>
            <Nav.Link
              className={`px-3 py-2 mx-1 rounded-pill transition ${
                activePage === 'favourites' 
                  ? 'bg-primary text-white' 
                  : 'text-light hover-bg-secondary'
              }`}
              onClick={() => onPageChange('favourites')}
              style={{ cursor: 'pointer' }}
            >
              My Favourite Movies
            </Nav.Link>
            <Nav.Link
              className={`px-3 py-2 mx-1 rounded-pill transition ${
                activePage === 'request' 
                  ? 'bg-primary text-white' 
                  : 'text-light hover-bg-secondary'
              }`}
              onClick={() => onPageChange('request')}
              style={{ cursor: 'pointer' }}
            >
              Movie Request Form
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  activePage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default NavigationBar;
