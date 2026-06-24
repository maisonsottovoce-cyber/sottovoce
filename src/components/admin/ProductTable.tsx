"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { deleteProduct, setPublished, moveProduct } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { AdminProduct } from "@/lib/admin-types";

export function ProductTable({ products }: { products: AdminProduct[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.category, p.slug].some((v) => v.toLowerCase().includes(q)),
    );
  }, [products, query]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products…"
        className="mb-6 w-full max-w-sm border-b border-line bg-transparent py-2 text-sm text-ink focus:border-purple focus:outline-none"
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[44rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-ink/25">
              {["", "Item", "Category", "Price", "Status", ""].map((h, i) => (
                <th key={i} className="small-caps py-3 pr-4 text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="body-copy py-10 text-center text-sm">
                  {products.length === 0 ? (
                    <>
                      No dresses yet.{" "}
                      <Link href="/admin/products/new" className="link-underline text-purple">
                        Add the first one
                      </Link>
                      .
                    </>
                  ) : (
                    "No matches."
                  )}
                </td>
              </tr>
            ) : (
              filtered.map((p, i) => (
                <tr key={p.id} className="border-b border-line align-middle">
                  <td className="py-4 pr-2">
                    <div className="flex flex-col">
                      <form action={moveProduct.bind(null, p.id, "up")}>
                        <button type="submit" disabled={i === 0} className="text-muted hover:text-purple disabled:opacity-30" aria-label="Move up">
                          ↑
                        </button>
                      </form>
                      <form action={moveProduct.bind(null, p.id, "down")}>
                        <button type="submit" disabled={i === filtered.length - 1} className="text-muted hover:text-purple disabled:opacity-30" aria-label="Move down">
                          ↓
                        </button>
                      </form>
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <Link href={`/admin/products/${p.id}/edit`} className="product-title hover:text-purple">
                      {p.name}
                    </Link>
                  </td>
                  <td className="py-4 pr-4 text-sm capitalize text-muted">{p.category}</td>
                  <td className="py-4 pr-4 text-sm tabular-nums">
                    {p.compareAtPrice && p.compareAtPrice > p.price ? (
                      <span>
                        <span className="text-muted line-through">{formatPrice(p.compareAtPrice)}</span>{" "}
                        <span className="text-purple">{formatPrice(p.price)}</span>
                      </span>
                    ) : (
                      formatPrice(p.price)
                    )}
                  </td>
                  <td className="py-4 pr-4">
                    <span className={p.published ? "small-caps text-ink" : "small-caps text-muted"}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/admin/products/${p.id}/edit`} className="small-caps text-ink hover:text-purple">
                        Edit
                      </Link>
                      <form action={setPublished.bind(null, p.id, !p.published, p.slug)}>
                        <button type="submit" className="small-caps text-muted hover:text-purple">
                          {p.published ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <DeleteButton onConfirm={deleteProduct.bind(null, p.id, p.slug)} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
