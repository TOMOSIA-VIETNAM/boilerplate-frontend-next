'use client'

import { useState } from 'react'
import { useAppSelector } from '@/stores'
import { LoginForm } from '@/components/forms/LoginForm'
import { UserList } from '@/components/users/UserList'

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<'redux' | 'query' | 'form'>('redux')
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth)

  const tabs = [
    { id: 'redux', label: 'Redux Toolkit', description: 'Global state management' },
    { id: 'query', label: 'React Query', description: 'Server state management' },
    { id: 'form', label: 'React Hook Form', description: 'Form handling with validation' }
  ] as const

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Redux Toolkit + React Query + React Hook Form Demo</h1>
          <p className="text-lg text-gray-600">
            This page demonstrates the integration of all three technologies in a CMS application.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'redux' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Redux Toolkit Demo</h2>
                <p className="text-gray-600 mb-4">
                  Redux Toolkit manages global application state like authentication, user preferences, and app-wide
                  settings.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Current Auth State</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Loading:</span> {loading ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <span className="font-medium">Authenticated:</span> {isAuthenticated ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <span className="font-medium">User:</span> {user ? user.name : 'Not logged in'}
                  </div>
                </div>
              </div>

              {!isAuthenticated && (
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Login Form (Redux Integration)</h3>
                  <LoginForm />
                </div>
              )}
            </div>
          )}

          {activeTab === 'query' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">React Query Demo</h2>
                <p className="text-gray-600 mb-4">
                  React Query handles server state, caching, background updates, and optimistic updates for API data.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Management (React Query)</h3>
                <UserList />
              </div>
            </div>
          )}

          {activeTab === 'form' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">React Hook Form Demo</h2>
                <p className="text-gray-600 mb-4">
                  React Hook Form provides performant forms with built-in validation using Zod schemas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Login Form</h3>
                  <LoginForm />
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">User Creation Form</h3>
                  <UserList />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-900 mb-2">Form Features</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Zod schema validation</li>
                  <li>• TypeScript support</li>
                  <li>• Performance optimized (minimal re-renders)</li>
                  <li>• Built-in error handling</li>
                  <li>• Form state management</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Development Tools Info */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-yellow-900 mb-2">Development Tools</h3>
          <div className="text-sm text-yellow-800 space-y-1">
            <p>
              • <strong>Redux DevTools:</strong> Install browser extension for Redux debugging
            </p>
            <p>
              • <strong>React Query DevTools:</strong> Press Ctrl+H (or Cmd+H) to toggle in-app
            </p>
            <p>
              • <strong>Form Validation:</strong> Real-time validation with Zod schemas
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
