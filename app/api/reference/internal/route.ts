import { ApiReference } from '@scalar/nextjs-api-reference'
import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { checkUserRole } from '@/lib/auth/roles'

const configuration = {
  spec: {
    url: '/api/openapi-internal.json',
  },
  theme: 'purple' as const,
  darkMode: true,
}

const handler = ApiReference(configuration)

export async function GET() {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect('/auth/signin')
  }
  
  const { isDeveloper } = await checkUserRole(session.user.email)
  
  if (!isDeveloper) {
    redirect('/?error=unauthorized')
  }
  
  return handler()
}
