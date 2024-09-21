import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the import path as needed

const AdminLogin = () => {
    const { login } = useAuth(); // Get login function from context
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('Admin URL:', process.env.REACT_APP_ADMIN_URL);
        console.log('Submitting to:', `${process.env.REACT_APP_ADMIN_URL}/superLogin`);

        // Fetch code here
        const response = await fetch(`${process.env.REACT_APP_ADMIN_URL}/superLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            login(); // Set the authentication state
            navigate('/admin-home'); // Redirect to AdminHome on success
        } else {
            const errorMessage = await response.text();
            setMessage(errorMessage || 'Login failed. Please check your credentials.');
        }
    };

    const handleUserLogin = () => {
        navigate('/login'); // Adjust the path to your user login page
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row w-100 justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <img 
                                    src="/logo.png" // Path to the image file
                                    alt="Logo" 
                                    style={{ width: '150px' }} // Adjust the width as needed
                                />
                            </div>
                            <h2 className="text-center mb-4">Admin Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                            {message && <p className="text-danger mt-3 text-center">{message}</p>}
                            
                            <div className="text-center mt-3">
                                <button className="btn btn-link" onClick={handleUserLogin}>
                                    Login as User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
