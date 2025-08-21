import React, { useContext, useState } from "react";
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
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="mb-3">Giỏ hàng</h2>
        {cartItems.length === 0 ? (
          <p className="text-muted">Giỏ hàng của bạn đang trống.</p>
        ) : (
          <div>
            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{item.name} - ${item.price}</span>
                  <button onClick={() => removeFromCart(item.id)} className="btn btn-outline-danger btn-sm">Remove</button>
                </li>
              ))}
            </ul>
            <div className="mb-2">
              <p className="mb-1">Tổng số món: <strong>{cartItems.length}</strong></p>
              <p className="mb-1">Tổng giá trị: <strong>${totalValue}</strong></p>
            </div>
            <div className="d-flex gap-2">
              <button onClick={clearCart} className="btn btn-secondary">Clear Cart</button>
              <button onClick={handleOrder} className="btn btn-primary order-btn">Xác nhận đơn hàng & Thanh toán</button>
            </div>
          </div>
        )}
        {orderConfirmed && (
          <div className="order-success alert alert-success mt-3">Đơn hàng đã được xác nhận!</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
