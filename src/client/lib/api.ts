export class ApiRequestError extends Error {
  errorCode?: string;

  constructor(message: string, errorCode?: string) {
    super(message);
    this.name = 'ApiRequestError';
    this.errorCode = errorCode;
  }
}

export interface AuthResponse {
  token: string;
  user: { id: string; email: string; name: string };
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiRequestError(data.error ?? 'Erro ao iniciar sessão', data.errorCode);
  }

  return data as AuthResponse;
}
