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
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/features">Features</Link>
          <Link to="/contact">Contact</Link>
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
