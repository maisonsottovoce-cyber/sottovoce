import type { ColorOption } from "@/data/products";
import { cx } from "@/lib/format";

export function ColorSelector({
  colors,
  value,
  onChange,
}: {
  colors: ColorOption[];
  value: string;
  onChange: (name: string) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="small-caps text-muted">Color</span>
        <span className="small-caps text-ink">{value}</span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {colors.map((c) => {
          const active = c.name === value;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => onChange(c.name)}
              aria-pressed={active}
              aria-label={c.name}
              title={c.name}
              className={cx(
                "flex h-9 w-9 items-center justify-center rounded-full transition-all",
                active ? "ring-1 ring-purple ring-offset-2 ring-offset-ivory" : "",
              )}
            >
              <span
                className="h-6 w-6 rounded-full ring-1 ring-line"
                style={{ background: c.hex }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
