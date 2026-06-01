import Link from "next/link";
import type { Product } from "@/data/products";
import { SectionHeader } from "@/components/content/SectionHeader";
import { ProductCard } from "@/components/commerce/ProductCard";

export function ProductRow({
  title,
  subtitle,
  products,
  cta,
  kicker = "New Arrivals",
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  cta?: { label: string; href: string };
  kicker?: string;
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 md:py-20">
      <SectionHeader kicker={kicker} title={title} subtitle={subtitle} />
      <div className="no-scrollbar mt-12 flex gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-8 md:overflow-visible md:pb-0">
        {products.map((p, i) => (
          <div key={p.id} className="w-[62%] shrink-0 sm:w-[40%] md:w-auto">
            <ProductCard product={p} priority={i < 4} />
          </div>
        ))}
      </div>
      {cta ? (
        <div className="mt-12 flex justify-center">
          <Link href={cta.href} className="nav-link link-underline text-ink hover:text-purple">
            {cta.label}
          </Link>
        </div>
      ) : null}
    </section>
  );
}
