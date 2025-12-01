'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginUser } from '@/lib/api';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const { token } = await loginUser(email, password);

    (await cookies()).set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Invalid credentials',
    };
  }

  redirect('/dashboard');
}

export async function logout() {
  (await cookies()).delete('auth-token');
  redirect('/login');
}