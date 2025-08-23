import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const { login } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    // Lấy danh sách users từ localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === form.email && u.password === form.password);
    if (!found) {
      setToastMsg("Email hoặc mật khẩu không đúng!");
      setShowToast(true);
      return;
    }
    localStorage.setItem("user", JSON.stringify(found));
    localStorage.setItem("isAuthenticated", "true");
    login(found); // cập nhật context
    setToastMsg("Đăng nhập thành công!");
    setShowToast(true);
  };

  return (
    <div className="container py-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{maxWidth:400}}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <Toast show={showToast} onClose={() => setShowToast(false)} delay={2500} autohide style={{position:'fixed',top:20,right:20,zIndex:9999}} bg={toastMsg.includes("thành công") ? "success" : "danger"}>
        <Toast.Body className="text-white">{toastMsg}</Toast.Body>
      </Toast>
    </div>
  );
};

export default LoginPage;
