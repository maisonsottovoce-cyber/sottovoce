"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { ProductInput } from "@/lib/admin-types";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
}

function revalidateStorefront(slug?: string) {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/collections/[collection]", "page");
  if (slug) revalidatePath(`/products/${slug}`);
}

export async function saveProduct(input: ProductInput) {
  await requireUser();
  const admin = createAdminClient();

  // Keep the flat `sizes` column in sync with per-size stock.
  const sizes = input.sizeStock.length
    ? input.sizeStock.map((s) => s.size)
    : input.sizes;

  const row = {
    slug: input.slug,
    name: input.name,
    category: input.category,
    price: input.price,
    compare_at_price: input.compareAtPrice ?? null,
    color: input.color,
    available_colors: input.availableColors,
    sizes,
    occasion: input.occasion,
    description: input.description,
    fit: input.fit,
    fabric_care: input.fabricCare,
    stylist_note: input.stylistNote,
    seo_title: input.seoTitle || null,
    seo_description: input.seoDescription || null,
    video_url: input.videoUrl || null,
    sort_order: input.sortOrder ?? 0,
    is_new: input.isNew,
    is_best_seller: input.isBestSeller,
    published: input.published,
  };

  let productId = input.id;

  if (productId) {
    const { error } = await admin.from("products").update(row).eq("id", productId);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await admin
      .from("products")
      .insert(row)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    productId = data.id as string;
  }

  // Replace image rows
  await admin.from("product_images").delete().eq("product_id", productId);
  if (input.images.length > 0) {
    const imageRows = input.images.map((img, i) => ({
      product_id: productId,
      url: img.url,
      label: img.label,
      position: img.position ?? i,
    }));
    const { error } = await admin.from("product_images").insert(imageRows);
    if (error) throw new Error(error.message);
  }

  // Replace per-size stock rows
  await admin.from("product_sizes").delete().eq("product_id", productId);
  if (input.sizeStock.length > 0) {
    const sizeRows = input.sizeStock.map((s, i) => ({
      product_id: productId,
      size: s.size,
      available: s.available,
      quantity: s.quantity ?? null,
      position: i,
    }));
    const { error } = await admin.from("product_sizes").insert(sizeRows);
    if (error) throw new Error(error.message);
  }

  revalidateStorefront(input.slug);
}

export async function deleteProduct(id: string, slug: string) {
  await requireUser();
  const admin = createAdminClient();
  const { error } = await admin.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateStorefront(slug);
}

export async function setPublished(id: string, published: boolean, slug: string) {
  await requireUser();
  const admin = createAdminClient();
  const { error } = await admin.from("products").update({ published }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateStorefront(slug);
}

/** Swap a product's display order with its neighbour in the given direction. */
export async function moveProduct(id: string, direction: "up" | "down") {
  await requireUser();
  const admin = createAdminClient();
  const { data } = await admin
    .from("products")
    .select("id, sort_order, created_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  const list = (data ?? []) as { id: string; sort_order: number | null }[];
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) return;
  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= list.length) return;

  // Normalise to positional order, then swap the two positions.
  const ordered = list.map((p, i) => ({ id: p.id, order: i }));
  [ordered[idx].order, ordered[swapIdx].order] = [ordered[swapIdx].order, ordered[idx].order];
  for (const o of ordered) {
    await admin.from("products").update({ sort_order: o.order }).eq("id", o.id);
  }
  revalidateStorefront();
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
