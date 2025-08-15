import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart, FaInfoCircle, FaStar } from 'react-icons/fa';

const MovieCard = ({ 
  movie, 
  isFavourite, 
  onAddToFavourites, 
  onShowDetails 
}) => {
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className="h-100 shadow-sm border-0 bg-white text-dark movie-card">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={movie.poster} 
          alt={`Poster for ${movie.title}`}
          className="card-img-top"
          style={{ height: '300px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />
        
        {/* Favourite badge */}
        {isFavourite && (
          <div className="position-absolute top-0 end-0 m-2">
            <Badge bg="danger" className="fs-6 p-2">
              <FaHeart />
            </Badge>
          </div>
        )}
        
        {/* Overlay with Details button */}
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 opacity-0 hover-opacity-100 transition">
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => onShowDetails(movie)}
            className="fw-bold"
          >
            <FaInfoCircle className="me-1" />
            Details
          </Button>
        </div>
      </div>
      
      <Card.Body className="d-flex flex-column p-3">
        <div className="mb-2 d-flex justify-content-between align-items-start">
          <div className="d-flex gap-1 flex-wrap">
            <Badge bg="primary" className="fs-6">{movie.genre}</Badge>
            <Badge bg="secondary" className="fs-6">{movie.year}</Badge>
          </div>
          <div className="d-flex align-items-center">
            <FaStar className="text-warning me-1" />
            <span className="text-warning fw-bold">{(Math.random() * 2 + 3).toFixed(1)}</span>
          </div>
        </div>
        
        <Card.Title className="h6 mb-2 fw-bold text-truncate">{movie.title}</Card.Title>
        
        <Card.Text className="flex-grow-1 text-muted small">
          {truncateDescription(movie.description)}
        </Card.Text>
        
        <div className="mb-3">
          <small className="text-muted">
            <strong>Country:</strong> {movie.country} | 
            <strong> Duration:</strong> {movie.duration} min
          </small>
        </div>
        
        <Button
          variant={isFavourite ? "danger" : "outline-danger"}
          size="sm"
          onClick={() => onAddToFavourites(movie)}
          className="w-100 fw-bold"
        >
          {isFavourite ? (
            <>
              <FaHeart className="me-1" />
              Remove from Favourites
            </>
          ) : (
            <>
              <FaRegHeart className="me-1" />
              Add to Favourites
            </>
          )}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
  isFavourite: PropTypes.bool.isRequired,
  onAddToFavourites: PropTypes.func.isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default MovieCard;
