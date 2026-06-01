import Link from "next/link";
import { cx } from "@/lib/format";
import { ArrowRightIcon } from "@/components/ui/icons";

export function SectionHeader({
  kicker,
  title,
  subtitle,
  align = "center",
  cta,
  dark = false,
  className,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  cta?: { label: string; href: string };
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {kicker ? (
        <span className={cx("brand-kicker", dark ? "text-gold" : "text-purple")}>
          {kicker}
        </span>
      ) : null}
      <h2
        className={cx(
          "section-heading text-3xl sm:text-4xl md:text-5xl",
          dark ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={cx("body-copy max-w-xl text-sm", dark && "text-muted-dark")}>
          {subtitle}
        </p>
      ) : null}
      {cta ? (
        <Link
          href={cta.href}
          className={cx(
            "nav-link link-underline mt-2 inline-flex items-center gap-2",
            dark ? "text-ivory hover:text-gold" : "text-ink hover:text-purple",
          )}
        >
          {cta.label}
          <ArrowRightIcon width={16} height={16} />
        </Link>
      ) : null}
    </div>
  );
}
