import React from 'react';
import Logo from './logo';
import ThemeToggle from './theme-toggle';
import ProfileMenu from './profile-menu';

// Barra de topo (64px): logo à esquerda, toggle de tema + perfil à direita.
const TopNav: React.FC = () => (
  <header className="relative z-50 flex h-16 flex-none items-center justify-between border-b border-default bg-surface px-7">
    <Logo />
    <div className="flex items-center gap-3">
      <ThemeToggle />
      <ProfileMenu />
    </div>
  </header>
);

export default TopNav;
