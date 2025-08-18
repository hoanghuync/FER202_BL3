import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaImage } from 'react-icons/fa';

const ImageWithFallback = ({ 
  src, 
  alt, 
  className = '', 
  style = {}, 
  fallbackIcon = FaImage,
  fallbackText = 'No Image',
  fallbackClassName = '',
  fallbackStyle = {}
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const FallbackIcon = fallbackIcon;

  if (hasError) {
    return (
      <div 
        className={`d-flex align-items-center justify-content-center bg-light ${fallbackClassName}`}
        style={{
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '0.375rem',
          ...fallbackStyle
        }}
      >
        <div className="text-center">
          <FallbackIcon className="text-muted mb-2" style={{ fontSize: '2rem' }} />
          <div className="text-muted small">{fallbackText}</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div 
        className="d-flex align-items-center justify-content-center bg-light"
        style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '0.375rem',
          ...style
        }}
      >
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onLoad={handleImageLoad}
      onError={handleImageError}
    />
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  fallbackIcon: PropTypes.elementType,
  fallbackText: PropTypes.string,
  fallbackClassName: PropTypes.string,
  fallbackStyle: PropTypes.object,
};

export default ImageWithFallback;
