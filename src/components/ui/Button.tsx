import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Button Component - Part of Design System
 *
 * ACCESSIBILITY FEATURES:
 * - Semantic button element
 * - Focus management with visible focus ring
 * - High contrast support
 * - Keyboard navigation (Enter/Space)
 * - Screen reader support with proper labeling
 * - Loading state with aria-disabled
 */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      // Base styles
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      // High contrast mode support
      'contrast-more:border contrast-more:border-current',
    ];

    const variants = {
      primary: [
        'bg-blue-600 text-white hover:bg-blue-700',
        'focus-visible:ring-blue-600',
        'contrast-more:bg-blue-700 contrast-more:text-white',
      ],
      secondary: [
        'bg-gray-100 text-gray-900 hover:bg-gray-200',
        'focus-visible:ring-gray-500',
        'dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
        'contrast-more:bg-gray-200 contrast-more:text-black dark:contrast-more:bg-gray-700 dark:contrast-more:text-white',
      ],
      outline: [
        'border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-50',
        'focus-visible:ring-gray-500',
        'dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800',
        'contrast-more:border-black dark:contrast-more:border-white',
      ],
      ghost: [
        'hover:bg-gray-100 hover:text-gray-900',
        'focus-visible:ring-gray-500',
        'dark:hover:bg-gray-800 dark:hover:text-gray-100',
      ],
      danger: [
        'bg-red-600 text-white hover:bg-red-700',
        'focus-visible:ring-red-600',
        'contrast-more:bg-red-700 contrast-more:text-white',
      ],
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-8 text-lg',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span className={isLoading ? 'sr-only' : ''}>{children}</span>
        {isLoading && <span className="sr-only">Loading...</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
