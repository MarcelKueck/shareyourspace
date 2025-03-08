import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { csrfProtection } from '@/lib/auth/csrf';
import { z } from 'zod';

// Validation schema
const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  email: z.string().email('Invalid email address'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

// In a real app, you would use a database to store and verify reset tokens
// This is just a placeholder for demonstration
const resetTokens: { [email: string]: { token: string; expires: Date } } = {
  'test@example.com': {
    token: 'valid-token',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
};

async function handler(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const result = resetPasswordSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const { token, email, newPassword } = result.data;

    // Verify token exists and is valid
    const storedTokenData = resetTokens[email];

    if (!storedTokenData || storedTokenData.token !== token) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    // Check if token has expired
    if (storedTokenData.expires < new Date()) {
      // Remove expired token
      delete resetTokens[email];
      return NextResponse.json({ error: 'Token has expired' }, { status: 400 });
    }

    // In a real app, you would update the user's password in your database
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // TODO: Update the user's password in the database
    console.log(`Password for ${email} updated to: ${hashedPassword}`);

    // Remove the used token
    delete resetTokens[email];

    // Return success response
    return NextResponse.json({ success: true, message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}

export const POST = csrfProtection(handler);
