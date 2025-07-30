import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Types
export interface User {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
  updatedAt: string
}

interface CreateUserData {
  email: string
  name: string
  password: string
  role: string
}

interface UpdateUserData {
  id: string
  email?: string
  name?: string
  role?: string
}

// API functions
const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users')
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

const fetchUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

const createUser = async (userData: CreateUserData): Promise<User> => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  if (!response.ok) {
    throw new Error('Failed to create user')
  }
  return response.json()
}

const updateUser = async (userData: UpdateUserData): Promise<User> => {
  const response = await fetch(`/api/users/${userData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  if (!response.ok) {
    throw new Error('Failed to update user')
  }
  return response.json()
}

const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`/api/users/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error('Failed to delete user')
  }
}

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const
}

// Hooks
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: fetchUsers
  })
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => fetchUser(id),
    enabled: !!id
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    }
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      // Update the user in the cache
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser)
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    }
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, deletedId) => {
      // Remove the user from the cache
      queryClient.removeQueries({ queryKey: userKeys.detail(deletedId) })
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    }
  })
}
