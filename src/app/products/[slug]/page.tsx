import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getProducts,
  getProductBySlug,
  getRelatedProducts,
  getCompleteTheLook,
} from "@/lib/catalog";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { ProductInfo } from "@/components/commerce/ProductInfo";
import { ProductRow } from "@/components/home/ProductRow";
import { RecentlyViewed } from "@/components/commerce/RecentlyViewed";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.description,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const completeTheLook = await getCompleteTheLook(product, 3);
  const related = await getRelatedProducts(product, 4);

  return (
    <div className="pb-24 lg:pb-0">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1400px] px-5 pt-8 sm:px-8">
        <nav aria-label="Breadcrumb" className="small-caps text-muted">
          <Link href="/" className="hover:text-purple">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/collections/${product.category}`} className="capitalize hover:text-purple">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      {/* Gallery + Info */}
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} videoUrl={product.videoUrl} />
        <div className="lg:py-6">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Complete the look */}
      {completeTheLook.length > 0 ? (
        <div className="bg-cream">
          <ProductRow
            kicker="Styled Together"
            title="Complete the look"
            products={completeTheLook}
          />
        </div>
      ) : null}

      {/* You may also like */}
      {related.length > 0 ? (
        <ProductRow kicker="The Maison" title="You may also like" products={related} />
      ) : null}

      <RecentlyViewed currentSlug={product.slug} />
    </div>
  );
}
