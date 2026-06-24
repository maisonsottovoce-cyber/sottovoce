"use client";

import { useState } from "react";
import type { ProductImage } from "@/data/products";
import { cx } from "@/lib/format";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { PlayIcon } from "@/components/ui/icons";

type Slide =
  | { kind: "video"; src: string; label: string }
  | { kind: "image"; image: ProductImage };

export function ProductGallery({
  images,
  videoUrl,
}: {
  images: ProductImage[];
  videoUrl?: string;
}) {
  const slides: Slide[] = [
    ...(videoUrl ? [{ kind: "video" as const, src: videoUrl, label: "Video" }] : []),
    ...images.map((image) => ({ kind: "image" as const, image })),
  ];
  const [active, setActive] = useState(0);
  const current = slides[active] ?? slides[0];

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse">
      {/* Main */}
      <div className="relative flex-1">
        {current.kind === "video" ? (
          /* eslint-disable-next-line jsx-a11y/media-has-caption */
          <video
            src={current.src}
            controls
            autoPlay
            muted
            loop
            playsInline
            className="aspect-[4/5] w-full bg-ink object-cover"
          />
        ) : (
          <ImagePlaceholder
            label={current.image.label}
            tone={current.image.tone}
            src={current.image.src}
            className="aspect-[4/5] w-full"
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className="no-scrollbar flex shrink-0 gap-3 overflow-x-auto lg:flex-col">
        {slides.map((slide, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={slide.kind === "video" ? "Play video" : `View ${slide.image.label}`}
            aria-current={i === active}
            className={cx(
              "relative shrink-0 transition-opacity",
              i === active ? "opacity-100 ring-1 ring-ink" : "opacity-60 hover:opacity-100",
            )}
          >
            {slide.kind === "video" ? (
              <span className="flex h-20 w-16 items-center justify-center bg-ink lg:h-24 lg:w-20">
                <PlayIcon width={18} height={18} className="ml-1 text-ivory" />
              </span>
            ) : (
              <ImagePlaceholder
                label={slide.image.label}
                tone={slide.image.tone}
                src={slide.image.src}
                showLabel={false}
                className="h-20 w-16 lg:h-24 lg:w-20"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
