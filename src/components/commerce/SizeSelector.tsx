import Link from "next/link";
import { cx } from "@/lib/format";

export function SizeSelector({
  sizes,
  value,
  onChange,
  error,
}: {
  sizes: string[];
  value: string | null;
  onChange: (size: string) => void;
  error?: boolean;
}) {
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
          return (
            <button
              key={s}
              type="button"
              onClick={() => onChange(s)}
              aria-pressed={active}
              className={cx(
                "small-caps min-w-12 border px-4 py-3 transition-colors",
                active
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
