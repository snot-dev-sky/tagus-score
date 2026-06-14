import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeadForm from './pages/Lead-Form';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { Button, Toast } from '@heroui/react';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container bg-background text-foreground">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Welcome to Tagus Score</h1>
                <p>React + Express + TypeScript Boilerplate</p>
                <Button variant="primary" onClick={() => alert('Hello from Hero UI Button!')}>
                  Click Me
                </Button>
              </>
            }
          />
          <Route path="/lead-form" element={<LeadForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <Toast.Provider />
    </Router>
  );
};

export default App;
