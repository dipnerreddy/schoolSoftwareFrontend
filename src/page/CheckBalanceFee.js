import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckBalance = () => {
    const [studentName, setStudentName] = useState('');
    const [currentClass, setCurrentClass] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [remainingBalance, setRemainingBalance] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            studentName,
            currentClass,
            phoneNumber,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/checkBalanceFee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch balance');
            }

            const result = await response.json();
            setRemainingBalance(result.remainingBalance);
            setError('');

            // Store all necessary data in session storage
            sessionStorage.setItem('feePaymentData', JSON.stringify({
                studentName,
                currentClass,
                phoneNumber,
                remainingBalance: result.remainingBalance, // Store remaining balance
            }));
        } catch (err) {
            setError(err.message);
            setRemainingBalance(null);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Check Student Balance</h2>

            <form onSubmit={handleSubmit} className="mb-4">
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
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Check Balance</button>
            </form>

            {/* Display balance or error message */}
            {error && <p className="text-danger text-center">{error}</p>}
            {remainingBalance !== null && (
                <p className="text-center">Remaining Balance: {remainingBalance}</p>
            )}

            {/* Pay Fee Button */}
            {remainingBalance !== null && (
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={() => navigate('/collect-fee')}>
                        Pay Fee
                    </button>
                </div>
            )}

            {/* Back to Home Button */}
            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={() => navigate('/home')}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default CheckBalance;
