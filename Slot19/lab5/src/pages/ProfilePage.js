import React from "react";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="container py-4">
      <h2>Profile</h2>
      {isAuthenticated && user ? (
        <div className="card p-3" style={{maxWidth:400}}>
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-person-circle" style={{fontSize:48, marginRight:16}}></i>
            <div>
              <h5 className="mb-0">{user.name}</h5>
              <small className="text-muted">{user.email}</small>
            </div>
          </div>
          <button className="btn btn-outline-danger">Logout</button>
        </div>
      ) : (
        <p>Bạn chưa đăng nhập. Vui lòng <a href="/login">đăng nhập</a> để xem thông tin cá nhân.</p>
      )}
    </div>
  );
};
export default ProfilePage;
