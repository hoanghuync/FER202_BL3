import React, { useState } from 'react';
import { useCartAndFavourite } from '../hooks/useCartAndFavourite';
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function FavouritePage() {
  const { favourites, removeFromFavourite, clearCart } = useCartAndFavourite();
  const [checkoutMsg, setCheckoutMsg] = useState('');
  const navigate = useNavigate();

  const handleCheckout = () => {
    setCheckoutMsg('Thank you for your interest!');
    clearCart();
  };

  return (
    <Container className="py-4">
      <div className="mb-3">
        <button className="btn btn-secondary" onClick={() => navigate('/products')}>Back to List</button>
      </div>
      <h2 className="mb-4 text-danger">❤️ Your Favourites</h2>
      {checkoutMsg && (
        <div className="alert alert-success text-center fw-bold fs-5 mb-4">{checkoutMsg}</div>
      )}
      {favourites.length === 0 && !checkoutMsg ? (
        <Card className="text-center shadow-sm"><Card.Body>No favourites yet.</Card.Body></Card>
      ) : favourites.length > 0 ? (
        <Card className="shadow-lg border-0 mb-4" style={{ borderRadius: 18 }}>
          <Card.Body>
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {favourites.map(item => (
                  <tr key={item.id}>
                    <td><img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 10 }} /></td>
                    <td className="fw-bold">{item.name}</td>
                    <td>{item.description}</td>
                    <td><button className="btn btn-danger btn-sm" onClick={() => removeFromFavourite(item.id)}>Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-end align-items-center mt-4">
              {/* Checkout button removed as requested */}
            </div>
          </Card.Body>
        </Card>
      ) : null}
    </Container>
  );
}
