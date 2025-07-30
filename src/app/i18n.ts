import i18n, { Callback } from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'

// Preload common translations to avoid SSR issues
const preloadResources = async () => {
  try {
    const enCommon = await import('../../public/locales/en/common.json')
    const viCommon = await import('../../public/locales/vi/common.json')
    const jaCommon = await import('../../public/locales/ja/common.json')

    return {
      en: { common: enCommon.default },
      vi: { common: viCommon.default },
      ja: { common: jaCommon.default }
    }
  } catch {
    return {}
  }
}

// Initialize i18n with better SSR support
const initI18n = async () => {
  if (i18n.isInitialized) {
    return i18n
  }

  const preloadedResources = await preloadResources()

  return i18n
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)
      )
    )
    .init({
      fallbackLng: 'en',
      debug: process.env.NODE_ENV === 'development',

      // Preload resources
      resources: preloadedResources,

      // Load namespaces
      ns: ['common'],
      defaultNS: 'common',

      // Better interpolation
      interpolation: {
        escapeValue: false,
        skipOnVariables: false
      },

      // React configuration
      react: {
        useSuspense: false,
        bindI18n: 'languageChanged loaded',
        bindI18nStore: 'added removed'
      },

      // Better error handling
      saveMissing: process.env.NODE_ENV === 'development',
      missingKeyHandler: (lng: string, ns: string, key: string, fallbackValue: string) => {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn(`Missing translation key: ${key} in namespace: ${ns} for language: ${lng}`)
        }
        return fallbackValue || key
      },

      // Performance optimizations
      load: 'languageOnly',
      preload: ['en', 'vi', 'ja'],

      // Better detection
      detection: {
        order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage', 'cookie']
      }
    } as unknown as Callback)
}

// Initialize immediately
initI18n()

export default i18n
