import React from 'react';
import { Container } from 'react-bootstrap';
import ProfileForm from './components/ProfileForm';
import './App.css';

function App() {
  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="App">
      <Container className="py-5">
        <div className="text-center mb-5">
          <h1 className="text-white display-4 fw-bold mb-3">
            Exercise 1: Sử dụng useState
          </h1>
          <p className="text-white-50 lead">
            Profile Form - Component với validation và state management
          </p>
        </div>
        <ProfileForm onSubmit={handleSubmit} />
      </Container>
    </div>
  );
}

export default App;