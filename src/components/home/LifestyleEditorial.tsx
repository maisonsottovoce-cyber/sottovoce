import Link from "next/link";
import type { PlaceholderTone } from "@/data/products";
import { SectionHeader } from "@/components/content/SectionHeader";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { Reveal } from "@/components/motion/Reveal";
import { lb } from "@/lib/asset";

type Scene = {
  label: string;
  caption: string;
  href: string;
  tone: PlaceholderTone;
  className: string;
  aspect: string;
  src: string;
  videoSrc?: string;
};

const scenes: Scene[] = [
  {
    label: "Boutique Hotel Editorial",
    caption: "A quiet arrival",
    href: "/collections/sets",
    tone: "charcoal",
    className: "md:col-span-7",
    aspect: "aspect-[4/5] md:aspect-[16/13]",
    src: lb(33),
    videoSrc: "/videos/editorial-hotel.mp4",
  },
  {
    label: "Restaurant Evening",
    caption: "The dinner reservation",
    href: "/collections/dresses",
    tone: "espresso",
    className: "md:col-span-5",
    aspect: "aspect-[4/5]",
    src: lb(27),
  },
  {
    label: "Cocktail Evening",
    caption: "After-dark silhouettes",
    href: "/collections/cocktail",
    tone: "twilight",
    className: "md:col-span-5",
    aspect: "aspect-[4/5]",
    src: lb(5),
  },
  {
    label: "European Balcony",
    caption: "A balcony above the city",
    href: "/collections/jumpsuits",
    tone: "ink",
    className: "md:col-span-7",
    aspect: "aspect-[4/5] md:aspect-[16/13]",
    src: lb(15),
    videoSrc: "/videos/editorial-balcony.mp4",
  },
];

export function LifestyleEditorial() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-28">
      <SectionHeader
        kicker="Editorial"
        title="Scenes from the SOTTOVOCE world"
        subtitle="Dressed for the room, the reservation, the city, the night."
      />
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12">
        {scenes.map((scene, i) => (
          <Reveal key={scene.caption} delay={(i % 2) * 0.1} className={scene.className}>
            <Link
              href={scene.href}
              className="group relative block overflow-hidden"
            >
              <ImagePlaceholder
                label={scene.label}
                tone={scene.tone}
                src={scene.src}
                videoSrc={scene.videoSrc}
                showLabel={false}
                className={`w-full ${scene.aspect} transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                <span className="editorial-heading text-2xl italic transition-colors group-hover:text-gold sm:text-3xl">
                  {scene.caption}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
