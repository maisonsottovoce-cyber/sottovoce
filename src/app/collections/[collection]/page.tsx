import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  collections,
  getCollection,
  getCollectionProducts,
} from "@/data/collections";
import { CollectionView } from "@/components/commerce/CollectionView";

type Params = { params: Promise<{ collection: string }> };

export function generateStaticParams() {
  return collections.map((c) => ({ collection: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { collection } = await params;
  const c = getCollection(collection);
  if (!c) return { title: "Collection" };
  return {
    title: `${c.title} — ${c.kicker}`,
    description: c.description,
  };
}

export default async function CollectionPage({ params }: Params) {
  const { collection } = await params;
  const c = getCollection(collection);
  if (!c) notFound();

  const products = getCollectionProducts(collection);

  return (
    <CollectionView
      kicker={c.kicker}
      title={c.title}
      description={c.description}
      products={products}
    />
  );
}
