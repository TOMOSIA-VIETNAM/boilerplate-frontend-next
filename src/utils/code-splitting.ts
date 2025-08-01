import { ComponentType } from 'react'
import React from 'react'

// Dynamic import with error handling
export function dynamicImport<T>(importFn: () => Promise<{ default: T }>, fallback?: T): Promise<T> {
  return importFn()
    .then((module) => module.default)
    .catch((error) => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Dynamic import failed:', error)
      }
      if (fallback) return fallback
      throw error
    })
}

// Route-based code splitting
export function createRouteLoader(routePath: string, fallback?: React.ReactNode) {
  return {
    load: () => import(`@/app/${routePath}/page`),
    fallback
  }
}

// Component-based code splitting
export function createComponentLoader(componentPath: string, fallback?: React.ReactNode) {
  return {
    load: () => import(`@/components/${componentPath}`),
    fallback
  }
}

// Conditional loading based on feature flags
export function createConditionalLoader<T extends ComponentType<Record<string, unknown>>>(
  importFn: () => Promise<{ default: T }>,
  condition: () => boolean,
  fallback?: T
) {
  return {
    load: async (): Promise<T> => {
      if (condition()) {
        return dynamicImport(importFn, fallback)
      }
      if (fallback) return fallback
      throw new Error('Component not available')
    }
  }
}

// Preload utilities for critical components
export function preloadComponent<T extends ComponentType<Record<string, unknown>>>(
  importFn: () => Promise<{ default: T }>
): Promise<T> {
  return importFn().then((module) => module.default)
}

// Bundle splitting utilities
export class BundleSplitter {
  private chunks: Map<string, () => Promise<unknown>> = new Map()
  private loadedChunks: Set<string> = new Set()

  registerChunk(name: string, importFn: () => Promise<unknown>) {
    this.chunks.set(name, importFn)
  }

  async loadChunk(name: string) {
    if (this.loadedChunks.has(name)) {
      return
    }

    const importFn = this.chunks.get(name)
    if (!importFn) {
      throw new Error(`Chunk "${name}" not found`)
    }

    try {
      await importFn()
      this.loadedChunks.add(name)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(`Failed to load chunk "${name}":`, error)
      }
      throw error
    }
  }

  isChunkLoaded(name: string): boolean {
    return this.loadedChunks.has(name)
  }

  getLoadedChunks(): string[] {
    return Array.from(this.loadedChunks)
  }
}

// Performance monitoring for code splitting
export class CodeSplittingMonitor {
  private loadTimes: Map<string, number> = new Map()
  private errors: Map<string, Error> = new Map()

  startTimer(chunkName: string) {
    this.loadTimes.set(chunkName, performance.now())
  }

  endTimer(chunkName: string) {
    const startTime = this.loadTimes.get(chunkName)
    if (startTime) {
      // eslint-disable-next-line no-console
      console.log(`Chunk "${chunkName}" loaded in ${performance.now() - startTime}ms`)
      this.loadTimes.delete(chunkName)
    }
  }

  recordError(chunkName: string, error: Error) {
    this.errors.set(chunkName, error)
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(`Chunk "${chunkName}" failed to load:`, error)
    }
  }

  getErrors(): Map<string, Error> {
    return new Map(this.errors)
  }

  clearErrors() {
    this.errors.clear()
  }
}

// Global bundle splitter instance
export const bundleSplitter = new BundleSplitter()
export const codeSplittingMonitor = new CodeSplittingMonitor()
