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


import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, useAuthCheck } from './authContext';

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuthCheck();
    const location = useLocation();

    if (isLoading) {
        return <div>Загрузка...</div>; // Или спиннер
    }

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

// export const ProtectedRoute = () => {
//     const { state } = useAuth();
//     const location = useLocation();

//     // if (!state.isAuthenticated) {
//     //     return <Navigate to="/" state={{ from: location }} replace />;
//     // }

//     // Дополнительная проверка для админских маршрутов
//     if (location.pathname.startsWith('/admin') && state.user?.role !== 'admin') {
//         return <Navigate to="/" replace />;
//     }

//     return <Outlet />;
// };