// App.tsx
import React from 'react';
import styles from './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import { Route, Routes } from 'react-router-dom';
import ProjectsDashboard from './pages/Dashboard/Dashboard';
import KnowledgeBaseManagerWithMenu from './pages/KnowledgeBaseManager/KnowledgeBaseManager';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import ForgotPasswordPage from './pages/ForgotPassword/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { AdminRoute, ProtectedRoute } from './helpers/ProtectedRoute';
import AdminPanel from './pages/AdminPanel/AdminPanelPage';

const App = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='forgotpassword' element={<ForgotPasswordPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='dashboard' element={<ProjectsDashboard />} />
          <Route path='knowledge' element={<KnowledgeBaseManagerWithMenu />} />
          <Route path='project:id' element={<ProjectPage />} />
        </Route>
        {/* </Route> */}
        <Route path='*' element={<NotFoundPage />} />
        <Route element={<AdminRoute />}>
          <Route path='admin' element={<AdminPanel />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
