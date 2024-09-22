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
import AdminHome  from './adminPage/AdminHome';
import StudentHome from './adminPage/StudentHome';
import StaffHome from './adminPage/StaffHome';
import ClassDetails from './page/ClassDetails';
import CreateClass from './adminPage/CreateClass';

// import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/add-parent" element={<AddParent />} />
                <Route path="/collect-fee" element={<CollectFee />} />
                <Route path="/check-balance-fee" element={<CheckBalanceFee />} />
                <Route path="/balance-fee-class-wise" element={<BalanceFeeClassWise />} />
                <Route path="/update-student-status" element={<UpdateStudentStatus />} />
                <Route path="/payment-receipt" element={<PaymentReceipt />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-home" element={<AdminHome />} />
                <Route path="/student-home" element={<StudentHome />} />  {/* Students Page */}
                <Route path="/staff" element={<StaffHome />} /> {/* Staff Page */}
                <Route path="/class-details" element={<ClassDetails />} /> 
                <Route path="/createClass" element={<CreateClass />} /> 
                
            </Routes>
        </Router>
    );
};

export default App;
