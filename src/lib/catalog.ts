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
} from "@/data/products";

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

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  color: string;
  available_colors: ColorOption[] | null;
  sizes: string[] | null;
  occasion: Occasion[] | null;
  description: string;
  fit: string | null;
  fabric_care: string | null;
  stylist_note: string | null;
  is_new: boolean | null;
  is_best_seller: boolean | null;
  product_images: ProductImageRow[] | null;
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

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    color: row.color,
    availableColors: row.available_colors ?? [],
    sizes: row.sizes ?? [],
    occasion: row.occasion ?? [],
    description: row.description,
    fit: row.fit ?? "",
    fabricCare: row.fabric_care ?? "",
    stylistNote: row.stylist_note ?? "",
    images:
      images.length > 0
        ? images
        : [{ label: row.name, tone: "charcoal" }],
    isNew: row.is_new ?? false,
    isBestSeller: row.is_best_seller ?? false,
  };
}

/** All published products (newest first). */
export async function getProducts(): Promise<Product[]> {
  if (!publicDb) return mockProducts;
  const { data, error } = await publicDb
    .from("products")
    .select("*, product_images(*)")
    .eq("published", true)
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
