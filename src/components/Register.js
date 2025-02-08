import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users`, {
        name,
        email,
        password,
        age,
        role,
      });

      setSuccess('Registration successful! You can now log in.');
      setName('');
      setEmail('');
      setPassword('');
      setAge('');
      setRole('user');
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred. Please try again.'
      );
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: "30px" }}><b>REGISTER</b></h1>
      <form onSubmit={handleRegister} style={styles.form}>
        <div style={{ ...styles.inputGroup, marginBottom: "20px" }}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={{ ...styles.inputGroup, marginBottom: "20px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={{ ...styles.inputGroup, marginBottom: "20px" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={{ ...styles.inputGroup, marginBottom: "20px" }}>
          <label>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={{ ...styles.inputGroup, marginBottom: "20px" }}>
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.inputSelect}
            required
          >
            <option value="user">User</option>
            <option value="proprietario">Owner</option>
          </select>
        </div>
        <div style={{paddingTop: '20px', paddingBottom: '20px', width: '100%'}}>
          <button type="submit" style={styles.button}>
            REGISTER
          </button>
        </div>
        <p style={styles.linkText}>
          Already have an account? <Link to="/login"><b>Login here</b></Link>
        </p>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
    </div>
  );
};

const styles = {
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
  inputSelect: {
    width: '100%',
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

export default Register;
