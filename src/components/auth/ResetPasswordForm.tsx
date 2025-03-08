'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

// Validation schema
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm: React.FC = () => {
  const { updatePassword } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get token and email from URL
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  // If token or email is missing, show error
  if (!token || !email) {
    return (
      <div className="text-center">
        <Alert variant="error" title="Invalid Reset Link">
          The password reset link is invalid or has expired. Please request a new password reset.
        </Alert>
        <div className="mt-6">
          <Link href="/auth/forgot-password">
            <Button variant="primary" fullWidth>
              Request New Reset Link
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);

      await updatePassword(token, data.password);

      // Show success message
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.message || 'Failed to reset password. The link may have expired.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">Password Reset Successful</h2>
        <p className="text-gray-600 mb-6">
          Your password has been successfully reset. You can now log in with your new password.
        </p>
        <Button variant="primary" onClick={() => router.push('/auth/login')} fullWidth>
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert variant="error" title="Error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <div className="space-y-4">
        <Input
          label="New Password"
          type="password"
          id="password"
          error={errors.password?.message}
          {...register('password')}
        />

        <Input
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <div className="text-xs text-gray-500">
          <p className="font-medium mb-1">Password must contain:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>At least 8 characters</li>
            <li>At least one uppercase letter</li>
            <li>At least one lowercase letter</li>
            <li>At least one number</li>
            <li>At least one special character</li>
          </ul>
        </div>
      </div>

      <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting} className="mt-6">
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
