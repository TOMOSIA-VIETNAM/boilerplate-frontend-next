import { ApiError } from '@/types/api'

// Retry configuration
export interface RetryConfig {
  maxRetries: number
  delay: number
  backoff: 'linear' | 'exponential'
}

// Default retry configuration
export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  delay: 1000,
  backoff: 'exponential'
}

// Retry function with exponential backoff
export async function retry<T>(fn: () => Promise<T>, config: Partial<RetryConfig> = {}): Promise<T> {
  const { maxRetries, delay, backoff } = { ...DEFAULT_RETRY_CONFIG, ...config }
  let lastError: Error

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error

      if (attempt === maxRetries) {
        break
      }

      // Don't retry on client errors (4xx)
      if (error instanceof Error && 'status' in error) {
        const apiError = error as ApiError
        if (apiError.status >= 400 && apiError.status < 500) {
          break
        }
      }

      // Calculate delay with backoff
      const currentDelay = backoff === 'exponential' ? delay * Math.pow(2, attempt) : delay * (attempt + 1)

      await new Promise((resolve) => setTimeout(resolve, currentDelay))
    }
  }

  throw lastError!
}

// Rate limiting utility
export class RateLimiter {
  private requests: number[] = []
  private maxRequests: number
  private windowMs: number

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests
    this.windowMs = windowMs
  }

  async throttle(): Promise<void> {
    const now = Date.now()

    // Remove old requests outside the window
    this.requests = this.requests.filter((time) => now - time < this.windowMs)

    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0]
      const waitTime = this.windowMs - (now - oldestRequest)
      await new Promise((resolve) => setTimeout(resolve, waitTime))
    }

    this.requests.push(now)
  }
}

// Request cache utility
export class RequestCache {
  private cache = new Map<string, { data: unknown; timestamp: number; ttl: number }>()

  set(key: string, data: unknown, ttl: number = 60000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  get<T = unknown>(key: string): T | null {
    const item = this.cache.get(key)

    if (!item) {
      return null
    }

    const isExpired = Date.now() - item.timestamp > item.ttl
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return item.data as T
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  has(key: string): boolean {
    return this.cache.has(key)
  }
}

// URL parameter builder
export function buildUrlParams(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item.toString()))
      } else {
        searchParams.append(key, value.toString())
      }
    }
  })

  return searchParams.toString()
}

// Request ID generator
export function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Error message formatter
export function formatApiError(error: ApiError): string {
  if (error.errors && Object.keys(error.errors).length > 0) {
    const errorMessages = Object.entries(error.errors)
      .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
      .join('; ')
    return errorMessages
  }

  return error.message || 'An error occurred'
}

// Response validator
export function validateResponse<T extends { success: boolean }>(response: unknown): response is T {
  return (
    response !== null &&
    typeof response === 'object' &&
    'success' in response &&
    (response as { success: boolean }).success === true
  )
}

// Timeout promise wrapper
export function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    })
  ])
}

// Debounce utility for API calls
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  // eslint-disable-next-line no-undef
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility for API calls
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
