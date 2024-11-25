// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      setError(null); // Clear any previous errors
      
      // Optional: Store token in local storage or context for future requests
      localStorage.setItem('token', response.data.token);

      // Redirect user to another page after successful login if needed
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Display validation errors if available
        setError(error.response.data.errors.map((err) => err.msg).join(', '));
      } else if (error.response && error.response.data.msg) {
        // Display any specific error message from the backend
        setError(error.response.data.msg);
      } else {
        // Generic error message
        setError('An error occurred while logging in');
      }
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
