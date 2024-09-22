// src/adminPage/CreateClass.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateClass = () => {
    const [className, setClassName] = useState('');
    const [fees, setFees] = useState('');
    const [totalStrength, setTotalStrength] = useState(0); // Default value set to 0
    const [totalPendingFee, setTotalPendingFee] = useState(0); // Default value set to 0
    const [updateClassName, setUpdateClassName] = useState('');
    const [updateFee, setUpdateFee] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreateClassSubmit = async (event) => {
        event.preventDefault();

        const classData = {
            className,
            fees,
            totalStrength: 0,
            totalPendingFee: 0,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/createClass`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(classData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            setMessage('Class Created Successfully');
            setError('');
            setClassName('');
            setFees('');

            // Clear messages after 3 seconds
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    const handleUpdateFeeSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_ADMIN_URL}/setClassFee?className=${updateClassName}&fee=${updateFee}`, {
                method: 'POST',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            setMessage('Class Fee Updated Successfully');
            setError('');
            setUpdateClassName('');
            setUpdateFee('');

            // Clear messages after 3 seconds
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Create Class</h2>
            <form onSubmit={handleCreateClassSubmit} className="mb-4">
                <div className="form-group mb-3">
                    <label>Class Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Fees:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={fees}
                        onChange={(e) => setFees(e.target.value)}
                        required
                    />
                </div>
                <div className="text-center d-flex justify-content-center mb-4">
                    <button type="submit" className="btn btn-success me-2">
                        Create Class
                    </button>
                    {/* <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
                        Back to Admin Home
                    </button> */}
                </div>

                {message && <p className="text-success text-center">{message}</p>}
                {error && <p className="text-danger text-center">{error}</p>}
            </form>

            <h2 className="mb-4 text-center">Update Class Fee</h2>
            <form onSubmit={handleUpdateFeeSubmit} className="mb-4">
                <div className="form-group mb-3">
                    <label>Class Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={updateClassName}
                        onChange={(e) => setUpdateClassName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>New Fee:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={updateFee}
                        onChange={(e) => setUpdateFee(e.target.value)}
                        required
                    />
                </div>

                <div className="text-center d-flex justify-content-center mb-4">
                    <button type="submit" className="btn btn-warning me-2">
                        Update Class Fee
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate('/admin-home')}>
                        Back to Admin Home
                    </button>
                </div>

                {message && <p className="text-success text-center mt-4">{message}</p>}
                {error && <p className="text-danger text-center mt-4">{error}</p>}
            </form>
        </div>
    );
};

export default CreateClass;
