'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useTranslation } from '../../../../node_modules/react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { AlertError } from '@/components/ui/alert'
import { InfoCard } from '@/components/ui/info-card'
import { useFormValidation } from '@/hooks/useFormValidation'
import { Eye, EyeOff, Mail, Lock, Github, Chrome, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isOAuthLoading, setIsOAuthLoading] = useState<string | null>(null)
  const { t } = useTranslation('common')

  const validationRules = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      custom: (value: string) => {
        if (!value.includes('@')) return 'Please enter a valid email address'
        return null
      }
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

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      })

      if (result?.error) {
        setError(t('invalidCredentials') || 'Invalid email or password')
      } else {
        // Use callbackUrl for automatic redirect
        await signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: '/'
        })
      }
    } catch {
      setError(t('somethingWentWrong') || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: string) => {
    setIsOAuthLoading(provider)
    setError('')

    try {
      await signIn(provider, { callbackUrl: '/' })
    } catch {
      setError(t('failedToSignIn') || 'Failed to sign in')
      setIsOAuthLoading(null)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md">
        <Card className="border bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">{t('signIn') || 'Sign In'}</CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                {t('welcomeBack') || 'Welcome back! Please sign in to your account'}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* OAuth Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-11 bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                onClick={() => handleOAuthLogin('google')}
                disabled={loading || !!isOAuthLoading}
              >
                {isOAuthLoading === 'google' ? (
                  <LoadingSpinner size="sm" color="gray" className="mr-2" />
                ) : (
                  <Chrome className="w-4 h-4 mr-2" />
                )}
                {t('continueWithGoogle') || 'Continue with Google'}
              </Button>

              <Button
                variant="outline"
                className="w-full h-11 bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                onClick={() => handleOAuthLogin('github')}
                disabled={loading || !!isOAuthLoading}
              >
                {isOAuthLoading === 'github' ? (
                  <LoadingSpinner size="sm" color="gray" className="mr-2" />
                ) : (
                  <Github className="w-4 h-4 mr-2" />
                )}
                {t('continueWithGitHub') || 'Continue with GitHub'}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">{t('orContinueWith') || 'Or continue with'}</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleCredentialsLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  {t('emailAddress') || 'Email Address'}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder={t('emailAddress') || 'Enter your email'}
                  icon={<Mail className="w-4 h-4" />}
                  error={touched.email && !!errors.email}
                />
                {touched.email && errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  {t('password') || 'Password'}
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={values.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    placeholder={t('password') || 'Enter your password'}
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
                {touched.password && errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
              </div>

              {error && <AlertError>{error}</AlertError>}

              <Button
                type="submit"
                disabled={loading || !isFormValid || !!isOAuthLoading}
                className={cn(
                  'w-full h-11 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-medium',
                  (!isFormValid || loading || !!isOAuthLoading) && 'opacity-50 cursor-not-allowed'
                )}
              >
                {loading ? (
                  <div className="flex items-center">
                    <LoadingSpinner size="sm" color="white" className="mr-2" />
                    {t('signingIn') || 'Signing in...'}
                  </div>
                ) : (
                  t('signIn') || 'Sign In'
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <InfoCard
              variant="primary"
              title={t('demoCredentials') || 'Demo Credentials'}
              icon={<Info className="w-4 h-4" />}
            >
              <div className="space-y-1 text-xs text-gray-700">
                <p>
                  <strong>Email:</strong> admin@example.com
                </p>
                <p>
                  <strong>Password:</strong> password
                </p>
              </div>
            </InfoCard>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
