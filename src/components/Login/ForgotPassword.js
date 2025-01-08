import React, { useState } from 'react';
import './ForgotPassword.css';
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }

    try {
      const response = await api.forgotPassword({ email });
      setMessage(response.message || 'If this email is registered, a reset link will be sent to it.');
    } catch (error) {
      setMessage('Failed to connect to the server!');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p className="message">{message}</p>}
      <a className='anchor' href="/">Back to Login</a>
    </div>
  );
}

export default ForgotPassword;