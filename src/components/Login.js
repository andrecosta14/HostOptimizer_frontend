import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // LOCAL SERVER
      // const response = await axios.post('http://localhost:3000/api/v1/login', {
      // REMOTE SERVER
      const response = await axios.post('https://hostoptimizer.onrender.com/api/v1/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.userId);
      setSuccess('Login successful!');
      onLogin(); // Notify parent component about login
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred. Please try again.'
      );
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: "50px" }}><b>HostOptimizer</b></h1>
      <form onSubmit={handleLogin} style={styles.form}>
        {/* Input fields */}
        <div style={{ ...styles.inputGroup, marginBottom: "40px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup} >
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={{paddingTop: '20px', paddingBottom: '20px', width: '100%'}}>
        <button type="submit" style={styles.button}>
          LOGIN
        </button>
        </div>
        <p style={styles.linkText}>
          Don't have an account? <Link to="/register"><b>Register here</b></Link>
        </p>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
    </div>
  );
};


const styles = {
  linkText: {
    color: '#295095',
    textDecoration: 'none',
  },
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #375030',
    borderRadius: '8px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  input: {
    width: '95%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #375030',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '15px 15px',
    backgroundColor: '#375030',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginTop: '15px',
  },
  success: {
    color: 'green',
    marginTop: '15px',
  },
};

export default Login;
