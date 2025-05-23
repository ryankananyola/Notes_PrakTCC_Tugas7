import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils'; // <-- tambahkan ini

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/users`, { // <-- gunakan BASE_URL
                name,
                email,
                password,
                confPassword
            }, { withCredentials: true }); // <-- jika backend pakai session
            navigate("/login");
        } catch (error) {
            alert("Registrasi gagal: " + (error.response?.data?.msg || error.message));
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" placeholder="Confirm Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
