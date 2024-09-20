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
        const data = { parentName, phoneNumber, address };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/addParent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setMessage('Parent added successfully!');
                setError('');
                setParentName('');
                setPhoneNumber('');
                setAddress('');
            } else {
                const errorText = await response.text();
                setError(errorText || 'Error adding parent.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Add Parent</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group mb-3">
                    <label>Parent Name:</label>
                    <input type="text" className="form-control" value={parentName} onChange={(e) => setParentName(e.target.value)} required />
                </div>
                <div className="form-group mb-3">
                    <label>Phone Number:</label>
                    <input type="text" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
                <div className="form-group mb-3">
                    <label>Address:</label>
                    <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Add Parent</button>
            </form>
            {message && <p className="text-success text-center">{message}</p>}
            {error && <p className="text-danger text-center">{error}</p>}
            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={() => navigate('/home')}>Back to Home</button>
            </div>
        </div>
    );
};

export default AddParent;
