import React from 'react';
import Link from 'next/link';
import { GitHubRepository } from '@/types/github';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatDate, formatNumber, truncateText, cn } from '@/lib/utils';

/**
 * Repository Card Component
 *
 * ACCESSIBILITY FEATURES:
 * - Semantic HTML structure with proper heading hierarchy
 * - Screen reader friendly stats and metadata
 * - High contrast support for all elements
 * - Focus management for interactive elements
 * - Proper labeling for external links
 */

interface RepositoryCardProps {
  repository: GitHubRepository;
  className?: string;
}

export function RepositoryCard({ repository, className }: RepositoryCardProps) {
  return (
    <Card className={cn('h-full flex flex-col', className)} interactive>
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-lg">
          <Link
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
              'transition-colors break-words'
            )}
            aria-label={`View ${repository.name} repository on GitHub`}
          >
            {repository.name}
          </Link>
        </CardTitle>
        {repository.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            {truncateText(repository.description, 120)}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          {/* Repository Metadata */}
          <div className="flex flex-wrap gap-2">
            {repository.language && (
              <span
                className={cn(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                  'contrast-more:bg-blue-200 contrast-more:text-blue-900'
                )}
              >
                {repository.language}
              </span>
            )}

            {repository.fork && (
              <span
                className={cn(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
                  'contrast-more:bg-gray-200 contrast-more:text-gray-900'
                )}
              >
                Fork
              </span>
            )}

            {repository.archived && (
              <span
                className={cn(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                  'contrast-more:bg-yellow-200 contrast-more:text-yellow-900'
                )}
              >
                Archived
              </span>
            )}
          </div>

          {/* Topics */}
          {repository.topics && repository.topics.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Topics
              </h4>
              <div className="flex flex-wrap gap-1">
                {repository.topics.slice(0, 5).map(topic => (
                  <span
                    key={topic}
                    className={cn(
                      'inline-block px-2 py-1 text-xs rounded',
                      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
                      'contrast-more:bg-gray-200 contrast-more:text-gray-900'
                    )}
                  >
                    {topic}
                  </span>
                ))}
                {repository.topics.length > 5 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{repository.topics.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Repository Stats */}
        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              {/* Stars */}
              <div
                className="flex items-center space-x-1"
                title={`${formatNumber(repository.stargazers_count)} stars`}
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span
                  aria-label={`${formatNumber(repository.stargazers_count)} stars`}
                >
                  {formatNumber(repository.stargazers_count)}
                </span>
              </div>

              {/* Forks */}
              <div
                className="flex items-center space-x-1"
                title={`${formatNumber(repository.forks)} forks`}
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm8-8a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-8 1a5 5 0 0 0-5 5v3h2v-3a3 3 0 0 1 3-3 3 3 0 0 1 3 3v3h2v-3a5 5 0 0 0-5-5zm8 0a5 5 0 0 0-5 5v3h2v-3a3 3 0 0 1 3-3 3 3 0 0 1 3 3v3h2v-3a5 5 0 0 0-5-5z" />
                </svg>
                <span aria-label={`${formatNumber(repository.forks)} forks`}>
                  {formatNumber(repository.forks)}
                </span>
              </div>

              {/* Open Issues */}
              {repository.open_issues_count > 0 && (
                <div
                  className="flex items-center space-x-1"
                  title={`${formatNumber(repository.open_issues_count)} open issues`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span
                    aria-label={`${formatNumber(repository.open_issues_count)} open issues`}
                  >
                    {formatNumber(repository.open_issues_count)}
                  </span>
                </div>
              )}
            </div>

            {/* Last Updated */}
            <div
              className="text-xs"
              title={`Last updated: ${formatDate(repository.updated_at)}`}
            >
              Updated {formatDate(repository.updated_at)}
            </div>
          </div>

          {/* License */}
          {repository.license && (
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {repository.license.name}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Repository List Component
 *
 * ACCESSIBILITY FEATURES:
 * - Semantic list structure with proper ARIA labels
 * - Screen reader friendly grid layout
 * - Focus management for keyboard navigation
 */

interface RepositoryListProps {
  repositories: GitHubRepository[];
  className?: string;
}

export function RepositoryList({
  repositories,
  className,
}: RepositoryListProps) {
  if (repositories.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <svg
          className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          No repositories found
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          This user doesn&apos;t have any public repositories yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}
      role="list"
      aria-label="Repository list"
    >
      {repositories.map(repository => (
        <div key={repository.id} role="listitem">
          <RepositoryCard repository={repository} />
        </div>
      ))}
    </div>
  );
}
