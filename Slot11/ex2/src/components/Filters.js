import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { FaSearch, FaFilter, FaUserCheck } from 'react-icons/fa';

const Filters = ({ 
  searchTerm, 
  ageRange, 
  hasAvatar, 
  onSearchChange, 
  onAgeRangeChange, 
  onHasAvatarChange 
}) => {
  return (
    <Card className="mb-4 border-0 shadow">
      <Card.Body className="p-4">
        <div className="d-flex align-items-center mb-3">
          <FaFilter className="me-2 text-primary" />
          <h5 className="mb-0 fw-bold">Filters & Search</h5>
        </div>
        
        <Row className="g-3">
          {/* Search by name/email */}
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-semibold">
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

          {/* Age Range */}
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-semibold">Age Range</Form.Label>
              <Form.Select
                value={ageRange}
                onChange={(e) => onAgeRangeChange(e.target.value)}
              >
                <option value="all">All Ages</option>
                <option value="≤20">≤20 years</option>
                <option value="21-25">21-25 years</option>
                <option value=">25">&gt;25 years</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Has Avatar Checkbox */}
          <Col md={4}>
            <Form.Group className="d-flex align-items-end h-100">
              <Form.Check
                type="checkbox"
                id="hasAvatar"
                label={
                  <span className="d-flex align-items-center">
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
      </Card.Body>
    </Card>
  );
};

export default Filters;
