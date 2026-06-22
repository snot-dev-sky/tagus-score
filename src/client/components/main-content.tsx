import React from 'react';

// Área de conteúdo central da app (abaixo da top nav), com largura máxima.
const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-5 p-8">{children}</main>
);

export default MainContent;
