import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBusDetails = () => {
    const [busNumber, setBusNumber] = useState('');
    const [busFee, setBusFee] = useState('');
    const [totalPendingFee, setTotalPendingFee] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);
    
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create the payload for the API
        const data = {
            busNumber,
            busFee: parseInt(busFee, 10), // Convert bus fee to number
            totalPendingFee: 0,
            totalStudents :0
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/addBusDetails`, {
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

            setMessage('Bus Details added successfully!');
            setError('');
            // Clear fields after successful submission
            setBusNumber('');
            setBusFee('');
            setTotalPendingFee(0);
            setTotalStudents(0);

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
            <h2 className="mb-4 text-center">Add Bus Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Bus Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={busNumber}
                        onChange={(e) => setBusNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Bus Fee:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={busFee}
                        onChange={(e) => setBusFee(e.target.value)}
                        required
                    />
                </div>
                {/* <div className="form-group mb-3">
                    <label>Total Pending Fee:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={totalPendingFee}
                        onChange={(e) => setTotalPendingFee(parseInt(e.target.value, 10))}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Total Students:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={totalStudents}
                        onChange={(e) => setTotalStudents(parseInt(e.target.value, 10))}
                    />
                </div> */}

                {/* Buttons in the center */}
                <div className="text-center mt-4 mb-5">
                    <button type="submit" className="btn btn-primary me-3">Submit</button>
                    <button className="btn btn-secondary" onClick={() => navigate('/admin-home')}>
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

export default AddBusDetails;
