import React from 'react';

// Contact Component - displays contact details: phone, email, and GitHub
function Contact({ phone, email, github }) {
  return (
    <section className="card contact">
      <h2><span className="icon">📬</span> Contact</h2>
      <div className="contact-list">
        <a href={`tel:${phone}`} className="contact-item">
          <span className="contact-icon">📞</span>
          <div className="contact-info">
            <span className="contact-label">Phone</span>
            <span className="contact-value">{phone}</span>
          </div>
        </a>
        <a href={`mailto:${email}`} className="contact-item">
          <span className="contact-icon">✉️</span>
          <div className="contact-info">
            <span className="contact-label">Email</span>
            <span className="contact-value">{email}</span>
          </div>
        </a>
        <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer" className="contact-item">
          <span className="contact-icon">🐙</span>
          <div className="contact-info">
            <span className="contact-label">GitHub</span>
            <span className="contact-value">github.com/{github}</span>
          </div>
        </a>

      </div>
    </section>
  );
}

export default Contact;
