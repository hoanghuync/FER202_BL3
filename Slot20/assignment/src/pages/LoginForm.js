import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Card, InputGroup } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import CustomToast from '../components/CustomToast';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastBg, setToastBg] = useState("success");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.get(`http://localhost:3001/users?username=${username}&password=${password}`);
    if (res.data.length > 0) {
      login(res.data[0]);
      setToastMsg('Đăng nhập thành công!');
      setToastBg('success');
      setShowToast(true);
      navigate('/home');
    } else {
      setToastMsg('Đăng nhập thất bại!');
      setToastBg('danger');
      setShowToast(true);
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Card style={{ width: 400, borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <div
              className="mx-auto mb-3"
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 36,
                boxShadow: '0 4px 16px rgba(102,126,234,0.10)'
              }}
            >
              <FaUser />
            </div>
            <h2 className="fw-bold text-primary mb-1" style={{ fontSize: 28 }}>Welcome Back!</h2>
            <div className="text-muted mb-2" style={{ fontSize: 15 }}>Sign in to your account</div>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold d-flex align-items-center">
                <FaUser className="me-2 text-primary" /> Username
              </Form.Label>
              <Form.Control
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoFocus
                required
                style={{ borderRadius: 10, fontSize: 16 }}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold d-flex align-items-center">
                <FaLock className="me-2 text-primary" /> Password
              </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{ borderRadius: 10, fontSize: 16 }}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="w-100 fw-bold"
              size="lg"
              style={{
                borderRadius: 25,
                fontSize: 18,
                padding: '10px 0',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                letterSpacing: 1
              }}
            >
              Login
            </Button>
          </Form>
          <div className="text-center mt-3">
            <span>Do you have an account?</span>
            <Button variant="link" className="p-0 ms-2" onClick={() => navigate('/register')} style={{color:'#007bff',textDecoration:'underline',fontWeight:'bold'}}>Create an account</Button>
          </div>
        </Card.Body>
      </Card>
      <CustomToast show={showToast} message={toastMsg} onClose={() => setShowToast(false)} bg={toastBg} />
    </div>
  );
}

export default LoginForm;