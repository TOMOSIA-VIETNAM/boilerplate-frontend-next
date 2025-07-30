'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { LogoutConfirmation } from '@/components/auth/LogoutConfirmation'
import { LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  showIcon?: boolean
  children?: React.ReactNode
  onLogout?: () => void
  requireConfirmation?: boolean
  confirmationTitle?: string
  confirmationDescription?: string
}

export function LogoutButton({
  variant = 'ghost',
  size = 'default',
  className,
  onLogout,
  requireConfirmation = false,
  confirmationTitle,
  confirmationDescription,
  children
}: LogoutButtonProps) {
  const { logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleLogout = async () => {
    if (requireConfirmation) {
      setShowConfirmation(true)
      return
    }

    setIsLoggingOut(true)
    try {
      await logout()
      onLogout?.()
    } catch {
      setIsLoggingOut(false)
    }
  }

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      setShowConfirmation(false)
      onLogout?.()
    } catch {
      setIsLoggingOut(false)
    }
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={cn('transition-colors', isLoggingOut && 'opacity-50 cursor-not-allowed', className)}
      >
        <LogOut className={cn('w-4 h-4', size !== 'icon' && 'mr-2')} />
        {children}
      </Button>

      {requireConfirmation && (
        <LogoutConfirmation
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmLogout}
          title={confirmationTitle}
          description={confirmationDescription}
        />
      )}
    </>
  )
}
