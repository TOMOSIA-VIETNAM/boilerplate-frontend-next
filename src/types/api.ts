// API Response Types
export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  success: boolean
  errors?: string[]
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// API Error Types
export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

// Request Types
export interface RequestConfig {
  headers?: Record<string, string>
  timeout?: number
  withCredentials?: boolean
}

export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}

// Common API Endpoints
export interface Endpoints {
  auth: {
    login: string
    logout: string
    refresh: string
    profile: string
  }
  users: {
    list: string
    create: string
    update: (id: string) => string
    delete: (id: string) => string
    detail: (id: string) => string
  }
}
