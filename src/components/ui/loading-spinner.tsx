import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  color?: 'white' | 'gray' | 'blue' | 'primary'
}

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-6 h-6'
}

const colorClasses = {
  white: 'border-white border-t-transparent',
  gray: 'border-gray-300 border-t-gray-600',
  blue: 'border-blue-300 border-t-blue-600',
  primary: 'border-primary/30 border-t-primary'
}

export function LoadingSpinner({ size = 'md', className, color = 'gray' }: LoadingSpinnerProps) {
  return <div className={cn('border-2 rounded-full animate-spin', sizeClasses[size], colorClasses[color], className)} />
}
