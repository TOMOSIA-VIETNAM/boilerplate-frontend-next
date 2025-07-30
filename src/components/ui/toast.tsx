import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react'

const toastVariants = cva('relative w-full rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out', {
  variants: {
    variant: {
      default: 'bg-background text-foreground border-border',
      success: 'bg-green-50 border-green-200 text-green-900',
      error: 'bg-red-50 border-red-200 text-red-900',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
      info: 'bg-blue-50 border-blue-200 text-blue-900'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  title?: string
  description?: string
  onClose?: () => void
  autoClose?: boolean
  duration?: number
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, title, description, onClose, autoClose = true, duration = 5000, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true)

    React.useEffect(() => {
      if (autoClose && onClose) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          setTimeout(onClose, 300) // Wait for animation to complete
        }, duration)

        return () => clearTimeout(timer)
      }
    }, [autoClose, onClose, duration])

    const getIcon = () => {
      switch (variant) {
        case 'success':
          return <CheckCircle className="w-5 h-5" />
        case 'error':
          return <XCircle className="w-5 h-5" />
        case 'warning':
          return <AlertCircle className="w-5 h-5" />
        case 'info':
          return <Info className="w-5 h-5" />
        default:
          return null
      }
    }

    if (!isVisible) return null

    return (
      <div
        ref={ref}
        className={cn(
          toastVariants({ variant }),
          'transform transition-all duration-300',
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          {getIcon() && <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>}
          <div className="flex-1 min-w-0">
            {title && <h4 className="text-sm font-medium mb-1">{title}</h4>}
            {description && <p className="text-sm opacity-90">{description}</p>}
            {children}
          </div>
          {onClose && (
            <button onClick={onClose} className="flex-shrink-0 ml-2 p-1 rounded-md hover:bg-black/5 transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    )
  }
)
Toast.displayName = 'Toast'

export { Toast, toastVariants }
