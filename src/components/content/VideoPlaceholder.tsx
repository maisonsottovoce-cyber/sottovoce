import Link from "next/link";
import { cx } from "@/lib/format";
import type { PlaceholderTone } from "@/data/products";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { PlayIcon } from "@/components/ui/icons";

export function VideoPlaceholder({
  label,
  tone = "ink",
  href,
  caption,
  className,
}: {
  label: string;
  tone?: PlaceholderTone;
  href?: string;
  caption?: string;
  className?: string;
}) {
  const inner = (
    <ImagePlaceholder
      label={label}
      tone={tone}
      showLabel={false}
      className={cx("group h-full w-full", className)}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-ivory">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-ivory/50 transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-ivory/5">
          <PlayIcon width={26} height={26} className="ml-1 text-ivory" />
        </span>
        {caption ? (
          <span className="brand-kicker text-ivory/75">{caption}</span>
        ) : null}
      </div>
    </ImagePlaceholder>
  );

  if (href) {
    return (
      <Link href={href} aria-label={caption ?? label} className="block h-full w-full">
        {inner}
      </Link>
    );
  }
  return inner;
}
