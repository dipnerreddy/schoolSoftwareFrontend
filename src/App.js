// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Home from './Home';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
