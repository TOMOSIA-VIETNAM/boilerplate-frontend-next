'use client'

import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from 'react-i18next'

export default function DashboardPage() {
  const { session } = useAuth()
  const { t } = useTranslation('common')

  return (
    <ProtectedRoute>
      <main>
        <div>
          <div>
            <h1>{t('dashboard')}</h1>

            <div>
              <div>
                <h3>{t('welcome')}</h3>
                <p>Hello, {session?.user?.name || session?.user?.email}!</p>
              </div>

              <div>
                <h3>{t('authenticationStatus')}</h3>
                <p>{t('successfullyAuthenticated')}</p>
              </div>

              <div>
                <h3>{t('userId')}</h3>
                <p>{session?.user?.id}</p>
              </div>
            </div>

            <div>
              <h2>{t('sessionInformation')}</h2>
              <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}
