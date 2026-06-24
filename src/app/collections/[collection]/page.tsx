import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollections, getCollectionMeta, getCollectionProducts } from "@/lib/catalog";
import { CollectionView } from "@/components/commerce/CollectionView";
import { PageHero } from "@/components/content/PageHero";

type Params = { params: Promise<{ collection: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ collection: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { collection } = await params;
  const c = await getCollectionMeta(collection);
  if (!c) return { title: "Collection" };
  return {
    title: `${c.title} — ${c.kicker}`,
    description: c.description,
  };
}

export default async function CollectionPage({ params }: Params) {
  const { collection } = await params;
  const c = await getCollectionMeta(collection);
  if (!c) notFound();

  const products = await getCollectionProducts(collection);

  return (
    <>
      <PageHero
        kicker={c.kicker}
        title={c.title}
        description={c.description}
        label={c.heroLabel}
        tone={c.heroTone}
        src={c.heroSrc}
        height="md"
      />
      <CollectionView products={products} />
    </>
  );
}
