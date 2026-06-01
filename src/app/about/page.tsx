import type { Metadata } from "next";
import { PageHero } from "@/components/content/PageHero";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";

export const metadata: Metadata = {
  title: "About",
  description:
    "SOTTOVOCE means softly spoken. A quiet voice, a lasting presence — a maison for the woman who enters quietly and is never forgotten.",
};

const philosophy = [
  {
    title: "The entrance",
    copy: "Every piece is designed for the moment of arrival — the pause at the door, the turn of a room, the first impression that lingers.",
  },
  {
    title: "The silhouette",
    copy: "We design for the body in motion. Bias cuts, sculpted seams, and fluid drape that move with you and settle with grace.",
  },
  {
    title: "The occasion",
    copy: "Dinners, evenings, terraces, and cocktail hours. We dress the moments between arrival and attention.",
  },
  {
    title: "The Maison",
    copy: "Considered, quiet, and made to last. A small wardrobe of pieces you return to, season after season.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="The Maison"
        title="Maison SOTTOVOCE"
        label="Boutique Hotel Editorial"
        tone="twilight"
        height="lg"
      />

      {/* Manifesto */}
      <section className="bg-ivory px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="editorial-heading text-3xl leading-snug sm:text-4xl">
            SOTTOVOCE means softly spoken.
            <br />
            <span className="italic text-purple">A quiet voice. A lasting presence.</span>
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28 lg:gap-20">
          <ImagePlaceholder label="European Balcony" tone="espresso" className="aspect-[4/5] w-full" />
          <div>
            <span className="brand-kicker text-purple">Our Story</span>
            <h2 className="editorial-heading mt-4 text-3xl sm:text-4xl">
              For the woman who enters quietly.
            </h2>
            <p className="body-copy mt-6">
              Maison SOTTOVOCE was created for the woman who does not need to be loud to be
              remembered. Each silhouette is designed for the moments between arrival and
              attention — the dinner, the evening, the room, the entrance.
            </p>
            <p className="body-copy mt-4">
              We believe in fewer, finer things: pieces cut with intention, made to move
              through a long evening and return again the next season.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
        <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2">
          {philosophy.map((p, i) => (
            <div key={p.title}>
              <span className="brand-kicker text-purple">0{i + 1}</span>
              <h3 className="editorial-heading mt-3 text-3xl">{p.title}</h3>
              <Divider className="my-4 max-w-16" />
              <p className="body-copy">{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder note */}
      <section className="bg-charcoal px-6 py-24 text-center text-cream">
        <div className="mx-auto max-w-2xl">
          <span className="brand-kicker text-gold">A Note from the Founder</span>
          <p className="editorial-heading mt-6 text-2xl italic leading-relaxed text-ivory sm:text-3xl">
            “I wanted to make clothes for the quiet confidence of being yourself — the kind
            of presence that doesn&apos;t announce itself, and is never forgotten.”
          </p>
          <p className="small-caps mt-6 text-cream/70">The Founder, Maison SOTTOVOCE</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ivory px-6 py-20 text-center">
        <Button href="/collections/new-in" variant="solid" size="lg">
          Explore the Collection
        </Button>
      </section>
    </>
  );
}
