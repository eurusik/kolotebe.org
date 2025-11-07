import { NextResponse } from 'next/server'
import { openApiSpec } from '@/lib/api/openapi'
import { auth } from '@/lib/auth/config'
import { checkUserRole } from '@/lib/auth/roles'

export async function GET() {
  const session = await auth()
  
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Unauthorized - Authentication required' },
      { status: 401 }
    )
  }
  
  const { isDeveloper } = await checkUserRole(session.user.email)
  
  if (!isDeveloper) {
    return NextResponse.json(
      { error: 'Forbidden - Requires DEVELOPER or ADMIN role' },
      { status: 403 }
    )
  }
  
  return NextResponse.json(openApiSpec)
}
