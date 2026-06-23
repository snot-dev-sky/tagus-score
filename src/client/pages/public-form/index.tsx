import React from 'react';
import MainLayout from '../../components/main-layout';
import MainContent from '../../components/main-content';

// Rota pública /form/:formId — página clean (só logo na top nav, sem perfil/sidebar).
// Placeholder por agora; a validação do formId (inválido/expirado/já submetido) e o
// render do formulário real ficam para iteração seguinte.
const PublicForm: React.FC = () => (
  <MainLayout isPublic>
    <MainContent>
      <h1 className="text-[24px] font-bold tracking-tight text-foreground">Formulário público</h1>
      <p className="text-[14px] text-default-foreground">Em construção.</p>
    </MainContent>
  </MainLayout>
);

export default PublicForm;
