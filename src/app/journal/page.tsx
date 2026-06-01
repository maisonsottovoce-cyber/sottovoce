import type { Metadata } from "next";
import { journal } from "@/data/journal";
import { PageHero } from "@/components/content/PageHero";
import { EditorialCard } from "@/components/content/EditorialCard";

export const metadata: Metadata = {
  title: "The Maison Notes",
  description:
    "Styling, travel, and the art of the entrance — editorial notes from Maison SOTTOVOCE.",
};

export default function JournalPage() {
  return (
    <>
      <PageHero
        kicker="Journal"
        title="The Maison Notes"
        description="Styling, travel, and the art of the entrance."
        label="Brand Film"
        tone="ink"
        height="md"
      />
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {journal.map((article) => (
            <EditorialCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}
