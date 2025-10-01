import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Header Component with Navigation
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic navigation with nav element
 * - Skip link for keyboard users
 * - Focus management for mobile menu
 * - ARIA labels for screen readers
 * - High contrast support
 */

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <>
      {/* Skip link for keyboard navigation */}
      <a
        href="#main-content"
        className={cn(
          'sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50',
          'bg-blue-600 text-white px-4 py-2 rounded-md font-medium',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600'
        )}
      >
        Skip to main content
      </a>
      
      <header className={cn('border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950', className)}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo / Home Link */}
            <Link
              href="/"
              className={cn(
                'text-xl font-bold text-gray-900 dark:text-gray-100',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
                'hover:text-blue-600 transition-colors'
              )}
              aria-label="GitHub Portfolio - Home"
            >
              GitHub Portfolio
            </Link>

            {/* Navigation */}
            <nav role="navigation" aria-label="Main navigation">
              <ul className="flex space-x-8">
                <li>
                  <Link
                    href="/profile"
                    className={cn(
                      'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
                      'transition-colors font-medium',
                      'contrast-more:text-black contrast-more:hover:text-blue-800 dark:contrast-more:text-white'
                    )}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/repositories"
                    className={cn(
                      'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
                      'transition-colors font-medium',
                      'contrast-more:text-black contrast-more:hover:text-blue-800 dark:contrast-more:text-white'
                    )}
                  >
                    Repositories
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

/**
 * Footer Component
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic footer element
 * - Proper content structure
 * - High contrast support
 */

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900', className)}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Built with Next.js 14, TypeScript, and Tailwind CSS for demonstration purposes.
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            Showcasing different data fetching strategies, accessibility best practices, and modern React patterns.
          </p>
        </div>
      </div>
    </footer>
  );
}