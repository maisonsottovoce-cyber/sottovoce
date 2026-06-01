"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { ColorSelector } from "./ColorSelector";
import { SizeSelector } from "./SizeSelector";
import { QuantitySelector } from "./QuantitySelector";
import { AddToCartButton } from "./AddToCartButton";
import { WishlistButton } from "./WishlistButton";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";

export function ProductInfo({ product }: { product: Product }) {
  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);

  function handleSize(s: string) {
    setSize(s);
    setError(false);
  }

  return (
    <div>
      <div className="flex flex-col gap-1">
        <span className="brand-kicker text-purple">Maison SOTTOVOCE</span>
        <h1 className="editorial-heading mt-1 text-3xl sm:text-4xl">{product.name}</h1>
        <p className="mt-2 text-lg tabular-nums text-ink">{formatPrice(product.price)}</p>
      </div>

      <p className="body-copy mt-5 text-[0.95rem] italic">{product.description}</p>

      <div className="mt-8 flex flex-col gap-7">
        <ColorSelector colors={product.availableColors} value={color} onChange={setColor} />
        <SizeSelector sizes={product.sizes} value={size} onChange={handleSize} error={error} />

        <div className="flex items-center gap-4">
          <span className="small-caps text-muted">Quantity</span>
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </div>

        <div className="flex flex-col gap-3">
          <AddToCartButton
            product={product}
            size={size}
            color={color}
            quantity={quantity}
            onRequireSize={() => setError(true)}
          />
          <div className="flex justify-center">
            <WishlistButton slug={product.slug} withLabel className="py-1" />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mt-10">
        <Accordion>
          <AccordionItem title="Fit">{product.fit}</AccordionItem>
          <AccordionItem title="Fabric & Care">{product.fabricCare}</AccordionItem>
          <AccordionItem title="Stylist Note">{product.stylistNote}</AccordionItem>
          <AccordionItem title="Shipping & Returns">
            Complimentary shipping on all U.S. orders. Easy returns within 30 days. See our
            Shipping &amp; Returns page for full details.
          </AccordionItem>
        </Accordion>
      </div>

      {/* Sticky mobile add-to-bag */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-line bg-ivory/95 p-3 backdrop-blur-sm lg:hidden">
        <div className="flex flex-col">
          <span className="product-title leading-none">{product.name}</span>
          <span className="text-sm tabular-nums text-muted">{formatPrice(product.price)}</span>
        </div>
        <div className="ml-auto w-1/2">
          <AddToCartButton
            product={product}
            size={size}
            color={color}
            quantity={quantity}
            onRequireSize={() => setError(true)}
          />
        </div>
      </div>
    </div>
  );
}
