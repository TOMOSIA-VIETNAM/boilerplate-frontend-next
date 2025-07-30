import { api } from '@/utils/api'
import { ApiResponse } from '@/types/api'

// Auth types
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

// Auth service class
export class AuthService {
  // Login user
  static async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await api.post<LoginResponse>('/auth/login', data)

    // Store tokens in localStorage
    if (response.success && response.data) {
      localStorage.setItem('auth-token', response.data.accessToken)
      localStorage.setItem('refresh-token', response.data.refreshToken)
    }

    return response
  }

  // Register user
  static async register(data: RegisterRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await api.post<LoginResponse>('/auth/register', data)

    // Store tokens in localStorage
    if (response.success && response.data) {
      localStorage.setItem('auth-token', response.data.accessToken)
      localStorage.setItem('refresh-token', response.data.refreshToken)
    }

    return response
  }

  // Logout user
  static async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await api.post<void>('/auth/logout')

      // Clear tokens from localStorage
      localStorage.removeItem('auth-token')
      localStorage.removeItem('refresh-token')

      return response
    } catch (error) {
      // Clear tokens even if API call fails
      localStorage.removeItem('auth-token')
      localStorage.removeItem('refresh-token')
      throw error
    }
  }

  // Refresh access token
  static async refreshToken(data: RefreshTokenRequest): Promise<ApiResponse<RefreshTokenResponse>> {
    const response = await api.post<RefreshTokenResponse>('/auth/refresh', data)

    // Update tokens in localStorage
    if (response.success && response.data) {
      localStorage.setItem('auth-token', response.data.accessToken)
      localStorage.setItem('refresh-token', response.data.refreshToken)
    }

    return response
  }

  // Get user profile
  static async getProfile(): Promise<ApiResponse<UserProfile>> {
    return api.get<UserProfile>('/auth/profile')
  }

  // Update user profile
  static async updateProfile(data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    return api.put<UserProfile>('/auth/profile', data)
  }

  // Change password
  static async changePassword(data: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }): Promise<ApiResponse<void>> {
    return api.post<void>('/auth/change-password', data)
  }

  // Forgot password
  static async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return api.post<void>('/auth/forgot-password', { email })
  }

  // Reset password
  static async resetPassword(data: {
    token: string
    password: string
    confirmPassword: string
  }): Promise<ApiResponse<void>> {
    return api.post<void>('/auth/reset-password', data)
  }

  // Verify email
  static async verifyEmail(token: string): Promise<ApiResponse<void>> {
    return api.post<void>('/auth/verify-email', { token })
  }

  // Resend verification email
  static async resendVerificationEmail(email: string): Promise<ApiResponse<void>> {
    return api.post<void>('/auth/resend-verification', { email })
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('auth-token')
  }

  // Get current token
  static getToken(): string | null {
    return localStorage.getItem('auth-token')
  }

  // Clear all auth data
  static clearAuth(): void {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('refresh-token')
  }
}
