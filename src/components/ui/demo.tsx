'use client'

import { useState } from 'react'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Input } from './input'
import { LoadingSpinner } from './loading-spinner'
import { AlertError, AlertSuccess, AlertWarning, AlertInfo } from './alert'
import { InfoCard } from './info-card'
import { PageLoader } from './page-loader'
import { Toast } from './toast'
import { Separator } from './separator'
import { useFormValidation } from '@/hooks/useFormValidation'
import { Mail, Lock, Info, Eye, EyeOff } from 'lucide-react'

export function ComponentsDemo() {
  const [showPassword, setShowPassword] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showPageLoader, setShowPageLoader] = useState(false)

  const validationRules = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      required: true,
      minLength: 6
    }
  }

  const { values, errors, touched, handleChange, handleBlur, validateForm, isFormValid } = useFormValidation(
    { email: '', password: '' },
    validationRules
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setShowToast(true)
    }
  }

  if (showPageLoader) {
    return <PageLoader message="Loading demo components..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">UI Components Demo</h1>
          <p className="text-gray-600">Showcase of all available UI components</p>
        </div>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Different button variants and sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </CardContent>
        </Card>

        {/* Form with Validation */}
        <Card>
          <CardHeader>
            <CardTitle>Form with Validation</CardTitle>
            <CardDescription>Using useFormValidation hook</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={values.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="Enter your email"
                  icon={<Mail className="w-4 h-4" />}
                  error={touched.email && !!errors.email}
                />
                {touched.email && errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    placeholder="Enter your password"
                    icon={<Lock className="w-4 h-4" />}
                    className="pr-12"
                    error={touched.password && !!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {touched.password && errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
              </div>

              <Button type="submit" disabled={!isFormValid}>
                Submit Form
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Loading Spinners */}
        <Card>
          <CardHeader>
            <CardTitle>Loading Spinners</CardTitle>
            <CardDescription>Different sizes and colors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-8">
              <div className="text-center">
                <LoadingSpinner size="sm" color="gray" />
                <p className="text-xs mt-2">Small Gray</p>
              </div>
              <div className="text-center">
                <LoadingSpinner size="md" color="blue" />
                <p className="text-xs mt-2">Medium Blue</p>
              </div>
              <div className="text-center">
                <LoadingSpinner size="lg" color="white" />
                <p className="text-xs mt-2">Large White</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Different alert variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AlertError>This is an error message</AlertError>
            <AlertSuccess>This is a success message</AlertSuccess>
            <AlertWarning>This is a warning message</AlertWarning>
            <AlertInfo>This is an info message</AlertInfo>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Info Cards</CardTitle>
            <CardDescription>Different variants for displaying information</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard variant="blue" title="Blue Info Card" icon={<Info className="w-4 h-4" />}>
              <p>This is a blue info card with an icon.</p>
            </InfoCard>
            <InfoCard variant="green" title="Green Info Card">
              <p>This is a green info card without an icon.</p>
            </InfoCard>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Interactive components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => setShowToast(true)}>Show Toast</Button>
              <Button variant="outline" onClick={() => setShowPageLoader(true)}>
                Show Page Loader
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Separator */}
        <Separator />

        {/* Footer */}
        <div className="text-center text-gray-500">
          <p>All components are built with Tailwind CSS and shadcn/ui</p>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast
            variant="success"
            title="Success!"
            description="Form submitted successfully."
            onClose={() => setShowToast(false)}
            autoClose={true}
            duration={3000}
          />
        </div>
      )}
    </div>
  )
}
