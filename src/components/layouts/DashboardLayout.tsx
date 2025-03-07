import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Sidebar from '@/components/navigation/Sidebar';
import { UserType } from '@/models/user';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  sidebarClassName?: string;
  contentClassName?: string;
  withPadding?: boolean;
}

/**
 * Dashboard layout with role-specific sidebar for authenticated users
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  className,
  sidebarClassName,
  contentClassName,
  withPadding = true,
}) => {
  const { user, userType, isLoading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated and not loading
  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={cn('flex flex-col min-h-screen bg-gray-50', className)}>
      <Header onMenuClick={toggleSidebar} />

      <div className="flex flex-grow">
        {/* Sidebar - different for corporate and startup users */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          userType={userType || UserType.CORPORATE}
          className={sidebarClassName}
        />

        {/* Main content */}
        <main
          className={cn(
            'flex-grow transition-all duration-300',
            withPadding && 'p-4 sm:p-6 lg:p-8',
            contentClassName
          )}
        >
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
