import React, { useMemo } from 'react';

const SkillRanking = ({ persons }) => {
  const skillRanking = useMemo(() => {
    const skillCount = persons.reduce((acc, person) => {
      person.skills.forEach(skill => {
        acc[skill] = (acc[skill] || 0) + 1;
      });
      return acc;
    }, {});

    return Object.entries(skillCount)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count);
  }, [persons]);

  return (
    <section className="section">
      <h2>3. Skill Ranking</h2>
      <table className="skill-table">
        <thead>
          <tr>
            <th>Skill</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {skillRanking.map((item, index) => (
            <tr key={item.skill} className={index === 0 ? 'top-skill' : ''}>
              <td>{item.skill}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SkillRanking;
