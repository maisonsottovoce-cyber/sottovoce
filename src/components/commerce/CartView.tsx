"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { QuantitySelector } from "./QuantitySelector";
import { Divider } from "@/components/ui/Divider";

export function CartView() {
  const { items, subtotal, count, updateQuantity, removeItem, hydrated } = useCart();
  const [checkoutMsg, setCheckoutMsg] = useState(false);

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-6 py-28 text-center">
        <span className="brand-kicker text-purple">Your Bag</span>
        <h1 className="editorial-heading text-4xl sm:text-5xl">Your bag is empty</h1>
        <p className="body-copy max-w-md">
          Every memorable evening begins with a single piece. Explore the latest silhouettes
          to begin.
        </p>
        <Link
          href="/collections/new-in"
          className="nav-link mt-2 bg-ink px-8 py-4 text-ivory transition-colors hover:bg-purple"
        >
          Shop New In
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 md:py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="brand-kicker text-purple">Your Bag</span>
        <h1 className="editorial-heading text-4xl sm:text-5xl">The Bag</h1>
        {hydrated ? <p className="small-caps text-muted">{count} {count === 1 ? "piece" : "pieces"}</p> : null}
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        {/* Items */}
        <div>
          <Divider />
          <ul>
            {items.map((item) => (
              <li key={item.id} className="flex gap-5 border-b border-line py-6">
                <Link href={`/products/${item.slug}`} className="shrink-0">
                  <ImagePlaceholder
                    label={item.image.label}
                    tone={item.image.tone}
                    showLabel={false}
                    className="h-36 w-28"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/products/${item.slug}`} className="editorial-heading text-2xl hover:text-purple">
                      {item.name}
                    </Link>
                    <span className="text-sm tabular-nums text-ink">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                  <span className="small-caps mt-2 text-muted">
                    {item.color} · Size {item.size}
                  </span>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.id, q)}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="small-caps text-muted hover:text-purple"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-44 lg:self-start">
          <div className="border border-line p-7">
            <h2 className="small-caps text-ink">Order Summary</h2>
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="tabular-nums text-ink">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Shipping</span>
                <span className="text-ink">Complimentary</span>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between">
                <span className="small-caps text-ink">Estimated Total</span>
                <span className="tabular-nums text-ink">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCheckoutMsg(true)}
              className="nav-link mt-7 w-full bg-ink py-4 text-ivory transition-colors hover:bg-purple"
            >
              Proceed to Checkout
            </button>
            {checkoutMsg ? (
              <p className="mt-4 text-center text-sm italic text-purple" role="status">
                Checkout integration coming soon.
              </p>
            ) : null}

            <p className="body-copy mt-4 text-center text-xs">
              Taxes calculated at checkout. Complimentary shipping on all U.S. orders.
            </p>
            <Link
              href="/collections/new-in"
              className="nav-link link-underline mt-5 block text-center text-ink hover:text-purple"
            >
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
