import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting login...");

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        console.log("Response status:", response.status);

        if (response.ok) {
            sessionStorage.setItem('isLoggedIn', 'true'); // Set session variable
            navigate('/home'); 
        } else {
            const errorMessage = await response.text();
            console.log("Error message:", errorMessage);
            setMessage(errorMessage || 'Login failed. Please check your credentials.');
        }
    };

    const handleAdminLogin = () => {
        navigate('/admin-login'); 
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row w-100 justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <img 
                                    src="/logo.png" 
                                    alt="Logo" 
                                    style={{ width: '150px' }}
                                />
                            </div>
                            <h2 className="text-center mb-4">Login</h2>
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
                                <button className="btn btn-link" onClick={handleAdminLogin}>
                                    Login as Administrator
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
