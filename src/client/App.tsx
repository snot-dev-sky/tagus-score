import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeadForm from './Lead-Form';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <>
              <h1>Welcome to Tagus Score</h1>
              <p>React + Express + TypeScript Boilerplate</p>
            </>
          } />
          <Route path="/lead-form" element={<LeadForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
