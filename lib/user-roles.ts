import { prisma } from '@/lib/prisma'

export async function checkUserRole(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { role: true },
  })
  
  const role = user?.role as string
  return {
    isDeveloper: role === 'DEVELOPER' || role === 'ADMIN',
    isAdmin: role === 'ADMIN',
    isModerator: role === 'MODERATOR',
    role: role,
  }
}
