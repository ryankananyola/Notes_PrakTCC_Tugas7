import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils'; // <-- tambahkan ini

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/login`, {  // <-- gunakan BASE_URL
                email,
                password
            }, { withCredentials: true }); // <-- jika backend pakai cookie/session
            navigate("/");
        } catch (error) {
            alert("Login gagal: " + (error.response?.data?.msg || error.message));
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
