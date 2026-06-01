import { cx } from "@/lib/format";
import type { PlaceholderTone } from "@/data/products";

type ToneConfig = { gradient: string; text: "light" | "dark" };

const TONES: Record<PlaceholderTone, ToneConfig> = {
  ink: {
    gradient: "radial-gradient(125% 120% at 28% 18%, #2a2723 0%, #100f0c 58%, #070605 100%)",
    text: "light",
  },
  charcoal: {
    gradient: "radial-gradient(125% 120% at 70% 12%, #322c27 0%, #1a1715 62%, #100e0c 100%)",
    text: "light",
  },
  espresso: {
    gradient: "radial-gradient(135% 125% at 24% 14%, #45342b 0%, #2a201b 55%, #1a130f 100%)",
    text: "light",
  },
  twilight: {
    gradient: "radial-gradient(135% 125% at 72% 16%, #3c2649 0%, #201526 58%, #100b14 100%)",
    text: "light",
  },
  purple: {
    gradient: "radial-gradient(125% 120% at 30% 18%, #6a3681 0%, #43205220 0%, #4b245c 45%, #28132f 100%)",
    text: "light",
  },
  sand: {
    gradient: "radial-gradient(125% 120% at 30% 18%, #e3d3b8 0%, #c9b89f 62%, #b3a081 100%)",
    text: "dark",
  },
  cream: {
    gradient: "radial-gradient(125% 120% at 30% 16%, #fbf8f2 0%, #efe6d6 60%, #e1d6c2 100%)",
    text: "dark",
  },
};

export type ImagePlaceholderProps = {
  /** Editorial label; also used as alt text when a real image replaces it. */
  label: string;
  tone?: PlaceholderTone;
  /** Replace with a real image later, e.g. "/images/hero/entrance.jpg". */
  src?: string;
  kicker?: string;
  showLabel?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function ImagePlaceholder({
  label,
  tone = "charcoal",
  src,
  kicker,
  showLabel = true,
  className,
  children,
}: ImagePlaceholderProps) {
  const cfg = TONES[tone];
  const labelColor = cfg.text === "light" ? "rgba(246,240,231,0.82)" : "rgba(14,13,11,0.72)";

  return (
    <div
      className={cx("relative overflow-hidden bg-charcoal", className)}
      style={{ background: cfg.gradient }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          {/* soft top light bloom */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 45% at 50% -5%, rgba(255,255,255,0.12), transparent 70%)",
            }}
          />
          {/* faint diagonal sheen */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
            }}
          />
          {/* vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 140px rgba(0,0,0,0.4)" }}
          />
        </>
      )}

      {showLabel && !src ? (
        <div className="absolute bottom-0 left-0 p-4 sm:p-5">
          {kicker ? (
            <span
              className="brand-kicker mb-2 block"
              style={{ color: labelColor, opacity: 0.7 }}
            >
              {kicker}
            </span>
          ) : null}
          <span className="small-caps flex items-center" style={{ color: labelColor }}>
            <span
              className="mr-2.5 inline-block h-px w-6"
              style={{ background: labelColor }}
            />
            {label}
          </span>
        </div>
      ) : null}

      {children}
    </div>
  );
}
