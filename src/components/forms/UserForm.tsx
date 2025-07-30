'use client'

import { useEffect } from 'react'
import { useUserForm, UserFormData } from '../../hooks/useForms'
import { useCreateUser, User, useUpdateUser } from '../../hooks/useUsers'

interface UserFormProps {
  user?: User
  onSuccess?: () => void
  onCancel?: () => void
}

export const UserForm = ({ user, onSuccess, onCancel }: UserFormProps) => {
  const isEditing = !!user

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useUserForm()

  const createUserMutation = useCreateUser()
  const updateUserMutation = useUpdateUser()

  // Set default values when editing
  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('role', user.role as 'user' | 'admin' | 'moderator')
    }
  }, [user, setValue])

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isEditing) {
        await updateUserMutation.mutateAsync({
          id: user.id,
          ...data
        })
      } else {
        await createUserMutation.mutateAsync({
          ...data,
          password: data.password || ''
        })
      }
      onSuccess?.()
      reset()
    } catch {
      // Handle error silently
    }
  }

  const isLoading = createUserMutation.isPending || updateUserMutation.isPending

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter user name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter user email"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          {...register('role')}
          id="role"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
      </div>

      {!isEditing && (
        <>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register('password')}
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter password"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              {...register('confirmPassword')}
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Confirm password"
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
          </div>
        </>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
        </button>
      </div>
    </form>
  )
}
