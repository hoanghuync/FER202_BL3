import React, { useState } from "react";
import { Toast } from "react-bootstrap";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    // Lưu thông tin đăng ký vào localStorage (danh sách users)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // Kiểm tra email đã tồn tại chưa
    if (users.some(u => u.email === form.email)) {
      setToastMsg("Email đã được đăng ký!");
      setShowToast(true);
      return;
    }
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    setToastMsg("Đăng ký thành công!");
    setShowToast(true);
  };

  return (
    <div className="container py-4">
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit} style={{maxWidth:400}}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <Toast show={showToast} onClose={() => setShowToast(false)} delay={2500} autohide style={{position:'fixed',top:20,right:20,zIndex:9999}} bg={toastMsg.includes("thành công") ? "success" : "danger"}>
        <Toast.Body className="text-white">{toastMsg}</Toast.Body>
      </Toast>
    </div>
  );
};

export default RegisterPage;
