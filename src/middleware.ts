import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth/jwt';
import { UserType } from '@/models/user';

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/about',
  '/pricing',
  '/contact',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/api/v1/auth/login',
  '/api/v1/auth/register',
  '/api/v1/auth/forgot-password',
  '/api/v1/auth/reset-password',
  '/api/v1/auth/csrf',
];

// Paths that can only be accessed by specific user types
const restrictedPaths = {
  corporate: ['/dashboard/corporate', '/spaces/manage', '/spaces/create', '/spaces/analytics'],
  startup: ['/dashboard/startup', '/spaces/search'],
  admin: ['/admin'],
};

// Check if a path is restricted to a specific user type
function isPathRestrictedTo(path: string, userType: string): boolean {
  const restrictedToUserType = Object.entries(restrictedPaths).find(([type, paths]) =>
    paths.some((restrictedPath) => path.startsWith(restrictedPath))
  );

  if (!restrictedToUserType) return false;

  return restrictedToUserType[0] !== userType;
}

// Helper to check if a path is public
function isPublicPath(path: string): boolean {
  return publicPaths.some((publicPath) => path.startsWith(publicPath));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public assets to be accessed without authentication
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/fonts/')
  ) {
    return NextResponse.next();
  }

  // Check if the path is public
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Get the token from cookies
  const token = request.cookies.get('auth-token')?.value;

  // If no token, redirect to login with return URL
  if (!token) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('returnUrl', encodeURIComponent(pathname));
    return NextResponse.redirect(url);
  }

  // Verify token and get user data
  const payload = await verifyJWT<{
    id: string;
    email: string;
    userType: UserType;
    exp: number;
  }>(token);

  // If token is invalid or expired, redirect to login
  if (!payload) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('returnUrl', encodeURIComponent(pathname));
    return NextResponse.redirect(url);
  }

  // Check token expiration
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('returnUrl', encodeURIComponent(pathname));
    return NextResponse.redirect(url);
  }

  // Check if user is trying to access a restricted path
  if (isPathRestrictedTo(pathname, payload.userType)) {
    // Redirect to appropriate dashboard based on user type
    if (payload.userType === UserType.CORPORATE) {
      return NextResponse.redirect(new URL('/dashboard/corporate', request.url));
    } else if (payload.userType === UserType.STARTUP) {
      return NextResponse.redirect(new URL('/dashboard/startup', request.url));
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Check for API routes that need specific user types
  if (pathname.startsWith('/api/v1/') && !pathname.startsWith('/api/v1/auth/')) {
    // Add user info to request headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.id);
    requestHeaders.set('x-user-email', payload.email);
    requestHeaders.set('x-user-type', payload.userType);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
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
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
