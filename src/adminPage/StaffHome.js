// src/adminPage/StaffHome.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffHome = () => {
    const [workerName, setWorkerName] = useState('');
    const [dob, setDob] = useState('');
    const [yearJoined, setYearJoined] = useState('');
    const [workerNumber, setWorkerNumber] = useState('');
    const [stillWorking, setStillWorking] = useState(true);
    const [gender, setGender] = useState('');
    const [salary, setSalary] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const workerData = {
            workerName,
            dob: dob ? new Date(dob).toISOString().split('T')[0] : null,
            yearJoined,
            workerNumber,
            stillWorking: true,
            gender,
            salary,
            address,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_ADMIN_URL}/addWorker`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(workerData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            setMessage('Worker added successfully.');
            setError('');
            // Reset form fields
            setWorkerName('');
            setDob('');
            setYearJoined('');
            setWorkerNumber('');
            setStillWorking(true);
            setGender('');
            setSalary('');
            setAddress('');
            // Clear message after 3 seconds
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Add Staff</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group mb-3">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={workerName}
                        onChange={(e) => setWorkerName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Year Joined:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={yearJoined}
                        onChange={(e) => setYearJoined(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={workerNumber}
                        onChange={(e) => setWorkerNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Gender:</label>
                    <select
                        className="form-control"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label>Salary:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="text-center d-flex justify-content-center mb-4">
                    <button type="submit" className="btn btn-success me-3">
                        Add Staff
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate('/admin-home')}>
                        Back to Admin Home
                    </button>
                </div>

                {message && <p className="text-success text-center mt-4">{message}</p>}
                {error && <p className="text-danger text-center mt-4">{error}</p>}
            </form>
        </div>
    );
};

export default StaffHome;
