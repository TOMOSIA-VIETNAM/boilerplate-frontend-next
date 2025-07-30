'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Check, ChevronRight } from 'lucide-react'

export interface DropdownMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'start' | 'center' | 'end'
  className?: string
  disabled?: boolean
}

export const DropdownMenu = ({
  trigger,
  children,
  align = 'start',
  className,
  disabled = false
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
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

  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    end: 'right-0'
  }

  return (
    <div className="relative inline-block text-left">
      <div
        ref={triggerRef}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn('cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            'absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg',
            alignClasses[align],
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export interface DropdownMenuTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

export const DropdownMenuTrigger = ({ children }: DropdownMenuTriggerProps) => {
  return <>{children}</>
}

export interface DropdownMenuContentProps {
  children: React.ReactNode
  align?: 'start' | 'center' | 'end'
  className?: string
}

export const DropdownMenuContent = ({ children, align = 'start', className }: DropdownMenuContentProps) => {
  return (
    <div
      className={cn(
        'absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg',
        align === 'end' && 'right-0',
        align === 'center' && 'left-1/2 transform -translate-x-1/2',
        className
      )}
    >
      {children}
    </div>
  )
}

export interface DropdownMenuItemProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  selected?: boolean
}

export const DropdownMenuItem = ({
  children,
  onClick,
  disabled = false,
  className,
  icon,
  rightIcon,
  selected = false
}: DropdownMenuItemProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
        'hover:bg-gray-100 focus:bg-gray-100',
        disabled && 'pointer-events-none opacity-50',
        selected && 'bg-gray-100',
        className
      )}
    >
      {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
      <span className="flex-1">{children}</span>
      {selected && <Check className="ml-2 h-4 w-4" />}
      {rightIcon && <span className="ml-2 h-4 w-4">{rightIcon}</span>}
    </button>
  )
}

export interface DropdownMenuSubProps {
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const DropdownMenuSub = ({ trigger, children, className }: DropdownMenuSubProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const subMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        subMenuRef.current &&
        !subMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={subMenuRef}
          className={cn(
            'absolute left-full top-0 z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg',
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export const DropdownMenuSubTrigger = ({
  children,
  className,
  icon
}: {
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
        'hover:bg-gray-100 focus:bg-gray-100',
        className
      )}
    >
      {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
      <span className="flex-1">{children}</span>
      <ChevronRight className="ml-2 h-4 w-4" />
    </div>
  )
}

export const DropdownMenuSeparator = ({ className }: { className?: string }) => (
  <div className={cn('my-1 h-px bg-gray-200', className)} />
)

export const DropdownMenuLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('px-2 py-1.5 text-sm font-semibold text-gray-500', className)}>{children}</div>
)
