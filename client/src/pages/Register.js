import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  // State variables to store form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLandlord, setIsLandlord] = useState(false);
  const [error, setError] = useState(null);

  // Define the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a POST request to the backend to register the user
      const response = await axios.post('http://localhost:5001/api/auth/register', {
        name,
        email,
        password,
        isLandlord,
      });
      
      console.log('Registration successful:', response.data);
      setError(null); // Clear any previous errors

      // Optional: You can redirect the user to another page or show a success message here

    } catch (error) {
      // If there are validation errors, display them
      if (error.response && error.response.data.errors) {
        setError(error.response.data.errors.map((err) => err.msg).join(', '));
      } else {
        // General error message
        setError('Registration failed');
      }
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
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
        <label>
          Landlord:
          <input type="checkbox" checked={isLandlord} onChange={(e) => setIsLandlord(e.target.checked)} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
