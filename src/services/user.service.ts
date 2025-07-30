import { api } from '@/utils/api'
import { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api'

// User types
export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  isActive: boolean
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
  role: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  role?: string
  isActive?: boolean
}

export interface UserFilters extends PaginationParams {
  search?: string
  role?: string
  isActive?: boolean
  emailVerified?: boolean
}

// User service class
export class UserService {
  // Get all users with pagination and filters
  static async getUsers(filters?: UserFilters): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams()

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })
    }

    const queryString = params.toString()
    const url = queryString ? `/users?${queryString}` : '/users'

    return api.get<PaginatedResponse<User>>(url).then((response) => response.data)
  }

  // Get user by ID
  static async getUserById(id: string): Promise<ApiResponse<User>> {
    return api.get<User>(`/users/${id}`)
  }

  // Create new user
  static async createUser(data: CreateUserRequest): Promise<ApiResponse<User>> {
    return api.post<User>('/users', data)
  }

  // Update user
  static async updateUser(id: string, data: UpdateUserRequest): Promise<ApiResponse<User>> {
    return api.put<User>(`/users/${id}`, data)
  }

  // Delete user
  static async deleteUser(id: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/users/${id}`)
  }

  // Bulk delete users
  static async bulkDeleteUsers(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void>('/users/bulk-delete', { ids })
  }

  // Activate/deactivate user
  static async toggleUserStatus(id: string, isActive: boolean): Promise<ApiResponse<User>> {
    return api.patch<User>(`/users/${id}/status`, { isActive })
  }

  // Change user role
  static async changeUserRole(id: string, role: string): Promise<ApiResponse<User>> {
    return api.patch<User>(`/users/${id}/role`, { role })
  }

  // Reset user password
  static async resetUserPassword(id: string): Promise<ApiResponse<void>> {
    return api.post<void>(`/users/${id}/reset-password`)
  }

  // Upload user avatar
  static async uploadAvatar(id: string, file: File): Promise<ApiResponse<{ avatar: string }>> {
    return api.upload<{ avatar: string }>(`/users/${id}/avatar`, file)
  }

  // Get user statistics
  static async getUserStats(): Promise<
    ApiResponse<{
      total: number
      active: number
      inactive: number
      verified: number
      unverified: number
    }>
  > {
    return api.get('/users/stats')
  }

  // Export users to CSV
  static async exportUsers(filters?: UserFilters): Promise<void> {
    const params = new URLSearchParams()

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })
    }

    const queryString = params.toString()
    const url = queryString ? `/users/export?${queryString}` : '/users/export'

    await api.download(url, 'users.csv')
  }

  // Import users from CSV
  static async importUsers(file: File): Promise<
    ApiResponse<{
      imported: number
      failed: number
      errors: string[]
    }>
  > {
    return api.upload('/users/import', file)
  }
}
