// src/BalanceFeeClassWise.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BalanceFeeClassWise = () => {
    const [balances, setBalances] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate for navigation

    // Fetch class balances when the component mounts
    useEffect(() => {
        const fetchClassBalances = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/classBalances`);

                if (!response.ok) {
                    throw new Error('Failed to fetch class balances');
                }

                const data = await response.json();
                setBalances(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchClassBalances();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Balance Fee Class Wise</h2>

            {/* Display error if any */}
            {error && <p className="text-danger text-center">{error}</p>}

            {/* Display the table with class balance data */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Class Name</th>
                        <th scope="col">Remaining Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {balances.length > 0 ? (
                        balances.map((item, index) => (
                            <tr key={index}>
                                <td>{item.className}</td>
                                <td>{item.remainingBalance}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Back to Home Button */}
            <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={() => navigate('/home')}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default BalanceFeeClassWise;
