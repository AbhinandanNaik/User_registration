// frontend/src/App.tsx (Modified)

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage'; 
import DashboardPage from './features/dashboard/DashboardPage'; 
import AuthGuard from './components/AuthGuard';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* 💡 Protected Route: Wrap the Dashboard with the AuthGuard */}
      <Route 
        path="/dashboard"   
        element={
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        } 
      /> 
      
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default App;