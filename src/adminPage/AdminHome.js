// src/adminPage/AdminHome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const navigate = useNavigate();

    const handleNavigateToStudents = () => {
        navigate('/student-home'); // Navigates to home page for students
    };

    const handleNavigateToStaff = () => {
        navigate('/staff'); // Navigates to staff page
    };

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
                                <button className="btn btn-secondary w-100" onClick={handleNavigateToStaff}>
                                    Staff
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
