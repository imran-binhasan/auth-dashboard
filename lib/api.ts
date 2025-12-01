import { LoginResponse, User } from '@/types';

const API_BASE = 'https://reqres.in/api';
const API_KEY = process.env.API_KEY || 'reqres_038f525b4f4e47a387eaf66d7f8f87a9';

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify({ email, password }),
    cache: 'no-store',
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Login failed' }));
    throw new Error(error.error || 'Login failed');
  }

  const data = await res.json();
  return data as LoginResponse;
}

export async function fetchUser(id: number): Promise<{ data: User }> {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    headers: {
      'X-API-Key': API_KEY,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user data: ${res.status}`);
  }

  const data = await res.json();
  return data as { data: User };
}