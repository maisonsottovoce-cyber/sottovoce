"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, cx } from "@/lib/format";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { QuantitySelector } from "./QuantitySelector";
import { CloseIcon } from "@/components/ui/icons";

export function CartDrawer() {
  const { isOpen, closeCart, items, subtotal, count, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <div className={cx(isOpen ? "" : "pointer-events-none")} aria-hidden={!isOpen}>
      <div
        onClick={closeCart}
        className={cx(
          "fixed inset-0 z-50 bg-ink/40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        className={cx(
          "fixed inset-y-0 right-0 z-50 flex w-[92%] max-w-md flex-col bg-ivory transition-transform duration-500 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="small-caps text-ink">Your Bag ({count})</span>
          <button type="button" onClick={closeCart} aria-label="Close bag" className="text-ink hover:text-purple">
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="editorial-heading text-2xl">Your bag is empty</p>
            <p className="body-copy text-sm">The next entrance begins with a single piece.</p>
            <Link
              href="/collections/new-in"
              onClick={closeCart}
              className="nav-link link-underline mt-2 text-ink hover:text-purple"
            >
              Shop New In
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 border-b border-line py-5">
                  <Link href={`/products/${item.slug}`} onClick={closeCart} className="shrink-0">
                    <ImagePlaceholder
                      label={item.image.label}
                      tone={item.image.tone}
                      showLabel={false}
                      className="h-28 w-22"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="product-title hover:text-purple"
                      >
                        {item.name}
                      </Link>
                      <span className="text-sm tabular-nums">{formatPrice(item.price)}</span>
                    </div>
                    <span className="small-caps mt-1 text-muted">
                      {item.color} · {item.size}
                    </span>
                    <div className="mt-auto flex items-center justify-between pt-3">
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

            <div className="border-t border-line px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="small-caps text-muted">Subtotal</span>
                <span className="text-base tabular-nums text-ink">{formatPrice(subtotal)}</span>
              </div>
              <p className="body-copy mt-1 text-xs">
                Complimentary shipping &amp; taxes calculated at checkout.
              </p>
              <Link
                href="/cart"
                onClick={closeCart}
                className="nav-link mt-4 flex w-full items-center justify-center bg-ink py-4 text-ivory transition-colors hover:bg-purple"
              >
                View Bag &amp; Checkout
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="nav-link link-underline mt-3 w-full text-center text-ink hover:text-purple"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
