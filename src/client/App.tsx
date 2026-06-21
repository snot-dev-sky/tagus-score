import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeadForm from './pages/lead-form';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import { Toast } from '@heroui/react';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="*"
          element={
            <div className="app-container bg-background text-foreground">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <h1>Welcome to Tagus Score</h1>
                      <p>React + Express + TypeScript Boilerplate</p>
                    </>
                  }
                />
                <Route path="/lead-form" element={<LeadForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
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
