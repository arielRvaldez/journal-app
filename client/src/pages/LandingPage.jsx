import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Welcome to My Journal App</h1>
      <p>If you already have an account, please <Link to="/login">login</Link>.</p>
      <p>If you're new here, you can <Link to="/signup">sign up</Link> for an account.</p>
    </div>
  );
}

export default LandingPage;
