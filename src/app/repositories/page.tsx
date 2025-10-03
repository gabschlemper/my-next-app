'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SWRConfig } from 'swr';
import { useGitHubRepositories, useGitHubUser } from '@/hooks/useGitHub';
import { RepositoryList } from '@/components/github/RepositoryCard';
import { LoadingSpinner, ErrorMessage } from '@/components/ui/Status';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

/**
 * Repositories Page - Client-Side Rendering with SWR
 *
 * DATA FETCHING STRATEGY: Client-Side with SWR Caching
 *
 * TRADE-OFFS:
 * - Pros:
 *   * Fast navigation (cached data)
 *   * Real-time updates and background refresh
 *   * Optimistic UI updates
 *   * Automatic retry and error recovery
 *   * Reduced server load through caching
 *   * Great user experience with loading states
 *
 * - Cons:
 *   * No SEO (content not server-rendered)
 *   * Requires JavaScript to function
 *   * Initial loading state visible to users
 *   * Potential for stale data (mitigated by revalidation)
 *
 * BEST FOR:
 * - Interactive dashboards
 * - User-specific content
 * - Data that updates frequently
 * - When fast navigation is priority
 */

const USERNAME = 'gabschlemper';
const REPOSITORIES_PER_PAGE = 12;

function RepositoriesContent() {
  const [currentPage, setCurrentPage] = useState(1);

  // SWR hooks for data fetching with automatic caching
  const {
    user,
    isLoading: userLoading,
    error: userError,
    refresh: refreshUser,
  } = useGitHubUser(USERNAME);

  const {
    repositories,
    isLoading: reposLoading,
    error: reposError,
    refresh: refreshRepositories,
  } = useGitHubRepositories(USERNAME, {
    page: currentPage,
    perPage: REPOSITORIES_PER_PAGE,
  });

  const handleRetry = () => {
    refreshUser();
    refreshRepositories();
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Error state
  if (userError || reposError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              GitHub Repositories
            </h1>
          </div>

          <div className="max-w-2xl mx-auto">
            <ErrorMessage
              message={
                userError?.message ||
                reposError?.message ||
                'Failed to load repositories'
              }
              retry={handleRetry}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
            GitHub Repositories
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Client-Side Rendering with SWR - Cached data with background updates
          </p>
          <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
              💡 Technical Implementation Note
            </h2>
            <p className="text-sm text-green-800 dark:text-green-200">
              This page uses <strong>SWR (Stale-While-Revalidate)</strong> for
              data fetching. Data is cached locally and automatically
              revalidated in the background, providing fast navigation while
              keeping content fresh. Try navigating away and back to see the
              instant load from cache!
            </p>
          </div>
        </div>

        {/* User Info Bar */}
        {userLoading ? (
          <div className="flex justify-center mb-8">
            <LoadingSpinner size="md" label="Loading user information..." />
          </div>
        ) : user ? (
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-lg px-6 py-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <Image
                src={user.avatar_url}
                alt={`${user.name || user.login}'s avatar`}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {user.name || user.login}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.public_repos} public repositories
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Repositories List */}
        {reposLoading && repositories.length === 0 ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" label="Loading repositories..." />
          </div>
        ) : (
          <>
            <RepositoryList repositories={repositories} />

            {/* Pagination Controls */}
            <div className="mt-12 flex justify-center space-x-4">
              <Button
                variant="secondary"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || reposLoading}
              >
                Previous Page
              </Button>
              <span className="flex items-center px-4 text-gray-700 dark:text-gray-300">
                Page {currentPage}
              </span>
              <Button
                variant="secondary"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  repositories.length < REPOSITORIES_PER_PAGE || reposLoading
                }
                isLoading={reposLoading && repositories.length > 0}
              >
                Next Page
              </Button>
            </div>
          </>
        )}

        {/* Implementation Details */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
            SWR Implementation Details
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Client-Side Data Fetching with SWR</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    Key Features Demonstrated:
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>
                      <strong>Automatic Caching:</strong> Data is cached in
                      memory and persists across page navigations
                    </li>
                    <li>
                      <strong>Background Revalidation:</strong> Fresh data is
                      fetched in the background while showing cached content
                    </li>
                    <li>
                      <strong>Error Recovery:</strong> Automatic retry with
                      exponential backoff on network failures
                    </li>
                    <li>
                      <strong>Loading States:</strong> Proper loading indicators
                      for better user experience
                    </li>
                    <li>
                      <strong>Pagination:</strong> Client-side pagination with
                      cached pages for fast navigation
                    </li>
                    <li>
                      <strong>Focus Revalidation:</strong> Data refreshes when
                      you return to the browser tab
                    </li>
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    Try these interactions:
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>
                      • Navigate to another page and come back (instant load
                      from cache)
                    </li>
                    <li>
                      • Switch browser tabs and return (background revalidation)
                    </li>
                    <li>• Use pagination (see cached vs loading states)</li>
                    <li>• Disconnect internet and retry (error handling)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function RepositoriesPage() {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 3,
        errorRetryInterval: 1000,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        dedupingInterval: 2000, //
      }}
    >
      <RepositoriesContent />
    </SWRConfig>
  );
}
