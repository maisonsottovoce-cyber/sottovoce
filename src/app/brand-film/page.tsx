import type { Metadata } from "next";
import { getBestSellers } from "@/data/products";
import { VideoPlaceholder } from "@/components/content/VideoPlaceholder";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { ProductRow } from "@/components/home/ProductRow";
import type { PlaceholderTone } from "@/data/products";

export const metadata: Metadata = {
  title: "Brand Film",
  description:
    "A film about movement, mood, and the quiet confidence of being remembered.",
};

const sections: { title: string; copy: string; label: string; tone: PlaceholderTone }[] = [
  {
    title: "Behind the mood",
    copy: "Low light, warm shadow, and the hush of a room before the evening begins.",
    label: "Boutique Hotel Editorial",
    tone: "charcoal",
  },
  {
    title: "The locations",
    copy: "A European hotel, a balcony above the city, a restaurant at the close of the night.",
    label: "European Balcony",
    tone: "espresso",
  },
  {
    title: "The silhouettes",
    copy: "Bias-cut evening dresses, sculpted corsets, and tailoring made to move.",
    label: "Evening Dress",
    tone: "ink",
  },
];

export default function BrandFilmPage() {
  const filmProducts = getBestSellers(4);

  return (
    <div className="bg-ink text-cream">
      {/* Film hero */}
      <section className="relative">
        <div className="aspect-[16/11] w-full sm:aspect-[16/8] lg:aspect-[16/7]">
          <VideoPlaceholder label="Brand Film" tone="twilight" />
        </div>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
          <span className="brand-kicker text-gold">The Maison Film</span>
          <h1 className="editorial-heading max-w-3xl text-4xl text-ivory sm:text-6xl">
            The story behind every silhouette.
          </h1>
        </div>
      </section>

      {/* Intro copy */}
      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="editorial-heading text-2xl italic leading-relaxed text-ivory sm:text-3xl">
          A film about movement, mood, and the quiet confidence of being remembered.
        </p>
      </section>

      {/* Sections */}
      <section className="mx-auto max-w-[1400px] px-6 pb-8">
        <div className="flex flex-col gap-16">
          {sections.map((s, i) => (
            <div
              key={s.title}
              className={`grid items-center gap-8 md:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <ImagePlaceholder label={s.label} tone={s.tone} className="aspect-[4/3] w-full" />
              <div>
                <span className="brand-kicker text-gold">0{i + 1}</span>
                <h2 className="editorial-heading mt-3 text-3xl text-ivory sm:text-4xl">
                  {s.title}
                </h2>
                <p className="body-copy mt-4 text-cream/75">{s.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop the film */}
      <section className="bg-ivory">
        <ProductRow
          kicker="Shop the Film"
          title="The pieces in motion"
          products={filmProducts}
          cta={{ label: "Shop the Film", href: "/collections/evening" }}
        />
      </section>
    </div>
  );
}
