# GitHub Portfolio Demo - Next.js 14 + TypeScript

A comprehensive portfolio-style application demonstrating modern Next.js development practices, data fetching strategies, accessibility best practices, and clean component architecture. Built as a showcase for front-end developer interviews.

## 🚀 Live Demo

Visit the application: **https://my-next-app-orpin-two.vercel.app/profile**

Sample GitHub user profile used: [@gabschlemper](https://github.com/gabschlemper)

## 📋 Features Overview

### 🔄 Data Fetching Strategies

This application demonstrates multiple data fetching approaches with detailed trade-off analysis:

- **Server-Side Rendering (SSR)** - `/profile` page
  - ✅ SEO-friendly, fast initial render, works without JS
  - ❌ Slower navigation, higher server load
  - **Best for**: SEO-critical pages, content that changes frequently

- **Client-Side Rendering with SWR** - `/repositories` page
  - ✅ Fast navigation, automatic caching, real-time updates
  - ❌ No SEO, requires JS, initial loading states
  - **Best for**: Interactive features, user dashboards

### ♿ Accessibility (WCAG 2.1 AA Compliant)

- **Semantic HTML**: Proper heading hierarchy, landmarks, and structure
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: ARIA labels, roles, and live regions
- **High Contrast Mode**: Support for `prefers-contrast: high`
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce`
- **Color Accessibility**: Sufficient contrast ratios throughout

### 🎨 Design System Components

Built-in accessible component library:

- **Button Component**: Multiple variants with loading states
- **Card System**: Semantic structure with interactive states  
- **Status Components**: Loading spinners and error messages
- **GitHub Components**: User profiles and repository cards

### 🏗️ Next.js 14 Architecture

- **App Router**: Modern file-based routing with layouts
- **Server/Client Components**: Strategic component placement
- **TypeScript Integration**: Full type safety throughout
- **Image Optimization**: Next.js Image component usage
- **Metadata API**: SEO optimization with dynamic metadata

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Data Fetching**: SWR for client-side caching
- **Icons**: Heroicons
- **API**: GitHub REST API v3

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd my-next-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Homepage with feature overview
│   ├── profile/           # SSR profile page
│   └── repositories/      # SWR repositories page
├── components/
│   ├── ui/               # Design system components
│   │   ├── Button.tsx    # Accessible button variants
│   │   ├── Card.tsx      # Card component system
│   │   └── Status.tsx    # Loading & error states
│   ├── github/           # GitHub-specific components
│   │   ├── UserProfileCard.tsx
│   │   └── RepositoryCard.tsx
│   └── layout/           # Layout components
│       └── Header.tsx    # Navigation header
├── hooks/                # Custom React hooks
│   └── useGitHub.ts     # SWR hooks for GitHub API
├── lib/                  # Utility functions
│   ├── github-api.ts    # API service layer
│   └── utils.ts         # Helper functions
└── types/               # TypeScript definitions
    └── github.ts        # GitHub API types
```

## 🎯 Key Implementation Highlights

### Data Fetching Patterns

```typescript
// Server-Side Rendering (SSR)
export default async function ProfilePage() {
  const user = await fetchUserServer(username);
  return <UserProfileCard user={user} />;
}

// Client-Side with SWR
function RepositoriesPage() {
  const { repositories, isLoading, error } = useGitHubRepositories(username);
  // Automatic caching, background updates, error recovery
}
```

### Accessibility Features

```typescript
// Semantic structure with ARIA
<Card role="listitem">
  <CardTitle>
    <Link 
      href={repo.html_url}
      aria-label={`View ${repo.name} repository on GitHub`}
    >
      {repo.name}
    </Link>
  </CardTitle>
</Card>

// High contrast support
className={cn(
  'bg-blue-600 text-white',
  'contrast-more:bg-blue-700 contrast-more:border-2'
)}
```

### Error Handling

```typescript
// Comprehensive error boundaries
try {
  const data = await fetchData();
} catch (error) {
  return <ErrorMessage message={error.message} retry={handleRetry} />;
}
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 API Integration

The application integrates with GitHub's REST API v3:

- **User Profile**: `GET /users/{username}`
- **Repositories**: `GET /users/{username}/repos`
- **Rate Limiting**: Handled with proper error messages
- **Error Recovery**: Automatic retry with exponential backoff

## 📱 Responsive Design

- **Mobile-First**: Tailwind CSS mobile-first approach
- **Breakpoints**: Responsive grid layouts and navigation
- **Touch-Friendly**: Adequate touch targets and spacing
- **Performance**: Optimized images and lazy loading

## 🧪 Testing Different Data Fetching Strategies

1. **Visit `/profile`** - See SSR in action (check page source)
2. **Visit `/repositories`** - Experience SWR caching
3. **Navigate between pages** - Compare loading behaviors
4. **Disable JavaScript** - Profile page still works, repositories don't
5. **Slow network** - See loading states and error handling

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel via Git integration
```

### Other platforms
```bash
npm run build
npm run start
```

## 📈 Performance Considerations

- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: Automatic with Next.js App Router
- **Caching Strategy**: SWR for client-side data caching
- **Bundle Analysis**: Run `npm run build` to see bundle sizes

## 🤝 Contributing

This is a demo project, but contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this code for your own projects and interviews.

## 📧 Contact

Built by [Your Name] - feel free to reach out with questions!

---

*This project demonstrates proficiency in modern React/Next.js development, TypeScript, accessibility standards, and front-end best practices suitable for senior developer roles.*
