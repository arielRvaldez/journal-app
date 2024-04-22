import React from 'react';
import './Navbar.css'; // Tell Webpack that Navbar.js uses these styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-item">Home</div>
      <div className="nav-brand">Journal App</div>
      <div className="nav-actions">
      <button className="go-pro-button">Go PRO</button>
      <div className="nav-dropdown">
        <button className="user-name-button">
         USER <span className="nav-arrow">▼</span>
         <div className="dropdown-content">
          <a href="#profile">Profile</a>
          <a href="#settings">Settings</a>
          <a href="#logout">Logout</a>
        </div>
        </button>
        </div>
        </div>
    </nav>
  );
};

export default Navbar;