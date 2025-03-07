import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import TabNavigation from '@/components/navigation/TabNavigation';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { UserType } from '@/models/user';
import { ComplianceBadge } from '@/components/compliance/ComplianceBadge';

interface ProfileTab {
  id: string;
  label: string;
  href: string;
}

interface ProfileLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  contentClassName?: string;
  tabs?: ProfileTab[];
  activeTab?: string;
  hideHeader?: boolean;
}

/**
 * Layout for user profile and company profile pages
 * Features a header with profile information and tabs for navigation
 */
const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  children,
  title,
  subtitle,
  className,
  contentClassName,
  tabs,
  activeTab,
  hideHeader = false,
}) => {
  const { user, userType } = useAuth();
  const router = useRouter();

  const defaultTabs = React.useMemo(() => {
    if (userType === UserType.CORPORATE) {
      return [
        { id: 'profile', label: 'Profile', href: '/profile' },
        { id: 'company', label: 'Company', href: '/profile/company' },
        { id: 'team', label: 'Team Members', href: '/profile/team' },
        { id: 'compliance', label: 'Compliance', href: '/profile/compliance' },
        { id: 'settings', label: 'Settings', href: '/profile/settings' },
      ];
    } else {
      return [
        { id: 'profile', label: 'Profile', href: '/profile' },
        { id: 'company', label: 'Startup Profile', href: '/profile/company' },
        { id: 'team', label: 'Team Members', href: '/profile/team' },
        { id: 'compliance', label: 'Compliance', href: '/profile/compliance' },
        { id: 'settings', label: 'Settings', href: '/profile/settings' },
      ];
    }
  }, [userType]);

  const profileTabs = tabs || defaultTabs;
  const currentTab = activeTab || router.pathname.split('/').pop() || 'profile';

  // If we don't have user information yet, show a loading state
  if (!user) {
    return (
      <DashboardLayout>
        <div className="animate-pulse">
          <Card className="mb-6">
            <CardHeader className="h-32"></CardHeader>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={cn('space-y-6', className)}>
        {!hideHeader && (
          <Card className="overflow-hidden">
            {/* Cover Photo */}
            <div className="h-32 bg-primary-900 relative">
              {user.company?.logo && (
                <div className="absolute bottom-0 left-8 transform translate-y-1/2">
                  <div className="h-20 w-20 rounded-lg bg-white shadow-lg overflow-hidden border-2 border-white">
                    <Image
                      src={user.company.logo}
                      alt={user.company?.name || 'Company logo'}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-12 pb-6 px-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {title || user.company?.name || `${user.firstName} ${user.lastName}`}
                  </h1>
                  <p className="text-gray-500">
                    {subtitle ||
                      (userType === UserType.CORPORATE
                        ? 'Corporate Innovation Team'
                        : 'B2B SaaS Startup')}
                  </p>
                </div>

                {user.company?.complianceLevel && (
                  <ComplianceBadge
                    level={user.company.complianceLevel}
                    verificationStatus={user.company.verificationStatus || 'pending'}
                    size="lg"
                  />
                )}
              </div>
            </div>

            {/* Profile Navigation Tabs */}
            <TabNavigation tabs={profileTabs} activeTab={currentTab} />
          </Card>
        )}

        <div className={cn(contentClassName)}>{children}</div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileLayout;
