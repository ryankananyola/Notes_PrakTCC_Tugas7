import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../utils.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/login`, {
        email,
        password
      }, { withCredentials: true });

      localStorage.setItem("isLoggedIn", "true");
      navigate("/notes/");

    } catch (error) {
      alert("Login gagal: " + (error.response?.data?.msg || error.message));
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" style={styles.button}>Login</button>

        <p style={styles.registerText}>
          Belum punya akun? <Link to="/register" style={styles.link}>Daftar sekarang</Link>
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
    marginBottom: '20px',
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
  registerText: {
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '14px',
  },
  link: {
    color: '#4caf50',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default Login;
