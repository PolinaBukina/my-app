// import { useAuthContext } from './authContext';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useEffect } from 'react';

// import { Navigate, Outlet } from "react-router-dom";
// import { useAuthContext } from "./authContext";

// export const ProtectedRoute = () => {
//     const { state, initializeAuth } = useAuthContext();

//     // Инициализируем проверку авторизации при монтировании
//     useEffect(() => {
//         initializeAuth();
//     }, [initializeAuth]);

//     if (!state.isAuthenticated) {
//         return <Navigate to="/" replace />;
//     }

//     return <Outlet />;
// };


// src/components/ProtectedRoute.tsx
import { useAuthContext } from '../helpers/authContext';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    const { state } = useAuthContext();

    if (!state.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export const AdminRoute = () => {
    const { state } = useAuthContext();

    if (!state.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!state.isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};