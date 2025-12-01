import { LoginResponse, User } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://reqres.in/api';

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login failed');
  }

  return res.json();
}

export async function fetchUser(id: number): Promise<{ data: User }> {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }

  return res.json();
}