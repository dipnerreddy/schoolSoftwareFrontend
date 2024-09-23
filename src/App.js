// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddStudent from './page/AddStudent';
import AddParent from './page/AddParent';
import CollectFee from './page/CollectFee';
import CheckBalanceFee from './page/CheckBalanceFee';
import BalanceFeeClassWise from './page/BalanceFeeClassWise';
import UpdateStudentStatus from './page/UpdateStudentStatus';
import PaymentReceipt from './page/PaymentReceipt';
import Login from './Login'; // Assuming you have a login page
import AdminLogin from './adminPage/AdminLogin';
import AdminHome from './adminPage/AdminHome';
import StudentHome from './adminPage/StudentHome';
import StaffHome from './adminPage/StaffHome';
import ClassDetails from './page/ClassDetails';
import CreateClass from './adminPage/CreateClass';
import PrivateRoute from './PrivateRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                
                {/* Protected Routes */}
                <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                <Route path="/add-student" element={<PrivateRoute element={<AddStudent />} />} />
                <Route path="/add-parent" element={<PrivateRoute element={<AddParent />} />} />
                <Route path="/collect-fee" element={<PrivateRoute element={<CollectFee />} />} />
                <Route path="/check-balance-fee" element={<PrivateRoute element={<CheckBalanceFee />} />} />
                <Route path="/balance-fee-class-wise" element={<PrivateRoute element={<BalanceFeeClassWise />} />} />
                <Route path="/update-student-status" element={<PrivateRoute element={<UpdateStudentStatus />} />} />
                <Route path="/payment-receipt" element={<PrivateRoute element={<PaymentReceipt />} />} />
                
                {/* Unprotected Routes */}
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/student-home" element={<PrivateRoute element={<StudentHome />} />} />
                <Route path="/class-details" element={<PrivateRoute element={<ClassDetails />} />} />

                {/* Protected Admin Routes */}
                <Route path="/admin-home" element={<PrivateRoute element={<AdminHome />} />} />
                <Route path="/createClass" element={<PrivateRoute element={<CreateClass />} />} />
                <Route path="/staff-home" element={<PrivateRoute element={<StaffHome />} />} />
            </Routes>
        </Router>
    );
};

export default App;
