import React from 'react';
import { Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';

const HeroCarousel = ({ movies }) => {
  // Select first 3 movies for carousel
  const carouselMovies = movies.slice(0, 3);

  return (
    <Carousel 
      className="mb-4" 
      interval={5000}
      controls={true}
      indicators={true}
      fade
    >
      {carouselMovies.map((movie, index) => (
        <Carousel.Item key={movie.id}>
          <div 
            className="d-block w-100"
            style={{
              height: '400px',
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${movie.poster})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <Carousel.Caption className="text-start">
            <h2 className="display-6 fw-bold text-white mb-3">
              {movie.title}
            </h2>
            <p className="lead text-white-50 mb-4">
              {movie.description}
            </p>
            <div className="d-flex gap-2">
              <span className="badge bg-primary fs-6 px-3 py-2">
                {movie.genre}
              </span>
              <span className="badge bg-secondary fs-6 px-3 py-2">
                {movie.year}
              </span>
              <span className="badge bg-info fs-6 px-3 py-2">
                {movie.duration} min
              </span>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

HeroCarousel.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default HeroCarousel;
