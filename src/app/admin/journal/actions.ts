"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/admin-guard";
import type { JournalInput } from "@/lib/admin-types";

function revalidateStorefront(slug?: string) {
  revalidatePath("/journal");
  revalidatePath("/admin/journal");
  if (slug) revalidatePath(`/journal/${slug}`);
}

export async function saveArticle(input: JournalInput) {
  await requireUser();
  const admin = createAdminClient();
  const row = {
    slug: input.slug,
    title: input.title,
    category: input.category,
    date_label: input.dateLabel,
    excerpt: input.excerpt,
    tone: input.tone,
    cover_url: input.coverUrl || null,
    product_slugs: input.productSlugs,
    body: input.body,
    sort_order: input.sortOrder ?? 0,
    published: input.published,
  };
  if (input.id) {
    const { error } = await admin.from("journal_articles").update(row).eq("id", input.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await admin.from("journal_articles").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidateStorefront(input.slug);
}

export async function deleteArticle(id: string, slug: string) {
  await requireUser();
  const admin = createAdminClient();
  const { error } = await admin.from("journal_articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateStorefront(slug);
}
