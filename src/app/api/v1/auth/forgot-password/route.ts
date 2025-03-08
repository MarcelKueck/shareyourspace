import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { csrfProtection } from '@/lib/auth/csrf';
import { z } from 'zod';

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// In a real app, you would use a database to store reset tokens
// This is just a placeholder for demonstration
const resetTokens: { [email: string]: { token: string; expires: Date } } = {};

async function handler(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const result = forgotPasswordSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // In a real app, you would check if the email exists in your database
    // For security reasons, we don't reveal whether the email exists or not

    // Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Set expiration time (24 hours from now)
    const expiresIn = new Date();
    expiresIn.setHours(expiresIn.getHours() + 24);

    // Store the token (in a real app, you would store this in a database)
    resetTokens[email] = { token: resetToken, expires: expiresIn };

    // Create reset URL
    const resetUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    // In a real app, you would send an email with the reset link
    // For demonstration, we'll just log it to the console
    console.log('Password reset link:', resetUrl);

    // TODO: Implement email sending logic
    // This would typically use a service like SendGrid, AWS SES, etc.

    // Return a success response
    // We don't confirm whether the email exists for security reasons
    return NextResponse.json({
      success: true,
      message: 'Password reset email sent if account exists',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

export const POST = csrfProtection(handler);
