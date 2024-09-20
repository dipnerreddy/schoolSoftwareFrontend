import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddParent = () => {
    const [parentName, setParentName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            parentName,
            phoneNumber,
            address,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/addParent`, {
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

            setMessage('Parent added successfully!');
            setError('');
            // Clear fields after successful submission
            setParentName('');
            setPhoneNumber('');
            setAddress('');
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Add Parent</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group">
                    <label>Parent Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Parent</button>
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

export default AddParent;
