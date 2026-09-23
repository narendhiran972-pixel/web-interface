import React from 'react';

// About Component - displays short introduction received via props from App
function About({ intro }) {
  const paragraphs = intro.split('\n').map(p => p.trim()).filter(p => p.length > 0);
  return (
    <section className="card about">
      <h2><span className="icon">📖</span> About Me</h2>
      {paragraphs.map((para, index) => (
        <p key={index} style={{ marginBottom: index < paragraphs.length - 1 ? '10px' : '0' }}>{para}</p>
      ))}
    </section>
  );
}

export default About;
