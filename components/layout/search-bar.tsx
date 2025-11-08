'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/i18n/locale-provider'

export function SearchBar() {
  const { t } = useTranslation()
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/listings?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <Input
        type="search"
        placeholder={t('header.searchPlaceholder')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-11 pr-24 h-11 bg-background border-border text-base w-full"
      />
      <Button 
        type="submit" 
        size="sm" 
        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-9"
      >
        {t('header.search')}
      </Button>
    </form>
  )
}
