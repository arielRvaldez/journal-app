import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Import the LandingPage component
import Login from './components/Login';
import Signup from './components/SignUp';
import JournalEntry from './pages/JournalEntry';
import Home from './pages/Home';
import './App.css';
import myImage from './assets/app.png';
//import Navbar from './components/Navbar';
//import Sidebar from './components/Sidebar';
// import Layout from './components/Layout';

function App() {
  const [showContactDropdown, setShowContactDropdown] = useState(false);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/features">Features</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
          <div className="contact-dropdown" onMouseEnter={() => setShowContactDropdown(true)} onMouseLeave={() => setShowContactDropdown(false)}>
            <button className="dropbtn">Contact</button>
            {showContactDropdown && (
              <div className="dropdown-content">
                <a href="#name1">Name 1</a>
                <a href="#name2">Name 2</a>
                <a href="#name3">Name 3</a>
                <a href="#name4">Name 4</a>
                <a href="#name5">Name 5</a>
              </div>
            )}
          </div>
        </nav>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/journal-entry" component={JournalEntry} />
        <Route exact path="/landing" component={LandingPage} /> {/* Add the landing page route */}
        <Route exact path="/" component={Home} />
        <Redirect to="/landing" /> {/* Redirect to landing page by default */}
      </Switch>
      </div>
    </Router>
  );
}

export default App;
