import React from 'react';
import { Form, Card } from 'react-bootstrap';
import { FaSort } from 'react-icons/fa';

const SortDropdown = ({ sortBy, onSortChange }) => {
  return (
    <Card className="mb-4 border-0 shadow">
      <Card.Body className="p-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <FaSort className="me-2 text-primary" />
            <span className="fw-semibold">Sort By:</span>
          </div>
          
          <Form.Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{ width: 'auto', minWidth: '200px' }}
          >
            <option value="none">No Sorting</option>
            <option value="age-asc">Age: Low to High</option>
            <option value="age-desc">Age: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </Form.Select>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SortDropdown;
