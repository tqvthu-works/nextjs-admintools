import prismaClient from "@/app/lib/prisma"

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams as any
  const page = parseInt(params.get('page') ?? 1)
  const limit = parseInt(params.get('limit') ?? 20)
  const sort = params.get('sort') ?? 'id'
  const order = (params.get('order') ?? 'asc').toLowerCase() === 'asc' ? 'asc' : 'desc'

  const shops = await prismaClient.shop.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: { ...(params.is_test === 'true' ? { is_test: true } : {}) },
    orderBy: {
      [sort]: order,
    },
  })
  const total = await prismaClient.shop.count()
  return new Response(JSON.stringify(shops), {
    headers: {
      'content-type': 'application/json',
      'x-total-count': total.toString(),
    },
  })
}
export async function POST(request: Request) {
  const body = await request.json()
  return new Response(JSON.stringify(body), {
    headers: {
      'content-type': 'application/json',
    },
  })
}
