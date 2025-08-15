import React from 'react';
import { Form, InputGroup, Row, Col, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

const SearchFilterBar = ({ 
  searchTerm, 
  selectedGenre, 
  sortBy, 
  onSearchChange, 
  onGenreChange, 
  onSortChange,
  allGenres,
  resultCount 
}) => {
  return (
    <Card className="mb-4 border-0 shadow">
      <Card.Body className="p-4 bg-white">
        <Row className="g-3">
          {/* Search Input */}
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text className="bg-light border-end-0">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search movies by title..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="border-start-0"
              />
            </InputGroup>
          </Col>

          {/* Genre Filter */}
          <Col md={3}>
            <Form.Select
              value={selectedGenre}
              onChange={(e) => onGenreChange(e.target.value)}
              className="form-select"
            >
              {allGenres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* Sort Options */}
          <Col md={3}>
            <Form.Select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="form-select"
            >
              <option value="none">Sort by</option>
              <option value="duration-asc">Duration ↑</option>
              <option value="duration-desc">Duration ↓</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="year-desc">Year (Newest)</option>
              <option value="year-asc">Year (Oldest)</option>
            </Form.Select>
          </Col>

          {/* Result Count */}
          <Col md={2}>
            <div className="text-center">
              <small className="text-muted fw-semibold">
                {resultCount} movie{resultCount !== 1 ? 's' : ''} found
              </small>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

SearchFilterBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  allGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
  resultCount: PropTypes.number.isRequired,
};

export default SearchFilterBar;
