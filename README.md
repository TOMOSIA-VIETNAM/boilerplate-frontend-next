# Next.js Boilerplate with NextAuth.js

A modern Next.js boilerplate with NextAuth.js authentication, TypeScript, and comprehensive API layer.

## Features

- **Next.js 15** with App Router
- **NextAuth.js** with multiple authentication providers
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **Protected Routes** with middleware
- **Custom Hooks** for authentication and API calls
- **Responsive Design**
- **Comprehensive API Layer** with axios
- **Request/Response Interceptors**
- **Error Handling & Retry Logic**
- **File Upload/Download Support**
- **Rate Limiting & Caching**
- **Performance Optimizations**
- **Image Optimization Components**
- **Lazy Loading Utilities**
- **Code Splitting Helpers**
- **Bundle Analyzer Setup**
- **Performance Monitoring Tools**

## Performance & Optimization Features

### Image Optimization

- **OptimizedImage Component** - Next.js Image with lazy loading, blur placeholders
- **Responsive sizing** - Automatic image sizing based on device
- **WebP/AVIF support** - Modern image formats for better compression
- **Blur placeholder** - Smooth loading experience

### Lazy Loading

- **Component lazy loading** - Dynamic imports with Suspense
- **Image lazy loading** - Intersection Observer based loading
- **Data lazy loading** - Progressive data loading
- **Virtual scrolling** - For large lists

### Code Splitting

- **Route-based splitting** - Automatic code splitting by routes
- **Component-based splitting** - Dynamic component loading
- **Bundle splitting utilities** - Manual chunk management
- **Performance monitoring** - Track chunk loading times

### Performance Monitoring

- **Core Web Vitals** - FCP, LCP, FID, CLS tracking
- **Custom metrics** - Function performance monitoring
- **API call monitoring** - Request/response timing
- **Performance scoring** - 0-100 performance score

## API Layer Features

### Core API Client

- **Axios-based** HTTP client with interceptors
- **Automatic token management** (JWT refresh)
- **Request/Response interceptors** for common operations
- **Error handling** with standardized error format
- **File upload/download** support
- **Request timeout** and retry logic

### Service Modules

- **AuthService** - Authentication operations
- **UserService** - User management CRUD operations
- **CommonService** - General utilities (health check, file upload, etc.)

### Custom Hooks

- **useApi** - For API calls with loading/error states
- **useApiAction** - For API actions without return data
- **usePaginatedApi** - For paginated data loading

### Utilities

- **Retry logic** with exponential backoff
- **Rate limiting** utilities
- **Request caching** system
- **URL parameter builders**
- **Error formatters**

## Authentication Providers

This boilerplate includes the following authentication providers:

- **Google OAuth** - Sign in with Google account
- **GitHub OAuth** - Sign in with GitHub account
- **Credentials** - Email/password authentication (demo mode)

## Getting Started

### 1. Install Dependencies

```bash
yarn install
```

### 2. Environment Variables

Copy the example environment file and configure your variables:

```bash
cp env.example .env.local
```

Required environment variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (optional)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_TIMEOUT=10000

# File Upload Configuration
NEXT_PUBLIC_MAX_FILE_SIZE=5242880
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf
```

### 3. Generate NEXTAUTH_SECRET

You can generate a secure secret using:

```bash
openssl rand -base64 32
```

### 4. Run Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Performance Usage Examples

### Using OptimizedImage Component

```tsx
import { OptimizedImage } from '@/components/ui/OptimizedImage'

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <OptimizedImage
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        priority={false}
        quality={75}
        placeholder="blur"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <h3>{product.name}</h3>
    </div>
  )
}
```

### Using Lazy Loading

```tsx
import { lazyLoad, useLazyData } from '@/utils/lazy-loading'

// Lazy load component
const HeavyComponent = lazyLoad(() => import('./HeavyComponent'), <div>Loading...</div>)

