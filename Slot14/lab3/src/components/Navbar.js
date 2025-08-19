import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { FaSearch, FaGraduationCap, FaUserPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';

const NavigationBar = ({ onSearch, onShowProfileBuilder, onNavigation, currentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleNavClick = (page, e) => {
    e.preventDefault();
    onNavigation(page);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow">
      <Container>
        <Navbar.Brand 
          href="#home" 
          className="fw-bold"
          onClick={(e) => handleNavClick('home', e)}
          style={{ cursor: 'pointer' }}
        >
          <FaGraduationCap className="me-2" />
          Student Management
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              href="#home" 
              className={`fw-semibold ${currentPage === 'home' ? 'active' : ''}`}
              onClick={(e) => handleNavClick('home', e)}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              href="#students" 
              className={`fw-semibold ${currentPage === 'students' ? 'active' : ''}`}
              onClick={(e) => handleNavClick('students', e)}
            >
              Students
            </Nav.Link>
            <Nav.Link 
              href="#about" 
              className={`fw-semibold ${currentPage === 'about' ? 'active' : ''}`}
              onClick={(e) => handleNavClick('about', e)}
            >
              About
            </Nav.Link>
            <Nav.Link 
              href="#profile-builder" 
              className="fw-semibold text-warning"
              onClick={(e) => {
                e.preventDefault();
                onShowProfileBuilder();
              }}
            >
              <FaUserPlus className="me-2" />
              Build your Profile
            </Nav.Link>
          </Nav>
          
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Quick search..."
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-light" type="submit">
              <FaSearch />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onShowProfileBuilder: PropTypes.func.isRequired,
  onNavigation: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
};

export default NavigationBar;
