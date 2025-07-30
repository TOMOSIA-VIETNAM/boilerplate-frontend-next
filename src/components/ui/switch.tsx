import React from 'react'
import { cn } from '@/lib/utils'

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  label?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  onCheckedChange?: (checked: boolean) => void
}

const sizeClasses = {
  sm: {
    switch: 'h-4 w-7',
    thumb: 'h-3 w-3 translate-x-0.5',
    checked: 'translate-x-3'
  },
  md: {
    switch: 'h-6 w-11',
    thumb: 'h-5 w-5 translate-x-0.5',
    checked: 'translate-x-5'
  },
  lg: {
    switch: 'h-8 w-14',
    thumb: 'h-7 w-7 translate-x-0.5',
    checked: 'translate-x-6'
  }
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, size = 'md', onCheckedChange, ...props }, ref) => {
    const sizeClass = sizeClasses[size]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked)
    }

    return (
      <div className="flex items-start space-x-2">
        <div className="relative">
          <input type="checkbox" className="peer sr-only" ref={ref} onChange={handleChange} {...props} />
          <div
            className={cn(
              'inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
              'peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 peer-focus:ring-offset-2',
              'peer-checked:bg-primary peer-checked:hover:bg-primary/90',
              'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
              'bg-gray-200 hover:bg-gray-300',
              sizeClass.switch,
              className
            )}
          >
            <div
              className={cn(
                'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform',
                sizeClass.thumb,
                'peer-checked:' + sizeClass.checked
              )}
            />
          </div>
        </div>
        {(label || description) && (
          <div className="grid gap-1.5 leading-none">
            {label && (
              <label
                htmlFor={props.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            )}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
      </div>
    )
  }
)
Switch.displayName = 'Switch'
