import { useState, useCallback } from 'react'
import { ApiResponse, ApiError } from '@/types/api'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: unknown[]) => Promise<T | null>
  reset: () => void
}

// Hook for API calls with loading and error states
export function useApi<T = unknown>(apiFunction: (...args: unknown[]) => Promise<ApiResponse<T>>): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null
  })

  const execute = useCallback(
    async (...args: unknown[]): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const response = await apiFunction(...args)

        if (response.success) {
          setState({
            data: response.data,
            loading: false,
            error: null
          })
          return response.data
        } else {
          const error: ApiError = {
            message: response.message || 'API call failed',
            status: 400,
            errors: response.errors ? { default: response.errors } : undefined
          }
          setState({
            data: null,
            loading: false,
            error
          })
          return null
        }
      } catch (error) {
        const apiError = error as ApiError
        setState({
          data: null,
          loading: false,
          error: apiError
        })
        return null
      }
    },
    [apiFunction]
  )

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null
    })
  }, [])

  return {
    ...state,
    execute,
    reset
  }
}

// Hook for API calls that don't return data
export function useApiAction(apiFunction: (...args: unknown[]) => Promise<ApiResponse<unknown>>) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const execute = useCallback(
    async (...args: unknown[]): Promise<boolean> => {
      setLoading(true)
      setError(null)

      try {
        const response = await apiFunction(...args)

        if (response.success) {
          setLoading(false)
          return true
        } else {
          const apiError: ApiError = {
            message: response.message || 'Action failed',
            status: 400,
            errors: response.errors ? { default: response.errors } : undefined
          }
          setError(apiError)
          setLoading(false)
          return false
        }
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError)
        setLoading(false)
        return false
      }
    },
    [apiFunction]
  )

  const reset = useCallback(() => {
    setLoading(false)
    setError(null)
  }, [])

  return {
    loading,
    error,
    execute,
    reset
  }
}

// Hook for paginated API calls
export function usePaginatedApi<T = unknown>(apiFunction: (params?: unknown) => Promise<ApiResponse<T[]>>) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const loadData = useCallback(
    async (params?: unknown, reset = false): Promise<T[] | null> => {
      if (reset) {
        setData([])
        setPage(1)
        setHasMore(true)
      }

      setLoading(true)
      setError(null)

      try {
        const response = await apiFunction({ ...(params as Record<string, unknown>), page: reset ? 1 : page })

        if (response.success) {
          const newData = response.data || []

          if (reset) {
            setData(newData)
          } else {
            setData((prev) => [...prev, ...newData])
          }

          setPage((prev) => prev + 1)
          setHasMore(newData.length > 0)
          setLoading(false)
          return newData
        } else {
          const apiError: ApiError = {
            message: response.message || 'Failed to load data',
            status: 400,
            errors: response.errors ? { default: response.errors } : undefined
          }
          setError(apiError)
          setLoading(false)
          return null
        }
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError)
        setLoading(false)
        return null
      }
    },
    [apiFunction, page]
  )

  const reset = useCallback(() => {
    setData([])
    setLoading(false)
    setError(null)
    setHasMore(true)
    setPage(1)
  }, [])

  return {
    data,
    loading,
    error,
    hasMore,
    loadData,
    reset
  }
}
