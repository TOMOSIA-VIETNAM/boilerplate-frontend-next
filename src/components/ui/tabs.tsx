'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

export interface TabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

export const Tabs = ({ defaultValue, value, onValueChange, children, className }: TabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const currentValue = value !== undefined ? value : internalValue

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <div className={cn('', className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            value: currentValue,
            onValueChange: handleValueChange
          } as unknown as typeof child)
        }
        return child
      })}
    </div>
  )
}

export interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export const TabsList = ({ children, className }: TabsListProps) => {
  return (
    <div
      className={cn('inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500', className)}
    >
      {children}
    </div>
  )
}

export interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

export const TabsTrigger = ({ value, children, disabled = false, className }: TabsTriggerProps) => {
  return (
    <button
      data-value={value}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm',
        'data-[state=inactive]:hover:text-gray-950',
        className
      )}
    >
      {children}
    </button>
  )
}

export interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

export const TabsContent = ({ value, children, className }: TabsContentProps) => {
  return (
    <div
      data-value={value}
      className={cn(
        'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2',
        'data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-1',
        'data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=inactive]:slide-out-to-top-1',
        className
      )}
    >
      {children}
    </div>
  )
}
