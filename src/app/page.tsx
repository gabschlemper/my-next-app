import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

/**
 * Home Page - Landing and Demo Overview
 *
 * This page serves as the entry point and explains the different
 * data fetching strategies implemented in the application.
 *
 * ACCESSIBILITY FEATURES:
 * - Semantic HTML structure with proper heading hierarchy
 * - Skip links for keyboard navigation (in layout)
 * - High contrast support throughout
 * - Screen reader friendly content structure
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
            GitHub Portfolio Demo
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive Next.js 14 application showcasing modern data
            fetching strategies, TypeScript integration, accessibility best
            practices, and clean component architecture.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/profile">
              <Button size="lg">View Profile Demo</Button>
            </Link>
            <Link href="/repositories">
              <Button variant="secondary" size="lg">
                Browse Repositories
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Technical Implementation Highlights
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Data Fetching Strategies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                  <span>Data Fetching</span>
                </CardTitle>
                <CardDescription>
                  Multiple strategies implemented with detailed trade-off
                  analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• CSR with useEffect (React hooks)</li>
                  <li>• Client-side caching with SWR</li>
                  <li>• Server-side rendering examples</li>
                  <li>• Error handling and loading states</li>
                </ul>
              </CardContent>
            </Card>

            {/* Accessibility */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Accessibility (a11y)</span>
                </CardTitle>
                <CardDescription>
                  WCAG 2.1 AA compliant with comprehensive screen reader support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Semantic HTML structure</li>
                  <li>• Keyboard navigation support</li>
                  <li>• High contrast mode support</li>
                  <li>• ARIA labels and live regions</li>
                </ul>
              </CardContent>
            </Card>

            {/* Design System */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>Design System</span>
                </CardTitle>
                <CardDescription>
                  Reusable components with accessibility baked in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Button component variants</li>
                  <li>• Card system with proper semantics</li>
                  <li>• Loading and error states</li>
                  <li>• Dark mode and high contrast</li>
                </ul>
              </CardContent>
            </Card>

            {/* Next.js Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg
                    className="h-6 w-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>Next.js 14 Features</span>
                </CardTitle>
                <CardDescription>
                  Modern App Router with server and client components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• App directory structure</li>
                  <li>• Nested layouts and routing</li>
                  <li>• Server/Client component patterns</li>
                  <li>• TypeScript integration</li>
                </ul>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <span>Performance</span>
                </CardTitle>
                <CardDescription>
                  Optimized loading, caching, and user experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Image optimization with Next.js</li>
                  <li>• SWR caching strategies</li>
                  <li>• Loading states and skeletons</li>
                  <li>• Error boundaries and retry logic</li>
                </ul>
              </CardContent>
            </Card>

            {/* GitHub Integration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg
                    className="h-6 w-6 text-gray-900 dark:text-gray-100"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>GitHub API Integration</span>
                </CardTitle>
                <CardDescription>
                  Real GitHub data with comprehensive error handling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• User profile information</li>
                  <li>• Repository listings with metadata</li>
                  <li>• Pagination and filtering</li>
                  <li>• Rate limiting awareness</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Ready to explore the implementation?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Navigate through the application to see different data fetching
            strategies in action, from server-side rendering to client-side
            caching with SWR.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/profile">
              <Button size="lg">Start with Profile Page</Button>
            </Link>
            <Link href="/repositories">
              <Button variant="outline" size="lg">
                View Repositories Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
