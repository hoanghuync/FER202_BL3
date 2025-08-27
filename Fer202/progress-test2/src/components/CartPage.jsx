import React, { useState } from 'react';
import { useCartAndFavourite } from '../hooks/useCartAndFavourite';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartAndFavourite();
  const navigate = useNavigate();
  const [checkoutMsg, setCheckoutMsg] = useState('');
  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);
  const handleCheckout = () => {
    setCheckoutMsg('Thank you for your order!');
    clearCart();
  };
  return (
    <Container className="py-4">
      <div className="mb-3">
        <button className="btn btn-secondary" onClick={() => navigate('/products')}>Back to List</button>
      </div>
      <h2 className="mb-4 text-primary">🛒 Your Cart</h2>
      {checkoutMsg && (
        <div className="alert alert-success text-center fw-bold fs-5 mb-4">{checkoutMsg}</div>
      )}
      {cart.length === 0 && !checkoutMsg ? (
        <Card className="text-center shadow-sm"><Card.Body>Your cart is empty.</Card.Body></Card>
      ) : cart.length > 0 ? (
        <Card className="shadow-lg border-0 mb-4" style={{ borderRadius: 18 }}>
          <Card.Body>
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td><img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 10 }} /></td>
                    <td className="fw-bold">{item.name}</td>
                    <td>{item.description}</td>
                    <td className="text-primary fw-bold">${item.price}</td>
                    <td><Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="fs-5 fw-bold">Total: <span className="text-success">${total}</span></div>
              <div className="d-flex gap-2">
                <Button variant="outline-dark" onClick={clearCart}>Clear Cart</Button>
                <Button variant="success" onClick={handleCheckout}>Checkout</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ) : null}
    </Container>
  );
}
