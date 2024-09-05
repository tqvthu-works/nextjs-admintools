import { notFound } from 'next/navigation'
import { Card, CardBody, CardHeader } from 'react-bootstrap'
import type { Shop } from '@prisma/client'
import ShopForm from '@/components/Shop/ShopForm'

type Props = {
  shop: Shop;
};

const fetchShop = async (params: { id: string }): Promise<Props> => {
  const idQuery = params.id

  if (!idQuery) {
    return notFound()
  }
  const id = Number(idQuery)
  const shopDetailUrl = `${process.env.NEXT_PUBLIC_HOST}/api/shops/${id}` || ''
  try {
    const res = await fetch(shopDetailUrl, {
      method: 'GET',
    })

    if (!res.ok) {
      return notFound()
    }

    return await res.json()
  } catch (error) {
    return notFound()
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { shop } = await fetchShop(params)
  return (
    <Card>
      <CardHeader>Shop</CardHeader>
      <CardBody>
        <ShopForm shop={shop} />
      </CardBody>
    </Card>
  )
}
