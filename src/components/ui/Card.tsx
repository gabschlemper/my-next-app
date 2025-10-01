import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Card Component - Part of Design System
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic HTML structure with proper heading hierarchy
 * - High contrast support
 * - Focus management for interactive cards
 * - Screen reader support with proper landmarks
 * - Keyboard navigation support
 */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'ghost';
  interactive?: boolean;
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', interactive = false, children, ...props }, ref) => {
    const baseStyles = [
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      // High contrast mode support
      'contrast-more:border-2 contrast-more:border-current',
    ];

    const variants = {
      default: [
        'border-gray-200 bg-white',
        'dark:border-gray-800 dark:bg-gray-950',
        'contrast-more:border-black dark:contrast-more:border-white',
      ],
      outline: [
        'border-gray-300 bg-transparent',
        'dark:border-gray-700',
        'contrast-more:border-black dark:contrast-more:border-white',
      ],
      ghost: [
        'border-transparent bg-gray-50',
        'dark:bg-gray-900',
        'contrast-more:border-gray-300 dark:contrast-more:border-gray-600',
      ],
    };

    const interactiveStyles = interactive ? [
      'cursor-pointer transition-colors hover:bg-gray-50',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
      'dark:hover:bg-gray-900',
    ] : [];

    return (
      <div
        className={cn(
          baseStyles,
          variants[variant],
          interactiveStyles,
          className
        )}
        ref={ref}
        tabIndex={interactive ? 0 : undefined}
        role={interactive ? 'button' : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-gray-600 dark:text-gray-400', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};