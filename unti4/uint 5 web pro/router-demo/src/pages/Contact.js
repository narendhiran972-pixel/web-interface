import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Contact() {
  const location = useLocation();
  const navigate = useNavigate();

  // Receive ALL data from Services page
  const userData = location.state?.userData || { name: 'No data', email: 'No data', course: 'No data' };
  const aboutData = location.state?.aboutData || { experience: 'No data', message: 'No data' };
  const selectedService = location.state?.selectedService || { name: 'No data', icon: '❌', price: 'No data' };

  const handleStartOver = () => {
    navigate('/');
  };

  return (
    <div className="page">
      <h1>📞 Contact Page</h1>
      <p className="subtitle">Here's everything collected from all 4 pages!</p>

      <div className="summary-card">
        <h3>🎉 Complete Summary</h3>

        <div className="summary-section">
          <h4>👤 User Info (from Home Page)</h4>
          <table className="data-table">
            <tbody>
              <tr><td><strong>Name</strong></td><td>{userData.name}</td></tr>
              <tr><td><strong>Email</strong></td><td>{userData.email}</td></tr>
              <tr><td><strong>Course</strong></td><td>{userData.course}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="summary-section">
          <h4>📝 Additional Info (from About Page)</h4>
          <table className="data-table">
            <tbody>
              <tr><td><strong>Experience</strong></td><td>{aboutData.experience}</td></tr>
              <tr><td><strong>Message</strong></td><td>{aboutData.message || '—'}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="summary-section">
          <h4>🛒 Selected Service (from Services Page)</h4>
          <div className="selected-service-display">
            <span className="big-icon">{selectedService.icon}</span>
            <div>
              <h4>{selectedService.name}</h4>
              <p className="price">{selectedService.price}</p>
            </div>
          </div>
        </div>

        <div className="success-message">
          ✅ All data successfully passed through 4 pages using React Router!
        </div>

        <button className="btn btn-secondary" onClick={handleStartOver}>
          🔄 Start Over
        </button>
      </div>
    </div>
  );
}

export default Contact;
