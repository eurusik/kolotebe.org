'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { checkUserRole } from "@/lib/auth/roles"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { useTranslation } from "@/lib/i18n/locale-provider"
import { useEffect, useState } from "react"

export function Header() {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const [isDeveloper, setIsDeveloper] = useState(false)
  
  useEffect(() => {
    async function checkRole() {
      if (session?.user?.email) {
        const { isDeveloper: dev } = await checkUserRole(session.user.email)
        setIsDeveloper(dev)
      }
    }
    checkRole()
  }, [session])

  return (
    <header className="border-b border-border bg-sidebar sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          Kolotebe
        </Link>
        <nav className="flex items-center gap-4">
          <LocaleSwitcher />
          {session ? (
            <>
              <Link href="/listings">
                <Button variant="ghost">{t('header.browseBooks')}</Button>
              </Link>
              <Link href="/books/add">
                <Button variant="ghost">{t('header.addBook')}</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">{t('common.profile')}</Button>
              </Link>
              {isDeveloper ? (
                <Link href="/api/reference/internal">
                  <Button variant="ghost">{t('header.apiDocs')}</Button>
                </Link>
              ) : (
                <Link href="/api/reference/public">
                  <Button variant="ghost">{t('header.apiDocs')}</Button>
                </Link>
              )}
              <Button variant="outline" onClick={() => signOut()}>
                {t('common.signOut')}
              </Button>
            </>
          ) : (
            <>
              <Link href="/listings">
                <Button variant="ghost">{t('header.browseBooks')}</Button>
              </Link>
              <Link href="/api/reference/public">
                <Button variant="ghost">{t('header.apiDocs')}</Button>
              </Link>
              <Link href="/auth/signin">
                <Button>{t('common.signIn')}</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
