import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Generate a CSRF token with a specified expiration time
export function generateCsrfToken(): { token: string; timestamp: number } {
  // Current timestamp in seconds
  const timestamp = Math.floor(Date.now() / 1000);

  // Generate a random token
  const randomBytes = crypto.randomBytes(32).toString('hex');

  // Combine timestamp and random bytes to create the token
  const tokenValue = `${timestamp}:${randomBytes}`;

  return {
    token: tokenValue,
    timestamp,
  };
}

// Validate a CSRF token
export function validateCsrfToken(token: string, maxAge = 3600): boolean {
  try {
    const [timestampStr] = token.split(':');
    const timestamp = parseInt(timestampStr, 10);
    const now = Math.floor(Date.now() / 1000);

    // Check if the token has expired
    return now - timestamp <= maxAge;
  } catch (error) {
    return false;
  }
}

// Middleware to check CSRF token for API routes
export function csrfProtection(handler: Function) {
  return async (req: NextRequest, ...args: any[]) => {
    // Skip CSRF check for GET requests
    if (req.method === 'GET') {
      return handler(req, ...args);
    }

    // Get the CSRF token from the request header
    const csrfToken = req.headers.get('X-CSRF-Token');

    // Get the CSRF token from the cookie for validation
    const cookieStore = cookies();
    const storedCsrfToken = cookieStore.get('csrf-token')?.value;

    // If tokens don't match or are missing, return 403 Forbidden
    if (!csrfToken || !storedCsrfToken || csrfToken !== storedCsrfToken) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    // If token is expired, return 403 Forbidden
    if (!validateCsrfToken(csrfToken)) {
      return NextResponse.json({ error: 'CSRF token expired' }, { status: 403 });
    }

    // Call the handler function if CSRF validation passes
    return handler(req, ...args);
  };
}

// API route to get a fresh CSRF token
export async function getCsrfToken() {
  const { token, timestamp } = generateCsrfToken();

  // Set the CSRF token cookie
  cookies().set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600, // 1 hour
    path: '/',
  });

  return { csrfToken: token };
}
