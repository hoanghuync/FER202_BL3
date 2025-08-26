import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown, Form, Button, Badge, Offcanvas } from 'react-bootstrap';
import { FaHome, FaCog, FaShoppingCart, FaUser, FaSignOutAlt, FaSearch, FaPhone, FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const NavigationBar = ({ searchTerm, setSearchTerm, pendingSearchTerm, setPendingSearchTerm, handleSearchSubmit }) => {
  const { user, logout } = useAuth();
  const { items: cartItems } = useCart();
  const { items: wishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // useEffect(() => {
  //   // ...existing code for wishlist fetch if needed...
  // }, [user]);

  const wishlistCount = wishlist.length;

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowOffcanvas(false);
  };

  const handleNavClick = () => {
    setShowOffcanvas(false);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Navbar 
        bg="primary" 
        variant="dark" 
        expand="lg" 
        className="shadow-lg border-bottom border-primary-subtle"
        style={{ 
          minHeight: 75, 
          fontSize: '1.1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <Container fluid className="px-4">
          {/* Brand */}
          <Navbar.Brand 
            as={Link} 
            to="/home" 
            className="fw-bold d-flex align-items-center"
            style={{ fontSize: '1.5rem' }}
          >
            <FaPhone className="me-2" />
            PhoneStore
          </Navbar.Brand>

          {/* Desktop Navigation */}
          <Navbar.Toggle 
            aria-controls="main-navbar" 
            onClick={() => setShowOffcanvas(true)}
            className="border-0"
          />
          
          <Navbar.Collapse id="main-navbar" className="justify-content-between">
            {/* Left Navigation */}
            <Nav className="me-auto">
              <Nav.Link 
                as={Link} 
                to="/home" 
                className="d-flex align-items-center px-3 mx-1 rounded"
                style={{ transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <FaHome className="me-2" />
                Home
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/manage" 
                className="d-flex align-items-center px-3 mx-1 rounded"
                style={{ transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <FaCog className="me-2" />
                Manage
              </Nav.Link>
            </Nav>

            {/* Search Bar & Sort Dropdown */}
            <div className="d-flex align-items-center mx-3" style={{ minWidth: 400, maxWidth: 600 }}>
              <Form 
                className="d-flex flex-grow-1" 
                onSubmit={handleSearchSubmit}
                style={{ minWidth: 300, maxWidth: 500 }}
              >
                <Form.Control
                  type="search"
                  placeholder="Search phones..."
                  className="me-2 border-0 shadow-sm"
                  aria-label="Search"
                  value={pendingSearchTerm}
                  onChange={e => setPendingSearchTerm(e.target.value)}
                  style={{ borderRadius: '25px 0 0 25px' }}
                />
                <Button 
                  variant="light" 
                  type="submit"
                  className="border-0 shadow-sm"
                  style={{ borderRadius: '0 25px 25px 0' }}
                >
                  <FaSearch />
                </Button>
              </Form>
              <Dropdown className="ms-3">
                <Dropdown.Toggle variant="outline-light" id="sort-dropdown" style={{ borderRadius: '25px' }}>
                  Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => window.handleSortChange && window.handleSortChange('name-asc')}>Name A→Z</Dropdown.Item>
                  <Dropdown.Item onClick={() => window.handleSortChange && window.handleSortChange('price-asc')}>Price Ascending</Dropdown.Item>
                  <Dropdown.Item onClick={() => window.handleSortChange && window.handleSortChange('price-desc')}>Price Descending</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Right Navigation */}
            <Nav className="d-flex align-items-center">
              {/* Cart */}
              <Nav.Link 
                as={Link} 
                to="/cart" 
                className="position-relative d-flex align-items-center px-3 mx-1 rounded"
                style={{ transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <FaShoppingCart className="me-2" />
                Cart
                {cartItemCount > 0 && (
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '0.7rem' }}
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Nav.Link>

              {/* Wishlist */}
              <Nav.Link 
                as={Link} 
                to="/wishlist" 
                className="d-flex align-items-center px-3 mx-1 rounded position-relative"
                style={{ transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <FaHeart className="me-2 text-danger" />
                Wishlist
                {wishlistCount > 0 && (
                  <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle" style={{ fontSize: '0.7rem' }}>{wishlistCount}</Badge>
                )}
              </Nav.Link>

              {/* User Dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle 
                  variant="outline-light" 
                  id="dropdown-user" 
                  className="border-0 d-flex align-items-center px-3"
                  style={{ 
                    background: 'rgba(255,255,255,0.1)', 
                    borderRadius: '25px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <FaUser className="me-2" />
                  <span className="fw-medium">{user?.username || ''}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
                  {user ? (
                    <>
                      <Dropdown.Header className="fw-bold text-primary">
                        👋 Welcome, {user.username}!
                      </Dropdown.Header>
                      <Dropdown.Divider />
                      <Dropdown.Item 
                        as={Link} 
                        to="/account"
                        className="d-flex align-items-center py-2"
                      >
                        <FaUser className="me-2" />
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item 
                        onClick={handleLogout}
                        className="d-flex align-items-center py-2 text-danger"
                      >
                        <FaSignOutAlt className="me-2" />
                        Logout
                      </Dropdown.Item>
                    </>
                  ) : (
                    <Dropdown.Item 
                      as={Link} 
                      to="/login"
                      className="d-flex align-items-center py-2 text-success"
                    >
                      <FaUser className="me-2" />
                      Login
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas */}
      <Offcanvas 
        show={showOffcanvas} 
        onHide={() => setShowOffcanvas(false)}
        placement="end"
        className="bg-light"
      >
        <Offcanvas.Header closeButton className="bg-primary text-white">
          <Offcanvas.Title className="fw-bold">
            <FaPhone className="me-2" />
            PhoneStore
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Nav className="flex-column">
            <Nav.Link 
              as={Link} 
              to="/home" 
              className="d-flex align-items-center py-3 px-4 border-bottom"
              onClick={handleNavClick}
            >
              <FaHome className="me-3" />
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/manage" 
              className="d-flex align-items-center py-3 px-4 border-bottom"
              onClick={handleNavClick}
            >
              <FaCog className="me-3" />
              Manage
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/cart" 
              className="d-flex align-items-center py-3 px-4 border-bottom position-relative"
              onClick={handleNavClick}
            >
              <FaShoppingCart className="me-3" />
              Cart
              {cartItemCount > 0 && (
                <Badge 
                  bg="danger" 
                  className="ms-auto"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/wishlist" 
              className="d-flex align-items-center py-3 px-4 border-bottom position-relative"
              onClick={handleNavClick}
            >
              <FaHeart className="me-3 text-danger" />
              Wishlist
              {wishlistCount > 0 && (
                <Badge bg="danger" className="ms-auto">{wishlistCount}</Badge>
              )}
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/account" 
                  className="d-flex align-items-center py-3 px-4 border-bottom"
                  onClick={handleNavClick}
                >
                  <FaUser className="me-3" />
                  Profile
                </Nav.Link>
                <Nav.Link 
                  onClick={handleLogout}
                  className="d-flex align-items-center py-3 px-4 text-danger"
                >
                  <FaSignOutAlt className="me-3" />
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link 
                as={Link} 
                to="/login" 
                className="d-flex align-items-center py-3 px-4 text-success"
                onClick={handleNavClick}
              >
                <FaUser className="me-3" />
                Login
              </Nav.Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavigationBar;