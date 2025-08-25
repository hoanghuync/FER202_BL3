import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Card, Container, Button } from 'react-bootstrap';
import { FaArrowLeft, FaCartPlus, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import CustomToast from './CustomToast';

function PhoneDetail() {
  const { id } = useParams();
  const [phone, setPhone] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, items: wishlist } = useWishlist();
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastBg, setToastBg] = useState("success");

  useEffect(() => {
    axios.get(`http://localhost:3001/phones/${id}`).then(res => setPhone(res.data));
  }, [id]);

  if (!phone) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart(phone);
    setToastMsg(`Đã thêm ${phone.name} vào giỏ hàng!`);
    setToastBg('success');
    setShowToast(true);
  };

  const isWishlisted = wishlist.find(item => item.id === phone.id);

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ maxWidth: 600, width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', borderRadius: 24, border: 'none' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 340,
          background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24
        }}>
          <Card.Img variant="top" src={`/images/${phone.images}`} style={{ maxHeight: 300, width: 'auto', objectFit: 'contain' }} />
        </div>
        <Card.Body className="px-4 py-4">
          <Card.Title className="mb-3 text-center" style={{ fontWeight: 800, fontSize: 28, color: '#007bff', letterSpacing: 1 }}>{phone.name}</Card.Title>
        <div className="mb-3 text-center">
          {phone.price && phone.price !== phone.currentPrice && (
          <span style={{ textDecoration: 'line-through', color: '#888', marginRight: 12, fontSize: 18 }}>
          {parseInt(phone.price.replace(/\./g, '')).toLocaleString()} đ
          </span>
        )}
          <span style={{ color: '#e53935', fontWeight: 800, fontSize: 32 }}>
          {parseInt(phone.currentPrice.replace(/\./g, '')).toLocaleString()} đ
          </span>
        </div>
          <Card.Text className="mb-4" style={{ fontSize: 18, color: '#333', minHeight: 60 }}>{phone.description}</Card.Text>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/home" className="btn btn-outline-secondary d-flex align-items-center px-4 py-2" style={{ fontWeight: 600, borderRadius: 10, fontSize: 18 }}>
              <FaArrowLeft className="me-2" /> Back To List
            </Link>
            <Button variant="success" className="d-flex align-items-center px-4 py-2" style={{ fontWeight: 600, borderRadius: 10, fontSize: 18 }} onClick={handleAddToCart}>
              <FaCartPlus className="me-2" /> Add to Cart
            </Button>
            {isWishlisted ? (
              <Button variant="danger" className="d-flex align-items-center px-4 py-2" style={{ fontWeight: 600, borderRadius: 10, fontSize: 18 }} onClick={() => removeFromWishlist(phone.id)}>
                <FaHeart className="me-2" /> Remove from Wishlist
              </Button>
            ) : (
              <Button variant="outline-danger" className="d-flex align-items-center px-4 py-2" style={{ fontWeight: 600, borderRadius: 10, fontSize: 18 }} onClick={() => addToWishlist(phone)}>
                <FaHeart className="me-2" /> Add to Wishlist
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
      <CustomToast show={showToast} message={toastMsg} onClose={() => setShowToast(false)} bg={toastBg} />
    </Container>
  );
}

export default PhoneDetail;