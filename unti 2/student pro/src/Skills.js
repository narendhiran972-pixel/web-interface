import React from 'react';

// Skills Component - displays list of technical skills received via props from App
// Each skill is shown as a list item inside an unordered list
function Skills({ skills }) {
  return (
    <section className="card skills">
      <h2><span className="icon">💻</span> Technical Skills</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
