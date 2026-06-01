import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { journal, getArticleBySlug } from "@/data/journal";
import { getProductBySlug, type Product } from "@/data/products";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { ProductRow } from "@/components/home/ProductRow";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journal.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Journal" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const callouts = article.productSlugs
    .map(getProductBySlug)
    .filter((p): p is Product => Boolean(p));

  return (
    <article className="pb-8">
      {/* Hero */}
      <header className="relative isolate flex min-h-[60vh] items-end overflow-hidden text-ivory">
        <ImagePlaceholder
          label={article.title}
          tone={article.tone}
          showLabel={false}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-ink/20" />
        <div className="relative mx-auto w-full max-w-3xl px-6 pb-16">
          <span className="brand-kicker text-gold">{article.category}</span>
          <h1 className="editorial-heading mt-4 text-4xl sm:text-6xl">{article.title}</h1>
          <p className="small-caps mt-4 text-cream/70">{article.date}</p>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-2xl px-6 py-16">
        {article.body.map((para, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "editorial-heading text-2xl leading-relaxed text-ink"
                : "body-copy mt-6 text-[1.02rem] text-ink/80"
            }
          >
            {para}
          </p>
        ))}

        {/* Product callouts */}
        {callouts.length > 0 ? (
          <div className="mt-12 border-y border-line py-8">
            <span className="brand-kicker text-purple">In this story</span>
            <ul className="mt-5 flex flex-col gap-4">
              {callouts.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="flex items-center gap-4 hover:opacity-80"
                  >
                    <ImagePlaceholder
                      label={p.images[0].label}
                      tone={p.images[0].tone}
                      showLabel={false}
                      className="h-20 w-16 shrink-0"
                    />
                    <span className="flex-1">
                      <span className="product-title block">{p.name}</span>
                      <span className="small-caps text-muted">Shop the piece</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {/* Related products */}
      {callouts.length > 0 ? (
        <div className="bg-cream">
          <ProductRow kicker="Shop the Story" title="Related pieces" products={callouts} />
        </div>
      ) : null}
    </article>
  );
}
