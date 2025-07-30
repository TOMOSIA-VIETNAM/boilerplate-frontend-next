'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export interface RadioGroupOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  options: RadioGroupOption[]
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export const RadioGroup = ({
  options,
  value,
  onValueChange,
  disabled = false,
  className,
  orientation = 'vertical'
}: RadioGroupProps) => {
  const [internalValue, setInternalValue] = React.useState(value || '')
  const currentValue = value !== undefined ? value : internalValue

  const handleValueChange = (optionValue: string) => {
    if (value === undefined) {
      setInternalValue(optionValue)
    }
    onValueChange?.(optionValue)
  }

  return (
    <div className={cn('space-y-2', orientation === 'horizontal' && 'flex flex-wrap gap-4', className)}>
      {options.map((option) => (
        <div key={option.value} className="flex items-start space-x-2">
          <div className="relative">
            <input
              type="radio"
              id={option.value}
              name="radio-group"
              value={option.value}
              checked={currentValue === option.value}
              onChange={() => !option.disabled && !disabled && handleValueChange(option.value)}
              disabled={option.disabled || disabled}
              className="peer sr-only"
            />
            <div
              className={cn(
                'h-4 w-4 shrink-0 rounded-full border border-gray-300 bg-white transition-colors',
                'peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 peer-focus:ring-offset-2',
                'peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground',
                'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
                'hover:border-gray-400'
              )}
            >
              <Check className="h-2.5 w-2.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
            </div>
          </div>
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={option.value}
              className={cn(
                'text-sm font-medium leading-none',
                (option.disabled || disabled) && 'cursor-not-allowed opacity-70'
              )}
            >
              {option.label}
            </label>
            {option.description && <p className="text-sm text-muted-foreground">{option.description}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

export const RadioGroupItem = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex items-start space-x-2">
        <div className="relative">
          <input type="radio" className="peer sr-only" ref={ref} {...props} />
          <div
            className={cn(
              'h-4 w-4 shrink-0 rounded-full border border-gray-300 bg-white transition-colors',
              'peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 peer-focus:ring-offset-2',
              'peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground',
              'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
              'hover:border-gray-400',
              className
            )}
          >
            <Check className="h-2.5 w-2.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
          </div>
        </div>
      </div>
    )
  }
)
RadioGroupItem.displayName = 'RadioGroupItem'

export const RadioGroupIndicator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('', className)} {...props} />
)
RadioGroupIndicator.displayName = 'RadioGroupIndicator'
