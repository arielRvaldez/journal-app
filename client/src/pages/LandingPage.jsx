import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './LandingPage.css';

function LandingPage() {
  return (
    <>
      <div className="bg-image">
    <div className="bg-overlay"></div>
    <div className="content-container">
      <nav className="navbar">
        {/* Navigation links */}
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/features">Features</Link>
        <Link className="contact-dropdown" to="/contact">Contact</Link>
        {/* Dropdown menu for Contact */}
        <div className="contact-dropdown-content">
          <a href="mailto:email1@example.com">email1@example.com</a>
          <a href="mailto:email2@example.com">email2@example.com</a>
          <a href="mailto:email3@example.com">email3@example.com</a>
          <a href="mailto:email4@example.com">email4@example.com</a>
        </div>
      </nav>

      <div className="sidebar">
        {/* Sidebar links or content */}
        <Link to="/go-pro">GO PRO</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/help">Help</Link>
        {/* Additional sidebar content */}
      </div>

      <div className="landing-page content-container">
        <h1 className="title">Welcome to My Journal App</h1>
        <p className="tagline">If you already have an account, please <Link to="/login">login</Link>.</p>
        <p className="tagline">If you're new here, you can <Link to="/signup">sign up</Link> for an account.</p>
        <button className="cta-button">Get Started</button>
      </div>
    </div>
  </div>

  <section className="company-section">
    <div className="section-dark">
      <h2 className="section-title">About Our Company</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      {/* Include more paragraphs or bullet points about company values, history, mission, etc. */}
    </div>
  </section>
</>
  );
}

export default LandingPage;
