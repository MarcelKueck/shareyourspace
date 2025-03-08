import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { signJWT } from '@/lib/auth/jwt';
import { csrfProtection } from '@/lib/auth/csrf';
import { z } from 'zod';
import { UserType } from '@/models/user';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

async function handler(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const { email, password, rememberMe } = result.data;

    // In a real app, you would look up the user in your database
    // This is just a placeholder for demonstration
    // TODO: Replace with actual database lookup
    const user = {
      id: '123',
      email,
      password: await bcrypt.hash('password123', 10), // Hashed password
      userType: UserType.CORPORATE,
      firstName: 'John',
      lastName: 'Doe',
      companyId: 'company-123',
    };

    // Check if user exists
    if (!user) {
      // Use a generic error message to prevent user enumeration
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      // Add a small delay to prevent timing attacks
      await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500));
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create JWT token with user information
    const token = await signJWT(
      {
        id: user.id,
        email: user.email,
        userType: user.userType,
        name: `${user.firstName} ${user.lastName}`,
        companyId: user.companyId,
      },
      rememberMe ? '30d' : '7d'
    );

    // Set the token as an HTTP-only cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60, // 30 days or 7 days
      path: '/',
    };

    cookies().set('auth-token', token, cookieOptions);

    // Return user data (without sensitive information)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        userType: user.userType,
        firstName: user.firstName,
        lastName: user.lastName,
        companyId: user.companyId,
      },
      token, // Include token in response for client-side storage if needed
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export const POST = csrfProtection(handler);
