import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { UserType } from '@/models/user';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
  onMenuClick?: () => void;
}

/**
 * Header component with user type awareness and authentication state
 */
const Header: React.FC<HeaderProps> = ({ className, onMenuClick }) => {
  const { user, userType, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const closeProfileMenu = () => {
    setProfileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className={cn('bg-white border-b border-gray-200 z-30 relative', className)}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Menu Button */}
          <div className="flex items-center">
            {isAuthenticated && (
              <button
                type="button"
                className="text-gray-500 lg:hidden mr-2"
                onClick={onMenuClick}
                aria-label="Open sidebar"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}

            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="ShareYourSpace Logo"
                width={160}
                height={36}
                className="h-9 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:ml-8 lg:flex lg:space-x-8">
              {isAuthenticated ? (
                userType === UserType.CORPORATE ? (
                  /* Corporate Navigation */
                  <>
                    <Link
                      href="/dashboard/corporate"
                      className={cn(
                        'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                        router.pathname.includes('/dashboard/corporate')
                          ? 'border-primary-600 text-primary-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      )}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/spaces/manage"
                      className={cn(
                        'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                        router.pathname.includes('/spaces/manage')
                          ? 'border-primary-600 text-primary-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      )}
                    >
                      My Spaces
                    </Link>
                    <Link
                      href="/bookings"
                      className={cn(
                        'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                        router.pathname.includes('/bookings')
                          ? 'border-primary-600 text-primary-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      )}
                    >
                      Bookings
                    </Link>
                    <Link
                      href="/innovationmatch"
                      className={cn(
                        'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                        router.pathname.includes('/innovationmatch')
                          ? 'border-primary-600 text-primary-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      )}
                    >
                      InnovationMatch
                    </Link>
                  </>
                ) : (
                  /* Startup Navigation */
                  <>
                    <Link
                      href="/dashboard/startup"
                      className={cn(
                        'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                        router.pathname.includes('/dashboard/startup')
                          ? 'border-primary-600 text-primary-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      )}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/spaces/search"
                      className={cn(
                        'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                        router.pathname.includes('/spaces/search')
                          ? 'border-primary-600 text-primary-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      )}
                    >
                      Find Spaces
                    </Link>
                    <Link
                      href="/bookings"
                      className={cn(
                        'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                        router.pathname.includes('/bookings')
                          ? 'border-primary-600 text-primary-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      )}
                    >
                      My Bookings
                    </Link>
                    <Link
                      href="/innovationmatch"
                      className={cn(
                        'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                        router.pathname.includes('/innovationmatch')
                          ? 'border-primary-600 text-primary-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      )}
                    >
                      InnovationMatch
                    </Link>
                  </>
                )
              ) : (
                /* Unauthenticated Navigation */
                <>
                  <Link
                    href="/about"
                    className={cn(
                      'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                      router.pathname === '/about'
                        ? 'border-primary-600 text-primary-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    )}
                  >
                    About
                  </Link>
                  <Link
                    href="/pricing"
                    className={cn(
                      'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                      router.pathname === '/pricing'
                        ? 'border-primary-600 text-primary-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    )}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/contact"
                    className={cn(
                      'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                      router.pathname === '/contact'
                        ? 'border-primary-600 text-primary-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    )}
                  >
                    Contact
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Right side - Authentication / User Menu */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="relative ml-4">
                {/* User dropdown */}
                <div>
                  <button
                    type="button"
                    className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    id="user-menu-button"
                    aria-expanded={profileMenuOpen}
                    aria-haspopup="true"
                    onClick={toggleProfileMenu}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center overflow-hidden">
                      {user?.profileImage ? (
                        <Image
                          src={user.profileImage}
                          alt={`${user.firstName} ${user.lastName}`}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-sm font-medium">
                          {user?.firstName?.charAt(0) || ''}
                          {user?.lastName?.charAt(0) || ''}
                        </span>
                      )}
                    </div>
                  </button>
                </div>

                {/* Dropdown menu */}
                {profileMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      aria-hidden="true"
                      onClick={closeProfileMenu}
                    ></div>
                    <div
                      className="absolute right-0 z-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 origin-top-right"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <div className="py-1 border-b border-gray-100">
                        <div className="px-4 py-2">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs text-gray-500 truncate mt-1">{user?.email}</p>
                        </div>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          onClick={closeProfileMenu}
                        >
                          Your Profile
                        </Link>
                        {userType === UserType.CORPORATE ? (
                          <Link
                            href="/compliance"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={closeProfileMenu}
                          >
                            Compliance Center
                          </Link>
                        ) : (
                          <Link
                            href="/compliance"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={closeProfileMenu}
                          >
                            Compliance Status
                          </Link>
                        )}
                        <Link
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          onClick={closeProfileMenu}
                        >
                          Settings
                        </Link>
                      </div>
                      <div className="py-1 border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Login/Register buttons */
              <div className="flex space-x-4">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Assistant button - always visible */}
            <button
              className="ml-4 p-2 rounded-full bg-white text-gray-500 hover:text-accent-500 hover:bg-gray-50 transition-colors"
              aria-label="Open assistant"
            >
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
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
