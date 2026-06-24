import { createClient } from "@supabase/supabase-js";
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  isSupabaseConfigured,
} from "./supabase/config";
import {
  products as mockProducts,
  type Product,
  type CategorySlug,
  type Occasion,
  type ColorOption,
  type ProductImage,
  type SizeStock,
} from "@/data/products";
import {
  collections as mockCollections,
  occasionEdits as mockOccasionEdits,
  type Collection,
  type OccasionEdit,
} from "@/data/collections";
import { journal as mockJournal, type JournalArticle } from "@/data/journal";
import type { SiteSettings } from "./admin-types";

/**
 * Catalog access layer. Returns the existing `Product` shape so UI components
 * are untouched. Reads published products from Supabase; falls back to the
 * static mock data when Supabase env vars are absent (local dev / pre-setup).
 */

type ProductImageRow = {
  url: string;
  label: string | null;
  position: number | null;
};

type ProductSizeRow = {
  size: string;
  available: boolean | null;
  quantity: number | null;
  position: number | null;
};

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  compare_at_price: number | null;
  color: string;
  available_colors: ColorOption[] | null;
  sizes: string[] | null;
  occasion: Occasion[] | null;
  description: string;
  fit: string | null;
  fabric_care: string | null;
  stylist_note: string | null;
  seo_title: string | null;
  seo_description: string | null;
  video_url: string | null;
  sort_order: number | null;
  is_new: boolean | null;
  is_best_seller: boolean | null;
  product_images: ProductImageRow[] | null;
  product_sizes: ProductSizeRow[] | null;
};

const publicDb = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

function rowToProduct(row: ProductRow): Product {
  const images: ProductImage[] = (row.product_images ?? [])
    .slice()
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((img) => ({
      label: img.label ?? row.name,
      tone: "charcoal" as const,
      src: img.url,
    }));

  const sizeStock: SizeStock[] = (row.product_sizes ?? [])
    .slice()
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((s) => ({
      size: s.size,
      available: s.available ?? true,
      quantity: s.quantity ?? undefined,
    }));

  const sizes = row.sizes?.length ? row.sizes : sizeStock.map((s) => s.size);

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    compareAtPrice:
      row.compare_at_price != null ? Number(row.compare_at_price) : undefined,
    color: row.color,
    availableColors: row.available_colors ?? [],
    sizes,
    sizeStock: sizeStock.length ? sizeStock : undefined,
    occasion: row.occasion ?? [],
    description: row.description,
    fit: row.fit ?? "",
    fabricCare: row.fabric_care ?? "",
    stylistNote: row.stylist_note ?? "",
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    videoUrl: row.video_url ?? undefined,
    sortOrder: row.sort_order ?? undefined,
    images:
      images.length > 0
        ? images
        : [{ label: row.name, tone: "charcoal" }],
    isNew: row.is_new ?? false,
    isBestSeller: row.is_best_seller ?? false,
  };
}

/** All published products, ordered by manual sort then newest. */
export async function getProducts(): Promise<Product[]> {
  if (!publicDb) return mockProducts;
  const { data, error } = await publicDb
    .from("products")
    .select("*, product_images(*), product_sizes(*)")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error || !data) return mockProducts;
  return (data as ProductRow[]).map(rowToProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug);
}

export async function getNewArrivals(limit?: number): Promise<Product[]> {
  const list = (await getProducts()).filter((p) => p.isNew);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export async function getBestSellers(limit?: number): Promise<Product[]> {
  const list = (await getProducts()).filter((p) => p.isBestSeller);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export async function getCollectionProducts(slug: string): Promise<Product[]> {
  const all = await getProducts();
  switch (slug) {
    case "new-in":
      return all.filter((p) => p.isNew);
    case "cocktail":
      return all.filter((p) => p.occasion.includes("Cocktail"));
    case "evening":
      return all.filter((p) => p.occasion.includes("Evening"));
    case "dresses":
    case "jumpsuits":
    case "tops":
    case "bottoms":
    case "sets":
      return all.filter((p) => p.category === slug);
    default:
      return [];
  }
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const all = await getProducts();
  return all
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const aShared = a.occasion.filter((o) => product.occasion.includes(o)).length;
      const bShared = b.occasion.filter((o) => product.occasion.includes(o)).length;
      return bShared - aShared;
    })
    .slice(0, limit);
}

