import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">

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
