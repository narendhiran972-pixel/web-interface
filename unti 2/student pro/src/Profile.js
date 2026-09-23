import React from 'react';

// Profile Component - displays basic personal information received via props from App
function Profile({ name, age, degree, university, location, year }) {
  // Get initials from name for the avatar
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <section className="card profile">
      <h2>👤 Profile</h2>
      <div className="avatar" title={name}>{initials}</div>
      <div className="profile-list">
        <div className="profile-item">
          <span className="label">Full Name</span>
          <span className="value">{name}</span>
        </div>
        <div className="profile-item">
          <span className="label">Age</span>
          <span className="value">{age} years</span>
        </div>
        <div className="profile-item">
          <span className="label">Degree</span>
          <span className="value">{degree}</span>
        </div>
        <div className="profile-item">
          <span className="label">University</span>
          <span className="value">{university}</span>
        </div>
        <div className="profile-item">
          <span className="label">Location</span>
          <span className="value">{location}</span>
        </div>
        <div className="profile-item">
          <span className="label">Year</span>
          <span className="value">{year}</span>
        </div>
      </div>
    </section>
  );
}

export default Profile;
