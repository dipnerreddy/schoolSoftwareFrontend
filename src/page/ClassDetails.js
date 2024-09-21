import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ClassDetails = () => {
  const [students, setStudents] = useState([]);
  const [className, setClassName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation(); // To get any passed state or query parameters

  const fetchStudents = async (className) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/studentsByClass?className=${className}`);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Extract class name from URL or state
    const queryParams = new URLSearchParams(location.search);
    const classNameParam = queryParams.get('className') || '10'; // Default class is 10 if not provided
    setClassName(classNameParam);
    fetchStudents(classNameParam);
  }, [location]);

  const handlePrint = () => {
    window.print(); // Trigger print dialog
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Class Details - {className}</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Parent Phone Number</th>
            <th>Remaining Balance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.studentName}</td>
              <td>{student.parentPhoneNumber}</td>
              <td>{student.remainingBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Print Button */}
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handlePrint}>
          Print Class Details
        </button>
      </div>
    </div>
  );
};

export default ClassDetails;
