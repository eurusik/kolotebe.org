'use client'

import { SessionProvider } from "next-auth/react"
import { LocaleProvider } from "@/lib/i18n/locale-provider"
import { ReactNode } from "react"

interface ProvidersProps {
  children: ReactNode
  locale: 'uk' | 'en'
}

export function Providers({ children, locale }: ProvidersProps) {
  return (
    <SessionProvider>
      <LocaleProvider defaultLocale={locale}>
        {children}
      </LocaleProvider>
    </SessionProvider>
  )
}
