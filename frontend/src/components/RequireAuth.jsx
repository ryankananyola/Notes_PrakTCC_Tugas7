import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default RequireAuth;
