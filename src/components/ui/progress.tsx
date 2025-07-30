import React from 'react'
import { cn } from '@/lib/utils'

export interface ProgressProps {
  value?: number
  max?: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'danger'
  showLabel?: boolean
  animated?: boolean
}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
}

const variantClasses = {
  default: 'bg-primary',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500'
}

export const Progress = ({
  value = 0,
  max = 100,
  className,
  size = 'md',
  variant = 'default',
  showLabel = false,
  animated = false
}: ProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn('w-full overflow-hidden rounded-full bg-gray-200', sizeClasses[size], className)}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-in-out',
            variantClasses[variant],
            animated && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export const ProgressIndicator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('h-full w-full rounded-full', className)} {...props} />
)
ProgressIndicator.displayName = 'ProgressIndicator'
