import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import PhoneList from './components/PhoneList';
import ManagePhone from './components/ManagePhone';
import PhoneDetail from './components/PhoneDetail';
import LoginForm from './components/LoginForm';
import AccountDetail from './components/AccountDetail';
import Cart from './components/Cart';
import NavigationBar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import RegisterWizard from './components/RegisterWizard';
import Wishlist from './components/Wishlist';
import 'bootstrap/dist/css/bootstrap.min.css';

function RequireAuth({ children }) {
  const { user } = useAuth() || {};
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const { user } = useAuth() || {};
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingSearchTerm, setPendingSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(pendingSearchTerm);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  window.handleSortChange = handleSortChange;

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <>
            {/* Navbar luôn hiển thị */}
            <NavigationBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              pendingSearchTerm={pendingSearchTerm}
              setPendingSearchTerm={setPendingSearchTerm}
              handleSearchSubmit={handleSearchSubmit}
              sortOption={sortOption}
              handleSortChange={handleSortChange}
            />
            {/* Chỉ trang home mới có header/carousel/footer */}
            {location.pathname === '/home' && <Header />}
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/home" element={<PhoneList searchTerm={searchTerm} sortOption={sortOption} />} />
              <Route path="/manage" element={<RequireAuth><ManagePhone /></RequireAuth>} />
              <Route path="/detail/:id" element={<RequireAuth><PhoneDetail /></RequireAuth>} />
              <Route path="/account" element={<RequireAuth><AccountDetail /></RequireAuth>} />
              <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
              <Route path="/wishlist" element={<RequireAuth><Wishlist /></RequireAuth>} />
              <Route path="/register" element={<RegisterWizard />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
            {location.pathname === '/home' && <Footer />}
          </>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;