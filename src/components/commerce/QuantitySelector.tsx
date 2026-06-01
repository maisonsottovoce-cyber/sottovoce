import { cx } from "@/lib/format";
import { PlusIcon, MinusIcon } from "@/components/ui/icons";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  className?: string;
}) {
  return (
    <div className={cx("inline-flex items-center border border-line", className)}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-purple disabled:opacity-30"
      >
        <MinusIcon width={15} height={15} />
      </button>
      <span className="min-w-8 text-center text-sm tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
        className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-purple"
      >
        <PlusIcon width={15} height={15} />
      </button>
    </div>
  );
}
