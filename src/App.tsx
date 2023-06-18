import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Skills } from './components/skills/Skills';
import { Counter } from './components/counter/counter';

function App() {
  const skills = ["HTML", "CSS", "Javascript"]
  return (
    <div className="App">
      {/* <Skills skills={skills} /> */}
      <Counter />
    </div>
  );
}

export default App;
