import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  animate?: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, width, height, circle = false, animate = true, ...props }, ref) => {
    const style: React.CSSProperties = {
      ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
      ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
      ...(circle && { borderRadius: '9999px' }),
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-gray-200',
          animate && 'animate-pulse',
          circle ? 'rounded-full' : 'rounded',
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

interface SkeletonTextProps extends SkeletonProps {
  lines?: number;
  lastLineWidth?: string | number;
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, lines = 3, height = 20, width = '100%', lastLineWidth = '80%', ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {[...Array(lines)].map((_, index) => (
          <Skeleton
            key={index}
            width={index === lines - 1 && lastLineWidth ? lastLineWidth : width}
            height={height}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = 'SkeletonText';

interface SkeletonCardProps extends SkeletonProps {
  headerHeight?: string | number;
  footerHeight?: string | number;
}

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ className, headerHeight = 40, height = 200, footerHeight = 40, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('rounded-lg overflow-hidden shadow-enterprise', className)}
        {...props}
      >
        <Skeleton height={headerHeight} animate />
        <Skeleton height={height} animate />
        <Skeleton height={footerHeight} animate />
      </div>
    );
  }
);

SkeletonCard.displayName = 'SkeletonCard';

interface SkeletonAvatarProps extends SkeletonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const dimensions = {
      sm: 24,
      md: 40,
      lg: 64,
      xl: 96,
    };

    const dimension = dimensions[size];

    return (
      <Skeleton
        ref={ref}
        width={dimension}
        height={dimension}
        circle
        className={className}
        {...props}
      />
    );
  }
);

SkeletonAvatar.displayName = 'SkeletonAvatar';

export { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar };
