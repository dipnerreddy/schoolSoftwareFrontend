import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CollectFee = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [amountPaying, setAmountPaying] = useState(0);
    const [remainingBalance, setRemainingBalance] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const paymentData = location.state?.paymentData || JSON.parse(sessionStorage.getItem('feePaymentData'));

    useEffect(() => {
        if (!paymentData) navigate('/check-balance');
    }, [paymentData, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { ...paymentData, amountPaying };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/collectFee`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const result = await response.json();
            setMessage('Payment collected successfully!');
            setError('');
            setRemainingBalance(result.remainingBalance);

            const receiptData = {
                studentName: paymentData.studentName,
                date: new Date().toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                mobileNumber: paymentData.phoneNumber,
                className: paymentData.currentClass,
                amountPaid: amountPaying,
                remainingBalance: result.remainingBalance,
            };

            navigate('/payment-receipt', { state: { receiptData } });
            sessionStorage.removeItem('feePaymentData');
        } catch (err) {
            console.error(err);
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Collect Fee</h2>
            {paymentData && (
                <div className="mb-4 text-center">
                    <p><strong>Student Name:</strong> {paymentData.studentName}</p>
                    <p><strong>Current Class:</strong> {paymentData.currentClass}</p>
                    <p><strong>Phone Number:</strong> {paymentData.phoneNumber}</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Amount Paying:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amountPaying}
                        onChange={(e) => setAmountPaying(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit Payment</button>
            </form>

            {remainingBalance !== null && (
                <p className="text-center mt-4">
                    <strong>Remaining Balance:</strong> {remainingBalance}
                </p>
            )}

            {message && <p className="text-success text-center">{message}</p>}
            {error && <p className="text-danger text-center">{error}</p>}
        </div>
    );
};

export default CollectFee;