// Lazy load data
function UserList() {
  const { data: users, loading, error } = useLazyData(() => fetch('/api/users').then((res) => res.json()))

  if (loading) return <div>Loading users...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

### Using Code Splitting

```tsx
import { createRouteLoader, bundleSplitter } from '@/utils/code-splitting'

// Route-based splitting
const DashboardLoader = createRouteLoader('dashboard')

// Component-based splitting
const ChartLoader = createComponentLoader('charts/LineChart')

// Manual chunk management
bundleSplitter.registerChunk('analytics', () => import('./analytics'))
await bundleSplitter.loadChunk('analytics')
```

### Using Performance Monitoring

```tsx
import { performanceMonitor, measureTime } from '@/utils/performance-monitor'

// Monitor function performance
const expensiveFunction = measureTime(() => {
  // Expensive operation
}, 'expensive-operation')

// Monitor API calls
const apiMonitor = performanceMonitor.monitorApiCall('/api/users', 'GET')
const response = await fetch('/api/users')
apiMonitor.end()

// Get performance metrics
const metrics = performanceMonitor.getMetrics()
const score = performanceMonitor.getPerformanceScore()

console.log('Performance Score:', score)
console.log('LCP:', metrics.lcp)
```

## Bundle Analysis

To analyze your bundle size:

```bash
yarn build:analyze
```

This will generate a bundle analysis report at `./bundle-analysis.html`.

## API Usage Examples

### Using the API Client

```tsx
import { api } from '@/utils/api'

// GET request
const response = await api.get<User>('/users/1')

// POST request
const newUser = await api.post<User>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
})

// File upload
const fileResponse = await api.upload('/upload', file)
```

### Using Service Classes

```tsx
import { AuthService, UserService } from '@/services'

// Authentication
const loginResponse = await AuthService.login({
  email: 'user@example.com',
  password: 'password'
})

// User management
const users = await UserService.getUsers({
  page: 1,
  limit: 10,
  search: 'john'
})
```

### Using Custom Hooks

```tsx
import { useApi, useApiAction } from '@/hooks/useApi'
import { UserService } from '@/services'

function UserList() {
  const { data: users, loading, error, execute } = useApi(UserService.getUsers)

  const { loading: deleteLoading, execute: deleteUser } = useApiAction(UserService.deleteUser)

  useEffect(() => {
    execute()
  }, [execute])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {users?.data?.map((user) => (
        <div key={user.id}>
          {user.name}
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

### Using Pagination Hook

```tsx
import { usePaginatedApi } from '@/hooks/useApi'
import { UserService } from '@/services'

function PaginatedUserList() {
  const { data, loading, hasMore, loadData, reset } = usePaginatedApi(UserService.getUsers)

  useEffect(() => {
    loadData({ limit: 20 }, true) // Reset and load first page
  }, [])

  const loadMore = () => {
    if (hasMore && !loading) {
      loadData({ limit: 20 }) // Load next page
    }
  }

  return (
    <div>
      {data.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
      {hasMore && (
        <button onClick={loadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  )
}
```

## Authentication Setup

### Demo Credentials

For testing purposes, you can use these demo credentials:

- **Email:** admin@example.com
- **Password:** password

### OAuth Setup

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to your `.env.local`

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to your `.env.local`

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth API route
│   ├── dashboard/page.tsx               # Protected dashboard page
│   ├── login/page.tsx                   # Login page
│   ├── layout.tsx                       # Root layout
│   └── page.tsx                         # Home page
├── components/
│   ├── ui/
│   │   └── OptimizedImage.tsx           # Optimized image component
│   ├── auth/
│   │   ├── ProtectedRoute.tsx          # Route protection component
│   │   └── UserMenu.tsx                # User menu component
│   ├── layout/
│   │   └── Header.tsx                  # Header component
│   └── providers/
│       └── SessionProvider.tsx         # NextAuth session provider
├── hooks/
│   ├── useAuth.ts                      # Custom auth hook
│   └── useApi.ts                       # API hooks
├── services/
│   ├── auth.service.ts                 # Authentication service
│   ├── user.service.ts                 # User management service
│   ├── common.service.ts               # Common utilities service
│   └── index.ts                        # Service exports
├── types/
│   ├── api.ts                          # API type definitions
│   └── next-auth.d.ts                  # NextAuth type extensions
├── utils/
│   ├── api.ts                          # Main API client
│   ├── api-helpers.ts                  # API utilities
│   ├── lazy-loading.ts                 # Lazy loading utilities
│   ├── code-splitting.ts               # Code splitting utilities
│   ├── performance-monitor.ts          # Performance monitoring
│   └── index.ts                        # Utility exports
└── middleware.ts                       # Authentication middleware
```

## API Error Handling

The API layer includes comprehensive error handling:

```tsx
try {
  const response = await api.get('/users')
  // Handle success
} catch (error) {
  // error is of type ApiError
  console.log(error.message) // Error message
  console.log(error.status) // HTTP status code
  console.log(error.errors) // Field-specific errors
}
```

## File Upload

The API layer supports file uploads:

```tsx
// Single file upload
const fileInput = document.querySelector('input[type="file"]')
const file = fileInput.files[0]
const response = await api.upload('/upload', file)

// Multiple file upload
const files = Array.from(fileInput.files)
const response = await api.post('/upload/multiple', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
```

## Available Scripts

```bash
yarn dev              # Start development server
yarn build            # Build for production
yarn build:analyze    # Build with bundle analysis
yarn start            # Start production server
yarn lint             # Run ESLint
yarn lint:fix         # Fix ESLint errors
yarn fmt              # Format code with Prettier
yarn fmt:check        # Check code formatting
```

## Customization

### Adding New API Services

1. Create a new service file in `src/services/`
2. Import the API client: `import { api } from '@/utils/api'`
3. Define your service class with static methods
4. Export from `src/services/index.ts`

### Custom API Interceptors

You can extend the API client by modifying `src/utils/api.ts`:

```tsx
// Add custom request interceptor
apiClient.interceptors.request.use((config) => {
  // Your custom logic
  return config
})

// Add custom response interceptor
apiClient.interceptors.response.use((response) => {
  // Your custom logic
  return response
})
```

### Environment-Specific Configuration

The API client automatically uses environment variables:

- `NEXT_PUBLIC_API_URL` - Base API URL
- `NEXT_PUBLIC_API_TIMEOUT` - Request timeout

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
