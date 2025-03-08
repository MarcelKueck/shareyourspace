import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJWT, signJWT } from '@/lib/auth/jwt';
import { UserType } from '@/models/user';

export async function POST(request: NextRequest) {
  try {
    // Get the current token from cookies
    const token = cookies().get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 });
    }

    // Verify the current token
    const payload = await verifyJWT<{
      id: string;
      email: string;
      userType: UserType;
      name?: string;
      companyId?: string;
      exp: number;
    }>(token);

    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check if token is about to expire (less than 15 minutes remaining)
    const now = Math.floor(Date.now() / 1000);
    const fifteenMinutes = 15 * 60;

    // Only refresh if token is about to expire
    if (payload.exp && payload.exp - now > fifteenMinutes) {
      return NextResponse.json({
        message: 'Token still valid',
        token,
      });
    }

    // Create a new token with the same payload
    const newToken = await signJWT(
      {
        id: payload.id,
        email: payload.email,
        userType: payload.userType,
        name: payload.name,
        companyId: payload.companyId,
      },
      '7d'
    ); // Always set to 7 days for refresh

    // Set the new token as a cookie
    cookies().set('auth-token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    // Return the new token in the response
    return NextResponse.json({
      message: 'Token refreshed successfully',
      token: newToken,
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json({ error: 'Failed to refresh token' }, { status: 500 });
  }
}
