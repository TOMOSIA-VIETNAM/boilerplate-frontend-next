import { LoadingSpinner } from './loading-spinner'

interface PageLoaderProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export function PageLoader({ message = 'Loading...', size = 'lg' }: PageLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <div className="text-center space-y-4">
        <LoadingSpinner size={size} color="primary" />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  )
}
