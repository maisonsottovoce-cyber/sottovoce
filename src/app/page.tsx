import { getNewArrivals } from "@/lib/catalog";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { ProductRow } from "@/components/home/ProductRow";
import { CollectionStory } from "@/components/home/CollectionStory";
import { ShopByOccasion } from "@/components/home/ShopByOccasion";
import { LifestyleEditorial } from "@/components/home/LifestyleEditorial";
import { BrandFilmPreview } from "@/components/home/BrandFilmPreview";
import { TrustBar } from "@/components/home/TrustBar";

export const revalidate = 60;

export default async function Home() {
  const newArrivals = await getNewArrivals(8);
  return (
    <>
      <HeroSection />
      <CategoryTiles />
      <ProductRow
        title="New in the Maison"
        subtitle="Silhouettes made for the next invitation."
        products={newArrivals}
        cta={{ label: "Shop All New In", href: "/collections/new-in" }}
      />
      <CollectionStory />
      <ShopByOccasion />
      <LifestyleEditorial />
      <BrandFilmPreview />
      <TrustBar />
    </>
  );
}
