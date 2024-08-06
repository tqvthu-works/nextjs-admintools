"use client";

import { Button, Card } from "react-bootstrap";
import React from "react";
import { newResource, Resource } from "@/models/resource";
import useSWRAxios, { transformResponseWrapper } from "@/hooks/useSWRAxios";
import Pagination from "@/components/Pagination/Pagination";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import type { Shop } from "@prisma/client";
import ShopList from "@/components/Shop/ShopList";

export type Props = {
  props: {
    shopResource: Resource<Shop>;
    page: number;
    perPage: number;
    sort: string;
    order: string;
  };
};

export default function Index(props: Props) {
  const {
    props: { shopResource, page, perPage, sort, order },
  } = props;

  const router = useRouter();

  const getShopsUrl = `${process.env.NEXT_PUBLIC_HOST}/api/shops`;

  // swr: data -> axios: data -> resource: data
  const {
    data: { data: resource },
  } = useSWRAxios<Resource<Shop>>(
    {
      url: getShopsUrl,
      params: {
        page: page,
        limit: perPage,
        sort: sort,
        order: order,
      },
      transformResponse: transformResponseWrapper((d: Shop[], h) => {
        const total = h ? parseInt(h["x-total-count"], 10) : 0;
        return newResource(d, total, page, perPage);
      }),
    },
    {
      data: shopResource,
      headers: {
        "x-total-count": shopResource.meta.total.toString(),
      },
    }
  );
  return (
    <Card>
      <Card.Header>Shops</Card.Header>
      <Card.Body>
        <div className="mb-3 text-end">
          <Button variant="success" onClick={() => router.push("/shops/create")}>
            <FontAwesomeIcon icon={faPlus} fixedWidth />
            Add new
          </Button>
        </div>
        <Pagination meta={resource.meta} />
        <ShopList shops={resource.data} />
      </Card.Body>
    </Card>
  );
}
