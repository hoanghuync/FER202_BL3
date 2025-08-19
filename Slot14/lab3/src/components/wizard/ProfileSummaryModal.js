import React from 'react';
import { Modal, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { FaUser, FaLock, FaMapMarkerAlt, FaCheck, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ProfileSummaryModal = ({ show, onHide, formData, onClose }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGenderDisplay = (gender) => {
    const genderMap = {
      'male': 'Male',
      'female': 'Female',
      'other': 'Other',
      'prefer-not-to-say': 'Prefer not to say'
    };
    return genderMap[gender] || gender;
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title className="fw-bold">
          <FaCheck className="me-2" />
          Your Profile
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-4">
        <Row className="g-4">
          {/* Avatar Section */}
          <Col md={4}>
            <Card className="text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <h6 className="fw-bold text-primary mb-3">Profile Picture</h6>
                {formData.avatarPreview ? (
                  <img
                    src={formData.avatarPreview}
                    alt="Profile avatar"
                    className="rounded-circle mb-3"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{ width: '150px', height: '150px' }}
                  >
                    <FaUser className="text-muted" size={60} />
                  </div>
                )}
                <p className="text-muted small mb-0">
                  {formData.avatarPreview ? 'Avatar uploaded successfully!' : 'No avatar uploaded'}
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Profile Details */}
          <Col md={8}>
            {/* About Section */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h6 className="mb-0 fw-bold">
                  <FaUser className="me-2" />
                  About
                </h6>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <div className="mb-2">
                      <strong className="text-primary">First Name:</strong>
                      <p className="mb-1">{formData.firstName || 'Not provided'}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-2">
                      <strong className="text-primary">Last Name:</strong>
                      <p className="mb-1">{formData.lastName || 'Not provided'}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-2">
                      <strong className="text-primary">Email:</strong>
                      <p className="mb-1">{formData.email || 'Not provided'}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-2">
                      <strong className="text-primary">Phone:</strong>
                      <p className="mb-1">{formData.phone || 'Not provided'}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-2">
                      <strong className="text-primary">Date of Birth:</strong>
                      <p className="mb-1">{formatDate(formData.dateOfBirth)}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-2">
                      <strong className="text-primary">Gender:</strong>
                      <p className="mb-1">{getGenderDisplay(formData.gender)}</p>
                    </div>
                  </Col>
                  {formData.bio && (
                    <Col md={12}>
                      <div className="mb-2">
                        <strong className="text-primary">Bio:</strong>
                        <p className="mb-1">{formData.bio}</p>
                      </div>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>
            
            {/* Account Section */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-warning text-dark">
                <h6 className="mb-0 fw-bold">
                  <FaLock className="me-2" />
                  Account
                </h6>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <div className="mb-2">
                      <strong className="text-warning">Username:</strong>
                      <p className="mb-1">{formData.username || 'Not provided'}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-2">
                      <strong className="text-warning">Password:</strong>
                      <p className="mb-1">
                        {'•'.repeat(Math.min(formData.password.length, 8))}
                        <Badge bg="success" className="ms-2">Secure</Badge>
                      </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-2">
                      <strong className="text-warning">Secret Question:</strong>
                      <p className="mb-1">{formData.secretQuestion || 'Not provided'}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-2">
                      <strong className="text-warning">Secret Answer:</strong>
                      <p className="mb-1">
                        {'•'.repeat(Math.min(formData.secretAnswer.length, 5))}
                        <Badge bg="info" className="ms-2">Hidden</Badge>
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            
            {/* Address Section */}
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-info text-white">
                <h6 className="mb-0 fw-bold">
                  <FaMapMarkerAlt className="me-2" />
                  Address
                </h6>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={12}>
                    <div className="mb-2">
                      <strong className="text-info">Street Address:</strong>
                      <p className="mb-1">{formData.street || 'Not provided'}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-2">
                      <strong className="text-info">City:</strong>
                      <p className="mb-1">{formData.city || 'Not provided'}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-2">
                      <strong className="text-info">State/Province:</strong>
                      <p className="mb-1">{formData.state || 'Not provided'}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-2">
                      <strong className="text-info">Country:</strong>
                      <p className="mb-1">{formData.country || 'Not provided'}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-2">
                      <strong className="text-info">ZIP/Postal Code:</strong>
                      <p className="mb-1">{formData.zipCode || 'Not provided'}</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      
      <Modal.Footer className="bg-light">
        <div className="d-flex justify-content-between w-100">
          <div className="text-muted">
            <small>Profile created successfully! 🎉</small>
          </div>
          <div>
            <Button variant="outline-secondary" onClick={onHide} className="me-2">
              Close
            </Button>
            <Button variant="success" onClick={onClose}>
              <FaCheck className="me-2" />
              Complete
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

ProfileSummaryModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProfileSummaryModal;
