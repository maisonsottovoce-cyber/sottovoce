import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { lb } from "@/lib/asset";

export function HeroSection() {
  return (
    <section className="relative isolate w-full overflow-hidden text-ivory">
      <ImagePlaceholder
        label="The Entrance"
        tone="twilight"
        src={lb(16)}
        showLabel={false}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/40" />

      <div className="relative mx-auto flex min-h-[82vh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-32 sm:px-10 md:min-h-[88vh] md:pb-24">
        <div className="max-w-2xl">
          <span className="brand-kicker text-gold">The New Collection</span>
          <h1 className="editorial-heading mt-5 text-4xl leading-[1.02] sm:text-6xl md:text-7xl">
            New silhouettes for unforgettable evenings.
          </h1>
          <p className="body-copy mt-5 max-w-md text-cream/85">
            Effortless pieces for entrances, evenings, and occasions worth remembering.
          </p>
          <div className="mt-9">
            <Button href="/collections/new-in" variant="cream" size="lg">
              Shop New In
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
