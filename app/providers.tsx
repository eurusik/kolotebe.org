'use client'

import { SessionProvider } from "next-auth/react"
import { LocaleProvider } from "@/lib/i18n/locale-provider"
import { ThemeProvider } from "@/lib/theme/theme-provider"
import { ReactNode } from "react"

interface ProvidersProps {
  children: ReactNode
  locale: 'uk' | 'en'
}

export function Providers({ children, locale }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <LocaleProvider defaultLocale={locale}>
          {children}
        </LocaleProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
