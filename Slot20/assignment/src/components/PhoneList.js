import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Spinner, Badge } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import CustomToast from './CustomToast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

function PhoneList({ searchTerm = '', sortOption = 'name-asc' }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, items: wishlist } = useWishlist();
  const [phones, setPhones] = useState([]);
  const [status, setStatus] = useState('idle');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastBg, setToastBg] = useState("success");

  useEffect(() => {
    setStatus('loading');
    axios.get('http://localhost:3001/phones').then(res => {
      setPhones(res.data);
      setStatus('succeeded');
    });
  }, []);

  const handleAddToCart = (phone) => {
    addToCart(phone);
    setToastMsg(`Đã thêm ${phone.name} vào giỏ hàng!`);
    setToastBg('success');
    setShowToast(true);
  };

  const handleAddToWishlist = (phone) => {
    if (!user) {
      setToastMsg('Bạn cần đăng nhập để thêm vào wishlist!');
      setToastBg('danger');
      setShowToast(true);
      const redirectPath = window.location.pathname.includes('/detail/') ? window.location.pathname : `/detail/${phone.id}`;
      setTimeout(() => { window.location.href = `/login?redirect_uri=${redirectPath}`; }, 1500);
      return;
    }
    addToWishlist(phone);
    setToastMsg(`Đã thêm ${phone.name} vào wishlist!`);
    setToastBg('success');
    setShowToast(true);
  };

  // Generate random rating for demo purposes
  const getRandomRating = (phoneId) => {
    const ratings = [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9];
    return ratings[phoneId % ratings.length];
  };

  // Search logic
  let filteredPhones = phones.filter(phone =>
    phone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort logic
  if (sortOption === 'name-asc') {
    filteredPhones = [...filteredPhones].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'price-asc') {
    filteredPhones = [...filteredPhones].sort((a, b) => parseInt(a.currentPrice.replace(/\D/g, '')) - parseInt(b.currentPrice.replace(/\D/g, '')));
  } else if (sortOption === 'price-desc') {
    filteredPhones = [...filteredPhones].sort((a, b) => parseInt(b.currentPrice.replace(/\D/g, '')) - parseInt(a.currentPrice.replace(/\D/g, '')));
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredPhones.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhones = filteredPhones.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (status === 'loading') return <Spinner animation="border" />;
  if (status === 'failed') return <p>Error loading phones.</p>;

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2 className="display-6 fw-bold text-primary mb-2">Our Products</h2>
        <p className="lead text-muted">Discover our amazing smartphone collection</p>
      </div>
      
      <Row className="g-4">
        {currentPhones.map(phone => {
          const rating = getRandomRating(phone.id);
          return (
            <Col key={phone.id} lg={4} md={6} sm={12}>
              <Card 
                className="h-100 product-card shadow-sm border-0"
                style={{ 
                  borderRadius: '15px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }}
              >
                <div 
                  className="product-image"
                  style={{
                    height: '250px',
                    backgroundImage: `url(/images/${phone.images})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}
                />
                
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fw-bold mb-0">{phone.name}</h5>
                    <Badge bg="primary" className="fs-6">
                      {phone.currentPrice} đ
                    </Badge>
                  </div>
                  
                  <div className="d-flex align-items-center mb-3">
                    <div className="d-flex me-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i}
                          className={i < Math.floor(rating) ? 'text-warning' : 'text-muted'}
                          style={{ fontSize: '0.9rem' }}
                        />
                      ))}
                    </div>
                    <small className="text-muted">({rating})</small>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <Link 
                      to={`/detail/${phone.id}`}
                      className="btn btn-outline-primary fw-bold"
                      style={{ borderRadius: '25px' }}
                    >
                      View Details
                    </Link>
                    <Button 
                      variant="success"
                      className="fw-bold"
                      style={{ borderRadius: '25px' }}
                      onClick={() => handleAddToCart(phone)}
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      variant={wishlist.find(item => item.id === phone.id) ? "outline-secondary" : "outline-danger"}
                      className="fw-bold"
                      style={{ borderRadius: '25px' }}
                      onClick={() => {
                        if (wishlist.find(item => item.id === phone.id)) {
                          // Remove from wishlist
                          removeFromWishlist(phone.id);
                          setToastMsg('Đã xóa khỏi wishlist!');
                          setToastBg('warning');
                          setShowToast(true);
                        } else {
                          handleAddToWishlist(phone);
                        }
                      }}
                    >
                      {wishlist.find(item => item.id === phone.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      {/* Pagination */}
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&laquo;</button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i + 1} className={`page-item${currentPage === i + 1 ? ' active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>&raquo;</button>
          </li>
        </ul>
      </nav>
      <CustomToast show={showToast} message={toastMsg} onClose={() => setShowToast(false)} bg={toastBg} />
    </div>
  );
}

export default PhoneList;