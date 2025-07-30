'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const { i18n } = useTranslation('common')

  // Get current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en'

  const changeLanguage = (locale: string) => {
    // Update i18n language
    i18n.changeLanguage(locale)

    // Update URL
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    router.push(`/${locale}${pathWithoutLocale}`)
  }

  // Sync i18n language with URL locale on mount
  useEffect(() => {
    if (i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale)
    }
  }, [currentLocale, i18n])

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <span>Language:</span>
      <button
        onClick={() => changeLanguage('en')}
        style={{
          padding: '5px 10px',
          backgroundColor: currentLocale === 'en' ? '#007bff' : '#f8f9fa',
          color: currentLocale === 'en' ? 'white' : '#333',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('ja')}
        style={{
          padding: '5px 10px',
          backgroundColor: currentLocale === 'ja' ? '#007bff' : '#f8f9fa',
          color: currentLocale === 'ja' ? 'white' : '#333',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Japanese
      </button>
    </div>
  )
}
