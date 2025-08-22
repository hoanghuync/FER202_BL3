import React, { useContext, useState } from "react";
import { Card, Button, ListGroup, Alert } from "react-bootstrap";
import { CartContext } from "./CartContext";

const Cart = ({ onOrder }) => {
  const { cartItems, removeFromCart, clearCart, totalValue } = useContext(CartContext);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleOrder = () => {
    if (cartItems.length === 0) return;
    setOrderConfirmed(true);
    if (onOrder) onOrder();
    clearCart();
    setTimeout(() => setOrderConfirmed(false), 2000);
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="mb-3">Giỏ hàng</Card.Title>
        {cartItems.length === 0 ? (
          <Card.Text className="text-muted">Giỏ hàng của bạn đang trống.</Card.Text>
        ) : (
          <div>
            <ListGroup className="mb-3">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                  <span>{item.name} - ${item.price}</span>
                  <Button onClick={() => removeFromCart(item.id)} variant="outline-danger" size="sm">Remove</Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className="mb-2">
              <p className="mb-1">Tổng số món: <strong>{cartItems.length}</strong></p>
              <p className="mb-1">Tổng giá trị: <strong>${totalValue}</strong></p>
            </div>
            <div className="d-flex gap-2">
              <Button onClick={clearCart} variant="secondary">Clear Cart</Button>
              <Button onClick={handleOrder} variant="primary" className="order-btn">Xác nhận đơn hàng & Thanh toán</Button>
            </div>
          </div>
        )}
        {orderConfirmed && (
          <Alert variant="success" className="mt-3 order-success">Đơn hàng đã được xác nhận!</Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default Cart;
