import { ApiReference } from '@scalar/nextjs-api-reference'

const configuration = {
  spec: {
    url: '/api/openapi-public.json',
  },
  theme: 'purple' as const,
  darkMode: true,
}

export const GET = ApiReference(configuration)
