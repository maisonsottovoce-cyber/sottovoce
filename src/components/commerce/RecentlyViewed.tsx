"use client";

import { useEffect, useState } from "react";
import { getProductBySlug, type Product } from "@/data/products";
import { ProductRow } from "@/components/home/ProductRow";

const KEY = "sottovoce-recently-viewed";

export function RecentlyViewed({ currentSlug }: { currentSlug: string }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    let prev: string[] = [];
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) prev = JSON.parse(raw) as string[];
    } catch {
      /* ignore */
    }

    const display = prev
      .filter((s) => s !== currentSlug)
      .map(getProductBySlug)
      .filter((p): p is Product => Boolean(p))
      .slice(0, 4);
    // Derived once from localStorage on mount; intentional state sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(display);

    const next = [currentSlug, ...prev.filter((s) => s !== currentSlug)].slice(0, 8);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, [currentSlug]);

  if (items.length === 0) return null;

  return <ProductRow kicker="Lately" title="Recently viewed" products={items} />;
}
