import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS for styling

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState('');

  // Toggle between login and signup
  const toggleSignup = () => {
    setIsSignup(!isSignup);
    setMessage(''); // Reset message on toggle
  };

  // Handle form submission (either login or signup)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? 'signup' : 'login';
    const url = `http://localhost:5000/api/${endpoint}`;

    try {
      const response = await axios.post(url, { username, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="app-container">
      <div className="background"></div>
      <div className="auth-form">
        <h1>{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
        <p>{isSignup ? 'Sign up to access awesome features!' : 'Login to your account'}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        </form>
        {message && <p className="message">{message}</p>}
        <button className="toggle-btn" onClick={toggleSignup}>
          {isSignup ? 'Already have an account? Login' : 'New here? Create Account'}
        </button>
      </div>
    </div>
  );
}

export default App;
