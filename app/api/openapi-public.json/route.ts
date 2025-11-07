import { NextResponse } from 'next/server'
import { publicApiSpec } from '@/lib/openapi-public'

export async function GET() {
  return NextResponse.json(publicApiSpec)
}
