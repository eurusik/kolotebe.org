'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import ukTranslations from '@/messages/uk.json'
import enTranslations from '@/messages/en.json'

type Locale = 'uk' | 'en'
type Messages = typeof ukTranslations

const translations: Record<Locale, Messages> = {
  uk: ukTranslations,
  en: enTranslations,
}

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children, defaultLocale = 'uk' }: { children: ReactNode; defaultLocale?: 'uk' | 'en' }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    // Save to cookie
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[locale]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation missing for key: ${key}`)
        return key
      }
    }

    return typeof value === 'string' ? value : key
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useTranslation must be used within LocaleProvider')
  }
  return context
}
