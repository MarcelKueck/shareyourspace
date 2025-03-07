import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/auth/jwt';

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/api/v1/auth/login',
  '/api/v1/auth/register',
  '/api/v1/auth/forgot-password',
];

// Paths that can only be accessed by specific user types
const restrictedPaths = {
  corporate: ['/dashboard/corporate', '/spaces/manage'],
  startup: ['/dashboard/startup', '/spaces/search'],
  admin: ['/admin'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is public
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get the token from cookies
  const token = request.cookies.get('auth-token')?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Verify token and get user data
  const payload = await verifyJWT<{ id: string; email: string; userType: string }>(token);

  // If token is invalid, redirect to login
  if (!payload) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Check if user is trying to access a restricted path
  if (
    restrictedPaths.corporate.some((path) => pathname.startsWith(path)) &&
    payload.userType !== 'corporate'
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (
    restrictedPaths.startup.some((path) => pathname.startsWith(path)) &&
    payload.userType !== 'startup'
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (
    restrictedPaths.admin.some((path) => pathname.startsWith(path)) &&
    payload.userType !== 'admin'
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/* (image files)
     * - public/* (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/|public/).*)',
  ],
};