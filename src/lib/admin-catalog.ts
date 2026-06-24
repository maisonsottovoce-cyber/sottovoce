import "server-only";
import { createAdminClient } from "./supabase/admin";
import type {
  AdminProduct,
  AdminCollection,
  AdminOccasionEdit,
  AdminJournalArticle,
  SiteSettings,
} from "./admin-types";
import type {
  CategorySlug,
  Occasion,
  ColorOption,
  PlaceholderTone,
} from "@/data/products";

type ImageRow = { url: string; label: string | null; position: number | null };
type SizeRow = {
  size: string;
  available: boolean | null;
  quantity: number | null;
  position: number | null;
};
type Row = {
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
  published: boolean;
  product_images: ImageRow[] | null;
  product_sizes: SizeRow[] | null;
};

function toAdmin(row: Row): AdminProduct {
  const sizeStock = (row.product_sizes ?? [])
    .slice()
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((s) => ({
      size: s.size,
      available: s.available ?? true,
      quantity: s.quantity ?? undefined,
    }));

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    compareAtPrice: row.compare_at_price != null ? Number(row.compare_at_price) : undefined,
    color: row.color,
    availableColors: row.available_colors ?? [],
    sizes: row.sizes?.length ? row.sizes : sizeStock.map((s) => s.size),
    sizeStock,
    occasion: row.occasion ?? [],
    description: row.description ?? "",
    fit: row.fit ?? "",
    fabricCare: row.fabric_care ?? "",
    stylistNote: row.stylist_note ?? "",
    seoTitle: row.seo_title ?? "",
    seoDescription: row.seo_description ?? "",
    videoUrl: row.video_url ?? "",
    sortOrder: row.sort_order ?? 0,
    isNew: row.is_new ?? false,
    isBestSeller: row.is_best_seller ?? false,
    published: row.published,
    images: (row.product_images ?? [])
      .slice()
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .map((img, i) => ({
        url: img.url,
        label: img.label ?? "",
        position: img.position ?? i,
      })),
  };
}

export async function getAdminProducts(): Promise<AdminProduct[]> {
  const db = createAdminClient();
  const { data } = await db
    .from("products")
    .select("*, product_images(*), product_sizes(*)")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  return ((data as Row[]) ?? []).map(toAdmin);
}

export async function getAdminProduct(id: string): Promise<AdminProduct | null> {
  const db = createAdminClient();
  const { data } = await db
    .from("products")
    .select("*, product_images(*), product_sizes(*)")
    .eq("id", id)
    .single();
  return data ? toAdmin(data as Row) : null;
}

// ─────────────────────────────────────────────
// Collections
// ─────────────────────────────────────────────
type CollectionRow = {
  id: string;
  slug: string;
  title: string;
  kicker: string | null;
  description: string | null;
  hero_label: string | null;
  hero_tone: PlaceholderTone | null;
  hero_image_url: string | null;
  sort_order: number | null;
  published: boolean;
};

function toAdminCollection(row: CollectionRow): AdminCollection {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    kicker: row.kicker ?? "",
    description: row.description ?? "",
    heroLabel: row.hero_label ?? "",
    heroTone: row.hero_tone ?? "charcoal",
    heroImageUrl: row.hero_image_url ?? "",
    sortOrder: row.sort_order ?? 0,
    published: row.published,
  };
}

export async function getAdminCollections(): Promise<AdminCollection[]> {
  const db = createAdminClient();
  const { data } = await db
    .from("collections")
    .select("*")
    .order("sort_order", { ascending: true });
  return ((data as CollectionRow[]) ?? []).map(toAdminCollection);
}

export async function getAdminCollection(id: string): Promise<AdminCollection | null> {
  const db = createAdminClient();
  const { data } = await db.from("collections").select("*").eq("id", id).single();
  return data ? toAdminCollection(data as CollectionRow) : null;
}

// ─────────────────────────────────────────────
// Occasion edits
// ─────────────────────────────────────────────
type OccasionEditRow = {
  id: string;
  title: string;
  caption: string | null;
  href: string | null;
  tone: PlaceholderTone | null;
  label: string | null;
  image_url: string | null;
  sort_order: number | null;
};

export async function getAdminOccasionEdits(): Promise<AdminOccasionEdit[]> {
  const db = createAdminClient();
  const { data } = await db
    .from("occasion_edits")
    .select("*")
    .order("sort_order", { ascending: true });
  return ((data as OccasionEditRow[]) ?? []).map((o) => ({
    id: o.id,
    title: o.title,
    caption: o.caption ?? "",
    href: o.href ?? "",
    tone: o.tone ?? "charcoal",
    label: o.label ?? "",
    imageUrl: o.image_url ?? "",
    sortOrder: o.sort_order ?? 0,
  }));
}

// ─────────────────────────────────────────────
// Journal
// ─────────────────────────────────────────────
type JournalRow = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  date_label: string | null;
  excerpt: string | null;
  tone: PlaceholderTone | null;
  cover_url: string | null;
  product_slugs: string[] | null;
  body: string[] | null;
  sort_order: number | null;
  published: boolean;
};

function toAdminArticle(row: JournalRow): AdminJournalArticle {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category ?? "",
    dateLabel: row.date_label ?? "",
    excerpt: row.excerpt ?? "",
    tone: row.tone ?? "charcoal",
    coverUrl: row.cover_url ?? "",
    productSlugs: row.product_slugs ?? [],
    body: row.body ?? [],
    sortOrder: row.sort_order ?? 0,
    published: row.published,
  };
}

export async function getAdminJournal(): Promise<AdminJournalArticle[]> {
  const db = createAdminClient();
  const { data } = await db
    .from("journal_articles")
    .select("*")
    .order("sort_order", { ascending: true });
  return ((data as JournalRow[]) ?? []).map(toAdminArticle);
}

export async function getAdminArticle(id: string): Promise<AdminJournalArticle | null> {
  const db = createAdminClient();
  const { data } = await db.from("journal_articles").select("*").eq("id", id).single();
  return data ? toAdminArticle(data as JournalRow) : null;
}

// ─────────────────────────────────────────────
// Site settings
// ─────────────────────────────────────────────
export async function getAdminSettings(): Promise<SiteSettings> {
  const db = createAdminClient();
  const { data } = await db.from("site_settings").select("*").limit(1).maybeSingle();
  const row = (data ?? {}) as {
    announcement_text?: string | null;
    announcement_enabled?: boolean | null;
    free_shipping_threshold?: number | null;
    shipping_returns_copy?: string | null;
  };
  return {
    announcementText: row.announcement_text ?? "",
    announcementEnabled: row.announcement_enabled ?? true,
    freeShippingThreshold: row.free_shipping_threshold ?? undefined,
    shippingReturnsCopy: row.shipping_returns_copy ?? "",
  };
}
