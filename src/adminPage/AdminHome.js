// src/adminPage/AdminHome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const navigate = useNavigate();

    const handleNavigateToStudents = () => {
        navigate('/home'); // Navigates to home page for students
    };

    const handleNavigateToStaff = () => {
        navigate('/staff-home'); // Navigates to staff page
    };

    const handleNavigateToCreateClass = () => {
        navigate('/createClass'); // Navigates to Create Class page
    };

    const handleLogout = () => {
        // Clear session storage
        sessionStorage.clear(); // Or specify keys if you want to clear specific ones
        navigate('/admin-login'); // Redirect to the login page
    };

    const handleCreateBus = () => {
        navigate('/add-bus');
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row w-100 justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body text-center">
                            <h2 className="mb-4">Admin Home</h2>
                            <div className="mb-3">
                                <button className="btn btn-primary w-100" onClick={handleNavigateToStudents}>
                                    Students
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-success w-100" onClick={handleNavigateToStaff}>
                                    Staff
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-secondary w-100" onClick={handleNavigateToCreateClass}>
                                    Create Class
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-success w-100" onClick={handleCreateBus}>
                                    Bus Details
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-danger w-100" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
