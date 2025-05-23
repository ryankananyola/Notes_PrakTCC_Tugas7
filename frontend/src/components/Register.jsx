import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../utils';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/users/`, {
        name,
        email,
        gender,
        password,
        confPassword
      }, { withCredentials: true });

      navigate("/login");
    } catch (error) {
      alert("Registrasi gagal: " + (error.response?.data?.msg || error.message));
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h2 style={styles.title}>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Gender (Male/Female)"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Register</button>

        <p style={styles.loginText}>
          Sudah punya akun? <Link to="/login" style={styles.link}>Login sekarang</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#2c2c2c',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    color: '#fff',
    minWidth: '300px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #555',
    borderRadius: '5px',
    fontSize: '16px',
    backgroundColor: '#1e1e1e',
    color: '#fff'
  },
  button: {
    padding: '10px',
    backgroundColor: '#4caf50',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    color: '#fff',
    cursor: 'pointer',
    marginBottom: '10px'
  },
  loginText: {
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '14px'
  },
  link: {
    color: '#4caf50',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default Register;
