import Link from "next/link";
import type { PlaceholderTone } from "@/data/products";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";

type Tile = { name: string; phrase: string; href: string; label: string; tone: PlaceholderTone };

const tiles: Tile[] = [
  { name: "New In", phrase: "The latest silhouettes", href: "/collections/new-in", label: "New In Editorial", tone: "charcoal" },
  { name: "Dresses", phrase: "For entrances and evenings", href: "/collections/dresses", label: "Evening Dress", tone: "ink" },
  { name: "Jumpsuits", phrase: "Tailored ease", href: "/collections/jumpsuits", label: "Tailored Jumpsuit", tone: "espresso" },
  { name: "Tops", phrase: "Sculpted statements", href: "/collections/tops", label: "Sculpted Top", tone: "sand" },
  { name: "Bottoms", phrase: "Refined foundations", href: "/collections/bottoms", label: "Refined Tailoring", tone: "charcoal" },
  { name: "Sets", phrase: "Effortless coordination", href: "/collections/sets", label: "Coordinated Set", tone: "cream" },
  { name: "Cocktail", phrase: "After dark, softly", href: "/collections/cocktail", label: "Cocktail Evening", tone: "twilight" },
];

export function CategoryTiles() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 md:py-20">
      <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-4">
        {tiles.map((tile) => (
          <Link
            key={tile.name}
            href={tile.href}
            className="group relative w-[68%] shrink-0 snap-start sm:w-[44%] md:w-auto"
          >
            <div className="overflow-hidden">
              <ImagePlaceholder
                label={tile.label}
                tone={tile.tone}
                showLabel={false}
                className="aspect-[3/4] w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
              <h3 className="editorial-heading text-2xl">{tile.name}</h3>
              <p className="small-caps mt-1 text-cream/80">{tile.phrase}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
