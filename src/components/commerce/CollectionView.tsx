"use client";

import { useMemo, useState } from "react";
import type { Product, Occasion } from "@/data/products";
import { cx } from "@/lib/format";
import { ProductGrid } from "./ProductGrid";
import { Divider } from "@/components/ui/Divider";
import { ChevronDownIcon, CloseIcon } from "@/components/ui/icons";

const OCCASIONS: Occasion[] = [
  "Cocktail",
  "Evening",
  "Dinner",
  "Vacation",
  "Day to Night",
  "Event",
];

type SortKey = "newest" | "best" | "price-asc" | "price-desc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "Newest" },
  { key: "best", label: "Best Selling" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
];

function toggle<T>(set: T[], value: T): T[] {
  return set.includes(value) ? set.filter((v) => v !== value) : [...set, value];
}

export function CollectionView({ products }: { products: Product[] }) {
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const colorOptions = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) =>
      p.availableColors.forEach((c) => map.set(c.name, c.hex)),
    );
    return [...map.entries()].map(([name, hex]) => ({ name, hex }));
  }, [products]);

  const sizeOptions = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return [...set];
  }, [products]);

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      const okOcc = occasions.length === 0 || occasions.some((o) => p.occasion.includes(o));
      const okColor =
        colors.length === 0 || p.availableColors.some((c) => colors.includes(c.name));
      const okSize = sizes.length === 0 || p.sizes.some((s) => sizes.includes(s));
      return okOcc && okColor && okSize;
    });
    const sorted = [...result];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "best":
        sorted.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
        break;
      default:
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    }
    return sorted;
  }, [products, occasions, colors, sizes, sort]);

  const activeCount = occasions.length + colors.length + sizes.length;

  function clearAll() {
    setOccasions([]);
    setColors([]);
    setSizes([]);
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16">
      {/* Occasion chips */}
      <div className="no-scrollbar flex justify-start gap-2 overflow-x-auto pb-1 md:justify-center">
        {OCCASIONS.map((o) => {
          const active = occasions.includes(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => setOccasions((prev) => toggle(prev, o))}
              className={cx(
                "small-caps whitespace-nowrap border px-4 py-2.5 transition-colors",
                active
                  ? "border-purple bg-purple text-ivory"
                  : "border-line text-ink hover:border-ink",
              )}
            >
              {o}
            </button>
          );
        })}
      </div>

      {/* Controls bar */}
      <div className="mt-10 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          className="nav-link inline-flex items-center gap-2 text-ink hover:text-purple"
          aria-expanded={filtersOpen}
        >
          Filters{activeCount ? ` (${activeCount})` : ""}
          <ChevronDownIcon
            width={15}
            height={15}
            className={cx("transition-transform", filtersOpen && "rotate-180")}
          />
        </button>

        <span className="small-caps hidden text-muted sm:block">
          {filtered.length} {filtered.length === 1 ? "Piece" : "Pieces"}
        </span>

        <label className="inline-flex items-center gap-2">
          <span className="small-caps hidden text-muted sm:block">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="nav-link cursor-pointer border-b border-line bg-transparent py-1.5 pr-6 text-ink focus:border-purple focus:outline-none"
            aria-label="Sort products"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Filter panel */}
      {filtersOpen ? (
        <div className="mt-4 border border-line p-6">
          <div className="grid gap-8 sm:grid-cols-2">
            <fieldset>
              <legend className="small-caps mb-3 text-muted">Color</legend>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((c) => {
                  const active = colors.includes(c.name);
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setColors((prev) => toggle(prev, c.name))}
                      className={cx(
                        "flex items-center gap-2 border px-3 py-2 transition-colors",
                        active ? "border-purple" : "border-line hover:border-ink",
                      )}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full ring-1 ring-line"
                        style={{ background: c.hex }}
                      />
                      <span className="small-caps text-ink">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="small-caps mb-3 text-muted">Size</legend>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((s) => {
                  const active = sizes.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSizes((prev) => toggle(prev, s))}
                      className={cx(
                        "small-caps min-w-11 border px-3 py-2 transition-colors",
                        active
                          ? "border-purple bg-purple text-ivory"
                          : "border-line text-ink hover:border-ink",
                      )}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          {activeCount ? (
            <button
              type="button"
              onClick={clearAll}
              className="small-caps mt-6 inline-flex items-center gap-1.5 text-muted hover:text-purple"
            >
              <CloseIcon width={14} height={14} /> Clear all
            </button>
          ) : null}
        </div>
      ) : null}

      <Divider className="mt-8" />

      {/* Grid */}
      {filtered.length > 0 ? (
        <ProductGrid products={filtered} columns={4} className="mt-12" />
      ) : (
        <p className="body-copy mt-16 text-center text-sm">
          No pieces match these filters yet.{" "}
          <button onClick={clearAll} className="link-underline text-purple">
            Clear filters
          </button>
        </p>
      )}
    </div>
  );
}
