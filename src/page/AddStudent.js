import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const [parentId, setParentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [dob, setDob] = useState('');
    const [admissionYear, setAdmissionYear] = useState('');
    const [currentClass, setCurrentClass] = useState('');
    const [stillStudying, setStillStudying] = useState(true);
    const [gender, setGender] = useState('Male');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            parentId,
            studentName,
            dob,
            admissionYear,
            currentClass,
            stillStudying,
            gender,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/addStudent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            setMessage('Student added successfully!');
            setError('');
            // Clear fields after successful submission
            setParentId('');
            setStudentName('');
            setDob('');
            setAdmissionYear('');
            setCurrentClass('');
            setStillStudying(true);
            setGender('Male');
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Add Student</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group">
                    <label>Parent ID:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={parentId}
                        onChange={(e) => setParentId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Student Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Admission Year:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={admissionYear}
                        onChange={(e) => setAdmissionYear(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Current Class:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={currentClass}
                        onChange={(e) => setCurrentClass(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Still Studying:</label>
                    <select
                        className="form-control"
                        value={stillStudying}
                        onChange={(e) => setStillStudying(e.target.value === 'true')}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="form-group">
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
                <button type="submit" className="btn btn-primary">Add Student</button>
            </form>

            {/* Display success or error messages */}
            {message && <p className="text-success text-center">{message}</p>}
            {error && <p className="text-danger text-center">{error}</p>}

            {/* Back to Home Button */}
            <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={() => navigate('/home')}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default AddStudent;
