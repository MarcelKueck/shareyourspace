import React from 'react';
import { Metadata } from 'next';
import AuthLayout from '@/components/layouts/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login | ShareYourSpace',
  description: 'Sign in to ShareYourSpace - Enterprise-Grade Office Sharing Platform',
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign in to your account"
      description="Enter your credentials to access your ShareYourSpace account."
      imageUrl="/images/auth-background.jpg"
    >
      <LoginForm />
    </AuthLayout>
  );
}
