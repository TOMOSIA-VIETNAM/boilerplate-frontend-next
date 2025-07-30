import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, icon, error, ...props }, ref) => {
  return (
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
          icon && 'pl-10',
          error && 'border-red-300 focus-visible:ring-red-500',
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
})
Input.displayName = 'Input'

export { Input }
