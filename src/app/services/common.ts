import { SearchParams } from '@/types/next'
import { IPagination } from '@/types/pagination'
import { api } from '@/config/app'
import { notFound } from 'next/navigation'
import { PaginationHelper } from '../helpers/pagination'
import { FetchHelper } from '../helpers/fetcher'

export type Props<T> = {
  props: {
    data: IPagination<T>;
    page: number;
    perPage: number;
    sort: string;
    order: string;
  };
};
export class CommonService<T> {
  private static instance: CommonService<any>

  public static getInstance<T>(): CommonService<T> {
    if (!CommonService.instance) {
      CommonService.instance = new CommonService<T>()
    }
    return CommonService.instance as CommonService<T>
  }

  public async getList(searchParams: SearchParams, path: string): Promise<Props<T>['props']> {
    let page = 1
    if (searchParams?.page) {
      page = parseInt(searchParams.page.toString(), 10)
    }
    let perPage = api.per_page
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
    const url = new URL(`${process.env.NEXT_PUBLIC_HOST}/${path}`)
    url.searchParams.set('page', '1')
    url.searchParams.set('limit', perPage.toString())
    url.searchParams.set('sort', sort)
    url.searchParams.set('order', order)
    const res = await FetchHelper.fetch(url.toString(), { method: 'GET' })
    const total = parseInt(res.headers.get('x-total-count') ?? '0', 10)
    const data = await res.json()
    const resource = PaginationHelper.getInstance<T>(total, perPage).getData(data, page)

    return {
      data: resource,
      page,
      perPage,
      sort,
      order,
    }
  }
}
