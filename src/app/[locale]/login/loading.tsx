import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default async function LoginLoading() {
  // Simulate loading delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" color="primary" />
        <p className="text-gray-600 font-medium">Preparing login...</p>
      </div>
    </div>
  )
}
