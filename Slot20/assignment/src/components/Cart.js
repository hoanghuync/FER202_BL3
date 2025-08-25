import React, { useState } from 'react';
import { Button, Table, Card, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

function Cart() {
  const { items: cartItems, clearCart, addToCart, removeFromCart, incQty, decQty } = useCart();
  const [ordered, setOrdered] = useState(false);

  const parsePrice = (price) => Number(price.toString().replace(/\D/g, ''));
  const total = cartItems.reduce((sum, item) => sum + parsePrice(item.currentPrice) * item.quantity, 0);

  const handlePayment = () => {
    setOrdered(true);
    clearCart();
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: 800, borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>
        <Card.Body>
          <h2 className="fw-bold text-primary mb-4">Your Cart</h2>
          {ordered ? (
            <Alert variant="success" className="text-center">
              <div className="fw-bold fs-4 mb-1">Thank you for your order!</div>
              <div>Your order has been placed successfully.</div>
            </Alert>
          ) : (
            <>
              <Table responsive bordered hover className="align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length === 0 ? (
                    <tr><td colSpan={6} className="text-center">Your cart is empty.</td></tr>
                  ) : cartItems.map(item => (
                    <tr key={item.id}>
                      <td><img src={`/images/${item.images}`} alt={item.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 10 }} /></td>
                      <td>{item.name}</td>
                      <td>{parsePrice(item.currentPrice).toLocaleString()} đ</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <Button type="button" variant="outline-secondary" size="sm" style={{ borderRadius: 20, minWidth: 32 }} onClick={() => decQty(item.id)}>-</Button>
                          <span className="fw-bold px-2">{item.quantity}</span>
                          <Button type="button" variant="outline-secondary" size="sm" style={{ borderRadius: 20, minWidth: 32 }} onClick={() => incQty(item.id)}>+</Button>
                        </div>
                      </td>
                      <td>{(parsePrice(item.currentPrice) * item.quantity).toLocaleString()} đ</td>
                      <td>
                        <Button type="button" variant="danger" size="sm" style={{ borderRadius: 18 }} onClick={() => removeFromCart(item.id)}>Remove</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="text-end fw-bold fs-5 mt-3">
                Total: <span className="text-primary">{total.toLocaleString()} đ</span>
              </div>
              {cartItems.length > 0 && (
                <Button type="button"
                  variant="success"
                  className="w-100 mt-4 fw-bold"
                  style={{ borderRadius: 20, fontSize: 20, letterSpacing: 1, padding: '12px 0' }}
                  onClick={handlePayment}
                >
                  Payment
                </Button>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cart;