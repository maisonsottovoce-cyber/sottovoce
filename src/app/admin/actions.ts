// Server-side admin actions — require a server runtime (Vercel/Node).
// These are intentionally not marked "use server" so the static export
// build succeeds; they will only function when deployed to a server runtime.
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

  const row = {
    slug: input.slug,
    name: input.name,
    category: input.category,
    price: input.price,
    color: input.color,
    available_colors: input.availableColors,
    sizes: input.sizes,
    occasion: input.occasion,
    description: input.description,
    fit: input.fit,
    fabric_care: input.fabricCare,
    stylist_note: input.stylistNote,
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

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
