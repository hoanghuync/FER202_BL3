import React, { useState, useMemo } from 'react';

const PersonList = ({ persons }) => {
  const [sortDirection, setSortDirection] = useState('asc');

  // Sort persons by first name
  const sortedPersons = useMemo(() => {
    return [...persons].sort((a, b) => {
      const comparison = a.firstName.localeCompare(b.firstName);
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [persons, sortDirection]);

  return (
    <section className="section">
      <h2>1. Person List</h2>
      <button 
        onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
        className="sort-button"
      >
        Sort First Name: {sortDirection === 'asc' ? 'A→Z' : 'Z→A'}
      </button>
      <div className="person-list">
        {sortedPersons.map(person => (
          <div key={person.id} className="person-item">
            <strong>Full Name:</strong> {person.firstName} {person.lastName} | 
            <strong> Age:</strong> {person.age} | 
            <strong> City:</strong> {person.city} | 
            <strong> Skills:</strong> {person.skills.join(', ')}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonList;
