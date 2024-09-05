import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET(request: NextRequest, q: any) {
  const { params } = q
  const shop = await new PrismaClient().shop.findUnique({
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
  const shop = await new PrismaClient().shop.update({
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
