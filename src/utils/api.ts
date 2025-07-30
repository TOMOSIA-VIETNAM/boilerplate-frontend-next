import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { ApiResponse, ApiError, RequestConfig } from '@/types/api'

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
const API_TIMEOUT = 10000 // 10 seconds

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Include cookies in requests
})

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Add request ID for tracking
    if (config.headers) {
      config.headers['X-Request-ID'] = crypto.randomUUID()
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Handle successful responses
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config

    // Handle 401 Unauthorized - try to refresh token
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !(originalRequest as unknown as { _retry: boolean })._retry
    ) {
      ;(originalRequest as unknown as { _retry: boolean })._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh-token')
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken
          })

          const { accessToken } = response.data
          localStorage.setItem('auth-token', accessToken)

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
          }
          return apiClient(originalRequest)
        }
      } catch {
        // Refresh failed, redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-token')
          localStorage.removeItem('refresh-token')
          window.location.href = '/login'
        }
      }
    }

    // Handle other errors
    const apiError: ApiError = {
      message:
        (error.response?.data as unknown as { message: string })?.message || error.message || 'An error occurred',
      status: error.response?.status || 500,
      errors: (error.response?.data as unknown as { errors: Record<string, string[]> })?.errors
    }

    return Promise.reject(apiError)
  }
)

// API Client class
export class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = apiClient
  }

  // GET request
  async get<T = unknown>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<ApiResponse<T>>(url, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // POST request
  async post<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // PUT request
  async put<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // PATCH request
  async patch<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // DELETE request
  async delete<T = unknown>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<ApiResponse<T>>(url, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Upload file
  async upload<T = unknown>(url: string, file: File, config?: RequestConfig): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await this.client.post<ApiResponse<T>>(url, formData, {
        ...config,
        headers: {
          ...config?.headers,
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Download file
  async download(url: string, filename?: string, config?: RequestConfig): Promise<void> {
    try {
      const response = await this.client.get(url, {
        ...config,
        responseType: 'blob'
      })

      const blob = new Blob([response.data])
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename || 'download'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Error handler
  private handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        message: error.message,
        status: 500
      }
    }
    return error as ApiError
  }
}

// Export singleton instance
export const api = new ApiClient()

// Export axios instance for advanced usage
export { apiClient }
