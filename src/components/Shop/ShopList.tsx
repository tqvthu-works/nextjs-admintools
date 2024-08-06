import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Shop } from '@prisma/client'
import THSort from '@/components/TableSort/THSort'

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
          <th><THSort name="shopify_domain" setSort={setSort} setOrder={setOrder}>Shopify Domain</THSort></th>
          <th>Is Testing</th>
          <th>Created At</th>
          <th>Updated At</th>
          {/* <th className="text-center">Egg group</th>
          <th className="text-end"><THSort name="hp" setSort={setSort} setOrder={setOrder}>Hp</THSort></th>
          <th className="text-end"><THSort name="attack" setSort={setSort} setOrder={setOrder}>Atk</THSort></th>
          <th className="text-end"><THSort name="defense" setSort={setSort} setOrder={setOrder}>Def</THSort></th>
          <th className="text-end"><THSort name="special_attack" setSort={setSort} setOrder={setOrder}>SpA</THSort></th>
          <th className="text-end"><THSort name="special_defense" setSort={setSort} setOrder={setOrder}>SpD</THSort></th>
          <th className="text-end"><THSort name="speed" setSort={setSort} setOrder={setOrder}>Spd</THSort></th>
          <th className="text-end"><THSort name="total" setSort={setSort} setOrder={setOrder}>Total</THSort></th>
          <th aria-label="Action" /> */}
        </tr>
      </thead>
      <tbody>
        {shops.map((shop) => (
          <tr key={shop.id}>
            <td>{shop.id}</td>
            <td>{shop.shopify_domain}</td>
            <td>{shop.is_test ? 'Yes' : 'No'}</td>
            <td>{shop.created_at!.toString()}</td>
            <td>{shop.updated_at!.toString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
