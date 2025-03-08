import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { csrfProtection } from '@/lib/auth/csrf';

async function handler(request: NextRequest) {
  try {
    // Clear the auth token cookie
    cookies().delete('auth-token');

    // Clear the CSRF token cookie
    cookies().delete('csrf-token');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}

export const POST = csrfProtection(handler);
