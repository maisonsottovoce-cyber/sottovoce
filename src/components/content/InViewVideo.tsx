"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/lib/format";

/**
 * A looping, muted background video that plays only while in view and pauses
 * offscreen (battery/CPU friendly). The poster carries the visual before the
 * video loads, and is all that shows under prefers-reduced-motion.
 */
export function InViewVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      className={cx("h-full w-full object-cover", className)}
    />
  );
}
