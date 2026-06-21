import { NextResponse } from "next/server";
import { getProducts } from "@/lib/catalog";

export const dynamic = "force-static";

// Public catalog feed consumed by client components (search, wishlist, recently viewed).
export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}
