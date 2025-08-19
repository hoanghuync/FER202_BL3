import React, { useState, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import Filters from './Filters';
import SortDropdown from './SortDropdown';
import StudentGrid from './StudentGrid';
import StudentDetailModal from './StudentDetailModal';
import PropTypes from 'prop-types';

const StudentsPage = ({ students }) => {
  // State cho filters
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState('all');
  const [hasAvatar, setHasAvatar] = useState(false);
  
  // State cho sorting
  const [sortBy, setSortBy] = useState('none');
  
  // State cho modal
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Nếu có profile từ localStorage, gộp vào danh sách students
  let mergedStudents = students;
  try {
    const profile = localStorage.getItem('customStudentProfile');
    if (profile) {
      const parsed = JSON.parse(profile);
      // Nếu chưa có trong danh sách (theo email), thì thêm vào
      if (!students.some(s => s.email === parsed.email)) {
        mergedStudents = [...students, parsed];
      }
    }
  } catch {}

  // useMemo để tối ưu performance cho filtering và sorting
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = mergedStudents;

    // 1. Search filter (name or email)
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchLower) ||
        student.email.toLowerCase().includes(searchLower)
      );
    }

    // 2. Age range filter
    if (ageRange !== 'all') {
      switch (ageRange) {
        case '≤20':
          filtered = filtered.filter(student => student.age <= 20);
          break;
        case '21-25':
          filtered = filtered.filter(student => student.age >= 21 && student.age <= 25);
          break;
        case '>25':
          filtered = filtered.filter(student => student.age > 25);
          break;
        default:
          break;
      }
    }

    // 3. Has avatar filter
    if (hasAvatar) {
      filtered = filtered.filter(student => student.avatar && student.avatar !== '');
    }

    // 4. Sorting
    if (sortBy !== 'none') {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'age-asc':
            return a.age - b.age;
          case 'age-desc':
            return b.age - a.age;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [mergedStudents, searchTerm, ageRange, hasAvatar, sortBy]);

  // Handle view details
  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  return (
    <Container className="py-4">
      <Filters
        searchTerm={searchTerm}
        ageRange={ageRange}
        hasAvatar={hasAvatar}
        onSearchChange={setSearchTerm}
        onAgeRangeChange={setAgeRange}
        onHasAvatarChange={setHasAvatar}
      />
      
      <SortDropdown
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      <StudentGrid
        students={filteredAndSortedStudents}
        onViewDetails={handleViewDetails}
      />
      
      <StudentDetailModal
        student={selectedStudent}
        show={showModal}
        onHide={handleModalClose}
      />
    </Container>
  );
};

StudentsPage.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StudentsPage;
