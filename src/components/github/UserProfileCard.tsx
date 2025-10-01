import React from 'react';
import Image from 'next/image';
import { GitHubUser } from '@/types/github';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatDate, formatNumber, cn } from '@/lib/utils';

/**
 * GitHub User Profile Card Component
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic HTML structure with proper heading hierarchy
 * - Alt text for profile image
 * - Screen reader friendly stats with proper labeling
 * - High contrast support
 * - Focus management for interactive elements
 * 
 * DESIGN SYSTEM INTEGRATION:
 * - Uses Card component from our design system
 * - Consistent spacing and typography
 * - Responsive design with mobile-first approach
 */

interface UserProfileCardProps {
  user: GitHubUser;
  className?: string;
}

export function UserProfileCard({ user, className }: UserProfileCardProps) {
  return (
    <Card className={cn('w-full max-w-2xl mx-auto', className)}>
      <CardHeader className="text-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Image */}
          <div className="relative">
            <Image
              src={user.avatar_url}
              alt={`${user.name || user.login}'s profile picture`}
              width={120}
              height={120}
              className="rounded-full border-4 border-gray-200 dark:border-gray-700"
              priority
            />
            {/* Online indicator (if available) */}
            <div 
              className="absolute bottom-2 right-2 h-6 w-6 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"
              aria-hidden="true"
            />
          </div>
          
          {/* User Info */}
          <div className="space-y-2">
            <CardTitle className="text-center">
              {user.name || user.login}
            </CardTitle>
            {user.name && (
              <p className="text-lg text-gray-600 dark:text-gray-400 font-mono">
                @{user.login}
              </p>
            )}
            {user.bio && (
              <p className="text-gray-700 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                {user.bio}
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* User Details */}
        <div className="space-y-4">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.location && (
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <svg 
                  className="h-4 w-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{user.location}</span>
              </div>
            )}
            
            {user.company && (
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <svg 
                  className="h-4 w-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>{user.company}</span>
              </div>
            )}
            
            {user.blog && (
              <div className="flex items-center space-x-2 text-sm">
                <svg 
                  className="h-4 w-4 text-gray-600 dark:text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <a 
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
                    'underline transition-colors'
                  )}
                  aria-label={`Visit ${user.name || user.login}'s website`}
                >
                  {user.blog}
                </a>
              </div>
            )}
            
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <svg 
                className="h-4 w-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Joined {formatDate(user.created_at)}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              GitHub Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatNumber(user.public_repos)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Public Repos
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatNumber(user.followers)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Followers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatNumber(user.following)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Following
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatNumber(user.public_gists)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Public Gists
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Link */}
          <div className="pt-4 text-center">
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
                'font-medium transition-colors'
              )}
              aria-label={`View ${user.name || user.login}'s GitHub profile`}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}