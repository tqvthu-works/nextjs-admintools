import React from "react";
import { SearchParams } from "@/types/next";
import Index, { Props } from "@/app/(pages)/shops/index";
import type { shops as Shop } from "prisma/generated/client-api";
import { PaginationHelper } from "@/app/helpers/pagination";
import { auth } from "@/auth";
import { FetchHelper } from "@/app/helpers/fetcher";
const fetchShops = async (searchParams: SearchParams): Promise<Props["props"]> => {
  // get base domain url
  const getShopsUrl = `${process.env.NEXT_PUBLIC_HOST}/api/shops`;
  let page = 1;
  if (searchParams?.page) {
    page = parseInt(searchParams.page.toString(), 10);
  }
  let perPage = 20;
  if (searchParams?.per_page) {
    perPage = parseInt(searchParams.per_page.toString(), 10);
  }

  let sort = "id";
  if (searchParams?.sort) {
    sort = searchParams.sort.toString();
  }

  let order = "asc";
  if (searchParams?.order && typeof searchParams.order === "string") {
    order = searchParams.order;
  }
  const url = new URL(getShopsUrl);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", perPage.toString());
  url.searchParams.set("sort", sort);
  url.searchParams.set("order", order);
  const res = await FetchHelper.fetch(url.toString(), { method: "GET" });
  const data = await res.json();
  const shopResource = PaginationHelper.getInstance<Shop>(1, perPage).getData(data, page);

  return {
    shopResource,
    page,
    perPage,
    sort,
    order,
  };
};
export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const props = await fetchShops(searchParams);
  return <Index props={props} />;
}