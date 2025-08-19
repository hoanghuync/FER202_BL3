import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { FaMapMarkerAlt, FaGlobe, FaCity, FaBuilding, FaMapPin } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AddressTab = ({ formData, onFieldChange }) => {
  const countries = [
    'Viet Nam',
    'Korea',
    'Italy',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'China',
    'India',
    'Brazil',
    'Mexico',
    'Spain',
    'Netherlands',
    'Switzerland',
    'Sweden',
    'Norway',
    'Denmark'
  ];

  return (
    <div className="address-tab">
      <h4 className="mb-4 text-primary">
        <FaMapMarkerAlt className="me-2" />
        Address Information
      </h4>
      
      <Row className="g-4">
        <Col md={8}>
          <Row className="g-3">
            {/* Street Address */}
            <Col md={12}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaMapMarkerAlt className="me-2 text-primary" />
                  Street Address *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter street address"
                  value={formData.street}
                  onChange={(e) => onFieldChange('street', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            
            {/* City */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaCity className="me-2 text-primary" />
                  City *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(e) => onFieldChange('city', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            
            {/* State/Province */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaBuilding className="me-2 text-primary" />
                  State/Province *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter state or province"
                  value={formData.state}
                  onChange={(e) => onFieldChange('state', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            
            {/* Country */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaGlobe className="me-2 text-primary" />
                  Country *
                </Form.Label>
                <Form.Select
                  value={formData.country}
                  onChange={(e) => onFieldChange('country', e.target.value)}
                  required
                >
                  <option value="">Select country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            {/* ZIP Code */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaMapPin className="me-2 text-primary" />
                  ZIP/Postal Code *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ZIP or postal code"
                  value={formData.zipCode}
                  onChange={(e) => onFieldChange('zipCode', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>
        
        {/* Address Preview */}
        <Col md={4}>
          <div className="bg-light p-3 rounded border">
            <h6 className="fw-semibold text-primary mb-3">
              <FaMapMarkerAlt className="me-2" />
              Address Preview
            </h6>
            
            {formData.street && (
              <div className="mb-2">
                <strong>Street:</strong>
                <p className="mb-1 small">{formData.street}</p>
              </div>
            )}
            
            {formData.city && (
              <div className="mb-2">
                <strong>City:</strong>
                <p className="mb-1 small">{formData.city}</p>
              </div>
            )}
            
            {formData.state && (
              <div className="mb-2">
                <strong>State:</strong>
                <p className="mb-1 small">{formData.state}</p>
              </div>
            )}
            
            {formData.country && (
              <div className="mb-2">
                <strong>Country:</strong>
                <p className="mb-1 small">{formData.country}</p>
              </div>
            )}
            
            {formData.zipCode && (
              <div className="mb-2">
                <strong>ZIP Code:</strong>
                <p className="mb-1 small">{formData.zipCode}</p>
              </div>
            )}
            
            {!formData.street && !formData.city && !formData.state && !formData.country && !formData.zipCode && (
              <p className="text-muted small mb-0">
                Fill in the address fields to see a preview here
              </p>
            )}
          </div>
        </Col>
      </Row>
      
      <div className="mt-4 p-3 bg-light rounded">
        <h6 className="fw-semibold text-primary mb-2">
          <FaMapMarkerAlt className="me-2" />
          Address Tab Requirements
        </h6>
        <ul className="small mb-0">
          <li>All address fields are required</li>
          <li>Select your country from the dropdown</li>
          <li>Complete this tab to finish profile creation</li>
          <li>Click "Finish" to submit your profile</li>
        </ul>
      </div>
    </div>
  );
};

AddressTab.propTypes = {
  formData: PropTypes.shape({
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
};

export default AddressTab;
