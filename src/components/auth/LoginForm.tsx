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
import { Checkbox } from '@/components/ui/Checkbox';
import { Alert } from '@/components/ui/Alert';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get return URL from query params
  const returnUrl = searchParams.get('returnUrl') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);

      await login(data.email, data.password, data.rememberMe);

      // If login is successful, redirect to the return URL or appropriate dashboard
      if (returnUrl && !returnUrl.startsWith('/auth')) {
        router.push(decodeURIComponent(returnUrl));
      }
      // The router push to the appropriate dashboard is handled in the AuthContext
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert variant="error" title="Authentication Failed" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <div className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          id="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <div>
          <Input
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password')}
          />
          <div className="flex justify-end mt-1">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-accent-600 hover:text-accent-800"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Checkbox id="rememberMe" label="Remember me for 30 days" {...register('rememberMe')} />
      </div>

      <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting} className="mt-6">
        Sign in
      </Button>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-accent-600 hover:text-accent-800 font-medium">
            Register here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
