// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    return isLoggedIn ? element : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
