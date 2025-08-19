import React, { useState, useReducer, useMemo, useCallback } from 'react';
import { Modal, Nav, ProgressBar, Button, Toast, ToastContainer } from 'react-bootstrap';
import { FaUser, FaLock, FaMapMarkerAlt, FaCheck, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import AboutTab from './wizard/AboutTab';
import AccountTab from './wizard/AccountTab';
import AddressTab from './wizard/AddressTab';
import ProfileSummaryModal from './wizard/ProfileSummaryModal';
import PropTypes from 'prop-types';

// Initial state cho form
const initialFormState = {
  // About Tab
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  bio: '',
  
  // Account Tab
  username: '',
  password: '',
  confirmPassword: '',
  secretQuestion: '',
  secretAnswer: '',
  
  // Address Tab
  street: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  
  // Avatar
  avatar: null,
  avatarPreview: null
};

// Reducer để quản lý form state
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'UPDATE_AVATAR':
      return {
        ...state,
        avatar: action.avatar,
        avatarPreview: action.avatarPreview
      };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
};

// Validation functions
const validateAboutTab = (formData) => {
  const errors = {};
  
  if (!formData.firstName.trim()) errors.firstName = 'First name is required';
  if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
  if (!formData.email.trim()) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
  if (!formData.phone.trim()) errors.phone = 'Phone is required';
  if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
  if (!formData.gender) errors.gender = 'Gender is required';
  
  return Object.keys(errors).length === 0;
};

const validateAccountTab = (formData) => {
  const errors = {};
  
  if (!formData.username.trim()) errors.username = 'Username is required';
  else if (formData.username.length < 6) errors.username = 'Username must be at least 6 characters';
  
  if (!formData.password) errors.password = 'Password is required';
  else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
  else if (!/(?=.*[A-Z])/.test(formData.password)) errors.password = 'Password must contain at least one uppercase letter';
  else if (!/(?=.*\d)/.test(formData.password)) errors.password = 'Password must contain at least one number';
  else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) errors.password = 'Password must contain at least one special character';
  
  if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your password';
  else if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
  
  if (!formData.secretQuestion) errors.secretQuestion = 'Please select a secret question';
  if (!formData.secretAnswer.trim()) errors.secretAnswer = 'Please answer the secret question';
  
  return Object.keys(errors).length === 0;
};

const validateAddressTab = (formData) => {
  const errors = {};
  
  if (!formData.street.trim()) errors.street = 'Street address is required';
  if (!formData.city.trim()) errors.city = 'City is required';
  if (!formData.state.trim()) errors.state = 'State is required';
  if (!formData.country) errors.country = 'Country is required';
  if (!formData.zipCode.trim()) errors.zipCode = 'ZIP code is required';
  
  return Object.keys(errors).length === 0;
};

