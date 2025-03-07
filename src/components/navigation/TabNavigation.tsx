import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline' | 'minimal';
  fullWidth?: boolean;
  scrollable?: boolean;
}

/**
 * TabNavigation component for switching between related sections
 */
const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  orientation = 'horizontal',
  variant = 'default',
  fullWidth = false,
  scrollable = true,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(activeTab || tabs[0]?.id || '');
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLElement>(null);

  // Update active tab when prop changes
  useEffect(() => {
    if (activeTab && activeTab !== activeTabId) {
      setActiveTabId(activeTab);
    }
  }, [activeTab, activeTabId]);

  // Scroll to active tab in scrollable view
  useEffect(() => {
    if (scrollable && scrollRef.current && activeTabRef.current) {
      const container = scrollRef.current;
      const activeElement = activeTabRef.current;

      const containerWidth = container.offsetWidth;
      const activeElementLeft = activeElement.offsetLeft;
      const activeElementWidth = activeElement.offsetWidth;

      // Calculate center position
      const targetScrollPosition = activeElementLeft - containerWidth / 2 + activeElementWidth / 2;

      // Scroll smoothly
      container.scrollTo({
        left: Math.max(0, targetScrollPosition),
        behavior: 'smooth',
      });
    }
  }, [activeTabId, scrollable]);

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  // Different styles based on variant
  const getTabStyles = (tab: Tab) => {
    const isActive = tab.id === activeTabId;
    const isDisabled = tab.disabled;

    const baseStyles =
      'flex items-center py-2 px-3 text-sm font-medium transition-colors focus:outline-none';

    if (isDisabled) {
      return cn(baseStyles, 'text-gray-300 cursor-not-allowed');
    }

    switch (variant) {
      case 'pills':
        return cn(
          baseStyles,
          isActive
            ? 'bg-primary-100 text-primary-900 rounded-full'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full'
        );
      case 'underline':
        return cn(
          baseStyles,
          'px-1 border-b-2 mx-2',
          isActive
            ? 'border-primary-500 text-primary-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        );
      case 'minimal':
        return cn(
          baseStyles,
          'px-2',
          isActive ? 'text-primary-600 font-medium' : 'text-gray-500 hover:text-gray-700'
        );
      default:
        return cn(
          baseStyles,
          isActive
            ? 'bg-white text-primary-700 rounded-t-lg border-l border-r border-t border-gray-200'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-t-lg'
        );
    }
  };

  const containerStyles = cn(
    orientation === 'horizontal' ? 'flex flex-row' : 'flex flex-col',
    scrollable && orientation === 'horizontal' ? 'overflow-x-auto scrollbar-hide' : '',
    variant === 'default' && orientation === 'horizontal' ? 'border-b border-gray-200' : '',
    fullWidth && orientation === 'horizontal' ? 'w-full' : '',
    className
  );

  const tabListStyles = cn(
    orientation === 'horizontal' ? 'flex flex-row' : 'flex flex-col',
    fullWidth && orientation === 'horizontal' ? 'w-full' : '',
    variant === 'underline' && orientation === 'horizontal' ? '-mb-px' : ''
  );

  return (
    <div className={containerStyles} ref={scrollRef}>
      <div className={tabListStyles} role="tablist" aria-orientation={orientation}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const tabStyles = getTabStyles(tab);

          // Reference for scrolling
          const ref = isActive ? activeTabRef : undefined;

          const tabContent = (
            <>
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary-100 text-primary-800">
                  {tab.badge}
                </span>
              )}
            </>
          );

          return tab.href ? (
            // Tab with link
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                tabStyles,
                fullWidth && orientation === 'horizontal' ? 'flex-1 text-center justify-center' : ''
              )}
              // @ts-ignore - for scrolling functionality
              ref={ref}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !tab.disabled && handleTabChange(tab.id)}
            >
              {tabContent}
            </Link>
          ) : (
            // Tab without link
            <button
              key={tab.id}
              type="button"
              className={cn(
                tabStyles,
                fullWidth && orientation === 'horizontal' ? 'flex-1 text-center justify-center' : ''
              )}
              // @ts-ignore - for scrolling functionality
              ref={ref}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && handleTabChange(tab.id)}
            >
              {tabContent}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;
