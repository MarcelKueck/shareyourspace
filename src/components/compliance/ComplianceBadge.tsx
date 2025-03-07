import React from 'react';
import { cn } from '@/lib/utils';
import { ComplianceLevel } from '@/models/user';

interface ComplianceBadgeProps {
  level: ComplianceLevel;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

/**
 * Badge component that visualizes the compliance level of a space or company
 * Displays both the level and verification status with appropriate colors and icons
 */
const ComplianceBadge: React.FC<ComplianceBadgeProps> = ({
  level,
  verificationStatus,
  size = 'md',
  showTooltip = true,
  className,
}) => {
  // Size-specific classes
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-2.5 py-1.5',
    lg: 'text-base px-3 py-1.5',
  };

  // Status-specific icons
  const StatusIcon = () => {
    switch (verificationStatus) {
      case 'verified':
        return (
          <svg
            className="h-4 w-4 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'pending':
        return (
          <svg
            className="h-4 w-4 text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'rejected':
        return (
          <svg
            className="h-4 w-4 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  // Level-specific styles
  const getLevelStyles = () => {
    switch (level) {
      case ComplianceLevel.BASIC:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case ComplianceLevel.STANDARD:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case ComplianceLevel.ENTERPRISE:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case ComplianceLevel.ENTERPRISE_PLUS:
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Format level for display
  const formatLevel = (level: ComplianceLevel) => {
    switch (level) {
      case ComplianceLevel.BASIC:
        return 'Basic';
      case ComplianceLevel.STANDARD:
        return 'Standard';
      case ComplianceLevel.ENTERPRISE:
        return 'Enterprise';
      case ComplianceLevel.ENTERPRISE_PLUS:
        return 'Enterprise+';
      default:
        return level;
    }
  };

  // Tooltip content based on level
  const getTooltipText = () => {
    switch (level) {
      case ComplianceLevel.BASIC:
        return 'Basic compliance validation';
      case ComplianceLevel.STANDARD:
        return 'Standard compliance with essential security requirements';
      case ComplianceLevel.ENTERPRISE:
        return 'Enterprise-grade compliance with advanced security measures';
      case ComplianceLevel.ENTERPRISE_PLUS:
        return 'Highest level of compliance with premium security and regulatory standards';
      default:
        return '';
    }
  };

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'inline-flex items-center rounded-full border font-medium',
          getLevelStyles(),
          sizeClasses[size],
          className
        )}
      >
        <span className="flex-shrink-0 mr-1">
          <StatusIcon />
        </span>
        <span>{formatLevel(level)}</span>
      </div>

      {showTooltip && (
        <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-1 p-2 bg-black bg-opacity-75 rounded text-xs text-white whitespace-nowrap">
          {getTooltipText()}
        </div>
      )}
    </div>
  );
};

export { ComplianceBadge };
