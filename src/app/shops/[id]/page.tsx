import { notFound } from 'next/navigation'
import { Card, CardBody, CardHeader } from 'react-bootstrap'
import type { Shop } from '@prisma/client'
import { getShopDetail } from '@/app/services/shop_service'
import ShopDetail from '@/components/Shop/ShopDetail'

type Props = {
  shop: Shop;
};

export default async function Page({ params }: { params: { id: string } }) {
  const shopDetail = await getShopDetail(params.id)
  return (
    <Card>
      <CardHeader>Shop</CardHeader>
      <CardBody>
        <ShopDetail shop_detail={shopDetail} />
      </CardBody>
    </Card>
  )
}
