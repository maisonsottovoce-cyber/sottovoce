"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { useCatalog } from "@/lib/catalog-client";
import { ProductRow } from "@/components/home/ProductRow";

const KEY = "sottovoce-recently-viewed";

export function RecentlyViewed({ currentSlug }: { currentSlug: string }) {
  const { products } = useCatalog();
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
      .map((slug) => products.find((p) => p.slug === slug))
      .filter((p): p is Product => Boolean(p))
      .slice(0, 4);
    // Derived from localStorage + loaded catalog; intentional state sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(display);

    const next = [currentSlug, ...prev.filter((s) => s !== currentSlug)].slice(0, 8);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, [currentSlug, products]);

  if (items.length === 0) return null;

  return <ProductRow kicker="Lately" title="Recently viewed" products={items} />;
}
