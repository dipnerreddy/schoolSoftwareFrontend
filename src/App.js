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
import Login from './Login'; // Assuming you have a login page

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/add-parent" element={<AddParent />} />
                <Route path="/collect-fee" element={<CollectFee />} />
                <Route path="/check-balance-fee" element={<CheckBalanceFee />} />
                <Route path="/balance-fee-class-wise" element={<BalanceFeeClassWise />} />
                <Route path="/update-student-status" element={<UpdateStudentStatus />} />
            </Routes>
        </Router>
    );
};

export default App;
