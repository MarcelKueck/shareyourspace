'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm: React.FC = () => {
  const { resetPassword } = useAuth();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);

      await resetPassword(data.email);

      // Show success message
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Password reset request error:', err);
      setError(err.message || 'Failed to process password reset request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 text-accent-600 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">Check your email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a password reset link to your email address. Please check your inbox and follow
          the instructions to reset your password.
        </p>
        <div className="space-y-4">
          <Button variant="outline" onClick={() => setIsSubmitted(false)} fullWidth>
            Try another email
          </Button>
          <Button
            variant="text"
            onClick={() => router.push('/auth/login')}
            className="underline"
            fullWidth
          >
            Back to login
          </Button>
        </div>
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

      <div>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <Input
          label="Email Address"
          type="email"
          id="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting} className="mt-6">
        Send Reset Link
      </Button>

      <div className="text-center mt-6">
        <Link href="/auth/login" className="text-sm text-accent-600 hover:text-accent-800">
          Back to login
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
