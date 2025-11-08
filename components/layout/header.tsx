'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { LocaleSwitcher } from "@/components/layout/locale-switcher"
import { ThemeSwitcher } from "@/components/layout/theme-switcher"
import { SearchBar } from "@/components/layout/search-bar"
import { useTranslation } from "@/lib/i18n/locale-provider"
import { Plus, User } from "lucide-react"
import type { Session } from "next-auth"

interface HeaderProps {
  session: Session | null
  isDeveloper: boolean
}

export function Header({ session, isDeveloper }: HeaderProps) {
  const { t } = useTranslation()
  
  return (
    <header className="border-b border-border bg-sidebar sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Logo */}
          <Link href="/" className="text-2xl font-display font-bold text-primary whitespace-nowrap">
            Kolotebe
          </Link>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <SearchBar />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {session && (
              <Link href="/books/add" className="hidden sm:block">
                <Button size="default" className="gap-2">
                  <Plus className="w-4 h-4" />
                  <span className="hidden lg:inline">{t('header.addBook')}</span>
                </Button>
              </Link>
            )}
            
            <ThemeSwitcher />
            <LocaleSwitcher />
            
            {session ? (
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="w-10 h-10">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signin">
                <Button size="default">{t('common.signIn')}</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}
