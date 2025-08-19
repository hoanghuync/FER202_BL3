import React from 'react';
import { Row, Col, Form, Card } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaFileAlt, FaCamera } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AboutTab = ({ formData, onFieldChange, onFileChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div className="about-tab">
      <h4 className="mb-4 text-primary">
        <FaUser className="me-2" />
        Personal Information
      </h4>
      
      <Row className="g-4">
        {/* Avatar Upload */}
        <Col md={4}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="mb-3">
                {formData.avatarPreview ? (
                  <img
                    src={formData.avatarPreview}
                    alt="Avatar preview"
                    className="rounded-circle mb-3"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{ width: '120px', height: '120px' }}
                  >
                    <FaCamera className="text-muted" size={40} />
                  </div>
                )}
              </div>
              
              <Form.Group>
                <Form.Label className="fw-semibold">Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="form-control-sm"
                />
                <Form.Text className="text-muted">
                  Upload a profile picture (optional)
                </Form.Text>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Personal Details Form */}
        <Col md={8}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaUser className="me-2 text-primary" />
                  First Name *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => onFieldChange('firstName', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaUser className="me-2 text-primary" />
                  Last Name *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => onFieldChange('lastName', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaEnvelope className="me-2 text-primary" />
                  Email Address *
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => onFieldChange('email', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaPhone className="me-2 text-primary" />
                  Phone Number *
                </Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => onFieldChange('phone', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaBirthdayCake className="me-2 text-primary" />
                  Date of Birth *
                </Form.Label>
                <Form.Control
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => onFieldChange('dateOfBirth', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaVenusMars className="me-2 text-primary" />
                  Gender *
                </Form.Label>
                <Form.Select
                  value={formData.gender}
                  onChange={(e) => onFieldChange('gender', e.target.value)}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={12}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaFileAlt className="me-2 text-primary" />
                  Bio
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) => onFieldChange('bio', e.target.value)}
                />
                <Form.Text className="text-muted">
                  Brief description about yourself (optional)
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>
      
      <div className="mt-4 p-3 bg-light rounded">
        <h6 className="fw-semibold text-primary mb-2">
          <FaUser className="me-2" />
          About Tab Requirements
        </h6>
        <ul className="small mb-0">
          <li>All fields marked with * are required</li>
          <li>Email must be in valid format</li>
          <li>Profile picture is optional</li>
          <li>Complete this tab to proceed to Account tab</li>
        </ul>
      </div>
    </div>
  );
};

AboutTab.propTypes = {
  formData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    avatar: PropTypes.object,
    avatarPreview: PropTypes.string,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
};

export default AboutTab;
