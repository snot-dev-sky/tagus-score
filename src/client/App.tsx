import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import PublicForm from './pages/public-form';
import { Toast } from '@heroui/react';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form/:formId" element={<PublicForm />} />
        <Route
          path="*"
          element={
            <div className="app-container bg-background text-foreground">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          }
        />
      </Routes>
      <Toast.Provider />
    </Router>
  );
};

export default App;
