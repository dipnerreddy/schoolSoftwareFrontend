import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BusPaymentReceipt = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const receiptData = location.state?.receiptData;

    const handlePrint = () => {
        window.print();
    };

    if (!receiptData) {
        return <p className="text-danger text-center">No payment data available.</p>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Bus Payment Receipt</h2>
            <div className="text-center mb-4">
                <img src="/logo.png" alt="School Logo" style={{ width: '150px' }} />
            </div>
            <div className="mb-4 card">
                <div className="card-body">
                    <p><strong>Student Name:</strong> {receiptData.studentName}</p>
                    <p><strong>Date and Time:</strong> {new Date().toLocaleString()}</p>
                    <p><strong>Mobile Number:</strong> {receiptData.mobileNumber}</p>
                    <p><strong>Class:</strong> {receiptData.className}</p>
                    <p><strong>Amount Paid:</strong> ₹{receiptData.amountPaid}</p>
                    <p><strong>Remaining Balance:</strong> ₹{receiptData.remainingBalance}</p>
                </div>
            </div>
            <button className="btn btn-primary" onClick={handlePrint}>Print Receipt</button>
            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={() => navigate('/home')}>Back to Home</button>
            </div>
        </div>
    );
};

export default BusPaymentReceipt;