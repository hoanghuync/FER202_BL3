import React from 'react';
import { Modal, Button, Badge, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaClock, FaGlobe, FaCalendar, FaFilm } from 'react-icons/fa';

const MovieModal = ({ movie, show, onHide }) => {
  if (!movie) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-white">
        <Row>
          <Col md={4}>
            <img 
              src={movie.poster} 
              alt={`Poster for ${movie.title}`}
              className="img-fluid rounded shadow"
              style={{ width: '100%', height: 'auto' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
              }}
            />
          </Col>
          <Col md={8}>
            <div className="mb-3">
              <Badge bg="primary" className="me-2 fs-6">{movie.genre}</Badge>
              <Badge bg="secondary" className="fs-6">{movie.year}</Badge>
            </div>
            
            <h6 className="mb-2 fw-bold text-dark">Description</h6>
            <p className="text-muted mb-3">{movie.description}</p>
            
            <Row className="mb-3">
              <Col sm={6}>
                <div className="d-flex align-items-center mb-2">
                  <FaClock className="me-2 text-muted" />
                  <span className="text-dark"><strong>Duration:</strong> {movie.duration} minutes</span>
                </div>
              </Col>
              <Col sm={6}>
                <div className="d-flex align-items-center mb-2">
                  <FaGlobe className="me-2 text-muted" />
                  <span className="text-dark"><strong>Country:</strong> {movie.country}</span>
                </div>
              </Col>
            </Row>
            
            <Row>
              <Col sm={6}>
                <div className="d-flex align-items-center mb-2">
                  <FaCalendar className="me-2 text-muted" />
                  <span className="text-dark"><strong>Year:</strong> {movie.year}</span>
                </div>
              </Col>
              <Col sm={6}>
                <div className="d-flex align-items-center mb-2">
                  <FaFilm className="me-2 text-muted" />
                  <span className="text-dark"><strong>Genre:</strong> {movie.genre}</span>
                </div>
              </Col>
            </Row>
            
            <div className="mt-4">
              <h6 className="fw-bold text-dark">Showtimes</h6>
              <div className="d-flex flex-wrap gap-2">
                <Badge bg="success" className="fs-6 px-3 py-2">10:00 AM</Badge>
                <Badge bg="success" className="fs-6 px-3 py-2">2:30 PM</Badge>
                <Badge bg="success" className="fs-6 px-3 py-2">7:00 PM</Badge>
                <Badge bg="success" className="fs-6 px-3 py-2">9:30 PM</Badge>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

MovieModal.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }),
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default MovieModal;
