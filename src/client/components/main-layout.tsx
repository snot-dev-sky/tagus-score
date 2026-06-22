import React from 'react';
import TopNav from './top-nav';

// Esqueleto da app autenticada: top nav fixa + conteúdo.
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <TopNav />
    {children}
  </div>
);

export default MainLayout;
