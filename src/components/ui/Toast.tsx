import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const toastVariants = cva(
  'max-w-sm rounded-lg shadow-premium bg-white border border-gray-100 pointer-events-auto overflow-hidden',
  {
    variants: {
      variant: {
        default: '',
        success: 'border-l-4 border-l-success',
        info: 'border-l-4 border-l-info',
        warning: 'border-l-4 border-l-warning',
        error: 'border-l-4 border-l-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  showProgress?: boolean;
}

// Context for the toast provider
type ToastContextType = {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
};

type Toast = ToastProps & { id: string };

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const value = React.useMemo(
    () => ({ toasts, addToast, removeToast }),
    [toasts, addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-end justify-start p-4 pointer-events-none space-y-4 sm:p-6">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
          className="animate-fade-in"
        />
      ))}
    </div>
  );
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant,
      title,
      description,
      icon,
      onClose,
      autoClose = true,
      autoCloseDelay = 5000,
      showProgress = true,
      children,
      ...props
    },
    ref
  ) => {
    const [progress, setProgress] = React.useState(100);

    React.useEffect(() => {
      if (!autoClose) return;

      let intervalId: NodeJS.Timeout;
      let timeoutId: NodeJS.Timeout;

      if (showProgress) {
        const step = 100 / (autoCloseDelay / 100);
        intervalId = setInterval(() => {
          setProgress((prevProgress) => {
            const newProgress = prevProgress - step;
            return newProgress < 0 ? 0 : newProgress;
          });
        }, 100);
      }

      timeoutId = setTimeout(() => {
        if (onClose) onClose();
      }, autoCloseDelay);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }, [autoClose, autoCloseDelay, onClose, showProgress]);

    const IconComponent = () => {
      if (icon) return <>{icon}</>;

      switch (variant) {
        case 'success':
          return (
            <svg
              className="w-6 h-6 text-success"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          );
        case 'info':
          return (
            <svg
              className="w-6 h-6 text-info"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                clipRule="evenodd"
              />
            </svg>
          );
        case 'warning':
          return (
            <svg
              className="w-6 h-6 text-warning"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          );
        case 'error':
          return (
            <svg
              className="w-6 h-6 text-error"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
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

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), 'relative', className)}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        {...props}
      >
        <div className="flex p-4">
          {(icon || variant) && (
            <div className="flex-shrink-0 mr-3">
              <IconComponent />
            </div>
          )}
          <div className="w-0 flex-1 pt-0.5">
            {title && <p className="text-sm font-medium text-gray-900">{title}</p>}
            {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            {children}
          </div>
          {onClose && (
            <div className="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        {showProgress && autoClose && (
          <div className="h-1 w-full bg-gray-200">
            <div
              className={cn(
                'h-full transition-all duration-100',
                variant === 'success' && 'bg-success',
                variant === 'info' && 'bg-info',
                variant === 'warning' && 'bg-warning',
                variant === 'error' && 'bg-error',
                variant === 'default' && 'bg-primary-500'
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export { Toast };
