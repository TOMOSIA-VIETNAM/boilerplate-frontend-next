import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const infoCardVariants = cva('relative w-full rounded-lg border p-4', {
  variants: {
    variant: {
      default: 'bg-background text-foreground border-border',
      primary: 'bg-primary/5 border-primary/20 text-gray-900',
      blue: 'bg-blue-50 border-blue-200 text-blue-900',
      green: 'bg-green-50 border-green-200 text-green-900',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-900',
      purple: 'bg-purple-50 border-purple-200 text-purple-900'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof infoCardVariants> {
  title?: string
  icon?: React.ReactNode
}

const InfoCard = React.forwardRef<HTMLDivElement, InfoCardProps>(
  ({ className, variant, title, icon, children, ...props }, ref) => (
    <div ref={ref} className={cn(infoCardVariants({ variant }), className)} {...props}>
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-2">
          {icon && <span className="text-current">{icon}</span>}
          {title && <h4 className="text-sm font-medium text-current">{title}</h4>}
        </div>
      )}
      <div className="text-sm text-current">{children}</div>
    </div>
  )
)
InfoCard.displayName = 'InfoCard'

export { InfoCard, infoCardVariants }
