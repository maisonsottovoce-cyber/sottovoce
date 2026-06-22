import type {
  CategorySlug,
  Occasion,
  ColorOption,
  PlaceholderTone,
  SizeStock,
} from "@/data/products";

export type ProductImageInput = {
  url: string;
  label: string;
  position: number;
};

export type SizeStockInput = SizeStock;

export type ProductInput = {
  id?: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  /** Original price for markdowns; price is the (sale) price shown. */
  compareAtPrice?: number;
  color: string;
  availableColors: ColorOption[];
  /** Flat size labels (kept for back-compat; derived from sizeStock). */
  sizes: string[];
  /** Per-size availability. */
  sizeStock: SizeStockInput[];
  occasion: Occasion[];
  description: string;
  fit: string;
  fabricCare: string;
  stylistNote: string;
  seoTitle: string;
  seoDescription: string;
  videoUrl: string;
  sortOrder: number;
  isNew: boolean;
  isBestSeller: boolean;
  published: boolean;
  images: ProductImageInput[];
};

/** Row shape returned to the admin list/edit screens (includes unpublished). */
export type AdminProduct = ProductInput & { id: string };

// ─────────────────────────────────────────────
// Collections
// ─────────────────────────────────────────────
export type CollectionInput = {
  id?: string;
  slug: string;
  title: string;
  kicker: string;
  description: string;
  heroLabel: string;
  heroTone: PlaceholderTone;
  heroImageUrl: string;
  sortOrder: number;
  published: boolean;
};
export type AdminCollection = CollectionInput & { id: string };

// "Shop by Occasion" tiles
export type OccasionEditInput = {
  id?: string;
  title: string;
  caption: string;
  href: string;
  tone: PlaceholderTone;
  label: string;
  imageUrl: string;
  sortOrder: number;
};
export type AdminOccasionEdit = OccasionEditInput & { id: string };

// ─────────────────────────────────────────────
// Journal
// ─────────────────────────────────────────────
export type JournalInput = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  dateLabel: string;
  excerpt: string;
  tone: PlaceholderTone;
  coverUrl: string;
  productSlugs: string[];
  body: string[];
  sortOrder: number;
  published: boolean;
};
export type AdminJournalArticle = JournalInput & { id: string };

// ─────────────────────────────────────────────
// Site settings (single row)
// ─────────────────────────────────────────────
export type SiteSettings = {
  announcementText: string;
  announcementEnabled: boolean;
  freeShippingThreshold?: number;
  shippingReturnsCopy: string;
};
