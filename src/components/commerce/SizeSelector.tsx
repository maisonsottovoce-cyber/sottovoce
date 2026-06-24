import Link from "next/link";
import { cx } from "@/lib/format";
import type { SizeStock } from "@/data/products";

export function SizeSelector({
  sizes,
  sizeStock,
  value,
  onChange,
  error,
}: {
  sizes: string[];
  sizeStock?: SizeStock[];
  value: string | null;
  onChange: (size: string) => void;
  error?: boolean;
}) {
  const soldOut = (size: string) =>
    sizeStock?.some((s) => s.size === size && !s.available) ?? false;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="small-caps text-muted">Size</span>
        <Link href="/size-guide" className="small-caps text-ink link-underline hover:text-purple">
          Size Guide
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => {
          const active = s === value;
          const out = soldOut(s);
          return (
            <button
              key={s}
              type="button"
              disabled={out}
              onClick={() => onChange(s)}
              aria-pressed={active}
              title={out ? "Sold out" : undefined}
              className={cx(
                "small-caps relative min-w-12 border px-4 py-3 transition-colors",
                out
                  ? "cursor-not-allowed border-line text-muted/50 line-through"
                  : active
                    ? "border-ink bg-ink text-ivory"
                    : "border-line text-ink hover:border-ink",
              )}
            >
              {s}
            </button>
          );
        })}
      </div>
      {error ? (
        <p className="small-caps mt-3 text-purple" role="alert">
          Please select a size
        </p>
      ) : null}
    </div>
  );
}
