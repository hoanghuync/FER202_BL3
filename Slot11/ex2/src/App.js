import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/Navbar';
import Hero from './components/Hero';
import StudentsPage from './components/StudentsPage';
import Footer from './components/Footer';
import { students } from './data/students';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [navbarSearchTerm, setNavbarSearchTerm] = useState('');

  const handleNavbarSearch = (term) => {
    setNavbarSearchTerm(term);
    setCurrentPage('students');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'students':
        return <StudentsPage students={students} />;
      case 'about':
        return (
          <Container className="py-5 text-center">
            <div className="bg-white bg-opacity-95 rounded-3 p-5 shadow">
              <h2 className="text-dark mb-4">About Student Management System</h2>
              <p className="lead text-muted">
                This is a comprehensive student management platform built with React and Bootstrap.
                It demonstrates advanced state management, filtering, sorting, and responsive design.
              </p>
              <div className="row mt-5">
                <div className="col-md-4">
                  <h5 className="text-primary">Features</h5>
                  <ul className="text-start">
                    <li>Student Search & Filter</li>
                    <li>Age Range Classification</li>
                    <li>Responsive Grid Layout</li>
                    <li>Detailed Student Views</li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h5 className="text-success">Technology</h5>
                  <ul className="text-start">
                    <li>React Hooks (useState, useMemo)</li>
                    <li>React Bootstrap Components</li>
                    <li>PropTypes Validation</li>
                    <li>Responsive Design</li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h5 className="text-warning">Data</h5>
                  <ul className="text-start">
                    <li>10 Sample Students</li>
                    <li>Age Range: 18-27</li>
                    <li>Email Validation</li>
                    <li>Avatar Support</li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        );
      default:
        return (
          <>
            <Hero />
            <Container className="py-5">
              <div className="text-center text-white">
                <h2 className="mb-4">Welcome to Student Management System</h2>
                <p className="lead mb-4">
                  Navigate to the Students page to explore our comprehensive student database.
                  Use advanced filters and sorting options to find exactly what you're looking for.
                </p>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => setCurrentPage('students')}
                >
                  View Students
                </button>
              </div>
            </Container>
          </>
        );
    }
  };

  return (
    <div className="App">
      <NavigationBar onSearch={handleNavbarSearch} />
      
      {/* Content area with adjusted margin for fixed navbar */}
      <div className="pt-5">
        {renderPage()}
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
