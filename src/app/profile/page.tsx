import { Metadata } from 'next';
import { fetchUserServer } from '@/lib/github-api';
import { UserProfileCard } from '@/components/github/UserProfileCard';
import { ErrorMessage } from '@/components/ui/Status';

/**
 * Profile Page - Server-Side Rendering (SSR) Example
 * 
 * DATA FETCHING STRATEGY: Server-Side Rendering
 * 
 * TRADE-OFFS:
 * - Pros: 
 *   * SEO-friendly (content rendered on server)
 *   * Fast initial page load (no loading states)
 *   * Works without JavaScript
 *   * Fresh data on every request
 * 
 * - Cons:
 *   * Slower navigation (full server round-trip)
 *   * Higher server load
 *   * No caching between requests
 *   * Blocking rendering on data fetch
 * 
 * BEST FOR: 
 * - SEO-critical pages
 * - Content that changes frequently
 * - When you need guaranteed fresh data
 * - Public-facing profile pages
 */

const USERNAME = 'gabschlemper'; // You can make this dynamic via params

export async function generateMetadata(): Promise<Metadata> {
  try {
    const user = await fetchUserServer(USERNAME);
    return {
      title: `${user.name || user.login} - GitHub Profile`,
      description: user.bio || `View ${user.name || user.login}'s GitHub profile, repositories, and contributions.`,
      openGraph: {
        title: `${user.name || user.login} - GitHub Profile`,
        description: user.bio || `View ${user.name || user.login}'s GitHub profile, repositories, and contributions.`,
        images: [user.avatar_url],
        type: 'profile',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${user.name || user.login} - GitHub Profile`,
        description: user.bio || `View ${user.name || user.login}'s GitHub profile.`,
        images: [user.avatar_url],
      },
    };
  } catch (error) {
    return {
      title: 'GitHub Profile - Not Found',
      description: 'The requested GitHub profile could not be found.',
    };
  }
}

export default async function ProfilePage() {
  try {
    // SERVER-SIDE DATA FETCHING
    // This runs on the server before the page is sent to the client
    // The user will see the fully rendered page immediately
    const user = await fetchUserServer(USERNAME);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              GitHub Profile
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Server-Side Rendered (SSR) - Fresh data on every page load
            </p>
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-4xl mx-auto">
              <h2 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                💡 Technical Implementation Note
              </h2>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                This page uses <strong>Server-Side Rendering (SSR)</strong>. The data is fetched on the server 
                before the page is sent to your browser, ensuring SEO-friendly content and fast initial rendering. 
                However, navigation to this page may be slower as it requires a full server round-trip.
              </p>
            </div>
          </div>

          {/* User Profile Card */}
          <UserProfileCard user={user} />

          {/* Implementation Details */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              SSR Implementation Details
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold mb-4">How this page works:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <strong>Server-side data fetching:</strong> User data is fetched on the server using the GitHub API before the HTML is generated
                  </li>
                  <li>
                    <strong>SEO optimization:</strong> Search engines can crawl the fully rendered content, improving discoverability
                  </li>
                  <li>
                    <strong>Fresh data guarantee:</strong> Every page load fetches the latest data directly from GitHub
                  </li>
                  <li>
                    <strong>No loading states:</strong> Users see the complete page immediately without spinners or skeleton screens
                  </li>
                  <li>
                    <strong>Error handling:</strong> Server-side errors are handled gracefully with proper error pages
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Server-side error handling
    console.error('Error fetching user data:', error);
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              GitHub Profile
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Server-Side Rendered (SSR)
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <ErrorMessage 
              message={
                error instanceof Error 
                  ? `Failed to load profile: ${error.message}` 
                  : 'Failed to load GitHub profile. Please try again later.'
              }
            />
            
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                What happened?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This page uses server-side rendering (SSR), which means the GitHub API is called on the server 
                before the page is sent to your browser. The error occurred during this server-side data fetching process.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Common causes include API rate limiting, network issues, or the user not existing. 
                Try refreshing the page or check back later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}