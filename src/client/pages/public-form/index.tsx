import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '@heroui/react';
import MainLayout from '../../components/main-layout';
import MainContent from '../../components/main-content';
import { getForm, ApiRequestError } from '../../lib/api';
import { ErrorCodes } from '../../constants/errorCodes';

type Status = 'loading' | 'valid' | 'error';

// Mensagem por errorCode; o default cobre link inválido / não encontrado.
const errorMessage = (code?: string): string => {
  switch (code) {
    case ErrorCodes.Form.EXPIRED:
      return 'Este link expirou. Pede um novo link ao agente.';
    case ErrorCodes.Form.ALREADY_USED:
      return 'Este formulário já foi preenchido.';
    default:
      return 'Este link não é válido.';
  }
};

// Rota pública /form/:formId — valida o link via GET /api/forms/:formId e, se válido,
// renderiza o formulário (placeholder por agora). Página clean: só logo + conteúdo.
const PublicForm: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await getForm(formId ?? '');
        if (active) setStatus('valid');
      } catch (err) {
        if (!active) return;
        setMessage(errorMessage(err instanceof ApiRequestError ? err.errorCode : undefined));
        setStatus('error');
      }
    })();
    return () => {
      active = false;
    };
  }, [formId]);

  return (
    <MainLayout isPublic>
      <MainContent>
        {status === 'loading' && (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        )}

        {status === 'error' && (
          <p className="py-16 text-center text-[14px] text-default-foreground">{message}</p>
        )}

        {status === 'valid' && (
          <>
            <h1 className="text-[24px] font-bold tracking-tight text-foreground">Formulário</h1>
            <p className="text-[14px] text-default-foreground">Link válido — formulário em construção.</p>
          </>
        )}
      </MainContent>
    </MainLayout>
  );
};

export default PublicForm;
