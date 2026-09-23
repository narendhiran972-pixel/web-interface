import React from 'react';

// Goal Component - displays the current career objective of the person
function Goal({ objective }) {
  return (
    <section className="card goal">
      <h2><span className="icon">🎯</span> Career Goal</h2>
      <div className="goal-box">
        <p>{objective}</p>
      </div>
    </section>
  );
}

export default Goal;
