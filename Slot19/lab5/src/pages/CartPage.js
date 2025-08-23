import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Button, Table, Alert, Toast } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const { isAuthenticated } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowToast(true);
      return;
    }
    if (cartItems.length === 0) return;
    setShowToast(true);
    clearCart();
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">🛒 Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <Alert variant="info">Giỏ hàng của bạn đang trống.</Alert>
      ) : (
        <>
          <Table bordered hover responsive className="mb-4" style={{maxWidth:600}}>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Tên món</th>
                <th>Giá</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
                  <td>${parseFloat(item.price).toFixed(2)}</td>
                  <td>
                    <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item)}>
                      <i className="bi bi-trash"></i> Remove
                    </Button>
                  </td>
                </tr>
              ))}
              <tr className="fw-bold">
                <td colSpan={2} className="text-end">Tổng cộng</td>
                <td colSpan={2} className="text-success">${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>
          <div className="d-flex gap-3">
            <Link to="/products" className="btn btn-secondary">Tiếp tục mua hàng</Link>
            <Button variant="primary" onClick={handleCheckout}>Thanh toán</Button>
            <Button variant="outline-dark" onClick={clearCart}>Clear Cart</Button>
          </div>
        </>
      )}
      <Toast show={showToast} onClose={() => setShowToast(false)} delay={2500} autohide style={{position:'fixed',top:20,right:20,zIndex:9999}} bg={isAuthenticated ? "success" : "danger"}>
        <Toast.Body className="text-white">
          {isAuthenticated
            ? "Thanh toán thành công! Cảm ơn bạn đã mua hàng."
            : "Bạn cần đăng nhập để thanh toán."}
        </Toast.Body>
      </Toast>
    </div>
  );
};
export default CartPage;
