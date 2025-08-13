import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import './RecipeRequestForm.css';

const RecipeRequestForm = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ingredient: '',
    prepTime: '',
    notes: ''
  });

  const [showFeedback, setShowFeedback] = useState({
    name: false,
    email: false,
    ingredient: false,
    prepTime: false,
    notes: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Show feedback when user starts typing
    if (value.trim() === '') {
      setShowFeedback(prev => ({
        ...prev,
        [field]: false
      }));
    } else {
      setShowFeedback(prev => ({
        ...prev,
        [field]: true
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a server
    alert('Recipe request submitted successfully!');
    onHide();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      ingredient: '',
      prepTime: '',
      notes: ''
    });
    setShowFeedback({
      name: false,
      email: false,
      ingredient: false,
      prepTime: false,
      notes: false
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered className="recipe-request-modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">
          <FaPaperPlane className="me-2" />
          Recipe Request Form
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="modal-body">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Your Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={showFeedback.name && formData.name.trim() === '' ? 'is-invalid' : ''}
                />
                {showFeedback.name && formData.name.trim() === '' && (
                  <Form.Control.Feedback type="invalid">
                    Please enter your name
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={showFeedback.email && !formData.email.includes('@') ? 'is-invalid' : ''}
                />
                {showFeedback.email && !formData.email.includes('@') && (
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Desired Ingredient *</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Fresh salmon, organic quinoa, seasonal vegetables..."
              value={formData.ingredient}
              onChange={(e) => handleInputChange('ingredient', e.target.value)}
              className={showFeedback.ingredient && formData.ingredient.trim() === '' ? 'is-invalid' : ''}
            />
            {showFeedback.ingredient && formData.ingredient.trim() === '' && (
              <Form.Control.Feedback type="invalid">
                Please specify your desired ingredients
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Max Prep Time *</Form.Label>
            <Form.Select
              value={formData.prepTime}
              onChange={(e) => handleInputChange('prepTime', e.target.value)}
              className={showFeedback.prepTime && formData.prepTime === '' ? 'is-invalid' : ''}
            >
              <option value="">Select prep time</option>
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
            </Form.Select>
            {showFeedback.prepTime && formData.prepTime === '' && (
              <Form.Control.Feedback type="invalid">
                Please select a prep time
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Any additional notes, dietary restrictions, or preferences..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
            />
            <Form.Text className="text-muted">
              Optional: Share any specific requirements or preferences
            </Form.Text>
          </Form.Group>

          <div className="form-actions">
            <Button 
              variant="outline-secondary" 
              onClick={handleClose}
              className="cancel-btn"
            >
              <FaTimes className="me-2" />
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              className="submit-btn"
            >
              <FaPaperPlane className="me-2" />
              Submit Request
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RecipeRequestForm;
