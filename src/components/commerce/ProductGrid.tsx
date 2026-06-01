import type { Product } from "@/data/products";
import { cx } from "@/lib/format";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  columns = 4,
  className,
}: {
  products: Product[];
  columns?: 3 | 4;
  className?: string;
}) {
  const cols =
    columns === 3
      ? "grid-cols-2 md:grid-cols-3"
      : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4";

  return (
    <div className={cx("grid gap-x-5 gap-y-12 sm:gap-x-8", cols, className)}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < columns} />
      ))}
    </div>
  );
}
