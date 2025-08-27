import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import { formatPrice } from '../utils/format';

const ProductDetailsModal = ({ product, onHide }) => {
  if (!product) return null;
  return (
    <Modal show={!!product} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={product.image} alt={product.name} className="img-fluid mb-3" style={{ maxHeight: 250 }} />
        <p>{product.description}</p>
        <Badge bg="primary" className="fs-5">{formatPrice(product.price)}</Badge>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailsModal;