const ProfileBuilderModal = ({ show, onHide }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [formData, dispatch] = useReducer(formReducer, initialFormState);
  const [showSummary, setShowSummary] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // useMemo để tính toán validation và progress
  const { isStepValid, progress } = useMemo(() => {
    let validSteps = 0;
    const totalSteps = 3;
    
    if (validateAboutTab(formData)) validSteps++;
    if (validateAccountTab(formData)) validSteps++;
    if (validateAddressTab(formData)) validSteps++;
    
    const progress = (validSteps / totalSteps) * 100;
    
    let isStepValid = false;
    switch (activeTab) {
      case 'about':
        isStepValid = validateAboutTab(formData);
        break;
      case 'account':
        isStepValid = validateAccountTab(formData);
        break;
      case 'address':
        isStepValid = validateAddressTab(formData);
        break;
      default:
        isStepValid = false;
    }
    
    return { isStepValid, progress };
  }, [formData, activeTab]);

  // useCallback để tối ưu performance
  const nextStep = useCallback(() => {
    const tabs = ['about', 'account', 'address'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  }, [activeTab]);

  const prevStep = useCallback(() => {
    const tabs = ['about', 'account', 'address'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  }, [activeTab]);

  const onFieldChange = useCallback((field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  }, []);

  const onFileChange = useCallback((file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch({ 
          type: 'UPDATE_AVATAR', 
          avatar: file, 
          avatarPreview: e.target.result 
        });
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFinish = useCallback(() => {
    if (validateAddressTab(formData)) {
      // Lấy danh sách students đã lưu từ localStorage
      let savedStudents = [];
      try {
        const data = localStorage.getItem('customStudentProfiles');
        if (data) savedStudents = JSON.parse(data);
      } catch {}
      // Tạo profile mới
      const profile = {
        id: Date.now(),
        name: formData.firstName + ' ' + formData.lastName,
        email: formData.email,
        age: formData.dateOfBirth ? new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear() : '',
        avatar: formData.avatarPreview || '',
      };
      // Thêm vào danh sách và lưu lại
      savedStudents.push(profile);
      localStorage.setItem('customStudentProfiles', JSON.stringify(savedStudents));
      setShowSummary(true);
      setShowToast(true);
    }
  }, [formData]);

  const handleClose = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
    setActiveTab('about');
    setShowSummary(false);
    onHide();
  }, [onHide]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <AboutTab
            formData={formData}
            onFieldChange={onFieldChange}
            onFileChange={onFileChange}
          />
        );
      case 'account':
        return (
          <AccountTab
            formData={formData}
            onFieldChange={onFieldChange}
          />
        );
      case 'address':
        return (
          <AddressTab
            formData={formData}
            onFieldChange={onFieldChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="fw-bold">
            <FaUser className="me-2" />
            Build Your Profile
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="p-0">
          {/* Progress Bar */}
          <div className="p-3 bg-light border-bottom">
            <div className="d-flex align-items-center mb-2">
              <span className="fw-semibold me-2">Progress:</span>
              <span className="text-muted">{Math.round(progress)}%</span>
            </div>
            <ProgressBar 
              now={progress} 
              variant={progress === 100 ? 'success' : 'primary'}
              className="mb-2"
            />
          </div>
          
          {/* Navigation Tabs */}
          <Nav variant="tabs" className="px-3 pt-3">
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'about'}
                onClick={() => setActiveTab('about')}
                className={activeTab === 'about' ? 'fw-bold' : ''}
              >
                <FaUser className="me-2" />
                About
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'account'}
                onClick={() => setActiveTab('account')}
                className={activeTab === 'account' ? 'fw-bold' : ''}
                disabled={!validateAboutTab(formData)}
              >
                <FaLock className="me-2" />
                Account
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'address'}
                onClick={() => setActiveTab('address')}
                className={activeTab === 'address' ? 'fw-bold' : ''}
                disabled={!validateAboutTab(formData) || !validateAccountTab(formData)}
              >
                <FaMapMarkerAlt className="me-2" />
                Address
              </Nav.Link>
            </Nav.Item>
          </Nav>
          
          {/* Tab Content */}
          <div className="p-4">
            {renderTabContent()}
          </div>
        </Modal.Body>
        
        {/* Footer Buttons */}
        <Modal.Footer className="bg-light">
          <div className="d-flex justify-content-between w-100">
            <Button
              variant="outline-secondary"
              onClick={prevStep}
              disabled={activeTab === 'about'}
            >
              <FaArrowLeft className="me-2" />
              Previous
            </Button>
            
            <div>
              {activeTab === 'address' ? (
                <Button
                  variant="success"
                  onClick={handleFinish}
                  disabled={!isStepValid}
                >
                  <FaCheck className="me-2" />
                  Finish
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={nextStep}
                  disabled={!isStepValid}
                >
                  Next
                  <FaArrowRight className="ms-2" />
                </Button>
              )}
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Profile Summary Modal */}
      <ProfileSummaryModal
        show={showSummary}
        onHide={() => setShowSummary(false)}
        formData={formData}
        onClose={handleClose}
      />

      {/* Success Toast */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          bg="success"
          className="text-white"
        >
          <Toast.Header closeButton className="bg-success text-white">
            <strong className="me-auto">Success!</strong>
          </Toast.Header>
          <Toast.Body>
            Profile submitted successfully! 🎉
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

ProfileBuilderModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default ProfileBuilderModal;
