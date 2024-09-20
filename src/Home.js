// src/Home.js
import React from 'react';
import { useAuth } from './AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { logout } = useAuth(); // Get logout function
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Clear the authentication state
        navigate('/'); // Redirect to login page
    };

    return (
        <div>
            <h2>Welcome to the Home Page!</h2>
            <button onClick={handleLogout}>Logout</button> {/* Logout button */}
        </div>
    );
};

export default Home;
