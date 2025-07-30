'use client'

import { useState } from 'react'
import { useLoginForm, LoginFormData } from '../../hooks/useForms'
import { useAppDispatch } from '../../stores'
import { loginUser } from '../../stores/slices/authSlice'

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useLoginForm()

  const onSubmit = handleSubmit(async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      await dispatch(loginUser(data)).unwrap()
      // Redirect or show success message
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Login failed'
      })
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your email"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your password"
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      {errors.root && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-600">{errors.root.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}
