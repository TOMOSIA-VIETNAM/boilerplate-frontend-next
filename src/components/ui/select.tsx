'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown, Check } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  options?: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  defaultValue?: string
}

const sizeClasses = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-base'
}

export const Select = ({
  options = [],
  value,
  onValueChange,
  placeholder = 'Select an option',
  disabled = false,
  className,
  size = 'md',
  children,
  defaultValue
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(value || defaultValue || '')
  const currentValue = value !== undefined ? value : internalValue
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === currentValue)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const handleSelect = (optionValue: string) => {
    if (value === undefined) {
      setInternalValue(optionValue)
    }
    onValueChange?.(optionValue)
    setIsOpen(false)
  }

  // If children are provided, render them (for compound component pattern)
  if (children) {
    return (
      <div className="relative">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              isOpen,
              setIsOpen: (value: boolean) => setIsOpen(value),
              currentValue,
              onValueChange: handleSelect,
              disabled
            } as unknown as typeof child)
          }
          return child
        })}
      </div>
    )
  }

  // Default render with options prop
  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left shadow-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:border-primary',
          'hover:border-gray-400',
          disabled && 'cursor-not-allowed opacity-50',
          sizeClasses[size],
          className
        )}
        disabled={disabled}
      >
        <span className={cn('block truncate', !selectedOption && 'text-gray-500')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg"
        >
          <div className="max-h-60 overflow-auto p-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => !option.disabled && handleSelect(option.value)}
                className={cn(
                  'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
                  'hover:bg-gray-100 focus:bg-gray-100',
                  option.disabled && 'pointer-events-none opacity-50',
                  option.value === currentValue && 'bg-gray-100'
                )}
                disabled={option.disabled}
              >
                <span className="flex-1">{option.label}</span>
                {option.value === currentValue && <Check className="ml-2 h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left shadow-sm transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:border-primary',
        'hover:border-gray-400',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
)
SelectTrigger.displayName = 'SelectTrigger'

export const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
SelectContent.displayName = 'SelectContent'

export const SelectItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
        'hover:bg-gray-100 focus:bg-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
SelectItem.displayName = 'SelectItem'

export const SelectValue = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => <span ref={ref} className={cn('block truncate', className)} {...props} />
)
SelectValue.displayName = 'SelectValue'
