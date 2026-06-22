import { getToken } from './auth';

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

export interface ApiLead {
  id: string;
  agentId: string;
  formId: string;
  name: string;
  email: string;
  contact: string;
  budget: number;
  approved: boolean;
  district: string;
  town: string;
  type: string[];
  notes: string;
  createdAt: string;
}

export async function getLeads(
  limit = 20,
  offset = 0,
): Promise<{ leads: ApiLead[]; total: number }> {
  const res = await fetch(`/api/agents/me/leads?limit=${limit}&offset=${offset}`, {
    headers: { Authorization: `Bearer ${getToken() ?? ''}` },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiRequestError(data.error ?? 'Erro ao carregar leads', data.errorCode);
  }

  return { leads: data.data as ApiLead[], total: data.pagination.total as number };
}

export async function signup(name: string, email: string, password: string): Promise<AuthResponse> {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiRequestError(data.error ?? 'Erro ao criar conta', data.errorCode);
  }

  return data as AuthResponse;
}
