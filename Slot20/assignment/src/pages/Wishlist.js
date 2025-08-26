import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import axios from 'axios';
import { Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Wishlist() {
  const { user } = useAuth();
  const { items: wishlist, addToCart, removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(true);
  const toVND = (v) =>
  Number(String(v).replace(/\D/g, "")).toLocaleString("vi-VN");

  useEffect(() => {
    setLoading(false);
  }, [user]);

  if (!user) return <Container className="py-5 text-center"><h3>Please login to view your wishlist.</h3></Container>;
  if (loading) return <Container className="py-5 text-center"><h3>Loading...</h3></Container>;

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="card shadow-lg p-4" style={{ borderRadius: '30px', maxWidth: 900, width: '100%' }}>
        <h2 className="fw-bold text-primary mb-4 text-center">Your Wishlist</h2>
        <div className="row g-4">
          {wishlist.length === 0 ? (
            <div className="col-12 text-center text-muted">Your wishlist is empty.</div>
          ) : wishlist.map(phone => (
            <div className="col-md-6 col-lg-4" key={phone.id}>
              <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '18px' }}>
                <img src={`/images/${phone.images}`} alt={phone.name} className="card-img-top" style={{ height: 180, objectFit: 'cover', borderRadius: '18px 18px 0 0' }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold text-center mb-2">{phone.name}</h5>
              <div className="text-center mb-2">
                {phone.price && toVND(phone.price) !== toVND(phone.currentPrice) && (
                <span
                  style={{
                  textDecoration: "line-through",
                  color: "#888",
                    marginRight: 8,
                        }}
                >
                {toVND(phone.price)} đ
                </span>
                )}
                <span className="fw-bold text-primary" style={{ fontSize: 18 }}>
                {toVND(phone.currentPrice)} đ
                </span>
              </div>
                  <div className="d-grid gap-2 mt-auto">
                    <Link to={`/detail/${phone.id}`} className="btn btn-outline-primary fw-bold" style={{ borderRadius: 12 }}>View Details</Link>
                    <Button variant="success" className="fw-bold" style={{ borderRadius: 12 }} onClick={() => addToCart(phone)}>Add to Cart</Button>
                    <Button variant="danger" className="fw-bold" style={{ borderRadius: 12 }} onClick={() => removeFromWishlist(phone.id)}>Remove from Wishlist</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
