import useSWR from 'swr';
import { fetchUser, fetchRepositories, swrKeys } from '@/lib/github-api';

/**
 * SWR Hooks for GitHub API
 *
 * CLIENT-SIDE CACHING STRATEGY:
 * - Uses SWR for automatic caching, revalidation, and error handling
 * - Optimistic updates and background refreshing
 * - Automatic retry on failure
 * - Deduplication of requests
 *
 * TRADE-OFFS:
 * - Pros: Real-time data, optimistic UI, automatic caching, great UX
 * - Cons: No SEO, loading states, requires JavaScript, network dependent
 *
 * Best for: Interactive features, user dashboards, real-time updates
 */

interface UseGitHubUserOptions {
  revalidateOnFocus?: boolean;
  refreshInterval?: number;
}

export function useGitHubUser(
  username: string,
  options: UseGitHubUserOptions = {}
) {
  const {
    revalidateOnFocus = true,
    refreshInterval = 0, // No automatic refresh by default
  } = options;

  const { data, error, isLoading, mutate } = useSWR(
    username ? swrKeys.user(username) : null,
    () => fetchUser(username),
    {
      revalidateOnFocus,
      refreshInterval,
      // Cache for 5 minutes
      dedupingInterval: 5 * 60 * 1000,
      // Show stale data while revalidating
      revalidateIfStale: true,
      // Retry on error with exponential backoff
      errorRetryCount: 3,
      errorRetryInterval: 1000,
    }
  );

  return {
    user: data,
    isLoading,
    error,
    refresh: mutate,
  };
}

interface UseGitHubRepositoriesOptions {
  page?: number;
  perPage?: number;
  revalidateOnFocus?: boolean;
  refreshInterval?: number;
}

export function useGitHubRepositories(
  username: string,
  options: UseGitHubRepositoriesOptions = {}
) {
  const {
    page = 1,
    perPage = 10,
    revalidateOnFocus = true,
    refreshInterval = 0,
  } = options;

  const { data, error, isLoading, mutate } = useSWR(
    username ? swrKeys.repositories(username, page, perPage) : null,
    () => fetchRepositories(username, page, perPage),
    {
      revalidateOnFocus,
      refreshInterval,
      // Cache for 2 minutes (repositories change more frequently)
      dedupingInterval: 2 * 60 * 1000,
      revalidateIfStale: true,
      errorRetryCount: 3,
      errorRetryInterval: 1000,
    }
  );

  return {
    repositories: data || [],
    isLoading,
    error,
    refresh: mutate,
  };
}

/**
 * Combined hook for fetching user and repositories together
 * Useful for pages that need both datasets
 */
export function useGitHubProfile(
  username: string,
  repositoriesPerPage: number = 6
) {
  const userQuery = useGitHubUser(username);
  const repositoriesQuery = useGitHubRepositories(username, {
    perPage: repositoriesPerPage,
  });

  return {
    user: userQuery.user,
    repositories: repositoriesQuery.repositories,
    isLoading: userQuery.isLoading || repositoriesQuery.isLoading,
    error: userQuery.error || repositoriesQuery.error,
    refreshUser: userQuery.refresh,
    refreshRepositories: repositoriesQuery.refresh,
    refreshAll: () => {
      userQuery.refresh();
      repositoriesQuery.refresh();
    },
  };
}
