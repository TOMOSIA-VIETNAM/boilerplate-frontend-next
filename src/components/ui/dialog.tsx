import React from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { Button } from './button'

export interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
  closeOnBackdrop?: boolean
  className?: string
  footer?: React.ReactNode
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4'
}

export const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  className,
  footer
}: DialogProps) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeOnBackdrop ? onClose : undefined} />

      {/* Dialog */}
      <div
        className={cn('relative bg-white rounded-lg shadow-xl w-full', sizeClasses[size], className)}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
            {showCloseButton && (
              <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 hover:bg-gray-100">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        {footer && <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">{footer}</div>}
      </div>
    </div>
  )
}

export const DialogContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('', className)}>{children}</div>
)

export const DialogHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}>{children}</div>
)

export const DialogFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}>{children}</div>
)

export const DialogTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
  )
)
DialogTitle.displayName = 'DialogTitle'

export const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
)
DialogDescription.displayName = 'DialogDescription'
