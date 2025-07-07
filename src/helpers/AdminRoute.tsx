import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthCheck } from './authContext';

export const AdminRoute = () => {
    const { isAuthenticated, isAdmin, isLoading } = useAuthCheck();
    const location = useLocation();

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};