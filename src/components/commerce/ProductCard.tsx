"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice, cx } from "@/lib/format";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { Badge } from "@/components/ui/Badge";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { addItem } = useCart();
  const [showSizes, setShowSizes] = useState(false);

  const primary = product.images[0];
  const secondary = product.images[1] ?? product.images[0];

  function quickAdd(size: string) {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      size,
      color: product.color,
      image: { label: primary.label, tone: primary.tone },
    });
    setShowSizes(false);
  }

  return (
    <div className="group relative flex flex-col">
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.slug}`} aria-label={product.name}>
          {/* primary + hover image */}
          <ImagePlaceholder
            label={primary.label}
            tone={primary.tone}
            src={primary.src}
            showLabel={!priority}
            className="aspect-[3/4] w-full"
          />
          <ImagePlaceholder
            label={secondary.label}
            tone={secondary.tone}
            src={secondary.src}
            showLabel={false}
            className="absolute inset-0 aspect-[3/4] w-full opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
          />
        </Link>

        {/* badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew ? <Badge tone="light">New</Badge> : null}
          {product.isBestSeller ? <Badge tone="purple">Bestseller</Badge> : null}
        </div>

        {/* wishlist */}
        <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-ivory/85 backdrop-blur-sm transition-opacity">
          <WishlistButton slug={product.slug} />
        </div>

        {/* quick add */}
        <div className="absolute inset-x-0 bottom-0 translate-y-2 px-3 pb-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
          {showSizes ? (
            <div className="flex flex-wrap items-center justify-center gap-1 bg-ivory/95 p-2 backdrop-blur-sm">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => quickAdd(size)}
                  className="small-caps min-w-9 px-2 py-2 text-ink transition-colors hover:bg-ink hover:text-ivory"
                >
                  {size}
                </button>
              ))}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowSizes(true)}
              className="nav-link w-full bg-ink/90 py-3 text-ivory backdrop-blur-sm transition-colors hover:bg-purple"
            >
              Quick Add
            </button>
          )}
        </div>
      </div>

      {/* meta */}
      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="product-title">
            <Link href={`/products/${product.slug}`} className="hover:text-purple">
              {product.name}
            </Link>
          </h3>
          <span className="text-sm tabular-nums text-ink">{formatPrice(product.price)}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="small-caps text-muted">{product.color}</span>
          <div className="flex items-center gap-1.5">
            {product.availableColors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className={cx(
                  "h-3 w-3 rounded-full ring-1 ring-line",
                  c.hex === "#FBF8F2" && "ring-line",
                )}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
