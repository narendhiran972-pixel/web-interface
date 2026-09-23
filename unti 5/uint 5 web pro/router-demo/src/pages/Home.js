import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: 'React'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass data to About page using navigate state
    navigate('/about', { state: { userData: formData } });
  };

  return (
    <div className="page">
      <h1>🏠 Home Page</h1>
      <p className="subtitle">Enter your details — this data will be passed to the next pages!</p>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Select Course:</label>
          <select name="course" value={formData.course} onChange={handleChange}>
            <option value="React">React</option>
            <option value="Angular">Angular</option>
            <option value="Vue">Vue</option>
            <option value="Node.js">Node.js</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Go to About Page →
        </button>
      </form>
    </div>
  );
}

export default Home;
