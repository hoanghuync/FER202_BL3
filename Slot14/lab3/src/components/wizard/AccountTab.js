import React, { useState } from 'react';
import { Row, Col, Form, Card, Alert, Button } from 'react-bootstrap';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaQuestionCircle, FaCheck, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AccountTab = ({ formData, onFieldChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const secretQuestions = [
    "What is your pet's name?",
    "What is your mother's name?",
    "In which city were you born?",
    "Who was your favorite teacher?"
  ];

  // Password validation
  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'Contains uppercase letter', met: /(?=.*[A-Z])/.test(formData.password) },
    { label: 'Contains number', met: /(?=.*\d)/.test(formData.password) },
    { label: 'Contains special character', met: /(?=.*[!@#$%^&*])/.test(formData.password) }
  ];

  const isPasswordValid = passwordRequirements.every(req => req.met);
  const isConfirmPasswordValid = formData.password === formData.confirmPassword;

  return (
    <div className="account-tab">
      <h4 className="mb-4 text-primary">
        <FaLock className="me-2" />
        Account Security
      </h4>
      
      <Row className="g-4">
        <Col md={8}>
          <Row className="g-3">
            {/* Username */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaUser className="me-2 text-primary" />
                  Username *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={(e) => onFieldChange('username', e.target.value)}
                  required
                  isInvalid={formData.username.length > 0 && formData.username.length < 6}
                  isValid={formData.username.length >= 6}
                />
                <Form.Control.Feedback type="invalid">
                  Username must be at least 6 characters
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  Username looks good!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            {/* Password */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaLock className="me-2 text-primary" />
                  Password *
                </Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => onFieldChange('password', e.target.value)}
                    required
                    isInvalid={formData.password.length > 0 && !isPasswordValid}
                    isValid={formData.password.length > 0 && isPasswordValid}
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="position-absolute end-0 top-0 h-100 border-0"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">
                  Password does not meet requirements
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  Password meets all requirements!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            {/* Confirm Password */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaLock className="me-2 text-primary" />
                  Confirm Password *
                </Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => onFieldChange('confirmPassword', e.target.value)}
                    required
                    isInvalid={formData.confirmPassword.length > 0 && !isConfirmPasswordValid}
                    isValid={formData.confirmPassword.length > 0 && isConfirmPasswordValid}
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="position-absolute end-0 top-0 h-100 border-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">
                  Passwords do not match
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  Passwords match!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            {/* Secret Question */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaQuestionCircle className="me-2 text-primary" />
                  Secret Question *
                </Form.Label>
                <Form.Select
                  value={formData.secretQuestion}
                  onChange={(e) => onFieldChange('secretQuestion', e.target.value)}
                  required
                >
                  <option value="">Select a secret question</option>
                  {secretQuestions.map((question, index) => (
                    <option key={index} value={question}>
                      {question}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            {/* Secret Answer */}
            <Col md={12}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaQuestionCircle className="me-2 text-primary" />
                  Secret Answer *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your answer"
                  value={formData.secretAnswer}
                  onChange={(e) => onFieldChange('secretAnswer', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>
        
        {/* Password Requirements */}
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-light">
              <h6 className="mb-0 fw-semibold">
                <FaLock className="me-2 text-primary" />
                Password Requirements
              </h6>
            </Card.Header>
            <Card.Body>
              {passwordRequirements.map((req, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  {req.met ? (
                    <FaCheck className="text-success me-2" />
                  ) : (
                    <FaTimes className="text-danger me-2" />
                  )}
                  <span className={`small ${req.met ? 'text-success' : 'text-muted'}`}>
                    {req.label}
                  </span>
                </div>
              ))}
              
              <hr />
              
              <div className="d-flex align-items-center mb-2">
                {isConfirmPasswordValid ? (
                  <FaCheck className="text-success me-2" />
                ) : (
                  <FaTimes className="text-danger me-2" />
                )}
                <span className={`small ${isConfirmPasswordValid ? 'text-success' : 'text-muted'}`}>
                  Passwords match
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <div className="mt-4 p-3 bg-light rounded">
        <h6 className="fw-semibold text-primary mb-2">
          <FaLock className="me-2" />
          Account Tab Requirements
        </h6>
        <ul className="small mb-0">
          <li>Username must be at least 6 characters</li>
          <li>Password must meet all security requirements</li>
          <li>Passwords must match exactly</li>
          <li>Secret question and answer are required</li>
          <li>Complete this tab to proceed to Address tab</li>
        </ul>
      </div>
    </div>
  );
};

AccountTab.propTypes = {
  formData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    secretQuestion: PropTypes.string.isRequired,
    secretAnswer: PropTypes.string.isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
};

export default AccountTab;
