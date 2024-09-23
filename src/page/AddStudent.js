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

    // New state variables for bus details
    const [comesByBus, setComesByBus] = useState(false);
    const [busNumber, setBusNumber] = useState('');

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
            parentAddress,
            comesByBus, // Bus details
            busNumber
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
            setComesByBus(false);
            setBusNumber('');

            // Make the success message disappear after 5 seconds
            setTimeout(() => {
                setMessage('');
            }, 5000); // 5 seconds timeout

        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Add Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Left side for Student Details */}
                    <div className="col-md-6">
                        <h4 className="text-center mb-4">Student Details</h4>
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
                    </div>

                    {/* Right side for Parent Details with Bus Details integrated */}
                    <div className="col-md-6">
                        <h4 className="text-center mb-4">Parent Details</h4>
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

                        {/* Bus Details Section Integrated into Parent Details */}
                        <div className="form-group mb-3">
                            <label>Comes By Bus:</label>
                            <select
                                className="form-control"
                                value={comesByBus}
                                onChange={(e) => setComesByBus(e.target.value === 'true')}
                            >
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </select>
                        </div>
                        {comesByBus && (
                            <div className="form-group mb-3">
                                <label>Bus Number:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={busNumber}
                                    onChange={(e) => setBusNumber(e.target.value)}
                                    required={comesByBus}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Buttons in the center */}
                <div className="text-center mt-4 mb-5">
                    <button type="submit" className="btn btn-primary me-3">Submit</button>
                    <button className="btn btn-secondary" onClick={() => navigate('/home')}>
                        Back to Home
                    </button>
                </div>
            </form>

            {/* Display success or error messages */}
            {message && <p className="text-success text-center">{message}</p>}
            {error && <p className="text-danger text-center">{error}</p>}
        </div>
    );
};

export default AddStudent;
