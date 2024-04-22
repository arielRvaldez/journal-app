import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/login', formData);
      console.log(response.data); // Handle successful login
      // Redirect to the journal entry page
      history.push('/journal-entry');
    } catch (error) {
      console.error(error); // Handle login error
    }
  };

  return (
    <div className="login-page">
      <div className="app-title">ZenPages</div>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <button type="submit">Login</button>
          {/* Include social login buttons if you have them in your original form */}
          <div className="social-login">
            <button className="social-button google">Sign in with Google</button>
            <button className="social-button github">Sign in with GitHub</button>
          </div>
          <div className="bottom-text">
            Dont have an account yet? <a href="/auth/register">Create one</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
