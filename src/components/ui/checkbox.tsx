import React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string
  description?: string
  onCheckedChange?: (checked: boolean) => void
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, onCheckedChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked)
    }

    return (
      <div className="flex items-start space-x-2">
        <div className="relative">
          <input type="checkbox" className="peer sr-only" ref={ref} onChange={handleChange} {...props} />
          <div
            className={cn(
              'h-4 w-4 shrink-0 rounded-sm border border-gray-300 bg-white transition-colors',
              'peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 peer-focus:ring-offset-2',
              'peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground',
              'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
              className
            )}
          >
            <Check className="h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
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
Checkbox.displayName = 'Checkbox'
