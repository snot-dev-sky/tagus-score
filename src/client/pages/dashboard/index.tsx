import React from 'react';
import MainLayout from '../../components/main-layout';
import MainContent from '../../components/main-content';
import Dashboard from '../../components/dashboard';

// Rota /dashboard — compõe o layout da app autenticada.
const DashboardPage: React.FC = () => (
  <MainLayout>
    <MainContent>
      <Dashboard />
    </MainContent>
  </MainLayout>
);

export default DashboardPage;
