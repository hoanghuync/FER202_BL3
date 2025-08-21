import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import { CartProvider } from "./components/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import "./styles.css";

const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    image: "images/uthappizza.png",
    price: "4.99",
    description: "A unique combination of Indian Uthappam and Italian pizza.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    image: "images/zucchipakoda.png",
    price: "1.99",
    description: "Deep fried Zucchini with chickpea batter.",
  },
  {
    id: 2,
    name: "Vadonut",
    image: "images/vadonut.png",
    price: "1.99",
    description: "A combination of vada and donut.",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    image: "images/elaicheesecake.png",
    price: "2.99",
    description: "New York Style Cheesecake with Indian cardamoms.",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(search.toLowerCase()) ||
      dish.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleOrder = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  return (
    <CartProvider>
      <div className={`App${darkMode ? " dark-mode" : ""} container py-4`}>
        <div className="header-bar d-flex align-items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm món ăn..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control search-input"
            style={{ maxWidth: 300 }}
          />
          <button onClick={() => setDarkMode((m) => !m)} className="btn btn-dark dark-btn">
            {darkMode ? "Chế độ Sáng" : "Chế độ Tối"}
          </button>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <DishesList dishes={filteredDishes} />
          </div>
          <div className="col-lg-4">
            <Cart onOrder={handleOrder} />
            {showSuccess && (
              <div className="order-success alert alert-success mt-3">Đơn hàng đã được xác nhận và thanh toán thành công!</div>
            )}
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
