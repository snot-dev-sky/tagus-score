import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  Spinner,
  TextField,
  linkVariants,
  toast,
} from '@heroui/react';
import { ErrorCodes } from '../../../shared/errorCodes';
import { ApiRequestError, login } from '../../lib/api';
import { setToken } from '../../lib/auth';

const ERROR_MESSAGES: Record<string, string> = {
  [ErrorCodes.Auth.INVALID_CREDENTIALS]: 'Email ou password incorretos.',
  [ErrorCodes.Auth.USE_GOOGLE_LOGIN]:
    'Esta conta foi criada com Google. Usa essa opção para entrar.',
  [ErrorCodes.Auth.MISSING_FIELDS]: 'Preenche o email e a password.',
  [ErrorCodes.Auth.INVALID_EMAIL_FORMAT]: 'Formato de email inválido.',
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { token } = await login(email, password);
      setToken(token);
      navigate('/dashboard');
    } catch (error) {
      const message =
        error instanceof ApiRequestError
          ? ERROR_MESSAGES[error.errorCode ?? ''] ?? error.message
          : 'Não foi possível ligar ao servidor. Tenta novamente.';
      toast.danger('Erro ao entrar', { description: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <Card.Header>
          <Card.Title>Entrar</Card.Title>
        </Card.Header>
        <Card.Content>
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              name="email"
              type="email"
              value={email}
              onChange={setEmail}
              isRequired
              isDisabled={isLoading}
            >
              <Label>Email</Label>
              <Input placeholder="nome@exemplo.com" fullWidth />
              <FieldError />
            </TextField>

            <TextField
              name="password"
              type="password"
              value={password}
              onChange={setPassword}
              isRequired
              isDisabled={isLoading}
            >
              <Label>Password</Label>
              <Input fullWidth />
              <FieldError />
            </TextField>

            <Button type="submit" variant="primary" fullWidth isDisabled={isLoading}>
              {isLoading ? <Spinner size="sm" /> : 'Entrar'}
            </Button>
          </Form>
        </Card.Content>
        <Card.Footer className="flex flex-col gap-2 text-sm">
          <RouterLink to="/signup" className={linkVariants().base()}>
            Criar conta
          </RouterLink>
          <span
            className={`${linkVariants().base()} cursor-not-allowed opacity-50`}
            title="Em breve"
          >
            Esqueci a password
          </span>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Login;
