"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { assetPath, lb } from "@/lib/asset";

/**
 * Cinematic hero with a pinned scale-reveal scroll effect: the media starts
 * full-bleed, then scales and rounds into a framed editorial card as you scroll,
 * while the headline parallaxes and fades. Accepts an optional Seedance video
 * (falls back to the poster still). Static, un-pinned under reduced-motion.
 */
export function HeroSection({
  videoSrc,
  poster = lb(16),
}: {
  videoSrc?: string;
  poster?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.84]);
  const radius = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -70]);

  const media = videoSrc ? (
    <video
      src={assetPath(videoSrc)}
      poster={assetPath(poster)}
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 h-full w-full object-cover"
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={assetPath(poster)}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
    />
  );

  const overlay = (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent" />
    </>
  );

  const Content = (
    <div className="relative mx-auto flex h-full max-w-[1500px] flex-col justify-end px-6 pb-24 pt-32 sm:px-12 md:pb-28">
      <div className="max-w-2xl">
        <motion.span
          className="brand-kicker text-gold"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          The New Collection
        </motion.span>
        <motion.h1
          className="editorial-heading mt-5 text-5xl leading-[0.98] text-ivory sm:text-7xl md:text-[5.5rem]"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        >
          New silhouettes for
          <span className="block italic text-cream">unforgettable evenings.</span>
        </motion.h1>
        <motion.p
          className="body-copy mt-6 max-w-md text-cream/85"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
        >
          Effortless pieces for entrances, evenings, and occasions worth remembering.
        </motion.p>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.52 }}
        >
          <Button href="/collections/new-in" variant="cream" size="lg">
            Shop New In
          </Button>
        </motion.div>
      </div>
    </div>
  );

  // Reduced-motion / no scroll effect: a single full-bleed hero.
  if (reduce) {
    return (
      <section className="relative isolate h-[88vh] w-full overflow-hidden text-ivory">
        {media}
        {overlay}
        {Content}
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[185vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-ivory">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative h-full w-full overflow-hidden bg-ink text-ivory"
        >
          {media}
          {overlay}
          <motion.div style={{ opacity: textOpacity, y: textY }} className="absolute inset-0">
            {Content}
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <span className="flex h-11 w-7 items-start justify-center rounded-full border border-ivory/45 p-1.5">
              <motion.span
                className="h-2 w-1 rounded-full bg-ivory/80"
                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
