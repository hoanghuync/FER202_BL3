import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { FaSearch, FaUserCheck, FaFilter } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Filters = ({ 
  searchTerm, 
  ageRange, 
  hasAvatar, 
  onSearchChange, 
  onAgeRangeChange, 
  onHasAvatarChange 
}) => {
  return (
    <div className="filters-section mb-4">
      <div className="d-flex align-items-center mb-3">
        <FaFilter className="me-2 text-primary" />
        <h5 className="mb-0 fw-bold text-white">Filters & Search</h5>
      </div>
      
      <Row className="g-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold text-white">
              <FaSearch className="me-2" />
              Search by Name/Email
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold text-white">Age Range</Form.Label>
            <Form.Select
              value={ageRange}
              onChange={(e) => onAgeRangeChange(e.target.value)}
            >
              <option value="all">All Ages</option>
              <option value="≤20">≤20 years</option>
              <option value="21-25">21-25 years</option>
              <option value="&gt;25">&gt;25 years</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group className="d-flex align-items-end h-100">
            <Form.Check
              type="checkbox"
              id="hasAvatar"
              label={
                <span className="d-flex align-items-center text-white">
                  <FaUserCheck className="me-2" />
                  Has Avatar
                </span>
              }
              checked={hasAvatar}
              onChange={(e) => onHasAvatarChange(e.target.checked)}
              className="fw-semibold"
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

Filters.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  ageRange: PropTypes.string.isRequired,
  hasAvatar: PropTypes.bool.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onAgeRangeChange: PropTypes.func.isRequired,
  onHasAvatarChange: PropTypes.func.isRequired,
};

export default Filters;
