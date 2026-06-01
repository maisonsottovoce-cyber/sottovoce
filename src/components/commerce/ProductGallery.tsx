"use client";

import { useState } from "react";
import type { ProductImage } from "@/data/products";
import { cx } from "@/lib/format";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { PlayIcon } from "@/components/ui/icons";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  const isMotion = /movement|video|film/i.test(current.label);

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse">
      {/* Main */}
      <div className="relative flex-1">
        <ImagePlaceholder
          label={current.label}
          tone={current.tone}
          src={current.src}
          kicker={isMotion ? "Brand Film" : undefined}
          className="aspect-[4/5] w-full"
        >
          {isMotion && !current.src ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ivory/50">
                <PlayIcon width={22} height={22} className="ml-1 text-ivory" />
              </span>
            </div>
          ) : null}
        </ImagePlaceholder>
      </div>

      {/* Thumbnails */}
      <div className="no-scrollbar flex shrink-0 gap-3 overflow-x-auto lg:flex-col">
        {images.map((img, i) => (
          <button
            key={`${img.label}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View ${img.label}`}
            aria-current={i === active}
            className={cx(
              "shrink-0 transition-opacity",
              i === active ? "opacity-100 ring-1 ring-ink" : "opacity-60 hover:opacity-100",
            )}
          >
            <ImagePlaceholder
              label={img.label}
              tone={img.tone}
              src={img.src}
              showLabel={false}
              className="h-20 w-16 lg:h-24 lg:w-20"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
