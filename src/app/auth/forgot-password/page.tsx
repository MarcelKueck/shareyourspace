import React from 'react';
import { Metadata } from 'next';
import AuthLayout from '@/components/layouts/AuthLayout';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password | ShareYourSpace',
  description: 'Reset your password for ShareYourSpace - Enterprise-Grade Office Sharing Platform',
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      description="We'll send you a link to reset your password."
      imageUrl="/images/auth-background.jpg"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
