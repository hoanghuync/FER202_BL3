import React, { useContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";

const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <h2 className="mb-4">Danh sách món ăn</h2>
      <Row className="dishes">
        {dishes.length === 0 ? (
          <Col>
            <p className="text-danger">Không tìm thấy món ăn phù hợp.</p>
          </Col>
        ) : (
          dishes.map((dish) => (
            <Col key={dish.id} md={6} lg={6} xl={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={dish.image} alt={dish.name} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{dish.name}</Card.Title>
                  <Card.Text>{dish.description}</Card.Text>
                  <Card.Text className="fw-bold">{`Price: $${parseFloat(dish.price).toFixed(2)}`}</Card.Text>
                  <Button onClick={() => addToCart(dish)} variant="success" className="mt-auto">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
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
