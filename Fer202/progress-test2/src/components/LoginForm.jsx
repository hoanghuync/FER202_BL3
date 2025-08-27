import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const LoginForm = ({ show, onHide }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const { data } = await axios.get('/db.json');
      const users = data.accounts || [];
      const found = users.find(u => u.email === username && u.password === password && u.isActive);
      if (found) {
        setSuccess('Login successful!');
        setTimeout(() => {
          setSuccess('');
          onHide();
        }, 1500);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control value={username} onChange={e => setUsername(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">Login</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginForm;
