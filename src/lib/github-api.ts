import { GitHubUser, GitHubRepository } from '@/types/github';

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * GitHub API Service
 * 
 * This service provides different data fetching strategies:
 * 1. Server-side fetching (for SSR/SSG)
 * 2. Client-side fetching (for SWR/CSR)
 * 
 * Each method includes error handling and proper typing
 */

export class GitHubApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public documentation_url?: string
  ) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

/**
 * Generic fetch wrapper with error handling
 * Used by both server and client-side methods
 */
async function fetchWithErrorHandling<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Portfolio-Demo',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new GitHubApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData.documentation_url
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof GitHubApiError) {
      throw error;
    }
    throw new GitHubApiError(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}

/**
 * SERVER-SIDE DATA FETCHING
 * Best for: SEO-critical pages, data that doesn't change frequently
 * Trade-offs: 
 * - Pros: SEO-friendly, fast initial render, works without JS
 * - Cons: Slower navigation, server load on each request
 */
export async function fetchUserServer(username: string): Promise<GitHubUser> {
  return fetchWithErrorHandling<GitHubUser>(`${GITHUB_API_BASE}/users/${username}`);
}

export async function fetchRepositoriesServer(
  username: string,
  page: number = 1,
  perPage: number = 10
): Promise<GitHubRepository[]> {
  return fetchWithErrorHandling<GitHubRepository[]>(
    `${GITHUB_API_BASE}/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`
  );
}

/**
 * CLIENT-SIDE DATA FETCHING
 * Best for: Interactive features, real-time data, user-specific content
 * Trade-offs:
 * - Pros: Fast navigation, reduced server load, real-time updates
 * - Cons: Loading states, no SEO, requires JS, slower initial render
 */
export const fetchUser = async (username: string): Promise<GitHubUser> => {
  return fetchWithErrorHandling<GitHubUser>(`${GITHUB_API_BASE}/users/${username}`);
};

export const fetchRepositories = async (
  username: string,
  page: number = 1,
  perPage: number = 10
): Promise<GitHubRepository[]> => {
  return fetchWithErrorHandling<GitHubRepository[]>(
    `${GITHUB_API_BASE}/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`
  );
};

/**
 * SWR Key generators for consistent caching
 */
export const swrKeys = {
  user: (username: string) => `user-${username}`,
  repositories: (username: string, page: number, perPage: number) => 
    `repos-${username}-${page}-${perPage}`,
} as const;