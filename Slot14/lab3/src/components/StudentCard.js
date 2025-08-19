import React, { useState } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaUser, FaIdCard, FaEnvelope, FaBirthdayCake, FaEye } from 'react-icons/fa';
import PropTypes from 'prop-types';

const StudentCard = ({ student, onViewDetails }) => {
  const [imageError, setImageError] = useState(false);

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
          className="d-flex align-items-center justify-content-center bg-light"
          style={{ height: '200px', backgroundColor: '#f8f9fa' }}
        >
          <div className="text-center">
            <FaUser className="text-muted mb-2" style={{ fontSize: '3rem' }} />
            <div className="text-muted small">No Image</div>
          </div>
        </div>
      );
    }

    return (
      <Card.Img
        variant="top"
        src={student.avatar}
        alt={`Avatar of ${student.name}`}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'cover' }}
        onError={handleImageError}
        onLoad={() => setImageError(false)}
      />
    );
  };

  return (
    <Card className="h-100 student-card border-0 shadow-sm">
      <div className="position-relative">
        {renderAvatar()}
        
        {/* Age Range Badge */}
        <div className="position-absolute top-0 end-0 m-2">
          <Badge bg={getAgeRangeColor(student.age)} className="fs-6">
            {getAgeRange(student.age)}
          </Badge>
        </div>
      </div>
      
      <Card.Body className="d-flex flex-column p-3">
        <div className="mb-2">
          <Badge bg="secondary" className="me-2">ID: {student.id}</Badge>
        </div>
        
        <Card.Title className="h6 mb-2 fw-bold text-truncate">
          <FaUser className="me-2 text-primary" />
          {student.name}
        </Card.Title>
        
        <Card.Text className="flex-grow-1 text-muted small mb-2">
          <FaEnvelope className="me-2" />
          {student.email}
        </Card.Text>
        
        <div className="mb-3">
          <small className="text-muted">
            <FaBirthdayCake className="me-2" />
            <strong>Age:</strong> {student.age} years
          </small>
        </div>
        
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => onViewDetails(student)}
          className="w-100 fw-semibold"
        >
          <FaEye className="me-2" />
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default StudentCard;
