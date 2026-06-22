import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Link, Spinner, linkVariants } from '@heroui/react';
import { ErrorCodes } from '../../constants/errorCodes';
import { ApiRequestError, login } from '../../lib/api';
import { setToken } from '../../lib/auth';
import InputText from '../../components/input-text';
import InputPassword from '../../components/input-password';
import Logo from '../../components/logo';

const ERROR_MESSAGES: Record<string, string> = {
  [ErrorCodes.Auth.INVALID_CREDENTIALS]: 'Email ou password incorretos.',
  [ErrorCodes.Auth.USE_GOOGLE_LOGIN]: 'Esta conta foi criada com Google. Usa essa opção para entrar.',
  [ErrorCodes.Auth.MISSING_FIELDS]: 'Preenche o email e a password.',
  [ErrorCodes.Auth.INVALID_EMAIL_FORMAT]: 'Formato de email inválido.',
};

// Simple Google "G" mark for the button
// TODO: Replace with actual Google logo if possible, ensuring to follow Google's branding guidelines
const GoogleMark = () => (
  <span
    style={{
      width: 18, height: 18, borderRadius: '50%', background: '#fff',
      border: '1px solid #e4e4e7', color: '#4285F4', fontSize: 12, fontWeight: 700,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    G
  </span>
);

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const { token } = await login(email, password);
      setToken(token);
      navigate('/dashboard');
    } catch (err) {
      const message =
        err instanceof ApiRequestError
          ? ERROR_MESSAGES[err.errorCode ?? ''] ?? err.message
          : 'Não foi possível ligar ao servidor. Tenta novamente.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface p-8 sm:bg-background sm:p-10">
      <div className="flex justify-center sm:justify-start">
        <Logo />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-[360px] sm:rounded-[18px] sm:border sm:border-border sm:bg-surface sm:p-8 sm:shadow-sm">
          <p className="text-center text-[13px] text-foreground/60 sm:text-left">Please enter your details</p>
          <h2 className="mb-6 text-center text-[26px] font-bold tracking-[-0.02em] text-foreground sm:text-left">
            Welcome back
          </h2>

          {error && <p className="mb-4 text-[13px] text-danger">{error}</p>}

          <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
            <InputText
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />

            <InputPassword
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />

            <div className="flex items-center justify-between gap-3">
              <Checkbox isSelected={remember} onChange={setRemember} className="shrink-0">
                <Checkbox.Control className="border border-border bg-surface">
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Content className="whitespace-nowrap text-[13px] text-foreground">
                  Remember me
                </Checkbox.Content>
              </Checkbox>
              <Link href="#" className="whitespace-nowrap text-[13px] font-semibold text-accent">
                Forgot password
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              className="font-semibold"
              isDisabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : 'Sign in'}
            </Button>

            <div className="my-1.5 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-[11px] font-semibold tracking-wider text-foreground/55">OR</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <Button
              type="button"
              variant="outline"
              size="lg"
              fullWidth
              className="flex items-center justify-center gap-2 font-medium text-foreground"
            >
              <GoogleMark /> Continue with Google
            </Button>
          </form>

          <p className="mt-5 text-center text-[13px] text-foreground/60">
            Don&apos;t have an account?{' '}
            <RouterLink to="/signup" className={`${linkVariants().base()} text-[13px] font-semibold text-accent`}>
              Sign up
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
