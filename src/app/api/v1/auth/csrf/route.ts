import { NextRequest, NextResponse } from 'next/server';
import { getCsrfToken } from '@/lib/auth/csrf';

export async function GET(request: NextRequest) {
  try {
    const csrfData = await getCsrfToken();

    return NextResponse.json(csrfData);
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json({ error: 'Failed to generate CSRF token' }, { status: 500 });
  }
}
