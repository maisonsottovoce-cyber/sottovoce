"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { formatPrice, cx } from "@/lib/format";
import { CloseIcon, SearchIcon } from "@/components/ui/icons";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.occasion.some((o) => o.toLowerCase().includes(q)),
      )
      .slice(0, 6);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative mx-auto max-w-3xl bg-ivory p-6 shadow-2xl sm:p-10">
        <div className="flex items-center gap-3 border-b border-ink/30 pb-3">
          <SearchIcon className="text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search silhouettes, occasions…"
            aria-label="Search products"
            className="w-full bg-transparent text-lg text-ink placeholder:text-muted/70 focus:outline-none"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="text-ink">
            <CloseIcon />
          </button>
        </div>

        <div className="mt-5">
          {query && results.length === 0 ? (
            <p className="body-copy text-sm">No pieces found for “{query}”.</p>
          ) : null}
          <ul className={cx("flex flex-col", results.length > 0 && "divide-y divide-line")}>
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/products/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 py-3 hover:opacity-80"
                >
                  <ImagePlaceholder
                    label={p.images[0].label}
                    tone={p.images[0].tone}
                    showLabel={false}
                    className="h-16 w-12 shrink-0"
                  />
                  <span className="flex-1">
                    <span className="product-title block">{p.name}</span>
                    <span className="small-caps text-muted">{p.color}</span>
                  </span>
                  <span className="text-sm tabular-nums text-ink">{formatPrice(p.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
