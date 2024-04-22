import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <nav className="top-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/features">Features</Link>
        <div className="contact-dropdown">
          <button className="dropbtn">Contact</button>
          <div className="dropdown-content">
            <a href="mailto:contact@example.com">Email Us</a>
            <a href="/contact">Contact Page</a>
          </div>
        </div>
      </nav>

      <aside className="sidebar">
        <Link to="/go-pro">GO PRO</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/help">Help</Link>
      </aside>

      <main className="main-content">
        <h1>Welcome to My Journal App</h1>
        <p>If you already have an account, please <Link to="/login">login</Link>.</p>
        <p>If you are new here, you can <Link to="/signup">sign up</Link> for an account.</p>
        <Link to="/get-started" className="get-started-btn">Get Started</Link>
      </main>
    </div>
  );
}

export default LandingPage;
