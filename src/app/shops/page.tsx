import React from 'react'
import { newResource, Resource } from '@/models/resource'
import { SearchParams } from '@/types/next'
import Index, { Props } from '@/app/shops/index'
import type { Shop } from '@prisma/client'

const fetchShops = async (searchParams: SearchParams): Promise<Props['props']> => {
  // get base domain url
  const getShopsUrl = `${process.env.HOST}/api/shops`
  let page = 1
  if (searchParams?.page) {
    page = parseInt(searchParams.page.toString(), 10)
  }

  let perPage = 20
  if (searchParams?.per_page) {
    perPage = parseInt(searchParams.per_page.toString(), 10)
  }

  let sort = 'id'
  if (searchParams?.sort) {
    sort = searchParams.sort.toString()
  }

  let order = 'asc'
  if (searchParams?.order && typeof searchParams.order === 'string') {
    order = searchParams.order
  }

  const url = new URL(getShopsUrl)
  url.searchParams.set('_page', page.toString())
  url.searchParams.set('_limit', perPage.toString())
  url.searchParams.set('_sort', sort)
  url.searchParams.set('_order', order)
  const res = await fetch(url, {
    method: 'GET',
  })
  const shops: Shop[] = await res.json()

  const total = parseInt(res.headers.get('x-total-count') ?? '0', 10)
  const shopResource: Resource<Shop> = newResource(shops, total, page, perPage)

  return {
    shopResource,
    page,
    perPage,
    sort,
    order,
  }
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const props = await fetchShops(searchParams)
  return (
    <Index props={props} />
  )
}
