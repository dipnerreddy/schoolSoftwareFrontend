import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CollectFee = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [amountPaying, setAmountPaying] = useState(0);
    const [remainingBalance, setRemainingBalance] = useState(null);
    const [displayedBalance, setDisplayedBalance] = useState(null);
    const [paymentMode, setPaymentMode] = useState('cash'); // New state for payment mode
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const paymentData = location.state?.paymentData || JSON.parse(sessionStorage.getItem('feePaymentData'));

    useEffect(() => {
        if (!paymentData) navigate('/check-balance');
        else setRemainingBalance(paymentData.remainingBalance); // Assuming you have this data
    }, [paymentData, navigate]);

    const handleAmountChange = (e) => {
        const amount = parseFloat(e.target.value);
        setAmountPaying(amount);
        if (remainingBalance !== null) {
            setDisplayedBalance(remainingBalance - amount); // Calculate displayed balance
        }
    };

    const handlePaymentModeChange = (e) => {
        setPaymentMode(e.target.value); // Update payment mode
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { ...paymentData, amountPaying, paymentMode }; // Include payment mode in data
    
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
            setDisplayedBalance(result.remainingBalance); // Update displayed balance after successful payment
    
            // Create receiptData object here
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
                paymentMode, // Include payment mode in receipt data
            };
    
            // Construct WhatsApp message based on remaining balance
            let message;
            if (result.remainingBalance === 0) {
                message = `Dear Parent,\n \nyour payment of ₹${amountPaying} has been successfully collected for ${paymentData.studentName} studying in ${paymentData.currentClass}th Class. \n \nAll fees have been cleared for this Academic year. \n \nThank you for your timely payment! \n \nRegards \nRadiant High School, \nNunna`;
            } else {
                message = `Dear Parent,\n \nyour payment of ₹${amountPaying} has been successfully collected for ${paymentData.studentName} studying in ${paymentData.currentClass}th Class via ${paymentMode}. \n \nRemaining balance is ₹${result.remainingBalance}.\n \nRegards \nRadiant High School, \nNunna`;
            }
    
            const phoneNumber = paymentData.phoneNumber.replace(/[^0-9]/g, ''); // Ensure phone number is clean
            const whatsappLink = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`;
    
            // Open the WhatsApp link in a new tab
            window.open(whatsappLink, '_blank');
    
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
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td className="text-start"><strong>Student Name:</strong></td>
                                <td className="text-start">{paymentData.studentName}</td>
                            </tr>
                            <tr>
                                <td className="text-start"><strong>Class:</strong></td>
                                <td className="text-start">{paymentData.currentClass}</td>
                            </tr>
                            <tr>
                                <td className="text-start"><strong>Phone Number:</strong></td>
                                <td className="text-start">{paymentData.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td className="text-start"><strong>Balance:</strong></td>
                                <td className="text-start">₹{paymentData.remainingBalance}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            )}
            <div className="form-group mb-3">
                    <label>Mode of Payment:</label>
                    <select
                        className="form-control"
                        value={paymentMode}
                        onChange={handlePaymentModeChange}
                        required
                    >
                        <option value="cash">Cash</option>
                        <option value="upi">UPI</option>
                        <option value="card">Card</option>
                    </select>
                </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Amount Paying:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amountPaying}
                        onChange={handleAmountChange}
                        required
                    />
                </div>
                
                {displayedBalance !== null && (
                    <p className="text-center">
                        <strong>Remaining Balance After Payment:</strong> ₹{displayedBalance.toFixed(2)}
                    </p>
                )}
                <button type="submit" className="btn btn-primary btn-block">Submit Payment</button>
            </form>

            {message && <p className="text-success text-center">{message}</p>}
            {error && <p className="text-danger text-center">{error}</p>}
        </div>
    );
};

export default CollectFee;
