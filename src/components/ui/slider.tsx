'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface SliderProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number) => void
  disabled?: boolean
  className?: string
  showValue?: boolean
  orientation?: 'horizontal' | 'vertical'
}

export const Slider = ({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  disabled = false,
  className,
  showValue = false,
  orientation = 'horizontal'
}: SliderProps) => {
  const [internalValue, setInternalValue] = useState(value ?? defaultValue)
  const currentValue = value ?? internalValue
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const percentage = ((currentValue - min) / (max - min)) * 100

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    setIsDragging(true)
    handleMouseMove(e)
  }

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (!isDragging || disabled || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const clientX = e.clientX
    const clientY = e.clientY

    let newPercentage: number
    if (orientation === 'horizontal') {
      newPercentage = ((clientX - rect.left) / rect.width) * 100
    } else {
      newPercentage = ((rect.bottom - clientY) / rect.height) * 100
    }

    newPercentage = Math.max(0, Math.min(100, newPercentage))
    const newValue = min + (newPercentage / 100) * (max - min)
    const steppedValue = Math.round(newValue / step) * step

    if (value === undefined) {
      setInternalValue(steppedValue)
    }
    onValueChange?.(steppedValue)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div
        ref={sliderRef}
        className={cn('relative flex-1', orientation === 'horizontal' ? 'h-2' : 'w-2 h-32')}
        onMouseDown={handleMouseDown}
      >
        <div
          className={cn('relative h-full w-full rounded-full bg-gray-200', disabled && 'opacity-50 cursor-not-allowed')}
        >
          <div
            className={cn(
              'absolute rounded-full bg-primary transition-all',
              orientation === 'horizontal' ? 'h-full' : 'w-full bottom-0',
              disabled && 'opacity-50'
            )}
            style={{
              [orientation === 'horizontal' ? 'width' : 'height']: `${percentage}%`
            }}
          />
          <div
            className={cn(
              'absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-primary bg-white shadow-md transition-all',
              orientation === 'horizontal'
                ? 'left-0 -translate-x-1/2'
                : 'left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2',
              'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
              disabled && 'cursor-not-allowed opacity-50'
            )}
            style={{
              [orientation === 'horizontal' ? 'left' : 'bottom']: `${percentage}%`
            }}
          />
        </div>
      </div>
      {showValue && <div className="min-w-[3rem] text-sm text-gray-600">{currentValue}</div>}
    </div>
  )
}

export const SliderTrack = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200', className)}
      {...props}
    />
  )
)
SliderTrack.displayName = 'SliderTrack'

export const SliderRange = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('absolute h-full bg-primary', className)} {...props} />
)
SliderRange.displayName = 'SliderRange'

export const SliderThumb = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'block h-4 w-4 rounded-full border-2 border-primary bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
SliderThumb.displayName = 'SliderThumb'
