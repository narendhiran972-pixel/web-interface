import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function About() {
  const location = useLocation();
  const navigate = useNavigate();

  // Receive data from Home page
  const userData = location.state?.userData || { name: 'No data', email: 'No data', course: 'No data' };

  const [experience, setExperience] = useState('Beginner');
  const [message, setMessage] = useState('');

  const handleNext = () => {
    // Pass both received data + new data to Services page
    navigate('/services', {
      state: {
        userData: userData,
        aboutData: {
          experience: experience,
          message: message
        }
      }
    });
  };

  return (
    <div className="page">
      <h1>ℹ️ About Page</h1>
      <p className="subtitle">Data received from Home Page + Add more info!</p>

      <div className="data-card">
        <h3>📥 Received from Home:</h3>
        <table className="data-table">
          <tbody>
            <tr><td><strong>Name</strong></td><td>{userData.name}</td></tr>
            <tr><td><strong>Email</strong></td><td>{userData.email}</td></tr>
            <tr><td><strong>Course</strong></td><td>{userData.course}</td></tr>
          </tbody>
        </table>
      </div>

      <div className="form-card">
        <h3>✏️ Add More Details:</h3>
        <div className="form-group">
          <label>Experience Level:</label>
          <select value={experience} onChange={(e) => setExperience(e.target.value)}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="form-group">
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write something about yourself..."
            rows="3"
          />
        </div>

        <button className="btn btn-primary" onClick={handleNext}>
          Go to Services Page →
        </button>
      </div>
    </div>
  );
}

export default About;
