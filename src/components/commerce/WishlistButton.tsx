"use client";

import { useWishlist } from "@/context/WishlistContext";
import { HeartIcon } from "@/components/ui/icons";
import { cx } from "@/lib/format";

export function WishlistButton({
  slug,
  className,
  tone = "light",
  withLabel = false,
}: {
  slug: string;
  className?: string;
  tone?: "light" | "dark";
  withLabel?: boolean;
}) {
  const { has, toggle } = useWishlist();
  const active = has(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={cx(
        "inline-flex items-center gap-2 transition-colors",
        tone === "light" ? "text-ink" : "text-ivory",
        active && "text-purple",
        className,
      )}
    >
      <HeartIcon filled={active} width={withLabel ? 18 : 20} height={withLabel ? 18 : 20} />
      {withLabel ? (
        <span className="small-caps">{active ? "Saved" : "Wishlist"}</span>
      ) : null}
    </button>
  );
}
