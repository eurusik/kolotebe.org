import { NextResponse } from 'next/server'
import { publicApiSpec } from '@/lib/api/openapi-public'

export async function GET() {
  return NextResponse.json(publicApiSpec)
}
