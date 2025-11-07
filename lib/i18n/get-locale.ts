import { cookies } from 'next/headers'

export type Locale = 'uk' | 'en'

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('NEXT_LOCALE')
  
  if (localeCookie && (localeCookie.value === 'uk' || localeCookie.value === 'en')) {
    return localeCookie.value as Locale
  }
  
  return 'uk' // Default to Ukrainian
}
