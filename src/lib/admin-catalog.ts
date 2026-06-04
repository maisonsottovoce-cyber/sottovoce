import "server-only";
import { createAdminClient } from "./supabase/admin";
import type { AdminProduct } from "./admin-types";
import type { CategorySlug, Occasion, ColorOption } from "@/data/products";

type ImageRow = { url: string; label: string | null; position: number | null };
type Row = {
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
  published: boolean;
  product_images: ImageRow[] | null;
};

function toAdmin(row: Row): AdminProduct {
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
    description: row.description ?? "",
    fit: row.fit ?? "",
    fabricCare: row.fabric_care ?? "",
    stylistNote: row.stylist_note ?? "",
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
    .select("*, product_images(*)")
    .order("created_at", { ascending: false });
  return ((data as Row[]) ?? []).map(toAdmin);
}

export async function getAdminProduct(id: string): Promise<AdminProduct | null> {
  const db = createAdminClient();
  const { data } = await db
    .from("products")
    .select("*, product_images(*)")
    .eq("id", id)
    .single();
  return data ? toAdmin(data as Row) : null;
}
