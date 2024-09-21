import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
      // Optionally, clear session storage or any authentication tokens here
      navigate('/admin-login'); // Redirect to the login page
  };
  
  const handleGetAllStudents = () => {
    const className = prompt('Please enter the class name (e.g., 10, 9, 8, LKG):');
    
    if (className) {
      // Navigate to ClassDetails page with the entered className in the query parameter
      navigate(`/class-details?className=${className}`);
    } else {
      alert('Class name is required!');
    }
  };

  return (
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f0f8ff' }}>
          <h2 className="mb-4">Welcome to Radiant High School</h2>

          <div className="row w-100 justify-content-center">
              {/* Add Student Button */}
              <div className="col-md-4 mb-3 text-center">
                  <button
                      className="btn btn-outline-primary w-100"
                      style={{ display: 'block', height: '150px' }}
                      onClick={() => navigate('/add-student')}
                  >
                      <img
                          src="/logo.png" // Replace with the actual image path
                          alt="Add Student"
                          style={{ height: '80px', marginBottom: '10px' }}
                      />
                      <br />
                      <span style={{ fontWeight: 'bold' }}>Add Student</span>
                  </button>
              </div>

              {/* Add Parent Button */}
              <div className="col-md-4 mb-3 text-center">
                  <button
                      className="btn btn-outline-primary w-100"
                      style={{ display: 'block', height: '150px' }}
                      onClick={() => navigate('/add-parent')}
                  >
                      <img
                          src="/logo.png" // Replace with the actual image path
                          alt="Add Parent"
                          style={{ height: '80px', marginBottom: '10px' }}
                      />
                      <br />
                      <span style={{ fontWeight: 'bold' }}>Add Parent</span>
                  </button>
              </div>

              {/* Get All Students in Class */}
              <div className="col-md-4 mb-3 text-center">
                  <button
                      className="btn btn-outline-primary w-100"
                      style={{ display: 'block', height: '150px' }}
                      onClick={handleGetAllStudents}
                  >
                      <img
                          src="/logo.png" // Replace with the actual image path
                          alt="Collect Fee"
                          style={{ height: '80px', marginBottom: '10px' }}
                      />
                      <br />
                      <span style={{ fontWeight: 'bold' }}>Get All Students in Class</span>
                  </button>
              </div>

              {/* Check Balance Fee Button */}
              <div className="col-md-4 mb-3 text-center">
                  <button
                      className="btn btn-outline-primary w-100"
                      style={{ display: 'block', height: '150px' }}
                      onClick={() => navigate('/check-balance-fee')}
                  >
                      <img
                          src="/logo.png" // Replace with the actual image path
                          alt="Check Balance Fee"
                          style={{ height: '80px', marginBottom: '10px' }}
                      />
                      <br />
                      <span style={{ fontWeight: 'bold' }}>Check Balance Fee</span>
                  </button>
              </div>

              {/* Balance Fee Class Wise Button */}
              <div className="col-md-4 mb-3 text-center">
                  <button
                      className="btn btn-outline-primary w-100"
                      style={{ display: 'block', height: '150px' }}
                      onClick={() => navigate('/balance-fee-class-wise')}
                  >
                      <img
                          src="/logo.png" // Replace with the actual image path
                          alt="Balance Fee Class Wise"
                          style={{ height: '80px', marginBottom: '10px' }}
                      />
                      <br />
                      <span style={{ fontWeight: 'bold' }}>Balance Fee Class Wise</span>
                  </button>
              </div>

              {/* Update Student Status Button */}
              <div className="col-md-4 mb-3 text-center">
                  <button
                      className="btn btn-outline-primary w-100"
                      style={{ display: 'block', height: '150px' }}
                      onClick={() => navigate('/update-student-status')}
                  >
                      <img
                          src="/logo.png" // Replace with the actual image path
                          alt="Update Student Status"
                          style={{ height: '80px', marginBottom: '10px' }}
                      />
                      <br />
                      <span style={{ fontWeight: 'bold' }}>Update Student Status</span>
                  </button>
              </div>
          </div>

          {/* Logout Button */}
          <div className="mt-4">
              <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
              </button>
          </div>
      </div>
  );
};

export default StudentHome;
