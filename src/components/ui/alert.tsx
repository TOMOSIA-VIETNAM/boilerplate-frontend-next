import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success: 'border-green-500/50 text-green-700 dark:border-green-500 [&>svg]:text-green-600',
        warning: 'border-yellow-500/50 text-yellow-700 dark:border-yellow-500 [&>svg]:text-yellow-600',
        info: 'border-blue-500/50 text-blue-700 dark:border-blue-500 [&>svg]:text-blue-600'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
  )
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
  )
)
AlertDescription.displayName = 'AlertDescription'

// Predefined alert components
const AlertError = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <Alert ref={ref} variant="destructive" className={cn('bg-red-50 border-red-200', className)} {...props}>
      <XCircle className="h-4 w-4" />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
)
AlertError.displayName = 'AlertError'

const AlertSuccess = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <Alert ref={ref} variant="success" className={cn('bg-green-50 border-green-200', className)} {...props}>
      <CheckCircle className="h-4 w-4" />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
)
AlertSuccess.displayName = 'AlertSuccess'

const AlertWarning = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <Alert ref={ref} variant="warning" className={cn('bg-yellow-50 border-yellow-200', className)} {...props}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
)
AlertWarning.displayName = 'AlertWarning'

const AlertInfo = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <Alert ref={ref} variant="info" className={cn('bg-blue-50 border-blue-200', className)} {...props}>
      <Info className="h-4 w-4" />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
)
AlertInfo.displayName = 'AlertInfo'

export { Alert, AlertTitle, AlertDescription, AlertError, AlertSuccess, AlertWarning, AlertInfo }
