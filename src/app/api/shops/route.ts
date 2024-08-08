import prismaClient from "@/app/lib/prisma";
(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  const params = new URL(req.url).searchParams as any;
  const page = parseInt(params.get('_page') ?? 1);
  const limit = parseInt(params.get('limit') ?? 20);
  const sort = params.get('sort') ?? "id";
  const order = (params.get('order') ?? "asc").toLowerCase() === "asc" ? "asc" : "desc";
  const shops = await prismaClient.shops.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      [sort]: order,
    },
  });
  const total = await prismaClient.shops.count();
  return NextResponse.json(shops, {
    headers: {
      "x-total-count": total.toString(),
    },
  });
})

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(body, {
    headers: {
      "content-type": "application/json",
    },
  });
}