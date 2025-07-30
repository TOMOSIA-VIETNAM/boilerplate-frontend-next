'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { LogOut, X } from 'lucide-react'

interface LogoutConfirmationProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
}

export function LogoutConfirmation({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Logout',
  description = 'Are you sure you want to logout? You will need to sign in again to access your account.',
  confirmText = 'Logout',
  cancelText = 'Cancel'
}: LogoutConfirmationProps) {
  const { logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleConfirm = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      onConfirm?.()
    } catch {
      setIsLoggingOut(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <LogOut className="w-4 h-4 text-red-600" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} disabled={isLoggingOut} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-gray-600">{description}</CardDescription>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} disabled={isLoggingOut} className="flex-1">
              {cancelText}
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={isLoggingOut} className="flex-1">
              {isLoggingOut ? (
                <div className="flex items-center">
                  <LoadingSpinner size="sm" color="white" className="mr-2" />
                  Logging out...
                </div>
              ) : (
                <div className="flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  {confirmText}
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
