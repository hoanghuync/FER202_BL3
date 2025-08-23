import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import FavouritesPage from "./pages/FavouritesPage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import { CartProvider } from "./components/CartContext";
import products from "./data/products";
import "./styles.css";

// Context cho dark mode
export const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <FavouritesProvider>
            <CartProvider>
              <NavBar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favourites" element={<FavouritesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </CartProvider>
          </FavouritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
