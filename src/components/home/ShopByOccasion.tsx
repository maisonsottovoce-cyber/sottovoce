import Link from "next/link";
import { getOccasionEdits } from "@/lib/catalog";
import { SectionHeader } from "@/components/content/SectionHeader";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";

export async function ShopByOccasion() {
  const occasionEdits = await getOccasionEdits();
  return (
    <section className="bg-espresso px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          kicker="Shop by Occasion"
          title="Where the evening begins"
          subtitle="Curated edits for every room, reservation, and arrival."
          dark
          className="mx-auto"
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {occasionEdits.map((edit) => (
            <Link key={edit.title} href={edit.href} className="group relative block overflow-hidden">
              <ImagePlaceholder
                label={edit.label}
                tone={edit.tone}
                src={edit.src}
                showLabel={false}
                className="aspect-[5/6] w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                <span className="brand-kicker text-gold">{edit.caption}</span>
                <h3 className="editorial-heading mt-2 text-3xl transition-colors group-hover:text-gold">
                  {edit.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
