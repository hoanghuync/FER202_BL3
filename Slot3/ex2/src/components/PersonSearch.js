import React, { useState, useMemo } from 'react';

const PersonSearch = ({ persons }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Search and multi-criteria sort
  const searchResults = useMemo(() => {
    const filtered = persons.filter(person => {
      const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });

    return filtered.sort((a, b) => {
      if (a.isActive !== b.isActive) {
        return b.isActive ? 1 : -1;
      }
      if (a.age !== b.age) {
        return a.age - b.age;
      }
      return a.lastName.localeCompare(b.lastName);
    });
  }, [persons, searchTerm]);
  
  const statistics = useMemo(() => {
    return persons.reduce((acc, person) => {
      acc.totalPeople += 1;
      acc.totalAge += person.age;
      if (person.isActive) {
        acc.activePeople += 1;
      }
      return acc;
    }, { totalPeople: 0, totalAge: 0, activePeople: 0 });
  }, [persons]);

  const averageAge = statistics.totalPeople > 0 ? Math.round(statistics.totalAge / statistics.totalPeople) : 0;

  return (
    <section className="section">
      <h2>4. Search and Multi-criteria Sort</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <div className="search-results">
        {searchResults.map(person => (
          <div key={person.id} className="search-item">
            <strong>Name:</strong> {person.firstName} {person.lastName} | 
            <strong> Age:</strong> {person.age} | 
            <strong> Active:</strong> {person.isActive ? 'Yes' : 'No'} | 
            <strong> Skills:</strong> {person.skills.join(', ')}
          </div>
        ))}
      </div>

      <div className="statistics-box">
        <h3>Statistics</h3>
        <p><strong>Total People:</strong> {statistics.totalPeople}</p>
        <p><strong>Average Age:</strong> {averageAge}</p>
        <p><strong>Active People:</strong> {statistics.activePeople}</p>
      </div>
    </section>
  );
};

export default PersonSearch;
