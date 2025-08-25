import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Form, Button, Container, Alert, Card, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

function AccountDetail() {
  const { user, register } = useAuth();
  const [form, setForm] = useState({ ...user });
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(`http://localhost:3001/users/${form.id}`, form);
    register(res.data);
    setMessage('Update successful!');
  };

  if (!user) return <p>Please log in</p>;

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <div className="mx-auto mb-3">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" style={{width:90,height:90,borderRadius:'50%',objectFit:'cover',boxShadow:'0 4px 16px rgba(102,126,234,0.15)'}} />
          ) : (
            <div style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 38,
              boxShadow: '0 4px 16px rgba(102,126,234,0.15)'
            }}>
              <FaUser />
            </div>
          )}
        </div>
        <h2 className="fw-bold text-primary mb-1" style={{ fontSize: 32 }}>Profile</h2>
        <div className="text-muted mb-2" style={{ fontSize: 16 }}>Manage your account information</div>
      </div>
      <div className="d-flex justify-content-center">
        <Card style={{ width: 400, borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
          <Card.Body className="p-4">
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold d-flex align-items-center">
                  <FaUser className="me-2 text-primary" /> Họ tên
                </Form.Label>
                <Form.Control
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                  required
                  style={{ borderRadius: 10, fontSize: 16 }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold d-flex align-items-center">
                  <FaEnvelope className="me-2 text-primary" /> Email
                </Form.Label>
                <Form.Control
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  style={{ borderRadius: 10, fontSize: 16 }}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold d-flex align-items-center">
                  <FaLock className="me-2 text-primary" /> Password
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    required
                    style={{ borderRadius: 10, fontSize: 16 }}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    style={{ borderLeft: 0 }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>
              <Button
                type="submit"
                className="w-100 fw-bold"
                style={{
                  borderRadius: 25,
                  fontSize: 18,
                  padding: '10px 0',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none'
                }}
              >
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default AccountDetail;