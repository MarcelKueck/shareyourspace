import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { UserType } from '@/models/user';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  className?: string;
}

/**
 * Mobile navigation with responsive behavior for small screens
 */
const MobileNavigation: React.FC<MobileNavigationProps> = ({ className }) => {
  const { user, userType, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
    closeMenu();
  };

  // Navigation items based on user type and authentication state
  const getNavigationItems = () => {
    if (!isAuthenticated) {
      return [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Contact', href: '/contact' },
      ];
    }

    if (userType === UserType.CORPORATE) {
      return [
        { name: 'Dashboard', href: '/dashboard/corporate' },
        { name: 'My Spaces', href: '/spaces/manage' },
        { name: 'Bookings', href: '/bookings' },
        { name: 'Compliance', href: '/compliance' },
        { name: 'InnovationMatch', href: '/innovationmatch' },
        { name: 'Analytics', href: '/analytics' },
      ];
    }

    return [
      { name: 'Dashboard', href: '/dashboard/startup' },
      { name: 'Find Spaces', href: '/spaces/search' },
      { name: 'My Bookings', href: '/bookings' },
      { name: 'Compliance', href: '/compliance' },
      { name: 'InnovationMatch', href: '/innovationmatch' },
      { name: 'Network', href: '/network' },
    ];
  };

  const navigationItems = getNavigationItems();

  return (
    <div className={cn('lg:hidden', className)}>
      {/* Mobile menu button */}
      <button
        type="button"
        className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span className="sr-only">Open main menu</span>
        {isOpen ? (
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile menu dropdown */}
      <div
        className={cn(
          'fixed inset-0 z-50 transform transition-transform ease-in-out duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>

        {/* Menu panel */}
        <div className="relative flex flex-col w-full max-w-xs h-full bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-5 pb-2 border-b border-gray-200">
            <div className="flex items-center">
              <Link href="/" onClick={closeMenu}>
                <Image
                  src="/logo.svg"
                  alt="ShareYourSpace Logo"
                  width={140}
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <button
              type="button"
              className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={closeMenu}
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* User info if authenticated */}
          {isAuthenticated && user && (
            <div className="px-4 py-3 border-b border-gray-200 bg-primary-50">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center overflow-hidden">
                    {user?.profileImage ? (
                      <Image
                        src={user.profileImage}
                        alt={`${user.firstName} ${user.lastName}`}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-sm font-medium">
                        {user?.firstName?.charAt(0) || ''}
                        {user?.lastName?.charAt(0) || ''}
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation links */}
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                    router.pathname === item.href || router.pathname.startsWith(`${item.href}/`)
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              ))}

              {/* Profile section */}
              {isAuthenticated && (
                <div className="pt-4 pb-3 border-t border-gray-200 mt-6">
                  <div className="space-y-1">
                    <Link
                      href="/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      onClick={closeMenu}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      onClick={closeMenu}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}

              {/* Authentication buttons */}
              {!isAuthenticated && (
                <div className="pt-4 pb-3 border-t border-gray-200 mt-6 space-y-1">
                  <Link
                    href="/auth/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:bg-primary-50"
                    onClick={closeMenu}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>

          {/* Footer links */}
          <div className="pt-4 pb-6 border-t border-gray-200">
            <div className="px-4 flex items-center justify-between">
              <Link
                href="/help"
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={closeMenu}
              >
                Help
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={closeMenu}
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={closeMenu}
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
