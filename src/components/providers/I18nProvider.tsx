'use client'

import { I18nextProvider } from '../../../node_modules/react-i18next'
import { useEffect, useState } from 'react'
import i18n from '../../app/i18n'

interface I18nProviderProps {
  children: React.ReactNode
  locale: string
}

export default function I18nProvider({ children, locale }: I18nProviderProps) {
  const [, setIsReady] = useState(false)

  useEffect(() => {
    const initI18n = async () => {
      try {
        // Initialize i18n with the current locale
        if (i18n.language !== locale) {
          await i18n.changeLanguage(locale)
        }
        setIsReady(true)
      } catch {
        setIsReady(true) // Still set ready to avoid blocking the app
      }
    }

    initI18n()
  }, [locale])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
