'use client'

import { Button, Card } from 'react-bootstrap'
import React from 'react'
import { IPagination } from '@/types/pagination'
import { PaginationHelper } from '@/app/helpers/pagination'
import useSWRAxios, { transformResponseWrapper } from '@/hooks/useSWRAxios'
import Pagination from '@/components/Pagination/Pagination'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import type { shops as Shop } from 'prisma/generated/client-api'
import ShopList from '@/components/Shop/ShopList'
import { Props } from '@/app/services/common'

export default function Index(props: Props<Shop>) {
  const {
    props: {
      data, page, perPage, sort, order,
    },
  } = props

  const {
    data: { data: resource },
  } = useSWRAxios<IPagination<Shop>>(
    {
      url: `${process.env.NEXT_PUBLIC_HOST}/api/shops`,
      params: {
        page,
        limit: perPage,
        sort,
        order,
      },
      transformResponse: transformResponseWrapper((d: Shop[], h) => {
        const total = h ? parseInt(h['x-total-count'], 10) : 0
        return PaginationHelper.getInstance<Shop>(total, perPage).getData(d, page)
      }),
    },
    {
      data,
      headers: {
        'x-total-count': data.meta.total.toString(),
      },
    },
  )
  const router = useRouter()
  return (
    <Card>
      <Card.Header>Shops</Card.Header>
      <Card.Body>
        <div className="mb-3 text-end">
          <Button variant="success" onClick={() => router.push('/shops/create')}>
            <FontAwesomeIcon icon={faPlus} fixedWidth />
            Add new
          </Button>
        </div>
        <Pagination meta={resource.meta} />
        <ShopList shops={resource.data} />
      </Card.Body>
    </Card>
  )
}
