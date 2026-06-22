"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/admin-guard";
import type { CollectionInput, OccasionEditInput } from "@/lib/admin-types";

function revalidateStorefront() {
  revalidatePath("/");
  revalidatePath("/admin/collections");
  revalidatePath("/collections/[collection]", "page");
}

export async function saveCollection(input: CollectionInput) {
  await requireUser();
  const admin = createAdminClient();
  const row = {
    slug: input.slug,
    title: input.title,
    kicker: input.kicker,
    description: input.description,
    hero_label: input.heroLabel,
    hero_tone: input.heroTone,
    hero_image_url: input.heroImageUrl || null,
    sort_order: input.sortOrder ?? 0,
    published: input.published,
  };
  if (input.id) {
    const { error } = await admin.from("collections").update(row).eq("id", input.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await admin.from("collections").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidateStorefront();
}

export async function deleteCollection(id: string) {
  await requireUser();
  const admin = createAdminClient();
  const { error } = await admin.from("collections").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateStorefront();
}

/** Replace the full set of "Shop by Occasion" tiles. */
export async function saveOccasionEdits(edits: OccasionEditInput[]) {
  await requireUser();
  const admin = createAdminClient();
  await admin.from("occasion_edits").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (edits.length > 0) {
    const rows = edits
      .filter((e) => e.title.trim())
      .map((e, i) => ({
        title: e.title,
        caption: e.caption,
        href: e.href,
        tone: e.tone,
        label: e.label,
        image_url: e.imageUrl || null,
        sort_order: i,
      }));
    if (rows.length > 0) {
      const { error } = await admin.from("occasion_edits").insert(rows);
      if (error) throw new Error(error.message);
    }
  }
  revalidateStorefront();
}
