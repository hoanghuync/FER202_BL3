import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, addToCart, removeFromCart } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

const products = ["Pizza", "Burger", "Soda", "Fries"];

function ProductList() {
  const dispatch = useDispatch();
  return (
    <div className="card p-3 mb-3">
      <h4>Products</h4>
      {products.map((p, idx) => (
        <div key={idx} className="d-flex justify-content-between mb-2">
          <span>{p}</span>
          <button
            className="btn btn-sm btn-success"
            onClick={() => dispatch(addToCart(p))}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="card p-3">
      <h4>Cart</h4>
      {cart.length === 0 && <p>No items in cart.</p>}
      {cart.map((item, idx) => (
        <div key={idx} className="d-flex justify-content-between mb-2">
          <span>{item}</span>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => dispatch(removeFromCart(idx))}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

function Navbar() {
  const cart = useSelector((state) => state.cart);
  return (
    <nav className="navbar navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <span className="navbar-brand">🛒 Cart Items: {cart.length}</span>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <ProductList />
          </div>
          <div className="col-md-6">
            <Cart />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
