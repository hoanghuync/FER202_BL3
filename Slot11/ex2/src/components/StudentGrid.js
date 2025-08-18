import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import StudentCard from './StudentCard';

const StudentGrid = ({ students, onViewDetails }) => {
  if (students.length === 0) {
    return (
      <Alert variant="info" className="text-center">
        <strong>No students found</strong> matching your current filters.
        <br />
        Try adjusting your search criteria or filters.
      </Alert>
    );
  }

  return (
    <div className="student-grid">
      <div className="mb-3">
        <h5 className="text-white fw-bold">
          Showing {students.length} student{students.length !== 1 ? 's' : ''}
        </h5>
      </div>
      
      <Row>
        {students.map(student => (
          <Col key={student.id} lg={4} md={6} className="mb-4">
            <StudentCard
              student={student}
              onViewDetails={onViewDetails}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

// PropTypes validation
StudentGrid.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default StudentGrid;
