import React, { useState, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import Filters from './Filters';
import SortDropdown from './SortDropdown';
import StudentGrid from './StudentGrid';
import StudentDetailModal from './StudentDetailModal';

const StudentsPage = ({ students }) => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState('all');
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sortBy, setSortBy] = useState('none');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filtered and sorted students using useMemo
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students;

    // Search filter (name or email)
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchLower) ||
        student.email.toLowerCase().includes(searchLower)
      );
    }

    // Age range filter
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

    // Has avatar filter
    if (hasAvatar) {
      filtered = filtered.filter(student => student.avatar && student.avatar !== '');
    }

    // Sorting
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
  }, [students, searchTerm, ageRange, hasAvatar, sortBy]);

  // Handle search from navbar
  const handleNavbarSearch = (term) => {
    setSearchTerm(term);
  };

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

export default StudentsPage;
