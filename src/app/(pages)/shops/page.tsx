import React from 'react'
import { SearchParams } from '@/types/next'
import Index from '@/app/(pages)/shops/index'
import type { shops as Shop } from 'prisma/generated/client-api'
import { CommonService } from '@/app/services/common'

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const props = await CommonService.getInstance<Shop>().getList(searchParams, 'api/shops')
  return <Index props={props} />
}
