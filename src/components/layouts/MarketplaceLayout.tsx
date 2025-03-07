import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';

interface FilterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onToggle, children, className }) => {
  return (
    <>
      {/* Mobile filter dialog */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onToggle}
      ></div>

      {/* Sidebar for filters - different display on mobile vs desktop */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        <div className="h-full flex flex-col overflow-y-auto bg-white">
          <div className="flex items-center justify-between p-4 lg:hidden border-b">
            <h2 className="text-lg font-medium">Filters</h2>
            <Button
              variant="text"
              aria-label="Close filters"
              onClick={onToggle}
              className="text-gray-500"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
          <div className="flex-1 p-4">{children}</div>
        </div>
      </aside>
    </>
  );
};

interface MarketplaceLayoutProps {
  children: React.ReactNode;
  filterPanel: React.ReactNode;
  className?: string;
  contentClassName?: string;
  filterClassName?: string;
}

/**
 * Layout optimized for marketplace/space discovery
 * Features a filter sidebar and main content area
 */
const MarketplaceLayout: React.FC<MarketplaceLayoutProps> = ({
  children,
  filterPanel,
  className,
  contentClassName,
  filterClassName,
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  return (
    <div className={cn('flex flex-col min-h-screen', className)}>
      <Header />

      <div className="flex-grow flex flex-col lg:flex-row">
        {/* Filter toggle button for mobile */}
        <div className="lg:hidden p-4 border-b">
          <Button
            onClick={toggleFilters}
            variant="outline"
            leftIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
            }
            className="w-full"
          >
            Filter Spaces
          </Button>
        </div>

        {/* Filter sidebar */}
        <FilterSidebar
          isOpen={filtersOpen}
          onToggle={toggleFilters}
          className={cn('lg:w-80 lg:flex-shrink-0', filterClassName)}
        >
          <Panel variant="plain" className="sticky top-4">
            {filterPanel}
          </Panel>
        </FilterSidebar>

        {/* Main content */}
        <main className={cn('flex-grow p-4 sm:p-6 lg:p-8', contentClassName)}>{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default MarketplaceLayout;
