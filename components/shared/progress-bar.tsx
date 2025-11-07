'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 100,
  minimum: 0.08,
})

export function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done()
  }, [pathname, searchParams])

  return null
}
