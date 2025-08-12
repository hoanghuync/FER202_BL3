import React, { useState, useMemo } from 'react';

const PersonFilter = ({ persons }) => {
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

  // Get all unique skills for dropdown
  const allSkills = useMemo(() => {
    const skills = persons.reduce((acc, person) => {
      person.skills.forEach(skill => {
        if (!acc.includes(skill)) {
          acc.push(skill);
        }
      });
      return acc;
    }, []);
    return skills.sort();
  }, [persons]);

  // Filter persons by age range and skill
  const filteredPersons = useMemo(() => {
    return persons.filter(person => {
      const ageInRange = (!minAge || person.age >= parseInt(minAge)) && 
                        (!maxAge || person.age <= parseInt(maxAge));
      const hasSkill = !selectedSkill || person.skills.includes(selectedSkill);
      return ageInRange && hasSkill;
    });
  }, [persons, minAge, maxAge, selectedSkill]);

  return (
    <section className="section">
      <h2>2. Filter by Age Range and Skill</h2>
      <div className="filter-controls">
        <input
          type="number"
          placeholder="Min Age"
          value={minAge}
          onChange={(e) => setMinAge(e.target.value)}
          className="filter-input"
        />
        <input
          type="number"
          placeholder="Max Age"
          value={maxAge}
          onChange={(e) => setMaxAge(e.target.value)}
          className="filter-input"
        />
        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="filter-select"
        >
          <option value="">All Skills</option>
          {allSkills.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
      </div>
      <div className="filtered-results">
        {filteredPersons.length > 0 ? (
          filteredPersons.map(person => (
            <div key={person.id} className="filtered-item">
              {person.firstName} - {person.lastName} - {person.skills.join(', ')}
            </div>
          ))
        ) : (
          <div className="no-results">No found.</div>
        )}
      </div>
    </section>
  );
};

export default PersonFilter;
