import React from 'react';
import TopNav from './top-nav';
import PublicTopNav from './public-top-nav';

// Esqueleto da app: top nav + conteúdo.
// `isPublic` troca a TopNav autenticada pela PublicTopNav (rota pública).
const MainLayout: React.FC<{ children: React.ReactNode; isPublic?: boolean }> = ({
  children,
  isPublic = false,
}) => (
  <div className="flex min-h-screen flex-col bg-background">
    {isPublic ? <PublicTopNav /> : <TopNav />}
    {children}
  </div>
);

export default MainLayout;
