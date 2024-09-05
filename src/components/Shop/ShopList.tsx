import { Table } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
import type { Shop } from '@prisma/client'
import THSort from '@/components/TableSort/THSort'
import Link from 'next/link'
type Props = {
  shops: Shop[];
} & Pick<Parameters<typeof THSort>[0], 'setSort' | 'setOrder'>

export default function ShopList(props: Props) {
  const { shops, setSort, setOrder } = props
  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th><THSort name="id" setSort={setSort} setOrder={setOrder}>#</THSort></th>
          <th>Name</th>
          <th><THSort name="shopify_domain" setSort={setSort} setOrder={setOrder}>Shopify Domain</THSort></th>
          <th>Email</th>
          <th>Installed Date</th>
          <th>Is Expert</th>
          <th>Pricing Plan</th>
          <th>Request Submit App?</th>
          <th>Is Testing</th>
        </tr>
      </thead>
      <tbody>
        {shops.map((shop) => (
          <tr key={shop.id}>
            <td><Link href={`/shops/${shop.id}`}>{shop.id}</Link></td>
            <td>{shop.name}</td>
            <td>{shop.shopify_domain}</td>
            <td>{shop.email}</td>
            <td>{shop.created_at!.toString()}</td>
            <td>{shop.is_expert ? 'Yes' : 'No'}</td>
            <td>{shop.plan_name}</td>
            <td>Yes</td>
            <td>{shop.is_test ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
