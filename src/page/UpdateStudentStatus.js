import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateStudentStatus = () => {
    const [studentName, setStudentName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [stillStudying, setStillStudying] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { studentName, phoneNumber, stillStudying };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/updateStudentStatus`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setMessage('Student status updated successfully.');
                setTimeout(() => {
                    navigate('/home'); // Redirect to home after successful update
                }, 2000);
            } else {
                const errorMessage = await response.text();
                setMessage(errorMessage || 'Error updating student status.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Update Student Status</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="studentName" className="form-label">Student Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="studentName"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="stillStudying" className="form-label">Is the student still studying?</label>
                    <select
                        className="form-select"
                        id="stillStudying"
                        value={stillStudying}
                        onChange={(e) => setStillStudying(e.target.value === 'true')}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Update Status</button>
            </form>
            {message && <p className="mt-3 text-center">{message}</p>}
            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={() => navigate('/home')}>Back to Home</button>
            </div>
        </div>
    );
};

export default UpdateStudentStatus;
