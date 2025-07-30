'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { UserProfile } from './UserProfile'
import { LogoutButton } from './LogoutButton'
import { LogoutConfirmation } from './LogoutConfirmation'
import { Button } from '@/components/ui/button'

export function AuthComponentsDemo() {
  const [showConfirmation, setShowConfirmation] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Auth Components Demo</h1>
          <p className="text-gray-600">Showcase of authentication-related components</p>
        </div>

        {/* User Profile Components */}
        <Card>
          <CardHeader>
            <CardTitle>User Profile Components</CardTitle>
            <CardDescription>Different variants of user profile display</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Default Variant</h4>
                <UserProfile variant="default" />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Compact Variant</h4>
                <UserProfile variant="compact" />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Detailed Variant</h4>
                <UserProfile variant="detailed" />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Small Avatar</h4>
                <UserProfile avatarSize="sm" />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Medium Avatar</h4>
                <UserProfile avatarSize="md" />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Large Avatar</h4>
                <UserProfile avatarSize="lg" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button Components */}
        <Card>
          <CardHeader>
            <CardTitle>Logout Button Components</CardTitle>
            <CardDescription>Different variants and configurations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3">Button Variants</h4>
              <div className="flex flex-wrap gap-3">
                <LogoutButton variant="default">Default Logout</LogoutButton>
                <LogoutButton variant="destructive">Destructive Logout</LogoutButton>
                <LogoutButton variant="outline">Outline Logout</LogoutButton>
                <LogoutButton variant="ghost">Ghost Logout</LogoutButton>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-3">Button Sizes</h4>
              <div className="flex flex-wrap items-center gap-3">
                <LogoutButton size="sm">Small</LogoutButton>
                <LogoutButton size="default">Default</LogoutButton>
                <LogoutButton size="lg">Large</LogoutButton>
                <LogoutButton size="icon" />
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-3">With Confirmation</h4>
              <div className="flex flex-wrap gap-3">
                <LogoutButton
                  variant="destructive"
                  requireConfirmation={true}
                  confirmationTitle="Confirm Logout"
                  confirmationDescription="Are you sure you want to logout? This action cannot be undone."
                >
                  Logout with Confirmation
                </LogoutButton>
                <LogoutButton
                  variant="outline"
                  requireConfirmation={true}
                  confirmationTitle="Leave Dashboard"
                  confirmationDescription="You will be logged out and redirected to the login page."
                >
                  Leave Dashboard
                </LogoutButton>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-3">Without Icon</h4>
              <div className="flex flex-wrap gap-3">
                <LogoutButton showIcon={false}>Sign Out</LogoutButton>
                <LogoutButton variant="ghost" showIcon={false}>
                  Exit
                </LogoutButton>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Standalone Confirmation Dialog */}
        <Card>
          <CardHeader>
            <CardTitle>Standalone Confirmation Dialog</CardTitle>
            <CardDescription>Direct usage of LogoutConfirmation component</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => setShowConfirmation(true)}>
              Show Confirmation Dialog
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-500">
          <p>All components are built with TypeScript and Tailwind CSS</p>
        </div>
      </div>

      {/* Standalone Confirmation Dialog */}
      <LogoutConfirmation
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Custom Logout Dialog"
        description="This is a custom logout confirmation dialog with custom title and description."
        confirmText="Yes, Logout"
        cancelText="No, Stay"
      />
    </div>
  )
}
