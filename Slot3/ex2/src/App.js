import React from 'react';
import './App.css';
import { persons } from './person.js';
import PersonList from './components/PersonList';
import PersonFilter from './components/PersonFilter';
import SkillRanking from './components/SkillRanking';
import PersonSearch from './components/PersonSearch';

function App() {
  return (
    <div className="App">
      <h1>Person Management System</h1>
      
      <PersonList persons={persons} />
      <PersonFilter persons={persons} />
      <SkillRanking persons={persons} />
      <PersonSearch persons={persons} />
    </div>
  );
}

export default App;
