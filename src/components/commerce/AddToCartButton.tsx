"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { cx } from "@/lib/format";

export function AddToCartButton({
  product,
  size,
  color,
  quantity,
  onRequireSize,
  className,
}: {
  product: Product;
  size: string | null;
  color: string;
  quantity: number;
  onRequireSize: () => void;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function handleClick() {
    if (!size) {
      onRequireSize();
      return;
    }
    const primary = product.images[0];
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      size,
      color,
      image: { label: primary.label, tone: primary.tone },
      quantity,
    });
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 2200);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cx(
        "nav-link flex w-full items-center justify-center py-4 transition-colors duration-300",
        added ? "bg-purple text-ivory" : "bg-ink text-ivory hover:bg-purple",
        className,
      )}
    >
      {added ? "Added to Bag — view bag" : "Add to Bag"}
    </button>
  );
}
