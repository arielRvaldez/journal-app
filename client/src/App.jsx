import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Import the LandingPage component
import Login from './components/Login';
import Signup from './components/SignUp';
import JournalEntry from './pages/JournalEntry';
import Home from './pages/Home';
//import Navbar from './components/Navbar';
//import Sidebar from './components/Sidebar';
// import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/journal-entry" component={JournalEntry} />
        <Route exact path="/landing" component={LandingPage} /> {/* Add the landing page route */}
        <Route exact path="/" component={Home} />
        <Redirect to="/landing" /> {/* Redirect to landing page by default */}
      </Switch>
    </Router>
  );
}

export default App;
