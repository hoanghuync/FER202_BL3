import React, { useState } from 'react';
import { Modal, Button, Row, Col, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaUser, FaEnvelope, FaBirthdayCake, FaIdCard, FaTimes, FaImage } from 'react-icons/fa';

const StudentDetailModal = ({ student, show, onHide }) => {
  const [imageError, setImageError] = useState(false);

  if (!student) return null;

  const getAgeRange = (age) => {
    if (age <= 20) return '≤20';
    if (age <= 25) return '21-25';
    return '>25';
  };

  const getAgeRangeColor = (age) => {
    if (age <= 20) return 'primary';
    if (age <= 25) return 'success';
    return 'warning';
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const renderAvatar = () => {
    if (imageError) {
      return (
        <div 
          className="d-flex align-items-center justify-content-center bg-light rounded shadow"
          style={{ width: '100%', maxWidth: '250px', height: '300px', backgroundColor: '#f8f9fa' }}
        >
          <div className="text-center">
            <FaImage className="text-muted mb-3" style={{ fontSize: '4rem' }} />
            <div className="text-muted">No Image Available</div>
          </div>
        </div>
      );
    }

    return (
      <img 
        src={student.avatar} 
        alt={`Avatar of ${student.name}`}
        className="img-fluid rounded shadow"
        style={{ width: '100%', maxWidth: '250px', height: 'auto' }}
        onError={handleImageError}
        onLoad={() => setImageError(false)}
      />
    );
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">
          <FaUser className="me-2" />
          Student Details
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="bg-white">
        <Row>
          <Col md={4} className="text-center">
            {renderAvatar()}
            
            <div className="mt-3">
              <Badge bg={getAgeRangeColor(student.age)} className="fs-6 px-3 py-2">
                {getAgeRange(student.age)} Age Group
              </Badge>
            </div>
          </Col>
          
          <Col md={8}>
            <div className="student-info">
              <div className="mb-3">
                <h5 className="fw-bold text-primary mb-2">
                  <FaIdCard className="me-2" />
                  Student ID: {student.id}
                </h5>
              </div>
              
              <div className="mb-3">
                <h4 className="fw-bold text-dark mb-2">
                  <FaUser className="me-2" />
                  {student.name}
                </h4>
              </div>
              
              <div className="mb-3">
                <h6 className="fw-semibold text-muted mb-2">
                  <FaEnvelope className="me-2" />
                  Email Address
                </h6>
                <p className="text-dark fs-6">{student.email}</p>
              </div>
              
              <div className="mb-3">
                <h6 className="fw-semibold text-muted mb-2">
                  <FaBirthdayCake className="me-2" />
                  Age Information
                </h6>
                <p className="text-dark fs-6">
                  <strong>Current Age:</strong> {student.age} years old
                </p>
                <p className="text-dark fs-6">
                  <strong>Age Group:</strong> {getAgeRange(student.age)} years
                </p>
              </div>
              
              <div className="mt-4">
                <h6 className="fw-semibold text-muted mb-2">Quick Stats</h6>
                <div className="row g-2">
                  <div className="col-6">
                    <div className="bg-light p-2 rounded text-center">
                      <small className="text-muted">ID</small>
                      <div className="fw-bold text-primary">{student.id}</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-light p-2 rounded text-center">
                      <small className="text-muted">Age</small>
                      <div className="fw-bold text-success">{student.age}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      
      <Modal.Footer className="bg-light">
        <Button variant="secondary" onClick={onHide}>
          <FaTimes className="me-2" />
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// PropTypes validation
StudentDetailModal.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default StudentDetailModal;
