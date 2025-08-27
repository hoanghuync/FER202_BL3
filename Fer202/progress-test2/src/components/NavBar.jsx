import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ onLoginClick }) => {
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="mb-4 shadow">
      <Container>
        <Navbar.Brand href="/products" className="fw-bold">Mobile Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <Nav.Link onClick={() => navigate('/favourites')} style={{ cursor: 'pointer' }}>
              <FaHeart className="me-1" /> Favourites
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
              <FaShoppingCart className="me-1" /> Cart
            </Nav.Link>
            <Nav.Link href="#login" onClick={onLoginClick}>
              <FaUser className="me-1" /> Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
