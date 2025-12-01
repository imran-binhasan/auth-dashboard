import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  if (pathname === '/login' && token) {
    const url = new URL('/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};