import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";

const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <h2 className="mb-4">Danh sách món ăn</h2>
      <div className="dishes row">
        {dishes.length === 0 ? (
          <p className="text-danger">Không tìm thấy món ăn phù hợp.</p>
        ) : (
          dishes.map((dish) => (
            <div key={dish.id} className="dish-item col-md-6 col-lg-6 col-xl-3 mb-4">
              <div className="card h-100 shadow-sm">
                <img src={dish.image} alt={dish.name} className="card-img-top" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{dish.name}</h5>
                  <p className="card-text">{dish.description}</p>
                  <p className="card-text fw-bold">{`Price: $${parseFloat(dish.price).toFixed(2)}`}</p>
                  <button onClick={() => addToCart(dish)} className="btn btn-success mt-auto">Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DishesList;
