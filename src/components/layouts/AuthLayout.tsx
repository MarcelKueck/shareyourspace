import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  imageUrl?: string;
}

/**
 * Layout component for authentication pages (login, register, password reset)
 * Features a split screen design with branding image on the left
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  description,
  className,
  imageUrl = '/images/auth-background.jpg',
}) => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side with image - hidden on small screens */}
      <div className="hidden lg:flex lg:flex-1 relative">
        <div className="absolute inset-0 bg-primary-900 bg-opacity-80 z-10"></div>
        {imageUrl && (
          <div className="relative w-full h-full">
            <Image src={imageUrl} alt="ShareYourSpace" fill priority className="object-cover" />
          </div>
        )}
        <div className="absolute inset-0 flex flex-col justify-between z-20 p-8 lg:p-12">
          <div>
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/logo-white.svg"
                  alt="ShareYourSpace Logo"
                  width={180}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            </Link>
          </div>
          <div className="max-w-md">
            <h1 className="text-3xl font-semibold text-white mb-4">
              Enterprise-Grade Office Sharing Platform
            </h1>
            <p className="text-white text-lg">
              Connect corporate innovation teams with B2B SaaS startups through our secure,
              compliant workspace network.
            </p>
          </div>
          <div className="text-sm text-white opacity-80">
            © {new Date().getFullYear()} ShareYourSpace. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right side with auth form */}
      <div
        className={cn(
          'flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24',
          className
        )}
      >
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden mb-10">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="ShareYourSpace Logo"
                width={180}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
            {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
