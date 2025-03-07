import * as React from 'react';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  orientation?: 'horizontal' | 'vertical';
  wrapperClassName?: string;
  labelClassName?: string;
  optionsWrapperClassName?: string;
  radioClassName?: string;
  optionLabelClassName?: string;
  optionDescriptionClassName?: string;
  errorClassName?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  className,
  name,
  options,
  value,
  onChange,
  label,
  error,
  orientation = 'vertical',
  wrapperClassName,
  labelClassName,
  optionsWrapperClassName,
  radioClassName,
  optionLabelClassName,
  optionDescriptionClassName,
  errorClassName,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={cn('space-y-3', wrapperClassName, className)} {...props}>
      {label && (
        <span className={cn('form-label block', error && 'text-error', labelClassName)}>
          {label}
        </span>
      )}

      <div
        className={cn(
          'space-y-4',
          orientation === 'horizontal' && 'flex flex-wrap space-y-0 space-x-6',
          optionsWrapperClassName
        )}
        role="radiogroup"
        aria-labelledby={label ? `${name}-label` : undefined}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
                disabled={option.disabled}
                className={cn(
                  'form-radio',
                  error && 'border-error focus:ring-error',
                  radioClassName
                )}
                aria-invalid={!!error}
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor={`${name}-${option.value}`}
                className={cn(
                  'font-medium text-gray-700',
                  option.disabled && 'text-gray-400',
                  optionLabelClassName
                )}
              >
                {option.label}
              </label>
              {option.description && (
                <p
                  className={cn(
                    'text-gray-500',
                    option.disabled && 'text-gray-400',
                    optionDescriptionClassName
                  )}
                >
                  {option.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className={cn('form-error mt-1', errorClassName)} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export { RadioGroup };
