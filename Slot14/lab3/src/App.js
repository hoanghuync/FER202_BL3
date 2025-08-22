import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/Navbar';
import Hero from './components/Hero';
import StudentsPage from './components/StudentsPage';
import Footer from './components/Footer';
import ProfileBuilderModal from './components/ProfileBuilderModal';
import { students } from './data/students';
import './App.css';

function App() {
  // State quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState('home');
  
  // State lưu search term từ navbar
  const [navbarSearchTerm, setNavbarSearchTerm] = useState('');
  
  // State cho Profile Builder Modal
  const [showProfileBuilder, setShowProfileBuilder] = useState(false);

  const handleNavbarSearch = (term) => {
    setNavbarSearchTerm(term);
    setCurrentPage('students');
  };

  const handleShowProfileBuilder = () => {
    setShowProfileBuilder(true);
  };

  const handleHideProfileBuilder = () => {
    setShowProfileBuilder(false);
  };

  // Hàm xử lý navigation
  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  // Home Page Component
  const HomePage = () => (
    <div className="text-center py-5">
      <h2 className="text-white mb-4">Welcome to Student Management System</h2>
      <p className="text-white-50 lead">
        Click on "Students" in the navigation to view and manage student records, 
        or click "Build your Profile" to create your own profile using our wizard.
      </p>
    </div>
  );

  // About Page Component
  const AboutPage = () => (
    <Container className="py-5">
      <div className="text-center">
        <h2 className="text-white mb-4">About Student Management System</h2>
        <p className="text-white-50 lead">
          This is a comprehensive student management platform built with React and Bootstrap.
          It features advanced filtering, sorting, and a profile builder wizard.
        </p>
      </div>
    </Container>
  );

  return (
    <div className="App">
      <NavigationBar 
        onSearch={handleNavbarSearch} 
        onShowProfileBuilder={handleShowProfileBuilder}
        onNavigation={handleNavigation}
        currentPage={currentPage}
      />
      
      {/* Content area với margin-top để tránh bị navbar che */}
      <div className="pt-5">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'students' && <StudentsPage students={students} />}
        {currentPage === 'about' && <AboutPage />}
        
        {/* Hero section chỉ hiển thị ở trang home */}
        {currentPage === 'home' && <Hero />}
      </div>
      
      <Footer />
      
      {/* Profile Builder Modal */}
      <ProfileBuilderModal
        show={showProfileBuilder}
        onHide={handleHideProfileBuilder}
      />
    </div>
  );
}

export default App;
