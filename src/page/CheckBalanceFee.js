import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckBalance = () => {
    const [studentName, setStudentName] = useState('');
    const [currentClass, setCurrentClass] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [remainingBalance, setRemainingBalance] = useState(null);
    const [busRemainingBalance, setBusRemainingBalance] = useState(null); // New state for bus fee balance
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCheckFeeSubmit = async (event) => {
        event.preventDefault();
        const data = { studentName, currentClass, phoneNumber };
    
        try {
            // Call the first API for checking fee balance
            const feeResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/checkBalanceFee`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
    
            if (!feeResponse.ok) throw new Error('Failed to fetch fee balance');
            const feeResult = await feeResponse.json();
            setRemainingBalance(feeResult.remainingBalance);
    
            // Call the second API for checking bus fee balance
            const busData = { studentName, mobileNumber: phoneNumber }; // Structure for the bus fee API
            let busRemainingBalance = null;
    
            try {
                const busResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/checkBusFee`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(busData),
                });
    
                if (!busResponse.ok) {
                    console.warn('Bus Student Not Found');
                } else {
                    const busResult = await busResponse.json();
                    busRemainingBalance = busResult.remainingBalance;
                }
            } catch (busError) {
                console.warn('Error checking bus fee:', busError);
            }
    
            // Set bus remaining balance (either the result or null if no bus student found)
            setBusRemainingBalance(busRemainingBalance);
    
            // Clear any previous error
            setError('');
    
            // Store fee data for later usage
            sessionStorage.setItem('feePaymentData', JSON.stringify({
                studentName,
                currentClass,
                phoneNumber,
                remainingBalance: feeResult.remainingBalance,
                busRemainingBalance: busRemainingBalance, // Can be null if no bus student
            }));
        } catch (err) {
            setError(err.message);
            setRemainingBalance(null);
            setBusRemainingBalance(null); // Reset bus balance in case of error
        }
    };
    

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Collect Fees</h2>
            <form onSubmit={handleCheckFeeSubmit} className="mb-4">
                <div className="form-group mb-3">
                    <label>Student Name:</label>
                    <input type="text" className="form-control" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
                </div>
                <div className="form-group mb-3">
                    <label>Current Class:</label>
                    <input type="text" className="form-control" value={currentClass} onChange={(e) => setCurrentClass(e.target.value)} required />
                </div>
                <div className="form-group mb-3">
                    <label>Phone Number:</label>
                    <input type="text" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Check Balance</button>
            </form>

            {error && <p className="text-danger text-center">{error}</p>}
            {remainingBalance !== null && <p className="text-center">Remaining Balance: {remainingBalance}</p>}
            {busRemainingBalance !== null && <p className="text-center">Bus Remaining Balance: {busRemainingBalance}</p>}

            {remainingBalance !== null && (
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={() => navigate('/collect-fee')}>Pay Fee</button>
                </div>
            )}

            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={() => navigate('/home')}>Back to Home</button>
            </div>
        </div>
    );
};

export default CheckBalance;