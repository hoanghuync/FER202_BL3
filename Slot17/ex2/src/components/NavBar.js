import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { CartContext } from "../context/CartContext";
import { useFavourites } from "../context/FavouritesContext";
import { useAuth } from "../context/AuthContext";
import { Navbar, Nav, Badge, Dropdown } from "react-bootstrap";

const NavBar = () => {
  const { darkMode, setDarkMode } = useTheme();
  const { cartItems } = useContext(CartContext);
  const { favourites } = useFavourites();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("user");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Navbar.Brand as={Link} to="/">FoodCart</Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navbar" />
      <Navbar.Collapse id="main-navbar">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/products">Products</Nav.Link>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          <Nav.Link as={Link} to="/cart">
            Cart <Badge bg="success">{cartItems.length}</Badge>
          </Nav.Link>
          <Nav.Link as={Link} to="/favourites">
            Favourites <Badge bg="warning">{favourites.length}</Badge>
          </Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
        </Nav>
        <Nav.Link as={Link} to="/about">About</Nav.Link>
        <Dropdown align="end">
          <Dropdown.Toggle variant="outline-light" id="profile-dropdown">
            <i className="bi bi-person-circle"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
            <Dropdown.Item as={Link} to="/favourites">My Favourites</Dropdown.Item>
            {isAuthenticated ? (
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            ) : (
              <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <button onClick={() => setDarkMode((m) => !m)} className="btn btn-dark ms-3">
          {darkMode ? "Light" : "Dark"}
        </button>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
