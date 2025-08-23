import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { Button, Card, Toast, ToastContainer } from "react-bootstrap";
import { useFavourites } from "../context/FavouritesContext";
import { CartContext } from "../components/CartContext";
import { useAuth } from "../context/AuthContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useContext(CartContext);
  const { favourites, dispatch: favDispatch } = useFavourites();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isFavourite = favourites.some(item => item.id === product.id);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setToastMsg("Bạn cần đăng nhập để thêm vào giỏ hàng.");
      setShowToast(true);
      return;
    }
    addToCart(product);
  };

  const handleFavourite = () => {
    if (!isAuthenticated) {
      setToastMsg("Bạn cần đăng nhập để thêm vào yêu thích.");
      setShowToast(true);
      return;
    }
    isFavourite ? navigate("/favourites") : favDispatch({ type: "ADD_FAVOURITE", payload: product });
  };

  return (
    <div className="container py-4">
      <Card className="mb-4">
        <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/" + product.image.replace("images/","")} alt={product.name} style={{height:300,objectFit:'cover'}} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text className="fw-bold">${parseFloat(product.price).toFixed(2)}</Card.Text>
          <div className="d-flex gap-2">
            <Button onClick={handleAddToCart} variant="success">Add to Cart</Button>
            <Button onClick={() => navigate("/products")} variant="secondary">Back to List</Button>
            <Button onClick={handleFavourite} variant={isFavourite ? "warning" : "outline-warning"}>
              {isFavourite ? "Browse to My Favourite" : "Add to Favourite"}
            </Button>
          </div>
        </Card.Body>
      </Card>
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={2500} autohide bg={isAuthenticated ? "success" : "danger"}>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};
export default ProductDetailsPage;
