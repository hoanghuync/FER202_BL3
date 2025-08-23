import React, { useContext, useState } from "react";
import { Card, Button, Toast, ToastContainer } from "react-bootstrap";
import { useFavourites } from "../context/FavouritesContext";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const { favourites, dispatch: favDispatch } = useFavourites();
  const navigate = useNavigate();
  const isFavourite = favourites.some(item => item.id === product.id);
  const { isAuthenticated } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setToastMsg("Bạn cần đăng nhập để thêm vào giỏ hàng.");
      setShowToast(true);
      return;
    }
    addToCart(product);
    setToastMsg("Added to cart");
    setShowToast(true);
  };
  const handleFavourite = () => {
    if (!isAuthenticated) {
      setToastMsg("Bạn cần đăng nhập để thêm vào yêu thích.");
      setShowToast(true);
      return;
    }
    if (!isFavourite) {
      favDispatch({ type: "ADD_FAVOURITE", payload: product });
      setToastMsg("Added to favourites");
      setShowToast(true);
    } else {
      favDispatch({ type: "REMOVE_FAVOURITE", payload: product.id });
      setToastMsg("Removed from favourites");
      setShowToast(true);
    }
  };
  return (
    <Card className="h-100 product-card">
      <Card.Img variant="top" src={product.image} alt={product.name} style={{height:200,objectFit:'cover'}} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text className="fw-bold">${parseFloat(product.price).toFixed(2)}</Card.Text>
        <div className="mt-auto d-flex gap-2">
          <Button as={Link} to={`/products/${product.id}`} variant="info">View Details</Button>
          <Button onClick={handleAddToCart} variant="success">Add to Cart</Button>
          <Button onClick={handleFavourite} variant={isFavourite ? "warning" : "outline-warning"}>
            {isFavourite ? "Unfavourite" : "Add to Favourite"}
          </Button>
        </div>
      </Card.Body>
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={2500} autohide bg={isAuthenticated ? "success" : "danger"}>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Card>
  );
};
export default ProductCard;
