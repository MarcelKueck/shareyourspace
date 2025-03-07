import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  wrapperClassName?: string;
  labelClassName?: string;
  inputWrapperClassName?: string;
  helperTextClassName?: string;
  errorClassName?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      helperText,
      error,
      leftAddon,
      rightAddon,
      wrapperClassName,
      labelClassName,
      inputWrapperClassName,
      helperTextClassName,
      errorClassName,
      isLoading,
      isSuccess,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('space-y-1', wrapperClassName)}>
        {label && (
          <label
            htmlFor={props.id}
            className={cn('form-label', error && 'text-error', labelClassName)}
          >
            {label}
          </label>
        )}

        <div className={cn('relative', inputWrapperClassName)}>
          {leftAddon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftAddon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              'form-input',
              error && 'form-input-error',
              isSuccess && 'form-input-success',
              leftAddon && 'pl-10',
              rightAddon && 'pr-10',
              className
            )}
            ref={ref}
            disabled={disabled || isLoading}
            aria-invalid={!!error}
            aria-describedby={props.id ? `${props.id}-helper-text ${props.id}-error` : undefined}
            {...props}
          />

          {rightAddon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightAddon}
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="animate-spin h-4 w-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}

          {isSuccess && !isLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-success"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {helperText && !error && (
          <p
            id={props.id ? `${props.id}-helper-text` : undefined}
            className={cn('form-hint', helperTextClassName)}
          >
            {helperText}
          </p>
        )}

        {error && (
          <p
            id={props.id ? `${props.id}-error` : undefined}
            className={cn('form-error', errorClassName)}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
