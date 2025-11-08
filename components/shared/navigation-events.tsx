'use client'

import { useEffect } from 'react'
import NProgress from 'nprogress'

export function NavigationEvents() {
  useEffect(() => {
    // Intercept all link clicks
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLAnchorElement
      const clickedElement = event.target as HTMLElement
      
      // Don't start progress if clicked on a button or inside a button
      if (
        clickedElement.tagName === 'BUTTON' ||
        clickedElement.closest('button') ||
        clickedElement.getAttribute('role') === 'button'
      ) {
        return
      }
      
      // Only show progress for internal links
      if (target.host === window.location.host && !target.hash) {
        NProgress.start()
      }
    }

    // Intercept browser back/forward
    const handlePopState = () => {
      NProgress.start()
    }

    // Attach listeners
    const links = document.querySelectorAll('a')
    links.forEach(link => link.addEventListener('click', handleAnchorClick))
    window.addEventListener('popstate', handlePopState)

    return () => {
      links.forEach(link => link.removeEventListener('click', handleAnchorClick))
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return null
}
