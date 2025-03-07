import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  withFooter?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  withContainer?: boolean;
}

/**
 * Main layout component that includes the header and footer
 * Used as the base layout for most pages
 */
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
  withFooter = true,
  maxWidth = '2xl',
  withContainer = true,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Maximum width class mapping
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className={cn('flex-grow', className)}>
        {withContainer ? (
          <div className={cn('mx-auto px-4 sm:px-6 lg:px-8 w-full', maxWidthClasses[maxWidth])}>
            {children}
          </div>
        ) : (
          children
        )}
      </main>

      {withFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
