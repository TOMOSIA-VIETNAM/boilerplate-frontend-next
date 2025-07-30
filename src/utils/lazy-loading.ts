import { ComponentType, useState, useEffect, useCallback } from 'react'

type IntersectionObserverInit = {
  rootMargin?: string
  threshold?: number
}

// Intersection Observer for lazy loading
export class LazyLoader {
  private observer: IntersectionObserver | null = null
  private elements: Map<Element, () => void> = new Map()

  constructor(options: IntersectionObserverInit = {}) {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = this.elements.get(entry.target)
            if (callback) {
              callback()
              this.observer?.unobserve(entry.target)
              this.elements.delete(entry.target)
            }
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
        ...options
      }
    )
  }

  observe(element: Element, callback: () => void) {
    this.elements.set(element, callback)
    this.observer?.observe(element)
  }

  unobserve(element: Element) {
    this.observer?.unobserve(element)
    this.elements.delete(element)
  }

  disconnect() {
    this.observer?.disconnect()
    this.elements.clear()
  }
}

// Lazy loading hook for images
export function useLazyImage(src: string, placeholder?: string) {
  const [imageSrc, setImageSrc] = useState(placeholder || src)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      setImageSrc(src)
      setIsLoaded(true)
    }
    img.onerror = () => {
      setImageSrc(placeholder || '/placeholder.jpg')
      setIsLoaded(true)
    }
  }, [src, placeholder])

  return { imageSrc, isLoaded }
}

// Lazy loading hook for data
export function useLazyData<T>(fetchFn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchFn()
      setData(result)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [fetchFn])

  useEffect(() => {
    fetchData()
  }, deps)

  return { data, loading, error, refetch: fetchData }
}

// Virtual scrolling utilities
export class VirtualScroller<T> {
  private items: T[]
  private itemHeight: number
  private containerHeight: number
  private scrollTop: number = 0

  constructor(items: T[], itemHeight: number, containerHeight: number) {
    this.items = items
    this.itemHeight = itemHeight
    this.containerHeight = containerHeight
  }

  getVisibleItems(): { items: T[]; startIndex: number; endIndex: number } {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight)
    const visibleCount = Math.ceil(this.containerHeight / this.itemHeight)
    const endIndex = Math.min(startIndex + visibleCount + 1, this.items.length)

    return {
      items: this.items.slice(startIndex, endIndex),
      startIndex,
      endIndex
    }
  }

  updateScroll(scrollTop: number) {
    this.scrollTop = scrollTop
  }

  getTotalHeight(): number {
    return this.items.length * this.itemHeight
  }

  getOffsetY(index: number): number {
    return index * this.itemHeight
  }
}

// Preload utilities
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

export function preloadComponent<T extends ComponentType<unknown>>(
  importFunc: () => Promise<{ default: T }>
): Promise<T> {
  return importFunc().then((module) => module.default)
}

// Chunk loading utilities
export function createChunkLoader<T>(items: T[], chunkSize: number = 10) {
  let currentIndex = 0

  return {
    hasMore: () => currentIndex < items.length,
    loadNext: () => {
      const chunk = items.slice(currentIndex, currentIndex + chunkSize)
      currentIndex += chunkSize
      return chunk
    },
    reset: () => {
      currentIndex = 0
    }
  }
}
