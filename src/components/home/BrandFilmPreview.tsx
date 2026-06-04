import { Button } from "@/components/ui/Button";
import { VideoPlaceholder } from "@/components/content/VideoPlaceholder";
import { lb } from "@/lib/asset";

export function BrandFilmPreview() {
  return (
    <section className="bg-ink">
      <div className="relative">
        <div className="aspect-[16/10] w-full sm:aspect-[16/8] lg:aspect-[16/6]">
          <VideoPlaceholder label="Brand Film" tone="twilight" src={lb(5)} href="/brand-film" />
        </div>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center text-ivory">
          <span className="brand-kicker text-gold">The Maison Film</span>
          <h2 className="editorial-heading max-w-2xl text-3xl sm:text-5xl">
            The story behind every silhouette.
          </h2>
          <div className="pointer-events-auto mt-2">
            <Button href="/brand-film" variant="outlineDark">
              Watch Film
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
