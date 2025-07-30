interface ImportMetaEnv {
  readonly NEXT_PUBLIC_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Export all types
export * from './api'
export * from './next-auth'
