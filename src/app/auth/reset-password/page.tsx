import React from 'react';
import { Metadata } from 'next';
import AuthLayout from '@/components/layouts/AuthLayout';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Reset Password | ShareYourSpace',
  description: 'Create a new password for your ShareYourSpace account',
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Create a new password"
      description="Please enter a new password for your account."
      imageUrl="/images/auth-background.jpg"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
