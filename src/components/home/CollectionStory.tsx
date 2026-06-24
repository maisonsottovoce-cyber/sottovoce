import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { Reveal } from "@/components/motion/Reveal";
import { lb } from "@/lib/asset";
import type { PlaceholderTone } from "@/data/products";

const looks: { label: string; tone: PlaceholderTone; src: string }[] = [
  { label: "Denim Dress", tone: "sand", src: lb(12) },
  { label: "Tailored Jumpsuit", tone: "espresso", src: lb(3) },
  { label: "Sculpted Corset", tone: "charcoal", src: lb(10) },
  { label: "Evening Dress", tone: "ink", src: lb(4) },
];

export function CollectionStory() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28 lg:gap-20">
        <Reveal className="order-2 md:order-1">
          <span className="brand-kicker text-purple">The Collection</span>
          <h2 className="editorial-heading mt-4 text-4xl leading-[1.05] sm:text-5xl">
            Effortless looks.
            <br />
            Endless occasions.
          </h2>
          <p className="body-copy mt-6 max-w-md">
            From a tailored jumpsuit to a sculpted corset, from denim ease to evening
            silhouettes — each piece is designed to move through the moment with quiet
            confidence.
          </p>
          <div className="mt-9">
            <Button href="/collections/new-in" variant="outline">
              Explore the Collection
            </Button>
          </div>
        </Reveal>

        <div className="order-1 grid grid-cols-2 gap-4 md:order-2">
          {looks.map((look, i) => (
            <Reveal
              key={look.label}
              delay={(i % 2) * 0.1}
              className={i % 3 === 0 ? "translate-y-0" : "md:translate-y-8"}
            >
              <ImagePlaceholder
                label={look.label}
                tone={look.tone}
                src={look.src}
                className="aspect-[3/4] w-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
