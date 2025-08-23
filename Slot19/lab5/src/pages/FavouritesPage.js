import React from "react";
import { useFavourites } from "../context/FavouritesContext";
import ProductCard from "../components/ProductCard";
import { Row, Col } from "react-bootstrap";

const FavouritesPage = () => {
  const { favourites } = useFavourites();
  return (
    <div className="container py-4">
      <h2>My Favourites</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {favourites.map(product => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default FavouritesPage;
