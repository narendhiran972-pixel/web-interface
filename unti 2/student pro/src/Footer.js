import React from 'react';

// Footer Component - displays a message at the bottom of the personal intro page
function Footer({ message }) {
  return (
    <footer className="footer">
      <p>{message} <span>♥</span></p>
      <p className="footer-sub">© {new Date().getFullYear()} · Personal Introduction Page · Built with React</p>
    </footer>
  );
}

export default Footer;