export async function getCompleteTheLook(product: Product, limit = 3): Promise<Product[]> {
  const all = await getProducts();
  return all
    .filter((p) => p.id !== product.id && p.category !== product.category)
    .filter((p) => p.occasion.some((o) => product.occasion.includes(o)))
    .slice(0, limit);
}

// ─────────────────────────────────────────────
// Collections
// ─────────────────────────────────────────────
type CollectionRow = {
  slug: string;
  title: string;
  kicker: string | null;
  description: string | null;
  hero_label: string | null;
  hero_tone: Collection["heroTone"] | null;
  hero_image_url: string | null;
};

/** Published collections, ordered. Falls back to static data pre-setup. */
export async function getCollections(): Promise<Collection[]> {
  if (!publicDb) return mockCollections;
  const { data, error } = await publicDb
    .from("collections")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return mockCollections;
  return (data as CollectionRow[]).map((c) => ({
    slug: c.slug,
    title: c.title,
    kicker: c.kicker ?? "",
    description: c.description ?? "",
    heroLabel: c.hero_label ?? c.title,
    heroTone: c.hero_tone ?? "charcoal",
    heroSrc: c.hero_image_url ?? "",
  }));
}

export async function getCollectionMeta(slug: string): Promise<Collection | undefined> {
  return (await getCollections()).find((c) => c.slug === slug);
}

// ─────────────────────────────────────────────
// Occasion edits ("Shop by Occasion")
// ─────────────────────────────────────────────
type OccasionEditRow = {
  title: string;
  caption: string | null;
  href: string | null;
  tone: OccasionEdit["tone"] | null;
  label: string | null;
  image_url: string | null;
};

export async function getOccasionEdits(): Promise<OccasionEdit[]> {
  if (!publicDb) return mockOccasionEdits;
  const { data, error } = await publicDb
    .from("occasion_edits")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return mockOccasionEdits;
  return (data as OccasionEditRow[]).map((o) => ({
    title: o.title,
    caption: o.caption ?? "",
    href: o.href ?? "#",
    tone: o.tone ?? "charcoal",
    label: o.label ?? o.title,
    src: o.image_url ?? "",
  }));
}

// ─────────────────────────────────────────────
// Journal
// ─────────────────────────────────────────────
type JournalRow = {
  slug: string;
  title: string;
  category: string | null;
  date_label: string | null;
  excerpt: string | null;
  tone: JournalArticle["tone"] | null;
  cover_url: string | null;
  product_slugs: string[] | null;
  body: string[] | null;
};

function journalRowToArticle(a: JournalRow): JournalArticle {
  return {
    slug: a.slug,
    title: a.title,
    category: a.category ?? "",
    date: a.date_label ?? "",
    excerpt: a.excerpt ?? "",
    tone: a.tone ?? "charcoal",
    cover: a.cover_url ?? "",
    productSlugs: a.product_slugs ?? [],
    body: a.body ?? [],
  };
}

export async function getJournal(): Promise<JournalArticle[]> {
  if (!publicDb) return mockJournal;
  const { data, error } = await publicDb
    .from("journal_articles")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return mockJournal;
  return (data as JournalRow[]).map(journalRowToArticle);
}

export async function getArticleBySlug(slug: string): Promise<JournalArticle | undefined> {
  return (await getJournal()).find((a) => a.slug === slug);
}

// ─────────────────────────────────────────────
// Site settings
// ─────────────────────────────────────────────
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  announcementText: "Complimentary Shipping on All U.S. Orders",
  announcementEnabled: true,
  freeShippingThreshold: undefined,
  shippingReturnsCopy: "",
};

type SiteSettingsRow = {
  announcement_text: string | null;
  announcement_enabled: boolean | null;
  free_shipping_threshold: number | null;
  shipping_returns_copy: string | null;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!publicDb) return DEFAULT_SITE_SETTINGS;
  const { data, error } = await publicDb
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();
  if (error || !data) return DEFAULT_SITE_SETTINGS;
  const row = data as SiteSettingsRow;
  return {
    announcementText: row.announcement_text ?? DEFAULT_SITE_SETTINGS.announcementText,
    announcementEnabled: row.announcement_enabled ?? true,
    freeShippingThreshold: row.free_shipping_threshold ?? undefined,
    shippingReturnsCopy: row.shipping_returns_copy ?? "",
  };
}
