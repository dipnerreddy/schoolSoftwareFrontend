// src/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
    // Assuming a placeholder for authentication check
    const isAuthenticated = false; // Set this to true if you have an auth check

    return (
        <Route
            {...rest}
            element={isAuthenticated ? element : <Navigate to="/" />}
        />
    );
};

export default PrivateRoute;
