import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const panelVariants = cva('rounded-lg overflow-hidden', {
  variants: {
    variant: {
      default: 'bg-gray-50 border border-gray-200',
      subtle: 'bg-gray-100 border border-gray-300',
      filled: 'bg-primary-50 border border-primary-100',
      outline: 'bg-white border-2 border-gray-300',
      plain: 'bg-transparent border border-gray-200',
    },
    interactive: {
      true: 'transition-colors hover:border-accent-300 cursor-pointer',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    interactive: false,
  },
});

export interface PanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, variant, interactive, ...props }, ref) => {
    return (
      <div
        className={cn(panelVariants({ variant, interactive, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Panel.displayName = 'Panel';

const PanelHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-4 py-3 border-b border-gray-200 bg-gray-100', className)}
      {...props}
    />
  )
);
PanelHeader.displayName = 'PanelHeader';

const PanelTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h4 ref={ref} className={cn('text-base font-medium text-primary-900', className)} {...props} />
  )
);
PanelTitle.displayName = 'PanelTitle';

const PanelDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-gray-500 mt-1', className)} {...props} />
));
PanelDescription.displayName = 'PanelDescription';

const PanelContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-4', className)} {...props} />
);
PanelContent.displayName = 'PanelContent';

const PanelFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-4 py-3 border-t border-gray-200 bg-gray-100', className)}
      {...props}
    />
  )
);
PanelFooter.displayName = 'PanelFooter';

export { Panel, PanelHeader, PanelTitle, PanelDescription, PanelContent, PanelFooter };
