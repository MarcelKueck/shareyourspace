import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  homeHref?: string;
  homeLabel?: string;
  className?: string;
  separator?: React.ReactNode;
  autoGenerate?: boolean;
}

/**
 * Breadcrumb navigation component that shows the current location in the site hierarchy
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items: propItems,
  homeHref = '/',
  homeLabel = 'Home',
  className,
  separator = (
    <svg
      className="h-4 w-4 text-gray-400 flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  autoGenerate = false,
}) => {
  const router = useRouter();

  // Generate breadcrumb items based on the current path if autoGenerate is true
  const generateBreadcrumbItems = (): BreadcrumbItem[] => {
    if (!autoGenerate) return propItems || [];

    const asPathWithoutQuery = router.asPath.split('?')[0];
    const asPathNestedRoutes = asPathWithoutQuery.split('/').filter((v) => v.length > 0);

    const crumbList = asPathNestedRoutes.map((subpath, idx) => {
      const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');

      // Format the label (capitalize, replace dashes with spaces)
      const label = subpath.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

      return { href, label };
    });

    return [{ href: homeHref, label: homeLabel }, ...crumbList];
  };

  const items = generateBreadcrumbItems();

  if (!items.length) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">{separator}</span>}

            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className={cn(
                  'text-sm font-medium flex items-center',
                  index === items.length - 1
                    ? 'text-gray-700 cursor-default'
                    : 'text-gray-500 hover:text-gray-700'
                )}
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.icon && <span className="mr-1.5">{item.icon}</span>}
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  'text-sm font-medium flex items-center',
                  index === items.length - 1 ? 'text-gray-700 cursor-default' : 'text-gray-500'
                )}
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.icon && <span className="mr-1.5">{item.icon}</span>}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
