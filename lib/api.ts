'use server';

import { LoginResponse, User } from '@/types';

const API_BASE = process.env.API_URL || 'https://reqres.in/api';

function getApiHeaders(contentType?: string): HeadersInit {
  return {
    'X-API-Key': process.env.API_KEY!,
    ...(contentType && { 'Content-Type': contentType }),
  };
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: getApiHeaders('application/json'),
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Login failed');
    }

    return res.json() as Promise<LoginResponse>;
  } catch (err) {
    throw new Error('Network error');
  }
}

export async function fetchUser(id: number): Promise<{ data: User }> {
  try {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      headers: getApiHeaders(),
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user data');
    }

    return res.json() as Promise<{ data: User }>;
  } catch {
    throw new Error('Network error');
  }
}
