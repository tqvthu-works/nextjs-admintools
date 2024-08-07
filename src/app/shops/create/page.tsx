import { Card, CardBody, CardHeader } from 'react-bootstrap'
import ShopForm from '@/components/Shop/ShopForm'
import { PrismaClient } from '@prisma/client'
export default function Page() {
  return (
    <Card>
      <CardHeader>Add new Shop</CardHeader>
      <CardBody>
        <ShopForm />
      </CardBody>
    </Card>
  )
}
