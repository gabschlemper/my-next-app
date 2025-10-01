import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Loading Spinner Component
 * 
 * ACCESSIBILITY FEATURES:
 * - Screen reader announcement with role="status"
 * - Proper labeling with aria-label
 * - Hidden decorative elements with aria-hidden
 * - Visual indicator for loading states
 */

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  className,
  label = 'Loading...' 
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div
      role="status"
      aria-label={label}
      className={cn('flex items-center justify-center', className)}
    >
      <svg
        className={cn(
          'animate-spin text-blue-600',
          sizes[size]
        )}
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
      <span className="sr-only">{label}</span>
    </div>
  );
}

/**
 * Error Message Component
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic error role with role="alert"
 * - Proper color contrast for error states
 * - Screen reader announcement
 */

export interface ErrorMessageProps {
  message: string;
  retry?: () => void;
  className?: string;
}

export function ErrorMessage({ message, retry, className }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className={cn(
        'rounded-md border border-red-200 bg-red-50 p-4 text-red-900',
        'dark:border-red-800 dark:bg-red-950 dark:text-red-200',
        'contrast-more:border-red-600 contrast-more:bg-red-100 contrast-more:text-red-800',
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <svg
          className="h-5 w-5 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-sm font-medium">{message}</p>
      </div>
      {retry && (
        <button
          onClick={retry}
          className={cn(
            'mt-2 text-sm text-red-700 underline hover:text-red-800',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-red-50',
            'dark:text-red-300 dark:hover:text-red-200',
            'contrast-more:text-red-800 contrast-more:no-underline contrast-more:font-bold'
          )}
        >
          Try again
        </button>
      )}
    </div>
  );
}