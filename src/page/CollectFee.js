import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CollectFee = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [amountPaying, setAmountPaying] = useState(0);
    const [busAmountPaying, setBusAmountPaying] = useState(0);
    const [remainingBalance, setRemainingBalance] = useState(null);
    const [busRemainingBalance, setBusRemainingBalance] = useState(null);
    const [displayedBalance, setDisplayedBalance] = useState(null);
    const [displayedBusBalance, setDisplayedBusBalance] = useState(null);
    const [paymentMode, setPaymentMode] = useState('cash');
    const [message, setMessage] = useState('');
    const [busMessage, setBusMessage] = useState('');
    const [error, setError] = useState('');
    const [busError, setBusError] = useState('');

    const paymentData = location.state?.paymentData || JSON.parse(sessionStorage.getItem('feePaymentData'));

    useEffect(() => {
        if (!paymentData) navigate('/check-balance');
        else {
            setRemainingBalance(paymentData.remainingBalance);
            setBusRemainingBalance(paymentData.busRemainingBalance);
        }
    }, [paymentData, navigate]);

    const handleAmountChange = (e) => {
        const amount = parseFloat(e.target.value);
        setAmountPaying(amount);
        if (remainingBalance !== null) {
            setDisplayedBalance(remainingBalance - amount);
        }
    };

    const handleBusAmountChange = (e) => {
        const amount = parseFloat(e.target.value);
        setBusAmountPaying(amount);
        if (busRemainingBalance !== null) {
            setDisplayedBusBalance(busRemainingBalance - amount);
        }
    };

    const handlePaymentModeChange = (e) => {
        setPaymentMode(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { ...paymentData, amountPaying, paymentMode };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/collectFee`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error(await response.text());

            const result = await response.json();
            setMessage('Payment collected successfully!');
            setError('');
            setRemainingBalance(result.remainingBalance);
            setDisplayedBalance(result.remainingBalance);

            const receiptData = {
                studentName: paymentData.studentName,
                date: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                mobileNumber: paymentData.phoneNumber,
                className: paymentData.currentClass,
                amountPaid: amountPaying,
                remainingBalance: result.remainingBalance,
                paymentMode,
            };

            const phoneNumber = paymentData.phoneNumber.replace(/[^0-9]/g, '');
            const whatsappMessage = `Dear Parent,\n\nYour payment of ₹${amountPaying} for ${paymentData.studentName} has been collected. Remaining balance: ₹${result.remainingBalance}.\n\nRegards,\nRadiant High School.`;
            const whatsappLink = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappLink, '_blank');

            navigate('/payment-receipt', { state: { receiptData } });
            sessionStorage.removeItem('feePaymentData');
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    const handleBusSubmit = async (event) => {
        event.preventDefault();
        const busData = {
            studentName: paymentData.studentName,
            mobileNumber: paymentData.phoneNumber,
            amountPaying: busAmountPaying,
            paymentMode,
        };
    
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/collectBusFee`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(busData),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
    
            const result = await response.json();
            setBusMessage('Bus payment collected successfully!');
            setBusError('');
            setBusRemainingBalance(result.remainingBalance); // Ensure this is set correctly
            setDisplayedBusBalance(result.remainingBalance);
    
            // WhatsApp message and redirection
            const receiptData = {
                studentName: paymentData.studentName,
                mobileNumber: paymentData.phoneNumber,
                amountPaid: busAmountPaying,
                remainingBalance: result.remainingBalance, // Ensure this value is correct
                className: paymentData.currentClass,
            };
    
            const phoneNumber = paymentData.phoneNumber.replace(/[^0-9]/g, '');
            const whatsappMessage = `Dear Parent,\n\nYour bus payment of ₹${busAmountPaying} for ${paymentData.studentName} has been collected towards Bus Fees. Remaining Bus balance: ₹${result.remainingBalance}.\n\nRegards,\nRadiant High School.`;
            const whatsappLink = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappLink, '_blank');
    
            // Navigate to BusPaymentReceipt with relevant data
            navigate('/bus-payment-receipt', { state: { receiptData } }); // Check here
        } catch (err) {
            setBusError(err.message);
            setBusMessage('');
        }
    };
    
    
    

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Collect Fee</h2>
            <div className="row">
                {/* Left Column: School Fee Collection */}
                <div className="col-md-6">
                    <h3 className="text-center">School Fee Collection</h3>
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
                                        <td className="text-start"><strong>School Fee Balance:</strong></td>
                                        <td className="text-start">₹{remainingBalance?.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-start"><strong>Bus Fee Balance:</strong></td>
                                        <td className="text-start">₹{busRemainingBalance?.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="form-group mb-3">
                        <label>Mode of Payment:</label>
                        <select className="form-control" value={paymentMode} onChange={handlePaymentModeChange} required>
                            <option value="cash">Cash</option>
                            <option value="upi">UPI</option>
                            <option value="card">Card</option>
                        </select>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label>Amount Paying (School Fee):</label>
                            <input type="number" className="form-control" value={amountPaying} onChange={handleAmountChange} required />
                        </div>
                        {displayedBalance !== null && (
                            <p className="text-center">
                                <strong>Remaining School Balance After Payment:</strong> ₹{displayedBalance?.toFixed(2)}
                            </p>
                        )}
                        <button type="submit" className="btn btn-primary btn-block">Submit School Fee</button>
                    </form>
                    {message && <p className="text-success text-center">{message}</p>}
                    {error && <p className="text-danger text-center">{error}</p>}
                </div>

                {/* Right Column: Bus Fee Collection */}
                <div className="col-md-6">
                    <h3 className="text-center">Bus Fee Collection</h3>
                    <form onSubmit={handleBusSubmit}>
                        <div className="form-group mb-3">
                            <label>Amount Paying (Bus Fee):</label>
                            <input type="number" className="form-control" value={busAmountPaying} onChange={handleBusAmountChange} required />
                        </div>
                        {displayedBusBalance !== null && (
                            <p className="text-center">
                                <strong>Remaining Bus Balance After Payment:</strong> ₹{displayedBusBalance?.toFixed(2)}
                            </p>
                        )}
                        <button type="submit" className="btn btn-primary btn-block">Submit Bus Fee</button>
                    </form>
                    {busMessage && <p className="text-success text-center">{busMessage}</p>}
                    {busError && <p className="text-danger text-center">{busError}</p>}
                </div>
            </div>
        </div>
    );
};

export default CollectFee;