import React from 'react';

// Header Component - displays title and subtitle passed as props
function Header({ title, subtitle }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

export default Header;
