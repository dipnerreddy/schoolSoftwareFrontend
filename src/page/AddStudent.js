import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    // Student and parent state variables
    const [studentName, setStudentName] = useState('');
    const [dob, setDob] = useState('');
    const [admissionYear, setAdmissionYear] = useState('');
    const [currentClass, setCurrentClass] = useState('');
    const [stillStudying, setStillStudying] = useState(true);
    const [gender, setGender] = useState('Male');

    const [parentName, setParentName] = useState('');
    const [parentPhoneNumber, setParentPhoneNumber] = useState('');
    const [parentAddress, setParentAddress] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create the payload for the API
        const data = {
            studentName,
            dob,
            admissionYear,
            currentClass,
            stillStudying,
            gender,
            parentName,  // Parent details
            parentPhoneNumber,
            parentAddress
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/addStudentWithParent`, {
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

            setMessage('Student and Parent added successfully!');
            setError('');
            // Clear fields after successful submission
            setStudentName('');
            setDob('');
            setAdmissionYear('');
            setCurrentClass('');
            setStillStudying(true);
            setGender('Male');
            setParentName('');
            setParentPhoneNumber('');
            setParentAddress('');
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Add Student and Parent</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                {/* Student Details */}
                <div className="form-group mb-3">
                    <label>Student Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
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
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Admission Year:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={admissionYear}
                        onChange={(e) => setAdmissionYear(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Current Class:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={currentClass}
                        onChange={(e) => setCurrentClass(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
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

                {/* Parent Details */}
                <h3 className="mb-4 text-center">Parent Details</h3>
                <div className="form-group mb-3">
                    <label>Parent Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Parent Phone Number:</label>
                    <input
                        type="tel"
                        className="form-control"
                        value={parentPhoneNumber}
                        onChange={(e) => setParentPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Parent Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={parentAddress}
                        onChange={(e) => setParentAddress(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Add Student and Parent</button>
            </form>

            {/* Display success or error messages */}
            {message && <p className="text-success text-center">{message}</p>}
            {error && <p className="text-danger text-center">{error}</p>}

            {/* Back to Home Button */}
            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={() => navigate('/home')}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default AddStudent;
