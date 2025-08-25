import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card, ProgressBar, Alert } from "react-bootstrap";
import { FaUserCircle, FaArrowLeft, FaArrowRight, FaCheckCircle, FaLock, FaEnvelope, FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const secretQuestions = [
  "What is your pet's name?",
  "What is your mother's maiden name?",
  "What is your favorite color?",
  "What city were you born in?"
];

const RegisterWizard = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    avatar: null,
    avatarPreview: "",
    username: "",
    password: "",
    confirm: "",
    secretQuestion: secretQuestions[0],
    answer: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Avatar preview & validate
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Avatar must be JPG or PNG");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Avatar must be ≤2MB");
      return;
    }
    setError("");
    setForm(f => ({ ...f, avatar: file }));
    const reader = new FileReader();
    reader.onload = () => setForm(f => ({ ...f, avatarPreview: reader.result }));
    reader.readAsDataURL(file);
  };

  // Step 1: About
  const AboutStep = (
    <>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold"><FaUserCircle className="me-2 text-primary" />Full Name</Form.Label>
        <Form.Control type="text" value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} required placeholder="Enter your full name" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold"><FaEnvelope className="me-2 text-primary" />Email</Form.Label>
        <Form.Control type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required placeholder="Enter your email" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold"><FaImage className="me-2 text-primary" />Avatar (JPG/PNG, ≤2MB)</Form.Label>
        <Form.Control type="file" accept="image/jpeg,image/png" onChange={handleAvatar} />
        {form.avatarPreview && <img src={form.avatarPreview} alt="avatar" style={{width:80,marginTop:8,borderRadius:12,boxShadow:'0 2px 8px rgba(102,126,234,0.15)'}} />}
      </Form.Group>
    </>
  );

  // Step 2: Account
  const AccountStep = (
    <>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold"><FaUserCircle className="me-2 text-primary" />Username</Form.Label>
        <Form.Control type="text" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required placeholder="Choose a username" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold"><FaLock className="me-2 text-primary" />Password</Form.Label>
        <Form.Control type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required placeholder="Enter password" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold"><FaLock className="me-2 text-primary" />Confirm Password</Form.Label>
        <Form.Control type="password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} required placeholder="Confirm password" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Secret Question</Form.Label>
        <Form.Select value={form.secretQuestion} onChange={e => setForm(f => ({ ...f, secretQuestion: e.target.value }))}>
          {secretQuestions.map(q => <option key={q}>{q}</option>)}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Answer</Form.Label>
        <Form.Control type="text" value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} required placeholder="Your answer" />
      </Form.Group>
    </>
  );

  // Validate
  const validateStep = () => {
    if (step === 1) {
      if (!form.fullName.trim()) return "Full name required";
      if (!form.email.includes("@")) return "Email must be valid";
      if (!form.avatar) return "Avatar required";
    }
    if (step === 2) {
      if (!form.username.trim()) return "Username required";
      if (form.password.length < 6 || !/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/[!@#$%^&*]/.test(form.password)) return "Password must be ≥6, have upper/lower/special";
      if (form.password !== form.confirm) return "Passwords do not match";
      if (!form.answer.trim()) return "Answer required";
    }
    return "";
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateStep();
    if (err) { setError(err); return; }
    setLoading(true);
    setError("");
    const res = await axios.get("http://localhost:3001/users");
    const users = res.data;
    const newId = users.length > 0 ? String(Number(users[users.length-1].id)+1) : "1";
    const newUser = {
      id: newId,
      username: form.username,
      password: form.password,
      fullName: form.fullName,
      email: form.email,
      avatar: form.avatarPreview,
      secretQuestion: form.secretQuestion,
      answer: form.answer,
      wishlist: [],
      cart: []
    };
    await axios.post("http://localhost:3001/users", newUser);
    setSuccess("Registration successful. Please login to continue.");
    setLoading(false);
    setTimeout(() => { navigate('/login'); }, 1500);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight:'100vh',background:'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)'}}>
      <Card style={{width:440,padding:32,borderRadius:24,boxShadow:'0 8px 32px rgba(102,126,234,0.15)',border:'none'}}>
        <div className="text-center mb-3">
          <FaUserCircle size={64} className="text-primary mb-2" />
          <h2 className="fw-bold mb-1" style={{color:'#2563eb'}}>Create Account</h2>
          <div className="text-muted mb-2" style={{fontSize:16}}>Sign up to get started</div>
        </div>
        <ProgressBar now={step*50} label={`Step ${step}/2`} className="mb-4" style={{height:10,borderRadius:8}} />
        {error && <Alert variant="danger" className="mb-2">{error}</Alert>}
        {success && <Alert variant="success" className="mb-2">{success}</Alert>}
        <Form onSubmit={handleSubmit} autoComplete="off">
          {step === 1 ? AboutStep : AccountStep}
          <div className="d-flex justify-content-between mt-4">
            {step > 1 && <Button variant="outline-secondary" onClick={() => setStep(s => s-1)}><FaArrowLeft className="me-2" />Previous</Button>}
            {step < 2 && <Button variant="primary" onClick={() => {
              const err = validateStep();
              if (err) { setError(err); return; }
              setStep(s => s+1);
            }}><span>Next</span><FaArrowRight className="ms-2" /></Button>}
            {step === 2 && <Button type="submit" variant="success" disabled={loading}><FaCheckCircle className="me-2" />Register</Button>}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterWizard;
