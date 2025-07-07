import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import ProjectsDashboard from './pages/Dashboard/Dashboard';
import KnowledgeBaseManagerWithMenu from './pages/KnowledgeBaseManager/KnowledgeBaseManager';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import ForgotPasswordPage from './pages/ForgotPassword/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { AdminRoute } from './helpers/AdminRoute';
import AdminRegisterPage from './pages/AdminRegisterPage/AdminRegisterPage';
import UsersListPage from './pages/UsersListPage/UsersListPage';
import { ProtectedRoute } from './helpers/ProtectedRoute';
import UserDetailsPage from './pages/UserDetailsPage/UserDetailsPage';
import AdminIndicesPage from './pages/AdminIndicesPage/AdminIndicesPage';

const App = () => {
  return (
    <Routes>
      {/* Публичные роуты */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />

      {/* Защищенные роуты для всех авторизованных */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<ProjectsDashboard />} />
        <Route path="/dashboard/users" element={<UsersListPage />} />
        {/* Маршрут для конкретного пользователя */}
        <Route path="/dashboard/users/:username" element={<UserDetailsPage />} />
        <Route path="/dashboard/register" element={<AdminRegisterPage />} />
        <Route path="/dashboard/indices" element={<AdminIndicesPage  />} />
        {/* <Route path="/knowledge" element={<KnowledgeBaseManagerWithMenu />} /> */}
        <Route path="/dashboard/project/:id" element={<ProjectPage />} />
        {/* <Route path="/project" element={<ProjectPage />} /> */}
      </Route>

      {/* Админские роуты */}
      <Route element={<AdminRoute />}>
        {/* <Route path="/admin" element={<AdminPanel />}> */}
        {/* <Route path="dashboard" element={<ProjectsDashboard />} />
          <Route path="dashboard/users" element={<UsersListPage />} /> */}
        {/* <Route path="register" element={<AdminRegisterPage />} /> */}
        {/* </Route> */}
      </Route>

      {/* Роут для 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;