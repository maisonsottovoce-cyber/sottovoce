"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCatalog } from "@/lib/catalog-client";
import { ProductGrid } from "./ProductGrid";

export function WishlistView() {
  const { ids, hydrated } = useWishlist();
  const { products } = useCatalog();
  const items = products.filter((p) => ids.includes(p.slug));

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="brand-kicker text-purple">Saved</span>
        <h1 className="editorial-heading text-4xl sm:text-5xl">The Wishlist</h1>
        <p className="body-copy max-w-md text-sm">
          The pieces you&apos;re considering for the next entrance.
        </p>
      </div>

      {hydrated && ids.length === 0 ? (
        <div className="flex flex-col items-center gap-5 py-20 text-center">
          <p className="body-copy">You haven&apos;t saved any pieces yet.</p>
          <Link
            href="/collections/new-in"
            className="nav-link bg-ink px-8 py-4 text-ivory transition-colors hover:bg-purple"
          >
            Discover New In
          </Link>
        </div>
      ) : (
        <ProductGrid products={items} columns={4} className="mt-12" />
      )}
    </div>
  );
}
