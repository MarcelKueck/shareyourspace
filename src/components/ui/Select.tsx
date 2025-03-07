import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  label?: string;
  helperText?: string;
  error?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  selectWrapperClassName?: string;
  helperTextClassName?: string;
  errorClassName?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  onChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      options,
      label,
      helperText,
      error,
      wrapperClassName,
      labelClassName,
      selectWrapperClassName,
      helperTextClassName,
      errorClassName,
      isLoading,
      isSuccess,
      disabled,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

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

        <div className={cn('relative', selectWrapperClassName)}>
          <select
            className={cn(
              'form-select',
              error && 'form-input-error',
              isSuccess && 'form-input-success',
              'pr-10 appearance-none',
              className
            )}
            ref={ref}
            onChange={handleChange}
            disabled={disabled || isLoading}
            aria-invalid={!!error}
            aria-describedby={props.id ? `${props.id}-helper-text ${props.id}-error` : undefined}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            {isLoading ? (
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
            ) : isSuccess ? (
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
            ) : (
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
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

Select.displayName = 'Select';

export { Select };
