import { Table } from 'react-bootstrap'
import React from 'react'
import type { shops as Shop } from 'prisma/generated/client-api'
import THSort from '@/components/TableSort/THSort'
import Link from 'next/link';

type Props = {
  shops: Shop[];
} & Pick<Parameters<typeof THSort>[0], 'setSort' | 'setOrder'>;

export default function ShopList(props: Props) {
  const { shops, setSort, setOrder } = props
  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th>
            <THSort name="id" setSort={setSort} setOrder={setOrder}>
              #
            </THSort>
          </th>
          <th>
            <THSort name="shopify_domain" setSort={setSort} setOrder={setOrder}>
              Shopify Domain
            </THSort>
          </th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {shops.map((shop) => (
          <tr key={shop.id}>
            <td> <Link href={`/shops/${shop.id}`}>{ shop.id }</Link></td>
            <td>{shop.shopify_domain}</td>
            <td>{shop.created_at!.toString()}</td>
            <td>{shop.updated_at!.toString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
