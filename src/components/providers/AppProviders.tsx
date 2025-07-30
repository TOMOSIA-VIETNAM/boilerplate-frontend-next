'use client'

import { Provider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { store } from '../../stores'
import { queryClient } from '../../lib/queryClient'

interface AppProvidersProps {
  children: React.ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  )
}
