import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      description,
      error,
      wrapperClassName,
      labelClassName,
      checkboxClassName,
      descriptionClassName,
      errorClassName,
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(ref, internalRef);

    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className={cn('relative flex items-start', wrapperClassName)}>
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className={cn(
              'form-checkbox',
              error && 'border-error focus:ring-error',
              checkboxClassName
            )}
            ref={combinedRef}
            aria-invalid={!!error}
            aria-describedby={props.id ? `${props.id}-description ${props.id}-error` : undefined}
            {...props}
          />
        </div>

        {(label || description) && (
          <div className="ml-3 text-sm">
            {label && (
              <label
                htmlFor={props.id}
                className={cn(
                  'font-medium text-gray-700',
                  error && 'text-error',
                  props.disabled && 'text-gray-400',
                  labelClassName
                )}
              >
                {label}
              </label>
            )}

            {description && (
              <p
                id={props.id ? `${props.id}-description` : undefined}
                className={cn(
                  'text-gray-500',
                  props.disabled && 'text-gray-400',
                  descriptionClassName
                )}
              >
                {description}
              </p>
            )}

            {error && (
              <p
                id={props.id ? `${props.id}-error` : undefined}
                className={cn('form-error mt-1', errorClassName)}
                role="alert"
              >
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

// Helper to combine refs
function useCombinedRefs<T>(...refs: Array<React.Ref<T> | null | undefined>) {
  const targetRef = React.useRef<T>(null);

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        // @ts-ignore
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

Checkbox.displayName = 'Checkbox';

export { Checkbox };
