import { cx } from "@/lib/format";
import type { PlaceholderTone } from "@/data/products";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function PageHero({
  kicker,
  title,
  description,
  label,
  tone = "charcoal",
  height = "md",
  align = "center",
}: {
  kicker?: string;
  title: string;
  description?: string;
  label: string;
  tone?: PlaceholderTone;
  height?: "sm" | "md" | "lg";
  align?: "center" | "left";
}) {
  const heights = {
    sm: "min-h-[44vh] py-24",
    md: "min-h-[58vh] py-28",
    lg: "min-h-[78vh] py-32",
  } as const;

  return (
    <section className="relative isolate w-full overflow-hidden text-ivory">
      <ImagePlaceholder
        label={label}
        tone={tone}
        showLabel={false}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-ink/45" />
      <div
        className={cx(
          "relative mx-auto flex max-w-4xl flex-col justify-center gap-5 px-6",
          heights[height],
          align === "center" ? "items-center text-center" : "items-start text-left",
        )}
      >
        {kicker ? <span className="brand-kicker text-gold">{kicker}</span> : null}
        <h1 className="editorial-heading text-4xl sm:text-6xl md:text-7xl">{title}</h1>
        {description ? (
          <p className="body-copy max-w-xl text-base text-cream/90">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
