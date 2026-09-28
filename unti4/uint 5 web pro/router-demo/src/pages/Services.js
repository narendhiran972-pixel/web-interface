import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const servicesList = [
  { id: 1, name: 'Web Development', icon: '🌐', price: '₹5,000' },
  { id: 2, name: 'App Development', icon: '📱', price: '₹8,000' },
  { id: 3, name: 'UI/UX Design', icon: '🎨', price: '₹4,000' },
  { id: 4, name: 'SEO Optimization', icon: '🔍', price: '₹3,000' },
];

function Services() {
  const location = useLocation();
  const navigate = useNavigate();

  // Receive data from About page
  const userData = location.state?.userData || { name: 'No data', email: 'No data', course: 'No data' };
  const aboutData = location.state?.aboutData || { experience: 'No data', message: 'No data' };

  const [selectedService, setSelectedService] = useState(null);

  const handleNext = () => {
    if (!selectedService) {
      alert('Please select a service!');
      return;
    }
    // Pass ALL collected data to Contact page
    navigate('/contact', {
      state: {
        userData: userData,
        aboutData: aboutData,
        selectedService: selectedService
      }
    });
  };

  return (
    <div className="page">
      <h1>⚙️ Services Page</h1>
      <p className="subtitle">All data collected so far + Pick a service!</p>

      <div className="data-card">
        <h3>📥 Data Collected So Far:</h3>
        <table className="data-table">
          <tbody>
            <tr><td><strong>Name</strong></td><td>{userData.name}</td></tr>
            <tr><td><strong>Email</strong></td><td>{userData.email}</td></tr>
            <tr><td><strong>Course</strong></td><td>{userData.course}</td></tr>
            <tr><td><strong>Experience</strong></td><td>{aboutData.experience}</td></tr>
            <tr><td><strong>Message</strong></td><td>{aboutData.message || '—'}</td></tr>
          </tbody>
        </table>
      </div>

      <div className="form-card">
        <h3>🛒 Select a Service:</h3>
        <div className="services-grid">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className={`service-card ${selectedService?.id === service.id ? 'selected' : ''}`}
              onClick={() => setSelectedService(service)}
            >
              <span className="service-icon">{service.icon}</span>
              <h4>{service.name}</h4>
              <p className="price">{service.price}</p>
            </div>
          ))}
        </div>

        <button className="btn btn-primary" onClick={handleNext}>
          Go to Contact Page →
        </button>
      </div>
    </div>
  );
}

export default Services;
