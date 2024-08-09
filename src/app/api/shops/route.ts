import prismaClient from '@/app/lib/prisma'
import type { shops as Shop } from 'prisma/generated/client-api'
import { api } from '@/config/app'
import { NextResponse } from 'next/server'

const prisma = prismaClient.$extends({
  result: {
    shops: {
      access_token: {
        compute() {
          return null;
        },
      },
    },
  },
})
export async function GET(req: Request) {
  const params = new URL(req.url).searchParams as any
  const page = parseInt(params.get('page') ?? 1)
  const limit = parseInt(params.get('limit') ?? api.per_page)
  const sort = params.get('sort') ?? 'id'
  const order = (params.get('order') ?? 'asc').toLowerCase() === 'asc' ? 'asc' : 'desc'
  const shops = await prisma.shops.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      [sort]: order,
    },
  })
  const total = await prisma.shops.count()
  return NextResponse.json<Shop[]>(shops, {
    headers: {
      'x-total-count': total.toString(),
    },
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json(body, {
    headers: {
      'content-type': 'application/json',
    },
  })
}
