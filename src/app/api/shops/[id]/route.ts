import { type NextRequest } from 'next/server'
import prismaClient from '@/app/lib/prisma'

export async function GET(request: NextRequest, q: any) {
  const { params } = q
  const shop = await prismaClient.shops.findUnique({
    where: {
      id: Number(params.id),
    },
  })
  return new Response(JSON.stringify({ shop }), {
    headers: {
      'content-type': 'application/json',
    },
  })
}
export async function PUT(request: NextRequest, q: any) {
  const { params } = q
  const body = await request.json()
  const shop = await prismaClient.shops.update({
    where: {
      id: Number(params.id),
    },
    data: body,
  })
  return new Response(JSON.stringify({ shop }), {
    headers: {
      'content-type': 'application/json',
    },
  })
}
