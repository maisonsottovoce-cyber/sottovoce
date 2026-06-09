"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";

// Module-level cache so the catalog is fetched once per session.
let cache: Product[] | null = null;
let inflight: Promise<Product[]> | null = null;

function fetchCatalog(): Promise<Product[]> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = fetch("/api/products")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Product[]) => {
        cache = data;
        return data;
      })
      .catch(() => [] as Product[]);
  }
  return inflight;
}

/** Client-side access to the published catalog (via /api/products). */
export function useCatalog() {
  const [products, setProducts] = useState<Product[]>(cache ?? []);
  const [loading, setLoading] = useState(cache === null);

  useEffect(() => {
    let active = true;
    fetchCatalog().then((data) => {
      if (active) {
        setProducts(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return { products, loading };
}
