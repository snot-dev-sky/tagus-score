import React from 'react';
import Logo from './logo';

// Barra de topo da página pública (64px): apenas o logo, sem toggle de tema nem perfil.
const PublicTopNav: React.FC = () => (
  <header className="relative z-50 flex h-16 flex-none items-center border-b border-default bg-surface px-7">
    <Logo />
  </header>
);

export default PublicTopNav;
