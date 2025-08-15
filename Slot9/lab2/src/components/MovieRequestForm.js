import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';

const MovieRequestForm = ({ allGenres, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',
    duration: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters long';
    }

    // Genre validation
    if (!formData.genre) {
      newErrors.genre = 'Please select a genre';
    }

    // Year validation
    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else {
      const year = parseInt(formData.year);
      if (isNaN(year) || year < 1900 || year > currentYear + 5) {
        newErrors.year = `Year must be between 1900 and ${currentYear + 5}`;
      }
    }

    // Duration validation
    if (!formData.duration) {
      newErrors.duration = 'Duration is required';
    } else {
      const duration = parseInt(formData.duration);
      if (isNaN(duration) || duration <= 0 || duration > 300) {
        newErrors.duration = 'Duration must be between 1 and 300 minutes';
      }
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 30) {
      newErrors.description = 'Description must be at least 30 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        genre: '',
        year: '',
        duration: '',
        description: ''
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      genre: '',
      year: '',
      duration: '',
      description: ''
    });
    setErrors({});
    setShowSuccess(false);
  };

  return (
    <Container className="py-4">
      <Card className="shadow border-0">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0 d-flex align-items-center">
            <FaPaperPlane className="me-2" />
            Movie Request Form
          </h3>
        </Card.Header>
        <Card.Body className="p-4">
          {showSuccess && (
            <Alert variant="success" dismissible onClose={() => setShowSuccess(false)}>
              <strong>Success!</strong> Request submitted. Thank you!
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Movie Title *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter movie title"
                    isInvalid={!!errors.title}
                    className="form-control"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Genre *</Form.Label>
                  <Form.Select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    isInvalid={!!errors.genre}
                    className="form-select"
                  >
                    <option value="">Select a genre</option>
                    {allGenres.filter(genre => genre !== 'All').map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.genre}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Year *</Form.Label>
                  <Form.Control
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="e.g., 2023"
                    min="1900"
                    max={new Date().getFullYear() + 5}
                    isInvalid={!!errors.year}
                    className="form-control"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.year}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Duration (minutes) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 120"
                    min="1"
                    max="300"
                    isInvalid={!!errors.duration}
                    className="form-control"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.duration}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a detailed description of the movie (minimum 30 characters)"
                isInvalid={!!errors.description}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                {formData.description.length}/∞ characters (minimum 30 required)
              </Form.Text>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" className="flex-grow-1 fw-bold">
                <FaPaperPlane className="me-2" />
                Submit Request
              </Button>
              <Button variant="outline-secondary" onClick={handleReset} className="fw-bold">
                <FaTimes className="me-2" />
                Reset
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

MovieRequestForm.propTypes = {
  allGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MovieRequestForm;
