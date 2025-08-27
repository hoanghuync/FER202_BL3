import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { FaEye, FaCartPlus, FaHeart } from 'react-icons/fa';
import { formatPrice } from '../utils/format';
import { useCartAndFavourite } from '../hooks/useCartAndFavourite';

const ProductCard = ({ product, onViewDetails }) => {
  const navigate = useNavigate();
  const { addToCart, addToFavourite, favourites } = useCartAndFavourite();
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const isFavourite = favourites.some(item => item.id === product.id);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <Card className="h-100 shadow-sm product-card d-flex flex-column justify-content-between align-items-stretch" style={{borderRadius:16}}>
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius:16, borderTopRightRadius:16 }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="h6 mb-2 fw-bold text-center">{product.name}</Card.Title>
        <Card.Text className="flex-grow-1 small text-muted mb-2 text-center">
          {product.description}
        </Card.Text>
        <div className="mb-3 text-center">
          <Badge bg="primary" className="fs-6 px-3 py-2" style={{borderRadius:12}}>
            {formatPrice(product.price)}
          </Badge>
        </div>
        <ButtonGroup className="w-100 d-flex justify-content-center gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            className="flex-fill"
            onClick={() => onViewDetails(product)}
          >
            <FaEye className="me-1" />
            View Details
          </Button>
          <Button
            variant="success"
            size="sm"
            className="flex-fill"
            onClick={() => { addToCart(product); setToastMsg('Added to cart!'); setShowToast(true); }}
          >
            <FaCartPlus className="me-1" />
            Add to Cart
          </Button>
          <Button
            variant={isFavourite ? "danger" : "outline-danger"}
            size="sm"
            className="flex-fill"
            onClick={() => { addToFavourite(product); setToastMsg('Added to favourites!'); setShowToast(true); }}
          >
            <FaHeart className="me-1" />
            Favourite
          </Button>
        </ButtonGroup>
        {showToast && (
          <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
            <div className="toast show bg-success text-white">
              <div className="toast-body">{toastMsg}</div>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;